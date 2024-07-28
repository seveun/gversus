import { FastifyReply, FastifyRequest } from 'fastify';
import { authenticator } from 'otplib';
import firebaseAdmin from '@/config/FirebaseAdmin';
import * as UserService from '@/services/User.service';
import * as RefreshService from '@/services/Refresh.service';
import * as SessionRepository from '@/repositories/Session.repository';
import * as SessionService from '@/services/Session.service';
import * as UserRepository from '@/repositories/User.repository';
import { UnauthorizedError, ForbiddenError } from '@/utils/Error';
import { User } from '@/database/models/User.model';
import { UserPatch, UserPatchSchema } from '@/schemas/User.schema';

const getUserAgentIp = (request: FastifyRequest) => {
  let ip = request.headers['x-forwarded-for']
  || request.socket.remoteAddress || request.ip || null;
  if (ip && Array.isArray(ip)) ip = ip[0];
  const userAgent = request.headers['user-agent'] || null;
  return { ip, userAgent };
};

const getUser = async (request: FastifyRequest, reply: FastifyReply) => {
  const { username, referralCode } = UserPatchSchema.parse(request.query as UserPatch);
  const token = request.headers.authorization?.split('Bearer ')[1];
  if (!token) {
    throw UnauthorizedError(reply, request, 'Auth token is not found');
  }
  const decodedToken = await firebaseAdmin.auth().verifyIdToken(token);
  const decodedUser = await firebaseAdmin.auth().getUser(decodedToken.uid);
  let user = await UserService.getByFirebaseId(decodedUser.uid);
  let { emailVerified } = decodedUser;
  let provider = '';
  if (decodedUser?.providerData?.[0]?.providerId === 'google.com') {
    emailVerified = true;
    provider = 'google';
  } else if (decodedUser?.providerData?.[0]?.providerId === 'facebook.com') provider = 'facebook';
  else if (decodedUser?.customClaims?.provider === 'steam') provider = 'steam';
  else provider = 'email';
  if (!user) {
    const referrer = referralCode ? await UserRepository.findByAffiliateCode(referralCode) : null;
    const appSecret = authenticator.generateSecret(20);
    user = await UserService.create({
      referrerId: referrer?.id || null,
      email: decodedUser?.email || decodedUser?.providerData?.[0]?.email || null,
      username: decodedUser?.displayName || username || null,
      emailVerified,
      isBot: false,
      referralCode: referrer?.id ? referralCode : undefined,
    }, provider, decodedUser.uid, appSecret);
    user = (await Promise.all([
      UserService.uploadImage(user, 'image', decodedUser?.photoURL),
      await RefreshService.byEntitiy('user', user.id),
      await RefreshService.byEntitiy('transactions', user.id),
    ]))[0];
  }
  return { decodedUser, decodedToken, user };
};

export const getSession = async (request: FastifyRequest, authTime: number, user: User) => {
  const { sessionId } = UserPatchSchema.parse(request.query as UserPatch);
  const { ip, userAgent } = getUserAgentIp(request);
  let session = await SessionRepository.find(user.id, userAgent, authTime);
  if (!session) {
    session = await SessionService.create({
      ip,
      userAgent: userAgent || null,
      userId: user.id,
      authTime,
      twoFactor: false,
      status: 'active',
    });
  } else {
    session.changed('updatedAt', true);
    await session.update({ updatedAt: new Date() });
  }
  if (session && sessionId && sessionId !== session.id) {
    const oldSession = await SessionRepository.findById(sessionId);
    if (oldSession && oldSession.userId === user.id) {
      await oldSession.update({ status: 'disconnected' });
    }
  }
  return session;
};

export const ForbiddenWithUser = (user: User, message: string, reply: FastifyReply) => {
  reply.code(403).send({
    error: message,
    user: {
      id: user.id,
      email: user.email,
      tempEmail: user.tempEmail,
      image: user.image,
      username: user.username,
      valid: false,
      twoFactor: user.twoFactor,
    },
  });
};

export const authRequired = async (request: FastifyRequest, reply: FastifyReply) => {
  const token = request.headers.authorization?.split('Bearer ')[1];
  if (token && token === process.env.SECRET) {
    request.User = { id: 'admin' } as User;
    return;
  }
  const { decodedToken, user } = await getUser(request, reply);
  try {
    if (!user) ForbiddenError(reply, request, 'User is not found');
    else if (user.status === 'ban') ForbiddenError(reply, request, 'User is banned');
    else if (user.status === 'disabled') ForbiddenError(reply, request, 'User is disabled');
    else if (!user.emailVerified && request.url !== '/auth/mail') {
      ForbiddenWithUser(user, 'Email is not verified', reply);
    }
    const session = await getSession(request, decodedToken.auth_time, user);
    if (session.status === 'disabled') ForbiddenError(reply, request, 'Session disabled');
    const url = request.url.split('?')[0];
    if (!session.twoFactor && user.twoFactor
      && url !== '/auth/two-factor/send' && url !== '/auth/two-factor/validate') {
      ForbiddenWithUser(user, 'Two factor is enabled', reply);
    }
    request.User = user;
    request.Session = session;
  } catch (error) {
    console.error('Error verifying token:', error);
    ForbiddenError(reply, request, 'Unauthorized');
  }
};

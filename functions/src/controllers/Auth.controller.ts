import { FastifyReply, FastifyRequest } from 'fastify';
import * as AuthService from '@/services/Auth.service';
import { BadRequestError } from '@/utils/Error';
import * as RefreshService from '@/services/Refresh.service';

export const updateVerifMail = async (request: FastifyRequest, reply: FastifyReply) => {
  const email = request.User.tempEmail || request.User.email;
  const { id, emailVerified } = request.User;
  const { language } = request.query as {language: string};
  const { updatedMail } = request.body as Record<string, string>;
  if (emailVerified) return BadRequestError(reply, request, 'Email already verified');
  if (!email && !updatedMail) return BadRequestError(reply, request, 'Email not found');
  try {
    await AuthService.updateVerifMail(request.User, language, updatedMail);
    await RefreshService.byEntitiy('user', id);
    return reply.send({ message: 'Email sent' });
  } catch (error: any) {
    return BadRequestError(reply, request, error.message);
  }
};

export const validateMail = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as Record<string, string>;
  try {
    const authCode = await AuthService.validateMail(id);
    await RefreshService.byEntitiy('user', authCode.userId);
    return reply.send({ message: 'Email validated' });
  } catch (error: any) {
    return BadRequestError(reply, request, error.message);
  }
};

export const sendTwoFactorAuth = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { language } = request.query as {language: string};
    await AuthService.sendTwoFactorAuth(request.User, language);
    return reply.send({ message: 'Code sent' });
  } catch (error: any) {
    return BadRequestError(reply, request, error.message);
  }
};

export const validateTwoFactorAuth = async (request: FastifyRequest, reply: FastifyReply) => {
  const { code } = request.body as { code: string };
  if (!code) return BadRequestError(reply, request, 'Code not found');
  try {
    await AuthService.validateTwoFactorAuth(request.User, request.Session, parseInt(code, 10));
    await RefreshService.byEntitiy('user', request.User.id);
    return reply.send('validated');
  } catch (error: any) {
    return BadRequestError(reply, request, error.message);
  }
};

export const sendSms = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { language } = request.query as {language: string};
    await AuthService.sendSms(request.User, language);
    return reply.send({ message: 'Code sent' });
  } catch (error: any) {
    return BadRequestError(reply, request, error.message);
  }
};

export const validateSms = async (request: FastifyRequest, reply: FastifyReply) => {
  const { code } = request.body as { code: string };
  if (!code) return BadRequestError(reply, request, 'Code not found');
  try {
    await AuthService.validateSms(request.User, parseInt(code, 10));
    await RefreshService.byEntitiy('user', request.User.id);
    return reply.send('validated');
  } catch (error: any) {
    return BadRequestError(reply, request, error.message);
  }
};

export const sendForgotPassword = async (request: FastifyRequest, reply: FastifyReply) => {
  const { email } = request.body as { email: string };
  if (!email) return BadRequestError(reply, request, 'Email not found');
  const { language } = request.query as {language: string};
  try {
    await AuthService.sendForgotPassword(email, language);
    return reply.send({ message: 'Email sent' });
  } catch (error: any) {
    return BadRequestError(reply, request, error.message);
  }
};

export const resetPassword = async (request: FastifyRequest, reply: FastifyReply) => {
  const { password, id } = request.body as { password: string; id: string };
  if (!password || !id) return BadRequestError(reply, request, 'Password or id not found');
  try {
    const email = await AuthService.resetPassword(password, id);
    return reply.send({ email });
  } catch (error: any) {
    return BadRequestError(reply, request, error.message);
  }
};

export const changePassword = async (request: FastifyRequest, reply: FastifyReply) => {
  const { currentPassword, password } = request
    .body as { currentPassword: string, password: string };
  if (!currentPassword || !password) {
    return BadRequestError(reply, request, 'currentPassword or password not found');
  }
  try {
    await AuthService.changePassword(request.User, currentPassword, password);
    return reply.send('changed');
  } catch (error: any) {
    return BadRequestError(reply, request, error.message);
  }
};

export const otpAuth = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const otpauth = AuthService.otpAuth(request.User);
    return reply.send({ otpauth });
  } catch (error: any) {
    return BadRequestError(reply, request, error.message);
  }
};

export const otpAuthValidate = async (request: FastifyRequest, reply: FastifyReply) => {
  const { code } = request.body as { code: string, password: string};
  if (!code) return BadRequestError(reply, request, 'Code not found');
  try {
    await AuthService.otpAuthValidate(request.User, parseInt(code, 10));
    await RefreshService.byEntitiy('user', request.User.id);
    return reply.send('validated');
  } catch (error: any) {
    return BadRequestError(reply, request, error.message);
  }
};

export const activateTwoFactorAuth = async (request: FastifyRequest, reply: FastifyReply) => {
  const { type, activate } = request.body as { type: string, activate: boolean };
  if (!type || activate === undefined) {
    return BadRequestError(reply, request, 'Type or activate not found');
  }
  try {
    await AuthService.activateTwoFactorAuth(request.User, request.Session, type, activate);
    await RefreshService.byEntitiy('user', request.User.id);
    return reply.send('activated');
  } catch (error: any) {
    return BadRequestError(reply, request, error.message);
  }
};

export const logout = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    await AuthService.logout(request.Session);
    return reply.send('logout');
  } catch (error: any) {
    return BadRequestError(reply, request, error.message);
  }
};

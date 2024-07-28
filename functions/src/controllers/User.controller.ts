import { FastifyReply, FastifyRequest } from 'fastify';
import * as UserService from '@/services/User.service';
import * as RefreeshService from '@/services/Refresh.service';
import { UserPatch } from '@/schemas/User.schema';
import { BadRequestError } from '@/utils/Error';

export const get = async (request: FastifyRequest, reply: FastifyReply) => {
  const wallets = await UserService.getWallets(request.User.id);
  const user: Partial<typeof request.User> = request.User.toJSON();
  delete user.appSecret;
  delete user.firebaseId;
  return reply.send({
    ...user, wallets, valid: true, sessionId: request.Session.id,
  });
};

export const uploadImage = async (request: FastifyRequest, reply: FastifyReply) => {
  const { Files } = request;
  const { query } = request as unknown as { query: { type: string }};
  if (Files && Files.length > 0 && query.type) {
    await UserService.uploadImage(request.User, query.type, Files[0].data);
    await RefreeshService.userById(request.User.id);
    return reply.send({ message: 'Image uploaded' });
  }
  return reply.status(400).send({ message: 'Invalid image' });
};

export const update = async (request: FastifyRequest, reply: FastifyReply) => {
  const { body, User } = request;
  const { language } = request.query as { language: string };
  try {
    await UserService.update(User, language, body as UserPatch);
    await RefreeshService.userById(request.User.id);
    return reply.send({ message: 'User updated' });
  } catch (error: any) {
    console.log(error);
    return BadRequestError(reply, request, error);
  }
};

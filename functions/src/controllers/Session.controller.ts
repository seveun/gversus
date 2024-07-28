import { FastifyReply, FastifyRequest } from 'fastify';
import * as SessionService from '@/services/Session.service';
import * as RefreshService from '@/services/Refresh.service';
import { SessionFilters } from '@/schemas/Session.schema';

export const get = async (request: FastifyRequest, reply: FastifyReply) => {
  const { User } = request;
  const query = request.query as SessionFilters;
  const sessions = await SessionService.getByUserId(User.id, query);
  return reply.send(sessions);
};

export const disconnectAll = async (request: FastifyRequest, reply: FastifyReply) => {
  const { User, Session } = request;
  await SessionService.disconnectAll(User.id, Session.id);
  await RefreshService.byEntitiy('user', User.id);
  return reply.send({ success: true });
};

export const disconnect = async (request: FastifyRequest, reply: FastifyReply) => {
  const { User } = request;
  const { id } = request.params as { id: string };
  await SessionService.disconnect(User.id, id);
  await RefreshService.byEntitiy('user', User.id);
  return reply.send({ success: true });
};

import { FastifyReply, FastifyRequest } from 'fastify';
import * as GameService from '@/services/Game.service';
import { InternalServerError } from '@/utils/Error';

export const getById = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: string };
  try {
    const box = (await GameService.getById(id))?.toJSON();
    return reply.send(box);
  } catch (error) {
    console.error(error);
    return InternalServerError(reply, request, 'Error to get game');
  }
};

export const liveGames = async (request: FastifyRequest, reply: FastifyReply) => {
  const games = await GameService.liveGames();
  return reply.send(games);
};

export const liveGamesById = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: string };
  const game = await GameService.liveGamesById(id);
  return reply.send(game);
};

import { FastifyInstance } from 'fastify';
import * as GameController from '@/controllers/Game.controller';

export default async function GameRoutes(fastify: FastifyInstance) {
  fastify.get('/livegame', GameController.liveGames);
  fastify.get('/livegame/:id', GameController.liveGamesById);
  fastify.get('/:id', GameController.getById);
}

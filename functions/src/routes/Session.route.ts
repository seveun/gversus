import { FastifyInstance } from 'fastify';
import * as SessionController from '@/controllers/Session.controller';
import { authRequired } from '@/middlewares/Auth.middleware';

export default async function UserRoutes(fastify: FastifyInstance) {
  fastify.get('/', { preHandler: authRequired }, SessionController.get);
  fastify.get('/disconnect', { preHandler: authRequired }, SessionController.disconnectAll);
  fastify.get('/disconnect/:id', { preHandler: authRequired }, SessionController.disconnect);
}

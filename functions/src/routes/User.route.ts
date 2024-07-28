import { FastifyInstance } from 'fastify';
import * as UserController from '@/controllers/User.controller';
import { authRequired } from '@/middlewares/Auth.middleware';

export default async function UserRoutes(fastify: FastifyInstance) {
  fastify.post('/image', { preHandler: authRequired }, UserController.uploadImage);
  fastify.put('/', { preHandler: authRequired }, UserController.update);
  fastify.get('/', { preHandler: authRequired }, UserController.get);
}

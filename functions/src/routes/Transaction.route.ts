import { FastifyInstance } from 'fastify';
import * as TransactionService from '@/controllers/Transaction.controller';
import { authRequired } from '@/middlewares/Auth.middleware';

export default async function TransactionRoutes(fastify: FastifyInstance) {
  fastify.get('/', { preHandler: authRequired }, TransactionService.get);
}

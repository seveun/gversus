import { FastifyInstance } from 'fastify';
import * as ExchangeController from '@/controllers/Exchange.controller';

export default async function EchangeRoutes(fastify: FastifyInstance) {
  fastify.get('/refresh', ExchangeController.refresh);
}

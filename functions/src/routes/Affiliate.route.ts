import { FastifyInstance } from 'fastify';
import * as AffiliateController from '@/controllers/Affiliate.controller';
import { authRequired } from '@/middlewares/Auth.middleware';

export default async function AffiliateRoutes(fastify: FastifyInstance) {
  fastify.get('/stats', { preHandler: authRequired }, AffiliateController.getStats);
  fastify.post('/withdraw', { preHandler: authRequired }, AffiliateController.withdraw);
  fastify.get(
    '/referrer/stats',
    { preHandler: authRequired },
    AffiliateController.getReferrersStats,
  );
  fastify.get('/withdraws', { preHandler: authRequired }, AffiliateController.getWithdraws);
}

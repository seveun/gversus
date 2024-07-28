import { FastifyInstance } from 'fastify';
import HealthCheckRoutes from '@/routes/HealthCheck.route';
import UserRoutes from '@/routes/User.route';
import AuthRoutes from '@/routes/Auth.route';
import SessionRoutes from './Session.route';
import GameRoutes from './Game.route';
import ExchangeRoutes from './Exchange.route';
import TransactionRoutes from './Transaction.route';
import AffiliateRoutes from './Affiliate.route';

export default async function router(fastify: FastifyInstance) {
  fastify.register(HealthCheckRoutes, { prefix: '/health-check' });
  fastify.register(UserRoutes, { prefix: '/user' });
  fastify.register(AuthRoutes, { prefix: '/auth' });
  fastify.register(SessionRoutes, { prefix: '/session' });
  fastify.register(GameRoutes, { prefix: '/game' });
  fastify.register(ExchangeRoutes, { prefix: '/exchange' });
  fastify.register(TransactionRoutes, { prefix: '/transaction' });
  fastify.register(AffiliateRoutes, { prefix: '/affiliate' });
}

import { FastifyReply, FastifyRequest } from 'fastify';
import * as HealthCheckService from '@/services/HealthCheck.service';

export const check = async (request: FastifyRequest, reply: FastifyReply) => {
  const response = await HealthCheckService.check();
  return reply.send(response);
};

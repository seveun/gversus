import { FastifyReply, FastifyRequest } from 'fastify';
import * as TransactionService from '@/services/Transaction.service';
import { TransactionFilters } from '@/schemas/Transaction.schema';

export const get = async (request: FastifyRequest, reply: FastifyReply) => {
  const query = request.query as TransactionFilters;
  const items = await TransactionService.getByUserId(request.User.id, query);
  return reply.send(items);
};

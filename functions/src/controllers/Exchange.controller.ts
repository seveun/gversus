import { FastifyReply, FastifyRequest } from 'fastify';
import * as ExchangesService from '@/services/Exchange.service';
import { InternalServerError } from '@/utils/Error';

export const refresh = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    await ExchangesService.refreshCurrenciesRate();
    return reply.send({ message: 'OK' });
  } catch (error: any) {
    console.log(error);
    return InternalServerError(reply, request, 'Error to refresh currencies rate');
  }
};

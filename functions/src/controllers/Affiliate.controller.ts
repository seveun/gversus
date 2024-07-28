import { FastifyReply, FastifyRequest } from 'fastify';
import * as AffiliateService from '@/services/Affiliate.service';
import { BadRequestError } from '@/utils/Error';
import { AffiliateFilters } from '@/schemas/Affiliate.schema';

export const getStats = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const stats = await AffiliateService.getStats(request.User.id);
    return reply.send({
      totalSpend: Math.ceil(stats.totalSpend * 10) / 10,
      totalEarning: Math.ceil(stats.totalEarning * 10) / 10,
      totalReferrals: Math.ceil(stats.totalReferrals * 10) / 10,
      availableEarning: Math.ceil(stats.availableEarning * 10) / 10,

    });
  } catch (error: any) {
    return BadRequestError(reply, request, error.message);
  }
};

export const withdraw = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    await AffiliateService.withdraw(request.User.id);
    return reply.send({ success: true });
  } catch (error: any) {
    return BadRequestError(reply, request, error.message);
  }
};

export const getReferrersStats = (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const query = request.query as AffiliateFilters;
    return AffiliateService.getReferrersStats(request.User.id, query);
  } catch (error: any) {
    return BadRequestError(reply, request, error.message);
  }
};

export const getWithdraws = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const query = request.query as AffiliateFilters;
    return AffiliateService.getWithdraws(request.User.id, query);
  } catch (error: any) {
    return BadRequestError(reply, request, error.message);
  }
};

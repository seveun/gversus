import useragent from 'useragent';
import geoip from 'geoip-lite';
import lookup from 'country-code-lookup';
import * as SessionRepository from '../repositories/Session.repository';
import {
  Session as SessionType, SessionFilters,
  SessionFiltersSchema,
} from '@/schemas/Session.schema';

export const getByUserId = async (userId: string, filters: SessionFilters) => {
  const sessions = await SessionRepository.getByUserId(userId, SessionFiltersSchema.parse(filters));
  return sessions;
};

export const create = async (body: SessionType) => {
  const agent = body.userAgent ? useragent.parse(body.userAgent) : null;
  const location = body.ip ? geoip.lookup(body.ip) : null;
  const userAgentParsed = agent ? `${agent.os} - ${agent.toAgent()}` : null;
  const session = await SessionRepository.create({
    ...body,
    userAgentParsed,
    ipLocation: location ? `${location.city}, ${lookup.byIso(location.country)?.country}` : null,
  });
  return session;
};

export const disconnectAll = async (userId: string, sessionId: string) => {
  await SessionRepository.update({ userId, status: 'active' }, { status: 'disabled' }, sessionId);
};

export const disconnect = async (userId: string, id: string) => {
  await SessionRepository.update({ userId, id, status: 'active' }, { status: 'disabled' });
};

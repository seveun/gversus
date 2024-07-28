import { v4 as uuidv4 } from 'uuid';
import { Op } from '@sequelize/core';
import { Session } from '@/database';
import { Session as SessionType, SessionFilters } from '@/schemas/Session.schema';

export const find = async (
  userId:string,
  userAgent: string | null,
  authTime: number,
) => {
  const session = await Session.findOne({
    where: {
      userId,
      userAgent,
      authTime,
    },
  });
  return session;
};

export const findById = async (id: string) => {
  const session = await Session.findByPk(id);
  return session;
};

export const create = async (body: SessionType) => {
  const session = await Session.create({
    ...body,
    id: uuidv4(),
  });
  return session;
};

export const getByUserId = async (userId: string, filters: SessionFilters) => {
  const sessions = await Session.findAndCountAll({
    where: {
      userId,
    },
    order: [['updatedAt', 'DESC'], ['status', 'ASC'], [filters.orderBy, filters.order]],
    limit: 8,
    offset: (filters.page - 1) * 8,
  });
  return sessions;
};

export const update = async (
  where: Partial<SessionType>,
  body: Partial<SessionType>,
  id?: string,
) => {
  if (id) {
    // eslint-disable-next-line no-param-reassign
    where = {
      ...where,
      id: {
        [Op.not]: id,
      },
    } as any;
  }
  const session = await Session.update(body, {
    where,
  });
  return session;
};

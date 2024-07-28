import { v4 as uuidv4 } from 'uuid';
import { AuthCode } from '@/database';

export const getLastAuthCodeByType = async (userId: string, type: string) => {
  const authCode = await AuthCode
    .findOne({ where: { userId, type }, order: [['createdAt', 'DESC']] });
  return authCode;
};

export const createAuthCode = async (userId: string, type: string, receiver: string) => {
  let code = null;
  if (type === 'two-factor' || type === 'verif-sms') {
    code = Math.floor(100000 + Math.random() * 900000);
  }
  const authCode = await AuthCode.create({
    userId, type, id: uuidv4(), createdAt: new Date(), receiver, code,
  });
  return authCode;
};

export const getById = async (id: string) => {
  const authCode = await AuthCode.findByPk(id);
  return authCode;
};

export const getByCode = async (code: number, userId: string) => {
  const authCode = await AuthCode.findOne({
    where: { code, userId },
    order: [['createdAt', 'DESC']],
  });
  return authCode;
};

import { v4 as uuidv4 } from 'uuid';
import { User } from '@/database';
import { User as UserType, UserPatch } from '../schemas/User.schema';

export const findByPhoneNumber = async (phoneNumber: string) => {
  const user = await User.findOne({
    where: {
      phoneNumber,
    },
  });
  return user;
};

export const getByFirebaseId = async (firebaseId: string) => {
  const user = await User.findOne({
    where: {
      firebaseId,
    },
  });
  return user;
};

export const create = async (
  user: UserType,
  provider: string,
  firebaseId: string,
  appSecret: string,
) => {
  const newUser = await User.create({
    ...user,
    provider,
    firebaseId,
    id: uuidv4(),
    status: 'active',
    valid: true,
    image: user?.image || null,
    appSecret,
    createdAt: new Date(),
  });
  return newUser;
};

export const getById = async (id: string) => {
  const user = await User.findByPk(id);
  return user;
};

export const update = async (id: string, user: UserPatch) => {
  await User.update(user, {
    where: {
      id,
    },
  });
};

export const findByEmail = async (email: string, provider?: string) => {
  const where = { email } as { email: string; provider?: string};
  if (provider) where.provider = provider;
  const user = await User.findOne({ where });
  return user;
};

export const findByAffiliateCode = async (affiliateCode: string) => {
  const user = await User.findOne({
    where: {
      affiliateCode,
    },
  });
  return user;
};

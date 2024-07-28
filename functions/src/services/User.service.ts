/* eslint-disable no-param-reassign */
import { AvatarGenerator } from 'random-avatar-generator';
import {
  parsePhoneNumber, getCountries, CountryCode, getCountryCallingCode,
} from 'libphonenumber-js';
import * as UserRepository from '@/repositories/User.repository';
import { UserPatch, UserPatchSchema, User as UserType } from '@/schemas/User.schema';
import { getWalletsByUserId } from '@/repositories/Transaction.repository';
import * as DirectusService from '@/services/Directus.service';
import * as AuthService from '@/services/Auth.service';
import * as ExchangeService from '@/services/Exchange.service';
import { User, User as UserModel } from '@/database/models/User.model';

const walletsList = [
  'BTC',
  'ETH',
  'LTC',
  'USDT',
  'EUR',
  'USD',
];

const generator = new AvatarGenerator();

export const getByFirebaseId = async (firebaseId: string) => {
  const user = await UserRepository.getByFirebaseId(firebaseId);
  return user;
};

export const uploadImage = async (user: UserModel, type: string, file?: string | Buffer) => {
  if (!file) {
    // eslint-disable-next-line no-param-reassign
    file = generator.generateRandomAvatar(user.id).replace('Circle', 'Transparent');
  }
  const image = await DirectusService.uploadFile(
    file,
    `${user.id.replace(/-/g, '')}`,
    type === 'cover' ? 'abb5bc4e-02cb-4c0d-b493-262f23fa6282'
      : '23a96150-0735-4a41-a06d-09996d02f1dd',
    user.image,
  );
  if (image) {
    if (type === 'cover') await user.update({ cover: image.id });
    // eslint-disable-next-line no-param-reassign
    else user = await user.update({ image: image.id });
  }
  return user;
};

export const create = async (
  user: UserType,
  provider:string,
  firebaseId: string,
  appSecret: string,
) => {
  const newUser = await UserRepository.create(user, provider, firebaseId, appSecret);
  return newUser;
};

export const getWallets = async (userId: string) => {
  const wallets = await getWalletsByUserId(userId);
  const formatedWallets = [] as {
    type: string;
    amount: number;
  }[];
  walletsList.forEach((walletType) => {
    const data = wallets.find((item) => item.wallet === walletType);
    formatedWallets.push({
      type: walletType,
      amount: data?.amount || 0,
    });
  });
  return formatedWallets;
};

export const validateFunds = async (userId: string, wallet: string, totalPrice: number) => {
  const walletAmount = (await getWallets(userId))
    .find((w) => w.type === wallet)?.amount || 0;
  if (walletAmount < await ExchangeService.convert(totalPrice, wallet)) {
    throw new Error('Insufficient funds');
  }
};

export const validatePhoneNumber = (phoneNumber: string) => {
  const countryCodes = getCountries().map((code) => ({
    code: code as CountryCode,
    dialCode: `+${getCountryCallingCode(code as CountryCode)}`,
  }));
  let isValid = false;
  const dialode = phoneNumber?.match(/\((\+[^)]+)/)?.[1];
  if (!dialode) throw new Error('Invalid phone number');
  const code = countryCodes.find((country) => country.dialCode === dialode)?.code;
  phoneNumber = phoneNumber.split(')')?.[1];
  if (!code) throw new Error('Invalid phone number');
  try {
    isValid = parsePhoneNumber(phoneNumber, code).isValid();
    phoneNumber = parsePhoneNumber(phoneNumber, code).formatNational()
      .replace(/\(|\)/g, '');
  } catch (error) {
    isValid = false;
  }
  if (!isValid) throw new Error('Invalid phone number');
  return `(${dialode})${phoneNumber}`;
};

export const updateReferralCode = async (user: User, validatedUser: UserPatch) => {
  if (validatedUser?.referralCode) {
    if (user?.referrerId !== null) throw new Error('You are already referred');
    const referrer = await UserRepository.findByAffiliateCode(validatedUser.referralCode);
    if (!referrer) throw new Error('Referrer code is not correct');
    if (referrer.id === user.id) throw new Error("You can't refer yourself");
    validatedUser.referrerId = referrer.id;
  }
};

export const updatePhoneNumber = async (user: User, validatedUser: UserPatch) => {
  if (validatedUser.phoneNumber && validatedUser.phoneNumber !== user.phoneNumber) {
    validatedUser.phoneNumber = await validatePhoneNumber(validatedUser.phoneNumber);
    const duplicatePhone = await UserRepository.findByPhoneNumber(validatedUser.phoneNumber);
    if (duplicatePhone && duplicatePhone.id !== user.id && duplicatePhone.phoneVerified) {
      throw new Error('Phone number already used');
    }
    validatedUser.phoneVerified = false;
  }
};

export const updateAffiliateCode = async (user: User, validatedUser: UserPatch) => {
  if (validatedUser.affiliateCode && validatedUser.affiliateCode !== user.affiliateCode) {
    const dupliAffiliateCode = await UserRepository
      .findByAffiliateCode(validatedUser.affiliateCode);
    if (dupliAffiliateCode && dupliAffiliateCode.id !== user.id) {
      throw new Error('Affiliate code already used');
    }
  }
};

export const updateMail = async (user: User, language: string, validatedUser: UserPatch) => {
  if (validatedUser.email && validatedUser.email !== user.email && user.provider !== 'google') {
    await AuthService.updateVerifMail(user, language, validatedUser.email);
  }
};

export const update = async (user: User, language: string, userBody: UserPatch) => {
  const validatedUser = await UserPatchSchema.parse(userBody);
  delete validatedUser?.phoneVerified;
  await updateReferralCode(user, validatedUser);
  await updateMail(user, language, validatedUser);
  await updatePhoneNumber(user, validatedUser);
  await updateAffiliateCode(user, validatedUser);
  delete validatedUser?.email;
  const patchUser = await UserRepository.update(user.id, validatedUser);
  return patchUser;
};

export const findByEmail = async (email: string) => {
  const user = await UserRepository.findByEmail(email);
  return user;
};

export const getXpLevel = (user: UserModel, price: number) => {
  let { level, xp } = user;
  if (level === undefined || xp === undefined) throw new Error('User has no level or xp');
  const conversionFactor = 1 / (level + 2);
  const xpGained = price * conversionFactor;
  xp += xpGained;
  while (xp >= 100) {
    level += 1;
    xp -= 100;
  }
  return { xp: Math.round(xp * 100) / 100, level };
};

export const getBots = async (limit: number, offset = 0) => {
  if (limit === 0) return [];
  const bots = await User.findAll({
    attributes: ['id'],
    where: {
      isBot: true,
    },
    limit,
    offset,
    order: [['id', 'ASC']],
  });
  return bots;
};

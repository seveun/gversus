import axios from 'axios';
import moment from 'moment';
import { authenticator } from 'otplib';
import { Op } from '@sequelize/core';
import firebaseAdmin from '@/config/FirebaseAdmin';
import * as AuthCodeRepository from '@/repositories/AuthCode.repository';
import * as MailService from '@/services/Mail.service';
import * as SmsService from '@/services/Sms.service';
import * as UserRepository from '@/repositories/User.repository';
import { User, Session, sequelize } from '@/database';

const FIREBASE_URL = 'https://identitytoolkit.googleapis.com/v1/';

export const updateVerifMail = async (user: User, language: string, updatedMail?: string) => {
  let email = user.tempEmail || user.email;
  if (updatedMail && email !== updatedMail) {
    const duplicateUser = await UserRepository.findByEmail(updatedMail);
    if (duplicateUser && duplicateUser?.id !== user.id) throw new Error('Email already used');
  }
  // eslint-disable-next-line no-param-reassign
  user = await user.update({ tempEmail: updatedMail, emailVerified: false, twoFactor: null });
  email = user.tempEmail || user.email;
  const lastCode = await AuthCodeRepository.getLastAuthCodeByType(user.id, 'verif-mail');
  if (lastCode && moment().diff(lastCode?.createdAt, 'minutes') < 1) {
    throw new Error('Please wait 1 minute before requesting another verification email');
  }
  try {
    if (!email) throw new Error('Email not found');
    const code = await AuthCodeRepository.createAuthCode(user.id, 'verif-mail', email);
    await MailService.sendVerifMail(email, code.id, language);
  } catch (error) {
    console.log(error);
  }
};

export const validateMail = async (id: string) => {
  const authCode = await AuthCodeRepository.getById(id);
  if (authCode && authCode.type === 'verif-mail-used') {
    throw new Error('Email already verified');
  }
  if (!authCode || authCode.type !== 'verif-mail') throw new Error('Invalid verification code');
  if (moment().diff(authCode.createdAt, 'hours') > 1) throw new Error('Verification code expired');
  const user = await UserRepository.getById(authCode.userId);
  if (!user) throw new Error('User not found');
  const email = user.tempEmail || user.email;
  if (user.emailVerified) throw new Error('Email already verified');
  if (email !== authCode.receiver) {
    throw new Error('Invalid verification code');
  }
  if (user.tempEmail && user.provider === 'email') {
    await firebaseAdmin.auth().updateUser(user.firebaseId, { email: user.tempEmail });
  }
  return (await Promise.all([
    user.update({ emailVerified: true, email, tempEmail: null }),
    await authCode.update({ type: 'verif-mail-used' }),
  ]))[1];
};

export const sendTwoFactorAuth = async (user: User, language: string) => {
  if (!user.twoFactor) throw new Error('Two-factor authentication not enabled');
  const lastCode = await AuthCodeRepository.getLastAuthCodeByType(user.id, 'two-factor');
  if (lastCode && moment().diff(lastCode?.createdAt, 'minutes') < 1) {
    throw new Error('Please wait 1 minute before requesting another verification code');
  }
  if (user.twoFactor === 'email') {
    if (!user.email) throw new Error('Email not found');
    const authCode = await AuthCodeRepository.createAuthCode(user.id, 'two-factor', user.email);
    if (authCode.code) await MailService.sendTwoFactorAuth(user.email, authCode.code, language);
  } else if (user.twoFactor === 'sms') {
    const phoneNumber = user.phoneNumber?.replace(/\(|\)/g, '');
    if (!phoneNumber) throw new Error('Phone number not found');
    const authCode = await AuthCodeRepository.createAuthCode(user.id, 'two-factor', phoneNumber);
    if (authCode.code) await SmsService.sendTwoFactorAuth(phoneNumber, authCode.code, language);
  }
  return true;
};

export const validateTwoFactorAuth = async (user: User, session: Session, code: number) => {
  if (user.twoFactor === 'app') {
    if (!authenticator.verify({ token: code.toString(), secret: user.appSecret })) {
      throw new Error('Invalid verification code');
    }
    await session.update({ twoFactor: true });
  } else {
    const authCode = await AuthCodeRepository.getByCode(code, user.id);
    if (!authCode || authCode.type !== 'two-factor') throw new Error('Invalid verification code');
    if (moment().diff(authCode.createdAt, 'minutes') > 5) {
      throw new Error('Verification code expired');
    }
    if (authCode.code !== code) throw new Error('Invalid verification code');
    await session.update({ twoFactor: true });
  }
};

export const sendSms = async (user: User, language: string) => {
  const phoneNumber = user.phoneNumber?.replace(/\(|\)/g, '');
  if (!phoneNumber) throw new Error('Phone number not found');
  if (user?.phoneVerified) throw new Error('Phone number already verified');
  const lastCode = await AuthCodeRepository.getLastAuthCodeByType(user.id, 'verif-sms');
  if (lastCode && moment().diff(lastCode?.createdAt, 'minutes') < 1) {
    throw new Error('Please wait 1 minute before requesting another verification code');
  }
  const authCode = await AuthCodeRepository.createAuthCode(user.id, 'verif-sms', phoneNumber);
  if (!authCode.code) throw new Error('Code not found');
  await SmsService.sendVerifSms(phoneNumber, authCode.code, language);
};

export const validateSms = async (user: User, code: number) => {
  const phoneNumber = user.phoneNumber?.replace(/\(|\)/g, '');
  const authCode = await AuthCodeRepository.getByCode(code, user.id);
  if (!authCode || authCode.type !== 'verif-sms') throw new Error('Invalid verification code');
  if (authCode.code !== code) throw new Error('Invalid verification code');
  if (authCode.receiver !== phoneNumber) throw new Error('Invalid verification code');
  if (moment().diff(authCode.createdAt, 'minutes') > 5) {
    throw new Error('Verification code expired');
  }
  if (authCode.code !== code) throw new Error('Invalid verification code');
  await sequelize.transaction(async () => {
    await Promise.all([
      User.update({
        phoneVerified: false,
        phoneNumber: null,
      }, {
        where: {
          phoneNumber: user.phoneNumber,
          id: {
            [Op.not]: user.id,
          },
        },
      }),
      user.update({ phoneVerified: true }),
      authCode.update({ type: 'verif-sms-used' }),
    ]);
  });
};

export const sendForgotPassword = async (email: string, language: string) => {
  const user = await UserRepository.findByEmail(email, 'email');
  if (!user) throw new Error('Email not found');
  const lastCode = await AuthCodeRepository.getLastAuthCodeByType(user.id, 'forgot-password');
  if (lastCode && moment().diff(lastCode?.createdAt, 'minutes') < 1) {
    throw new Error('Please wait 1 minute before requesting another verification code');
  }
  const authCode = await AuthCodeRepository.createAuthCode(user.id, 'forgot-password', email);
  if (!authCode) throw new Error('Code not found');
  await MailService.sendForgotPassword(email, authCode.id, language);
};

export const resetPassword = async (password: string, id: string) => {
  const authCode = await AuthCodeRepository.getById(id);
  if (!authCode || authCode.type !== 'forgot-password') {
    throw new Error('Invalid verification code');
  }
  if (moment().diff(authCode.createdAt, 'hours') > 1) throw new Error('Verification code expired');
  const user = await UserRepository.getById(authCode.userId);
  if (!user) throw new Error('User not found');
  if (authCode.receiver !== user.email) throw new Error('Invalid verification code');
  await firebaseAdmin.auth().updateUser(user.firebaseId, { password });
  await authCode.update({ type: 'forgot-password-used' });
  return user.email;
};

export const changePassword = async (user: User, currentPassword: string, password: string) => {
  if (user.provider !== 'email') throw new Error('Invalid provider');
  const verifyPasswordURL = `${FIREBASE_URL}accounts:signInWithPassword?key=${
    process.env.FIREBASE_API_KEY}`;
  try {
    const response = await axios.post(verifyPasswordURL, {
      email: user.email,
      password: currentPassword,
      returnSecureToken: true,
    });
    const { registered } = response.data;
    if (!registered) throw new Error('Invalid password');
  } catch (error: any) {
    if (error?.response?.data?.error?.message.includes('TOO_MANY_ATTEMPTS_TRY_LATER')) {
      throw new Error('Too many attempts, try again later');
    } else throw new Error('Invalid password');
  }
  await firebaseAdmin.auth().updateUser(user.firebaseId, { password });
};

export const otpAuth = (user: User) => {
  const otpauth = authenticator.keyuri(user?.email || user?.id, 'Raritycase', user.appSecret);
  return otpauth;
};

export const otpAuthValidate = async (user: User, code: number) => {
  if (user.twoFaVerified) throw new Error('TwoFa authentication already enabled');
  if (!authenticator.verify({ token: code.toString(), secret: user.appSecret })) {
    throw new Error('Invalid verification code');
  }
  await user.update({ twoFaVerified: true });
};

export const activateTwoFactorAuth = async (
  user: User,
  session: Session,
  type: string,
  activate: boolean,
) => {
  if (!activate) await user.update({ twoFactor: null });
  else if (type === 'app') {
    if (!user.twoFaVerified) throw new Error('TwoFa authentication not verified');
    await user.update({ twoFactor: 'app' });
  } else if (type === 'email') {
    if (!user.emailVerified) throw new Error('Email not found');
    await user.update({ twoFactor: 'email' });
  } else if (type === 'sms') {
    if (!user.phoneVerified) throw new Error('Phone number need to be verified');
    await user.update({ twoFactor: 'sms' });
  } else throw new Error('Invalid two-factor type');
  await session.update({ twoFactor: false });
};

export const logout = async (session: Session) => {
  await session.update({ status: 'disconnected' });
};

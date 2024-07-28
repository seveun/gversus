/* eslint-disable max-len */
import nodemailer from 'nodemailer';
import { Template } from '@/database';

const get = async (type: string, language: string) => {
  const template = await Template.findOne({
    where: { type, language },
  });
  return template;
};

const getTransporter = () => nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
  },
});

export const sendVerifMail = async (email: string, codeId: string, language: string) => {
  const URL = `${process.env.CLIENT_URL}/auth/validate-mail/${codeId}`;
  const template = await get('VERIF_MAIL', language);
  if (!template) throw new Error('Template not found');
  await getTransporter().sendMail({
    from: process.env.MAIL_USERNAME,
    to: email,
    subject: template?.subject,
    html: template?.template.replace('{{URL}}', URL),
  });
};

export const sendTwoFactorAuth = async (email: string, CODE: number, language: string) => {
  const template = await get('TWO_FACTOR_AUTH_MAIL', language);
  if (!template) throw new Error('Template not found');
  await getTransporter().sendMail({
    from: process.env.MAIL_USERNAME,
    to: email,
    subject: template?.subject,
    html: template?.template.replace('{{CODE}}', CODE.toString()),
  });
};

export const sendForgotPassword = async (email: string, CODE: string, language: string) => {
  const template = await get('FORGOT_PASSWORD', language);
  if (!template) throw new Error('Template not found');
  const URL = `${process.env.CLIENT_URL}?resetPassword=${CODE}`;
  await getTransporter().sendMail({
    from: process.env.MAIL_USERNAME,
    to: email,
    subject: template?.subject,
    html: template?.template.replace('{{URL}}', URL),
  });
};

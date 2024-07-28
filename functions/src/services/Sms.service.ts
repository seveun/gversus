import axios from 'axios';
import { load } from 'cheerio';
import { Template } from '@/database';

const URL = 'https://rest.clicksend.com/v3/sms/send';

const get = async (type: string, language: string) => {
  const template = await Template.findOne({
    where: { type, language },
  });
  return template;
};

const getAuthToken = () => {
  const { CLICKSEND_USERNAME, CLICKSEND_PASSWORD } = process.env;
  const authToken = Buffer.from(`${CLICKSEND_USERNAME}:${CLICKSEND_PASSWORD}`)
    .toString('base64');
  return authToken;
};

const send = async (receiver: string, body: string) => {
  const { data } = await axios({
    method: 'POST',
    maxBodyLength: Infinity,
    url: URL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${getAuthToken()}`,
    },
    data: JSON.stringify({
      messages: [
        {
          body,
          to: receiver,
        },
      ],
    }),
  });
  return data;
};

export const sendVerifSms = async (receiver: string, code: number, language: string) => {
  const body = (await get('VERIF_SMS', language))?.template.replace('{{CODE}}', code.toString());
  if (!body) throw new Error('Template not found');
  const $ = load(body);
  return send(receiver, $.text());
};

export const sendTwoFactorAuth = async (receiver: string, code: number, language: string) => {
  const body = (await get('TWO_FACTOR_AUTH_SMS', language))
    ?.template.replace('{{CODE}}', code.toString());
  if (!body) throw new Error('Template not found');
  const $ = load(body);
  return send(receiver, $.text());
};

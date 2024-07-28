import axios from "axios";

const URL = process.env.NEXT_PUBLIC_SERVER_URL + "/auth";

export const updateVerifMail = async (
  accessToken: string,
  language = "fr",
  updatedMail?: string,
) => {
  const body = updatedMail ? { updatedMail } : {};
  const { data } = await axios({
    method: "POST",
    url: URL + "/mail",
    data: body,
    params: { language },
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return data;
};

export const sendTwoFactorAuth = async (
  accessToken: string,
  language = "fr",
) => {
  const { data } = await axios({
    method: "POST",
    params: { language },
    url: URL + "/two-factor/send",
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return data;
};

export const validateTwoFactorAuth = async (
  accessToken: string,
  code: string,
) => {
  const { data } = await axios({
    method: "POST",
    url: URL + "/two-factor/validate",
    data: { code },
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return data;
};

export const validateMail = async (id: string, language = "fr") => {
  const { data } = await axios({
    method: "GET",
    url: URL + "/validate-mail/" + id,
    params: { language },
  });
  return data;
};

export const sendSms = async (accessToken: string, language = "fr") => {
  const { data } = await axios({
    method: "POST",
    url: URL + "/sms/send",
    params: { language },
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return data;
};

export const validateSms = async (
  accessToken: string,
  code: string,
  language = "fr",
) => {
  const { data } = await axios({
    method: "POST",
    url: URL + "/sms/validate",
    data: { code },
    params: { language },
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return data;
};

export const sendForgotPassword = async (email: string, language = "fr") => {
  const { data } = await axios({
    method: "POST",
    url: URL + "/forgot-password",
    data: { email },
    params: { language },
  });
  return data;
};

export const resetPassword = async (
  password: string,
  id: string,
  language = "fr",
) => {
  const { data } = await axios({
    method: "POST",
    url: URL + "/reset-password",
    data: { password, id },
    params: { language },
  });
  return data;
};

export const updatePassword = async (
  accessToken: string,
  currentPassword: string,
  password: string,
) => {
  const { data } = await axios({
    method: "PUT",
    url: URL + "/password",
    data: { currentPassword, password },
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return data;
};

export const getOtpAuth = async (accessToken: string, language = "fr") => {
  const { data } = await axios({
    method: "POST",
    url: URL + "/app/otpauth",
    params: { language },
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return data.otpauth;
};

export const validateOtpAuth = async (accessToken: string, code: string) => {
  const { data } = await axios({
    method: "POST",
    url: URL + "/app/otpauth/validate",
    data: { code },
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return data;
};

export const activateTwoFactorAuth = async (
  accessToken: string,
  type: string,
  activate: boolean,
  language = "fr",
) => {
  const { data } = await axios({
    method: "POST",
    url: URL + "/app/two-factor/activate",
    params: { language },
    data: { type, activate },
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return data;
};

export const logout = async (accessToken: string) => {
  const { data } = await axios({
    method: "POST",
    url: URL + "/logout",
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return data;
};

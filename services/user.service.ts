import axios from "axios";
import { UserPatch } from "@schemas/User.schema";

const URL = process.env.NEXT_PUBLIC_SERVER_URL + "/user";

export const get = async (
  accessToken: string,
  params: {
    sessionId?: string;
    username?: string;
    affiliateCode?: string | null;
  },
) => {
  const { data } = await axios.get(URL, {
    headers: { Authorization: `Bearer ${accessToken}` },
    params,
  });
  return data;
};

export const uploadImage = async (
  accessToken: string,
  type: string,
  file: File,
) => {
  const formData = new FormData();
  formData.append("file", file);
  const { data } = await axios.post(URL + "/image", formData, {
    headers: { Authorization: `Bearer ${accessToken}` },
    params: { type },
  });
  return data;
};

export const update = async (accessToken: string, user: UserPatch) => {
  const { data } = await axios.put(URL, user, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return data;
};

export const updateReferrer = async (
  accessToken: string,
  affiliateCode: string,
) => {
  const { data } = await axios.put(
    `${URL}/refer`,
    { affiliateCode },
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    },
  );
  return data;
};

export const getEncrypted = async (accessToken: string) => {
  const { data } = await axios.get(URL + "/encrypted", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return data;
};

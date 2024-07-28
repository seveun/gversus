import axios from "axios";

const URL = process.env.NEXT_PUBLIC_SERVER_URL + "/session";

export const get = async (accessToken: string, page: number) => {
  const { data } = await axios.get(URL, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    params: {
      page,
    },
  });
  return data;
};

export const disconnectAll = async (accessToken: string) => {
  await axios.get(URL + "/disconnect", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const disconnect = async (accessToken: string, id: string) => {
  await axios.get(URL + `/disconnect/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

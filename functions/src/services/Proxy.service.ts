import { HttpsProxyAgent } from 'https-proxy-agent';

let agent: HttpsProxyAgent<string>;

export const getAgent = () => {
  if (!agent && process.env.PROXY) agent = new HttpsProxyAgent(process.env.PROXY);
  return agent;
};

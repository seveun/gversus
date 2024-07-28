import 'module-alias/register';
import 'dotenv/config';
import { onRequest } from 'firebase-functions/v2/https';
import fastify, { FastifyRequest, FastifyReply } from 'fastify';
import fastifyCors from '@fastify/cors';
import qs from 'qs';
import { initOnlineEnv } from '@/config/Env';
import { init as initDatabase } from '@/database';
import router from '@/routes';
import contentTypeParser from '@/middlewares/ContentTypeParser.middleware';

const app = fastify({
  querystringParser: (str) => qs.parse(str),
});

const initFastifyApp = async () => {
  await Promise.all([
    contentTypeParser(app),
    app.register(fastifyCors, {
      origin: '*',
      methods: 'GET, PUT, POST, DELETE',
    }),
    app.register(router),
    app.ready(),
  ]);
};

const initializing = (async () => {
  await initOnlineEnv();
  await Promise.all([
    initDatabase(),
    initFastifyApp(),
  ]);
})();

const fastifyApp = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    await initializing;
    app.server.emit('request', request, reply);
  } catch (error) {
    console.error('Error initializing environment or starting Fastify app:', error);
    reply.status(500).send('Internal Server Error');
  }
};

onRequest({
  timeoutSeconds: 12,
  memory: '512MiB',
  region: 'europe-west1',
}, fastifyApp as any);

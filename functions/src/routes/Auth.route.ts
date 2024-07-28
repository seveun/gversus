import { FastifyInstance } from 'fastify';
import * as AuthController from '@/controllers/Auth.controller';
import { authRequired } from '@/middlewares/Auth.middleware';

export default async function AuthRoutes(fastify: FastifyInstance) {
  fastify.post('/mail', { preHandler: authRequired }, AuthController.updateVerifMail);
  fastify.get('/validate-mail/:id', AuthController.validateMail);
  fastify.post('/two-factor/send', { preHandler: authRequired }, AuthController.sendTwoFactorAuth);
  fastify.post(
    '/two-factor/validate',
    { preHandler: authRequired },
    AuthController.validateTwoFactorAuth,
  );
  fastify.post('/sms/send', { preHandler: authRequired }, AuthController.sendSms);
  fastify.post('/sms/validate', { preHandler: authRequired }, AuthController.validateSms);
  fastify.post('/forgot-password', AuthController.sendForgotPassword);
  fastify.post('/reset-password', AuthController.resetPassword);
  fastify.put('/password', { preHandler: authRequired }, AuthController.changePassword);
  fastify.post('/app/otpauth', { preHandler: authRequired }, AuthController.otpAuth);
  fastify.post(
    '/app/otpauth/validate',
    { preHandler: authRequired },
    AuthController.otpAuthValidate,
  );
  fastify.post(
    '/app/two-factor/activate',
    { preHandler: authRequired },
    AuthController.activateTwoFactorAuth,
  );
  fastify.post('/logout', { preHandler: authRequired }, AuthController.logout);
}

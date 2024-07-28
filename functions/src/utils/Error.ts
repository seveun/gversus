import { FastifyReply, FastifyRequest } from 'fastify';

export const parseZodError = (error: any) => {
  if (error?.issues?.length > 0) {
    return error?.issues.map((e: any) => `${e.path?.[0]}: ${e.message}`).join(', ');
  }
  return error.message;
};

export const BaseError = (
  reply: FastifyReply,
  request: FastifyRequest,
  message: string,
  statusCode: number,
) => {
  const { method, url } = request;
  reply.status(statusCode)
    .send({
      message: `Route ${method}: ${url}`,
      error: parseZodError(message),
      statusCode,
    });
};

export function NotFoundError(reply: FastifyReply, request: FastifyRequest, message: string) {
  BaseError(reply, request, message, 404);
}

export function InternalServerError(reply: FastifyReply, request: FastifyRequest, message: string) {
  BaseError(reply, request, message, 500);
}

export function BadRequestError(reply: FastifyReply, request: FastifyRequest, message: string) {
  BaseError(reply, request, message, 400);
}

export function ForbiddenError(reply: FastifyReply, request: FastifyRequest, message: string) {
  BaseError(reply, request, message, 403);
}

export function UnauthorizedError(reply: FastifyReply, request: FastifyRequest, message: string) {
  BaseError(reply, request, message, 401);
}

export function ConflictError(reply: FastifyReply, request: FastifyRequest, message: string) {
  BaseError(reply, request, message, 409);
}

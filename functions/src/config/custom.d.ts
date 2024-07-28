import 'fastify';
import { User } from '@/database/models/User.model';
import { Session } from '@/database/models/Session.model';

declare module 'fastify' {
  interface FastifyRequest {
    User: User;
    Session: Session;
    Files?: {
        filename: string | undefined;
        type: string;
        name: string | undefined;
        data: Buffer;
    }[]
  }
}

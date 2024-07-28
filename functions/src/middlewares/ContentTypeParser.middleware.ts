import { FastifyInstance } from 'fastify';
import { parse } from 'parse-multipart-data';

async function contentTypeParser(app: FastifyInstance) {
  app.addContentTypeParser('application/json', {}, (req: any, payload: any, done: any) => {
    req.rawBody = payload.rawBody;
    done(null, payload.body);
  });
  app.addContentTypeParser('multipart/form-data', {}, (req: any, payload: any, done: any) => {
    req.rawBody = payload.rawBody;
    done(null, payload.body);
  });

  app.addHook('preHandler', async (request: any) => {
    const contentType = request.headers['content-type'] || '';
    if (contentType && contentType.includes('multipart/form-data')) {
      const boundary = contentType.split('multipart/form-data; boundary=')[1];
      if (boundary && request.rawBody instanceof Buffer) {
        try {
          const files = parse(request.rawBody, boundary);
          request.Files = files.map((file: any) => ({
            filename: file.filename,
            type: file.type,
            name: file.name,
            data: file.data,
          }));
        } catch (error) {
          console.log(error);
        }
      }
    }
  });
}

export default contentTypeParser;

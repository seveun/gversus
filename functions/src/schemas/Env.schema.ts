import z from 'zod';

export const envSchema = z.object({
  NODE_ENV: z.string(),
  DATABASE_URL: z.string(),
  GCP_PROJECT_ID: z.string(),
  CLIENT_URL: z.string(),
  SERVER_URL: z.string(),
  DATABASE_CA: z.string(),
  DIRECTUS_URL: z.string(),
  DIRECTUS_USERNAME: z.string(),
  DIRECTUS_PASSWORD: z.string(),
  MAIL_USERNAME: z.string(),
  MAIL_PASSWORD: z.string(),
  CLICKSEND_USERNAME: z.string(),
  CLICKSEND_PASSWORD: z.string(),
  SECRET: z.string(),
  FIREBASE_API_KEY: z.string(),
  PROXY: z.string(),
});

export type Env = z.infer<typeof envSchema>;

import { SecretManagerServiceClient } from '@google-cloud/secret-manager';
import Promiseb from 'bluebird';
import { envSchema } from '@/schemas/Env.schema';

const NODE_ENV = process.env.FUNCTIONS_EMULATOR === 'true' ? 'DEV' : 'PROD';
global.process.env.NODE_ENV = NODE_ENV;

const client = new SecretManagerServiceClient(process.env.SERVERLESS ? {} : {
  keyFile: `${__dirname}/../../.serviceAccountKey.json`,
});

async function getVault(secrets: { name: string; useEnv?: boolean }[]) {
  const vault = {} as Record<string, string>;
  await Promiseb.map(secrets, async ({ name, useEnv }) => {
    const envSecretName = useEnv ? `${NODE_ENV}_${name}` : name;
    const [version] = await client.accessSecretVersion({
      name: `projects/${process.env.GCP_PROJECT_ID}/secrets/${envSecretName}/versions/latest`,
    });
    if (name && version?.payload?.data) {
      vault[name] = version?.payload?.data?.toString();
    }
  }, { concurrency: 30 });
  return vault;
}

export async function initOnlineEnv() {
  console.log(`Initializing online env ${NODE_ENV}`);
  const vault = await getVault([
    { name: 'SERVER_URL', useEnv: true },
    { name: 'CLIENT_URL', useEnv: true },
    { name: 'DATABASE_URL' },
    { name: 'DATABASE_CA' },
    { name: 'DIRECTUS_USERNAME' },
    { name: 'DIRECTUS_PASSWORD' },
    { name: 'MAIL_USERNAME' },
    { name: 'MAIL_PASSWORD' },
    { name: 'CLICKSEND_USERNAME' },
    { name: 'CLICKSEND_PASSWORD' },
    { name: 'SECRET' },
    { name: 'FIREBASE_API_KEY' },
    { name: 'PROXY' },
  ]);
  const parseEnv = envSchema.parse({ ...process.env, ...vault });
  global.process.env = { ...global.process.env, ...parseEnv };
  console.log('Online env initialized');
}

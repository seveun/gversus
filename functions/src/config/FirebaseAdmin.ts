import * as admin from 'firebase-admin';

if (process.env.FUNCTIONS_EMULATOR || !process.env.SERVERLESS) {
  // eslint-disable-next-line import/no-dynamic-require
  const serviceAccount = require(`${__dirname}/../../.serviceAccountKey.json`);
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.REALTIME_DATABASE_URL,
  });
} else {
  admin.initializeApp({
    databaseURL: process.env.REALTIME_DATABASE_URL,
  });
}

export default admin;

import moment, { Moment } from 'moment';
import axios from 'axios';

let client = null as any;
let projectId = '';

const init = async () => {
  const { CloudTasksClient } = await import('@google-cloud/tasks');
  client = new CloudTasksClient();
  projectId = (JSON.parse(process.env?.FIREBASE_CONFIG as string) as any)?.projectId;
};

const location = 'europe-west1';

export const HealthCheck = async (date: Moment) => {
  await init();
  if (process.env.NODE_ENV === 'DEV') {
    setTimeout(
      () => {
        try {
          axios({
            method: 'GET',
            url: `${process.env.SERVER_URL}/health-check`,
            // data: updateData,
            headers: { Authorization: `Bearer ${process.env.SECRET}` },
          });
        } catch (error) {
          console.log('error updateBoxOpening');
        }
      },
      date.diff(moment(), 'milliseconds'),
    );
    return;
  }
  const task = {
    httpRequest: {
      httpMethod: 'GET',
      url: `${process.env.SERVER_URL}/health-check`,
      // body: Buffer.from(JSON.stringify(updateData)).toString('base64'),
      headers: {
        Authorization: `Bearer ${process.env.SECRET}`,
        'Content-Type': 'application/json',
      },
    },
    scheduleTime: { seconds: date.unix() },
  };
  await client.createTask({
    parent: client.queuePath(projectId, location, 'health-check'),
    task,
  });
};

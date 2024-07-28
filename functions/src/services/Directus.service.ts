import axios from 'axios';
import {
  createDirectus, rest, uploadFiles, authentication, deleteFile,
} from '@directus/sdk';
import sharp from 'sharp';

interface Token {
  expires_at: number | null;
}

const client = createDirectus(process.env.DIRECTUS_URL || '').with(authentication()).with(rest());

let token: Token = {
  expires_at: null,
};

export const log = async () => {
  if (token.expires_at && token.expires_at > Date.now()) return;
  const loginResponse = await client.login(
    process.env.DIRECTUS_USERNAME || '',
    process.env.DIRECTUS_PASSWORD || '',
  );
  if ('expires_at' in loginResponse) token = loginResponse as Token;
};

export const uploadFile = async (
  file: string | Buffer,
  filename: string,
  folder: string,
  oldFileId?: string | null,
) => {
  let newFile = file;
  await log();
  if (typeof file === 'string') {
    const response = await axios.get(file, { responseType: 'arraybuffer' });
    newFile = response.data;
  }
  if (oldFileId) await client.request(deleteFile(oldFileId));
  const pngBuffer = await sharp(newFile).png().toBuffer();
  const fileBlob = new Blob([pngBuffer], { type: 'image/png' });
  const formData = new FormData();
  formData.append('folder', folder);
  formData.append('file', fileBlob, filename);
  const result = await client.request(uploadFiles(formData));
  return result;
};

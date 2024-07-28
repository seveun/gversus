import firebaseAdmin from '@/config/FirebaseAdmin';

export const refreshByUrl = async (url: string, obj?: any) => {
  const db = firebaseAdmin.database();
  const ref = db.ref(url);
  await ref.update(obj || { updatedAt: Date.now() });
};

export const byEntitiy = async (path: string, id?: string, lastId?: string) => {
  if (lastId) refreshByUrl(`${path}/${id}`);
  else refreshByUrl(`${path}/${id}`, { lastId });
};

import { promises } from 'fs';

const removeAvatarFile = async (filename: string): Promise<void> => {
  try {
    await promises.stat(filename);
  } catch {
    throw new Error('Pathname not found.');
  }

  await promises.unlink(filename);
};

export { removeAvatarFile };

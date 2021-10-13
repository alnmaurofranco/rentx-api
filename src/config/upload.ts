import { randomBytes } from 'crypto';
import multer from 'multer';
import { resolve } from 'path';

const configUpload = {
  upload(folderName: string) {
    return {
      storage: multer.diskStorage({
        destination: resolve(__dirname, '..', '..', folderName),
        filename: (request, file, callback) => {
          const fileHash = randomBytes(16).toString('hex');

          const fileName = `${fileHash}-${file.originalname}`;

          return callback(null, fileName);
        },
      }),
    };
  },
};

export { configUpload };

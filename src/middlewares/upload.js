// src/middlewares/upload.js

import multer from 'multer';
import path from 'node:path';
import { getEnvVar } from '../utils/getEnvVar.js';
import { TEMP_UPLOAD_DIR } from '../constants/index.js';

const isCloudinaryEnabled = getEnvVar('ENABLE_CLOUDINARY') === 'true';

let storage;

if (isCloudinaryEnabled) {
  storage = multer.memoryStorage();
} else {
  storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, TEMP_UPLOAD_DIR);
    },
    filename: (req, file, cb) => {
      const originalName = path.basename(file.originalname);
      const safeName = originalName
        .toLowerCase()
        .replace(/\s+/g, '_')
        .replace(/[^a-z0-9._-]/g, '');
      const uniqueSuffix = Date.now();
      cb(null, `${uniqueSuffix}_${safeName}`);
    },
  });
}

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
  if (!allowedTypes.includes(file.mimetype)) {
    return cb(new Error('Only image files (jpg, png, webp) are allowed'));
  }
  cb(null, true);
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

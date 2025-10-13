// src/middlewares/multer.js

import multer from 'multer';
import { TEMP_UPLOAD_DIR } from '../constants/index.js';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, TEMP_UPLOAD_DIR);
  },
  filename: function (req, file, cb) {
    const originalName = file.originalname;
    const safeName = originalName.replace(/\s+/g, '_').replace(/[^\w.-]/g, '');
    const uniqueSuffix = Date.now();
    const filename = `${uniqueSuffix}_${safeName}`;
    cb(null, `${uniqueSuffix}_${filename}`);
  },
});

export const upload = multer({ storage });

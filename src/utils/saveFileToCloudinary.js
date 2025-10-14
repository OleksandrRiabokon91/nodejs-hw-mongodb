// src/utils/saveFileToCloudinary.js
import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';
import { getEnvVar } from './getEnvVar.js';
import createHttpError from 'http-errors';

cloudinary.config({
  secure: true,
  cloud_name: getEnvVar('CLOUDINARY_CLOUD_NAME'),
  api_key: getEnvVar('CLOUDINARY_API_KEY'),
  api_secret: getEnvVar('CLOUDINARY_API_SECRET'),
});

export const saveFileToCloudinary = async (file) => {
  if (!file || !file.buffer) return;

  const response = await new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: 'contacts' },
      (err, result) => {
        if (err)
          return reject(
            createHttpError(500, `Cloudinary upload failed: ${err.message}`),
          );
        resolve(result);
      },
    );

    streamifier.createReadStream(file.buffer).pipe(uploadStream);
  });

  return response.secure_url;
};

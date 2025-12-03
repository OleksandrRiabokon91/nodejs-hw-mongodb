import { getEnvVar } from './getEnvVar.js';
import { saveFileToCloudinary } from './saveFileToCloudinary.js';
import { saveFileToUploadDir } from './saveFileToUploadDir.js';

export async function handlePhotoUpload(file) {
  if (!file) return;
  if (getEnvVar('ENABLE_CLOUDINARY') === 'true') {
    return await saveFileToCloudinary(file);
  }
  return await saveFileToUploadDir(file);
}

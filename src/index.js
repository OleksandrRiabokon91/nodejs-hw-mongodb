import { initMongoConnection } from './db/initMongoConnection.js';
import { setupServer } from './server.js';
import { createDirIfNotExists } from './utils/createDirIfNotExists.js';
import { TEMP_UPLOAD_DIR, UPLOAD_DIR } from './constants/index.js';
import { getEnvVar } from './utils/getEnvVar.js';

const bootstrap = async () => {
  try {
    await initMongoConnection();
    if (getEnvVar('ENABLE_CLOUDINARY') !== 'true') {
      await createDirIfNotExists(TEMP_UPLOAD_DIR);
      await createDirIfNotExists(UPLOAD_DIR);
      console.log('📁 Local upload directories ready');
    } else {
      console.log('☁️ Cloudinary mode enabled — skipping local directories');
    }
    setupServer();
  } catch (error) {
    console.error(error);
  }
};

bootstrap();

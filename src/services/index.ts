import * as logger from './logger-service';
import * as articles from './articles-api-client';
import * as auth from './auth-api-client';
import * as toast from './toast-service';
import * as localStorage from './local-storage-service';
import * as profile from './profile-api-client';
import * as errorHandler from './error-handler';

export default {
  logger,
  localStorage,
  toast,
  api: {
    articles,
    auth,
    profile,
    errorHandler
  },
};

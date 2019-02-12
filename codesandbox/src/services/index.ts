import * as logger from './logger-service';
import * as todos from './todos-api-client';

export default {
  logger,
  api: {
    todos,
  },
};

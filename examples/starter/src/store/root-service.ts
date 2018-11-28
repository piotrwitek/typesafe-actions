import * as todos from '../bug-report-sandbox/services/todos-api-client';

const rootService = {
  api: {
    todos,
  },
};

export type RootService = typeof rootService;

export default rootService;

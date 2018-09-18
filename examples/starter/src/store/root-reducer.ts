import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { StateType } from 'typesafe-actions';

import { sandboxReducer } from '../bug-report-sandbox';

const rootReducer = combineReducers({
  router: routerReducer,
  sandbox: sandboxReducer,
});

export type RootState = StateType<typeof rootReducer>;

export default rootReducer;

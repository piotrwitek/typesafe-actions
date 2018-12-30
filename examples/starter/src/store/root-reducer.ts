import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import sandboxReducer from '../bug-report-sandbox/reducer';

const rootReducer = combineReducers({
  router: routerReducer,
  sandbox: sandboxReducer,
});

export default rootReducer;

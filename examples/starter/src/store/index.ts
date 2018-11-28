import { RootAction, RootState, RootService } from 'MyTypes';
import { createStore, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';

import rootReducer from './root-reducer';
import rootEpic from './root-epic';
import rootService from './root-service';

const composeEnhancers =
  (window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export const epicMiddleware = createEpicMiddleware<
  RootAction,
  RootAction,
  RootState,
  RootService
>({
  dependencies: rootService,
});

function configureStore(initialState?: {}) {
  epicMiddleware.run(rootEpic);

  // configure middlewares
  const middlewares = [epicMiddleware];
  // compose enhancers
  const enhancer = composeEnhancers(applyMiddleware(...middlewares));
  // create store
  return createStore(rootReducer, initialState!, enhancer);
}

// pass an optional param to rehydrate state on app start
const store = configureStore();

// export store singleton instance
export default store;

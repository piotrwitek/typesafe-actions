/**
 * @name typesafe-actions
 * @author Piotr Witek <piotrek.witek@gmail.com> (http://piotrwitek.github.io)
 * @copyright Copyright (c) 2017 Piotr Witek
 * @license MIT
 */

/** Public API */

// action-creators
export { action } from './action';
export { createAction } from './create-action';
export { createCustomAction } from './create-custom-action';
export { createAsyncAction, AsyncActionCreator } from './create-async-action';
export { createReducer } from './create-reducer';

// action-helpers
export { getType } from './get-type';
export { isOfType } from './is-of-type';
export { isActionOf } from './is-action-of';

// type-helpers
export {
  TypeConstant,
  Action,
  ActionCreator,
  Reducer,
  EmptyAction,
  PayloadAction,
  PayloadMetaAction,
  EmptyActionCreator,
  PayloadActionCreator,
  PayloadMetaActionCreator,
  ActionCreatorTypeMetadata,
  ActionType,
  StateType,
  Types,
} from './type-helpers';

// deprecated
export { default as deprecated } from './deprecated';

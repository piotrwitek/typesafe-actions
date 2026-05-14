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
export { createAsyncAction } from './create-async-action';
export { createReducer } from './create-reducer';

// action-helpers
export { getType } from './get-type';
export { isOfType } from './is-of-type';
export { isActionOf } from './is-action-of';

// type-helpers
export {
  Types,
  ActionType,
  StateType,
  TypeConstant,
  Action,
  Reducer,
  EmptyAction,
  PayloadAction,
  PayloadMetaAction,
  ActionCreator,
  EmptyActionCreator,
  PayloadActionCreator,
  PayloadMetaActionCreator,
  ActionCreatorTypeMetadata,
  ActionBuilder,
  ActionCreatorBuilder,
  AsyncActionCreatorBuilder,
} from './type-helpers';

// deprecated
export { default as deprecated } from './deprecated';

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
export { createStandardAction } from './create-standard-action';
export { createCustomAction } from './create-custom-action';
export { createAsyncAction } from './create-async-action';
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
  MetaAction,
  PayloadMetaAction,
  EmptyAC,
  PayloadAC,
  PayloadMetaAC,
  TypeMeta,
  ActionType,
  StateType,
  Types,
} from './type-helpers';

// deprecated
export { createActionDeprecated } from './create-action-deprecated';

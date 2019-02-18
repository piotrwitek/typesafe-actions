import { ActionCreator, StringType } from './type-helpers';
import {
  checkIsEmpty,
  throwIsEmpty,
  checkInvalidActionType,
  throwInvalidActionType,
} from './utils/validation';

/**
 * @description create custom action-creator using constructor function with injected type argument
 */
export function createCustomAction<
  T extends StringType,
  AC extends ActionCreator<T> = () => { type: T }
>(type: T, createHandler?: (type: T) => AC): AC {
  if (checkIsEmpty(type)) {
    throwIsEmpty(1);
  }

  if (checkInvalidActionType(type)) {
    throwInvalidActionType(1);
  }

  const actionCreator: AC =
    createHandler != null ? createHandler(type) : ((() => ({ type })) as AC);

  return Object.assign(actionCreator, {
    getType: () => type,
    // redux-actions compatibility
    toString: () => type,
  });
}

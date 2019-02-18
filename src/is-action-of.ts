import { TypeMeta } from './type-helpers';
import {
  checkInvalidActionCreatorInArray,
  checkIsEmpty,
  throwIsEmpty,
} from './utils/validation';

export type ActionCreator<T extends { type: string }> = ((
  ...args: any[]
) => T) &
  TypeMeta<T['type']>;

/**
 * @description (curried assert function) check if an action is the instance of given action-creator(s)
 * @description it works with discriminated union types
 */
export function isActionOf<AC extends ActionCreator<{ type: string }>>(
  actionCreator: AC | AC[],
  action: { type: string }
): action is ReturnType<AC>;

/**
 * @description (curried assert function) check if an action is the instance of given action-creator(s)
 * @description it works with discriminated union types
 */
export function isActionOf<AC extends ActionCreator<{ type: string }>>(
  actionCreator: AC | AC[]
): (action: { type: string }) => action is ReturnType<AC>;

/**
 * implementation
 */
export function isActionOf<AC extends ActionCreator<{ type: string }>>(
  actionCreatorOrCreators: AC | AC[],
  action?: { type: string }
) {
  if (checkIsEmpty(actionCreatorOrCreators)) {
    throwIsEmpty(1);
  }

  const actionCreators = Array.isArray(actionCreatorOrCreators)
    ? actionCreatorOrCreators
    : [actionCreatorOrCreators];

  actionCreators.forEach(checkInvalidActionCreatorInArray);

  const assertFn = (_action: { type: string }) =>
    actionCreators.some(
      actionCreator => _action.type === actionCreator.getType!()
    );

  // 1 arg case => return curried version
  if (action === undefined) {
    return assertFn;
  }
  // 2 args case => invoke assertFn and return the result
  return assertFn(action);
}

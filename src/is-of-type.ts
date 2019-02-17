import {
  checkInvalidActionTypeInArray,
  checkIsEmpty,
  throwIsEmpty,
} from './utils/validation';
/**
 * @description (curried assert function) check if action type is equal given type-constant
 * @description it works with discriminated union types
 */
export function isOfType<T extends string, A extends { type: string }>(
  type: T | T[],
  action: A
): action is A extends { type: T } ? A : never;

/**
 * @description (curried assert function) check if action type is equal given type-constant
 * @description it works with discriminated union types
 */
export function isOfType<T extends string>(
  type: T | T[]
): <A extends { type: string }>(
  action: A
) => action is A extends { type: T } ? A : never;

/**
 * implementation
 */
export function isOfType<T extends string, A extends { type: T }>(
  actionTypeOrTypes: T | T[],
  action?: A
) {
  if (checkIsEmpty(actionTypeOrTypes)) {
    throwIsEmpty(1);
  }

  const actionTypes = Array.isArray(actionTypeOrTypes)
    ? actionTypeOrTypes
    : [actionTypeOrTypes];

  actionTypes.forEach(checkInvalidActionTypeInArray);

  const assertFn = (_action: A) => actionTypes.includes(_action.type);

  // 1 arg case => return curried version
  if (action === undefined) {
    return assertFn;
  }
  // 2 args case => invoke assertFn and return the result
  return assertFn(action);
}

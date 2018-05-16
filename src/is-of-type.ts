import { StringType } from './types';
import { validateActionType } from './utils';
/**
 * @description (curried assert function) check if action type is equal given type-constant
 * @description it works with discriminated union types
 */
export function isOfType<T extends StringType, A extends { type: StringType }>(
  type: T,
  action: A
): action is A extends { type: T } ? A : never;

/**
 * @description (curried assert function) check if action type is equal given type-constant
 * @description it works with discriminated union types
 */
export function isOfType<T extends StringType>(
  type: T
): <A extends { type: StringType }>(
  action: A
) => action is A extends { type: T } ? A : never;

/** implementation */
export function isOfType<T extends StringType, A extends { type: StringType }>(
  actionType: T,
  actionOrNil?: A
) {
  validateActionType(actionType);

  const assertFn = (action: A) => action.type === actionType;

  // with 1 arg return assertFn
  if (actionOrNil == null) {
    return assertFn;
  }
  // with 2 args invoke assertFn and return the result
  return assertFn(actionOrNil);
}

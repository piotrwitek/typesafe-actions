/**
 * DEPRECATED
 */

import { StringType } from './type-helpers';

interface FSA<T extends StringType, P = {}, M = {}, E = boolean> {
  type: T;
  payload?: P;
  meta?: M;
  error?: E;
}

/**
 * @deprecated
 * @description create an action-creator of a given function that contains hidden "type" metadata
 */
export function createActionDeprecated<
  T extends StringType,
  AC extends (...args: any[]) => FSA<T>
>(actionType: T, creatorFunction: AC): AC;

/**
 * @deprecated
 * @description create an action-creator of a given function that contains hidden "type" metadata
 */
export function createActionDeprecated<
  T extends StringType,
  AC extends () => { type: T }
>(actionType: T): AC;

/**
 *  implementation
 */
export function createActionDeprecated<
  T extends StringType,
  AC extends (...args: any[]) => FSA<T>
>(actionType: T, creatorFunction?: AC): AC {
  let actionCreator: AC;

  if (creatorFunction != null) {
    if (typeof creatorFunction !== 'function') {
      throw new Error('second argument is not a function');
    }

    actionCreator = creatorFunction as AC;
  } else {
    actionCreator = (() => ({ type: actionType })) as AC;
  }

  if (actionType != null) {
    if (typeof actionType !== 'string' && typeof actionType !== 'symbol') {
      throw new Error('first argument should be type of: string | symbol');
    }
  } else {
    throw new Error('first argument is missing');
  }

  return actionCreator;
}

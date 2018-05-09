import { StringType, TypeMeta } from './types';

export interface FSA<T extends StringType, P = {}, M = {}, E = boolean> {
  type: T;
  payload?: P;
  meta?: M;
  error?: E;
}

/**
 * @description create an action creator of a given function that contains hidden "type" metadata
 */
export function createActionDeprecated<
  T extends StringType,
  AC extends (...args: any[]) => FSA<T>
>(actionType: T | symbol, creatorFunction: AC): AC & TypeMeta<T>;

/**
 * @description create an action creator of a given function that contains hidden "type" metadata
 */
export function createActionDeprecated<
  T extends StringType,
  AC extends () => { type: T }
>(actionType: T | symbol): AC & TypeMeta<T>;

/**
 *  implementation
 */
export function createActionDeprecated<
  T extends StringType,
  AC extends (...args: any[]) => FSA<T>
>(actionType: T | symbol, creatorFunction?: AC): AC & TypeMeta<T> {
  let actionCreator: AC & TypeMeta<T>;

  if (creatorFunction != null) {
    if (typeof creatorFunction !== 'function') {
      throw new Error('second argument is not a function');
    }

    actionCreator = creatorFunction as AC & TypeMeta<T>;
  } else {
    actionCreator = (() => ({ type: actionType })) as AC & TypeMeta<T>;
  }

  if (actionType != null) {
    if (typeof actionType !== 'string' && typeof actionType !== 'symbol') {
      throw new Error('first argument should be type of: string | symbol');
    }

    actionCreator.getType = () => actionType as T;
  } else {
    throw new Error('first argument is missing');
  }

  return actionCreator;
}

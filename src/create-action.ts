import {
  ActionType,
  EmptyAction,
  FluxStandardAction,
  TypeGetter,
} from './';

/**
 * @description create the action creator of a given function that contains hidden "type" metadata
 */
export function createAction<T extends ActionType,
  AC extends (...args: any[]) => FluxStandardAction<T>
  >(
    actionType: T | symbol,
    creatorFunction: AC,
): AC & TypeGetter<T>;

/**
 * @description create the action creator of a given function that contains hidden "type" metadata
 */
export function createAction<T extends ActionType,
  AC extends () => { type: T }
  >(
    actionType: T | symbol,
): AC & TypeGetter<T>;

/** implementation */
export function createAction<T extends ActionType,
  AC extends (...args: any[]) => FluxStandardAction<T>
  >(
    actionType: T | symbol,
    creatorFunction?: AC,
): AC & TypeGetter<T> {
  let actionCreator: AC & TypeGetter<T>;

  if (creatorFunction != null) {
    if (typeof creatorFunction !== 'function') {
      throw new Error('second argument is not a function');
    }

    actionCreator = creatorFunction as (AC & TypeGetter<T>);
  } else {
    actionCreator = (() => ({ type: actionType })) as (AC & TypeGetter<T>);
  }

  if (actionType != null) {
    if (typeof actionType !== 'string'
      && typeof actionType !== 'symbol') {
      throw new Error('first argument should be of type: string | symbol');
    }

    actionCreator.getType = () => actionType as T;
  } else {
    throw new Error('first argument is missing');
  }

  return actionCreator;
}

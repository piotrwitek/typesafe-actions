import {
  EmptyAction,
  FluxStandardAction,
  TypeGetter,
} from './';

/**
 * @description create the action creator of a given function that contains hidden "type" metadata
 */
export function createAction<T extends string,
  AC extends (...args: any[]) => FluxStandardAction<T>
  >(
  typeString: T,
  creatorFunction: AC,
): AC & TypeGetter<T>;

/**
 * @description create the action creator of a given function that contains hidden "type" metadata
 */
export function createAction<T extends string,
  AC extends () => { type: T }
  >(
  typeString: T,
): AC & TypeGetter<T>;

export function createAction<T extends string,
  AC extends (...args: any[]) => FluxStandardAction<T>
  >(
  typeString: T,
  creatorFunction?: AC,
): AC & TypeGetter<T> {
  let actionCreator: AC & TypeGetter<T>;

  if (creatorFunction != null) {
    if (typeof creatorFunction !== 'function') {
      throw new Error('second argument is not a function');
    }

    actionCreator = creatorFunction as (AC & TypeGetter<T>);
  } else {
    actionCreator = (() => ({ type: typeString })) as (AC & TypeGetter<T>);
  }

  if (typeString != null) {
    if (typeof typeString !== 'string') {
      throw new Error('first argument is not a type string');
    }

    (actionCreator as TypeGetter<T>).getType = () => typeString;
  } else {
    throw new Error('first argument is missing');
  }

  return actionCreator;
}

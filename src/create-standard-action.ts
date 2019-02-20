import {
  StringType,
  Box,
  ActionBuilderCreator,
  ActionBuilderMap,
} from './type-helpers';
import { createCustomAction } from './create-custom-action';
import {
  checkIsEmpty,
  throwIsEmpty,
  checkInvalidActionType,
  throwInvalidActionType,
} from './utils/validation';

export interface ActionBuilder<T extends StringType> {
  <P = undefined, M = undefined>(): ActionBuilderCreator<T, P, M>;
  map<R, P = undefined, M = undefined>(
    fn: (payload: P, meta: M) => R
  ): ActionBuilderMap<T, Box<R>, Box<P>, Box<M>>;
}

/**
 * @description create an action-creator of a given function that contains hidden "type" metadata
 */
export function createStandardAction<T extends StringType>(
  type: T
): ActionBuilder<T> {
  if (checkIsEmpty(type)) {
    throwIsEmpty(1);
  }

  if (checkInvalidActionType(type)) {
    throwInvalidActionType(1);
  }

  function constructor<P, M = undefined>(): ActionBuilderCreator<
    T,
    Box<P>,
    Box<M>
  > {
    return createCustomAction(type, _type => (payload: P, meta: M) => ({
      type: _type,
      payload,
      meta,
    })) as ActionBuilderCreator<T, Box<P>, Box<M>>;
  }

  function map<R, P, M>(
    fn: (payload: P, meta: M) => R
  ): ActionBuilderMap<T, Box<R>, Box<P>, Box<M>> {
    return createCustomAction(type, _type => (payload: P, meta: M) =>
      Object.assign(fn(payload, meta), { type: _type })
    ) as ActionBuilderMap<T, Box<R>, Box<P>, Box<M>>;
  }

  return Object.assign(constructor, { map });
}

import { StringType, Box, FsaBuilder, FsaMapBuilder } from './type-helpers';
import { createCustomAction } from './create-custom-action';
import {
  checkIsEmpty,
  throwIsEmpty,
  checkInvalidActionType,
  throwInvalidActionType,
} from './utils/validation';

export interface CreateStandardAction<T extends StringType> {
  <P = void, M = void>(): FsaBuilder<T, Box<P>, Box<M>>;
  map<R, P = void, M = void>(
    fn: (payload: P, meta: M) => R
  ): FsaMapBuilder<T, Box<R>, Box<P>, Box<M>>;
}

/**
 * @description create an action-creator of a given function that contains hidden "type" metadata
 */
export function createStandardAction<T extends StringType>(
  type: T
): CreateStandardAction<T> {
  if (checkIsEmpty(type)) {
    throwIsEmpty(1);
  }

  if (checkInvalidActionType(type)) {
    throwInvalidActionType(1);
  }

  function constructor<P, M = void>(): FsaBuilder<T, Box<P>, Box<M>> {
    return createCustomAction(type, _type => (payload: P, meta: M) => ({
      type: _type,
      payload,
      meta,
    })) as FsaBuilder<T, Box<P>, Box<M>>;
  }

  function map<R, P, M>(
    fn: (payload: P, meta: M) => R
  ): FsaMapBuilder<T, Box<R>, Box<P>, Box<M>> {
    return createCustomAction(type, _type => (payload: P, meta: M) =>
      Object.assign(fn(payload, meta), { type: _type })
    ) as FsaMapBuilder<T, Box<R>, Box<P>, Box<M>>;
  }

  return Object.assign(constructor, { map });
}

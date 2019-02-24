import {
  StringType,
  ActionBuilderConstructor,
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
  <P = undefined, M = undefined>(): ActionBuilderConstructor<T, P, M>;
  map<R, P = undefined, M = undefined>(
    fn: (payload: P, meta: M) => R
  ): ActionBuilderMap<T, R, P, M>;
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

  function constructor<P, M = undefined>(): ActionBuilderConstructor<T, P, M> {
    return createCustomAction(type, _type => (payload: P, meta: M) => ({
      type: _type,
      payload,
      meta,
    })) as ActionBuilderConstructor<T, P, M>;
  }

  function map<R, P, M>(
    fn: (payload: P, meta: M) => R
  ): ActionBuilderMap<T, R, P, M> {
    return createCustomAction(type, _type => (payload: P, meta: M) =>
      Object.assign(fn(payload, meta), { type: _type })
    ) as ActionBuilderMap<T, R, P, M>;
  }

  return Object.assign(constructor, { map });
}

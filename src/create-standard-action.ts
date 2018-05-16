import { StringType, B, FsaBuilder, MapBuilder } from './types';
import { validateActionType, withType } from './utils';

export interface CreateStandardAction<T extends StringType> {
  <P = void, M = void>(): FsaBuilder<T, B<P>, B<M>>;
  map<R, P = void, M = void>(
    fn: (payload?: P, meta?: M) => R
  ): MapBuilder<T, B<R>, B<P>, B<M>>;
}

/**
 * @description create an action-creator of a given function that contains hidden "type" metadata
 */
export function createStandardAction<T extends StringType>(
  actionType: T
): CreateStandardAction<T> {
  validateActionType(actionType);

  function map<R, P, M>(
    fn: (payload?: P, meta?: M) => R
  ): MapBuilder<T, B<R>, B<P>, B<M>> {
    return withType(actionType, type => (payload?: P, meta?: M) => ({
      type,
      ...(fn(payload, meta) as {}),
    })) as MapBuilder<T, B<R>, B<P>, B<M>>;
  }

  function constructor<P, M = void>(): FsaBuilder<T, B<P>, B<M>> {
    return withType(actionType, type => (payload?: P, meta?: M) => ({
      type,
      payload,
      meta,
    })) as FsaBuilder<T, B<P>, B<M>>;
  }

  return Object.assign(constructor, { map });
}

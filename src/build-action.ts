import { StringType, B, FsaBuilder, MapBuilder, withType } from '.';
import { validateActionType } from './utils';

export interface BuildAction<T extends StringType> {
  <P = void, M = void>(): FsaBuilder<T, B<P>, B<M>>;
  map<R, P = void, M = void>(
    fn: (payload?: P, meta?: M) => R
  ): MapBuilder<T, B<R>, B<P>, B<M>>;
}

/**
 * @description create an action creator of a given function that contains hidden "type" metadata
 */
export function buildAction<T extends StringType>(
  actionType: T
): BuildAction<T> {
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

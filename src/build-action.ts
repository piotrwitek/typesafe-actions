import { StringType, B, FsaBuilder, MapBuilder, withType } from '.';

/**
 * @description create an action creator of a given function that contains hidden "type" metadata
 */
export interface BuildAction<T extends StringType> {
  <P = void, M = void>(): FsaBuilder<T, B<P>, B<M>>;
  map<R, P = void, M = void>(
    fn: (payload?: P, meta?: M) => R
  ): MapBuilder<T, B<R>, B<P>, B<M>>;
}

/** implementation */
export function buildAction<T extends StringType>(
  actionType: T
): BuildAction<T> {
  if (actionType == null) {
    throw new Error('first argument is missing');
  } else {
    if (typeof actionType !== 'string' && typeof actionType !== 'symbol') {
      throw new Error('first argument should be type of: string | symbol');
    }
  }

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

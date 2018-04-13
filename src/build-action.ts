import { StringType, B, FsaActionCreator, MapperActionCreator, withType } from './';

/**
 * @description create an action creator of a given function that contains hidden "type" metadata
 */
export interface BuildAction<Type extends StringType> {
  withTypes<Payload, Meta>(): FsaActionCreator<Type, B<Payload>, B<Meta>>;
  withMappers<Payload, Meta = void>(
    payloadCreator: () => Payload,
    metaCreator?: () => Meta
  ): MapperActionCreator<Type, B<void>, B<Payload>, B<Meta>>;
  withMappers<Arg, Payload, Meta = void>(
    payloadCreator: (payload: Arg) => Payload,
    metaCreator?: (payload: Arg) => Meta
  ): MapperActionCreator<Type, B<Arg>, B<Payload>, B<Meta>>;
}

/** implementation */
export function buildAction<T extends StringType>(actionType: T): BuildAction<T> {
  if (actionType == null) {
    throw new Error('first argument is missing');
  } else {
    if (typeof actionType !== 'string' && typeof actionType !== 'symbol') {
      throw new Error('first argument should be type of: string | symbol');
    }
  }

  function createWithTypes<P, M = void>(): FsaActionCreator<T, B<P>, B<M>> {
    const ac = (payload: P) => ({ type: actionType, payload });
    return withType(actionType, ac) as FsaActionCreator<T, B<P>, B<M>>;
  }

  function createWithMappers<P, M, A>(
    payloadCreator: (a?: A) => P,
    metaCreator?: (a?: A) => M
  ): MapperActionCreator<T, B<A>, B<P>, B<M>> {
    const ac = (payload?: A) => ({
      type: actionType,
      payload: payloadCreator != null ? payloadCreator(payload) : undefined,
      meta: metaCreator != null ? metaCreator(payload) : undefined,
    });
    return withType(actionType, ac) as MapperActionCreator<T, B<A>, B<P>, B<M>>;
  }

  return {
    withTypes: createWithTypes,
    withMappers: createWithMappers,
  };
}

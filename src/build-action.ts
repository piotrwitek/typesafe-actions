import {
  StringType,
  PayloadAction,
  PayloadMetaAction,
  B,
  U,
  EACreator,
  EmptyOrPayload,
  TypeMeta,
  withType,
} from './';

export type FSACreator<
  Type extends StringType,
  Payload extends B<any>,
  Meta extends B<any> = B<void>,
  Arg extends B<any> = B<void>
> = Arg extends B<void>
  ? Meta extends B<void>
    ? () => PayloadAction<Type, U<Payload>>
    : () => PayloadMetaAction<Type, U<Payload>, U<Meta>>
  : Meta extends B<void>
    ? (payload: U<Arg>) => PayloadAction<Type, U<Payload>>
    : (payload: U<Arg>) => PayloadMetaAction<Type, U<Payload>, U<Meta>>;

/**
 * @description create an action creator of a given function that contains hidden "type" metadata
 */
export interface BuildAction<Type extends StringType> {
  empty(): EACreator<Type>;
  payload<Payload>(): EmptyOrPayload<Type, B<Payload>>;
  fsa<Payload, Meta = void>(
    payloadCreator: () => Payload,
    metaCreator?: () => Meta
  ): FSACreator<Type, B<Payload>, B<Meta>>;
  fsa<Arg, Payload, Meta = void>(
    payloadCreator: (payload: Arg) => Payload,
    metaCreator?: (payload: Arg) => Meta
  ): FSACreator<Type, B<Payload>, B<Meta>, B<Arg>>;
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

  function createEmpty(): EACreator<T> {
    const ac = () => ({ type: actionType });
    return withType(actionType, ac);
  }

  function createPayload<P>(): EmptyOrPayload<T, B<P>> {
    const ac = (payload: P) => ({ type: actionType, payload });
    return withType(actionType, ac) as EmptyOrPayload<T, B<P>>;
  }

  function createFsa<P, M, A>(
    payloadCreator: (a?: A) => P,
    metaCreator?: (a?: A) => M
  ): FSACreator<T, B<P>, B<M>> {
    const ac = (payload?: A) => ({
      type: actionType,
      ...{ payload: payloadCreator != null ? payloadCreator(payload) : undefined },
      ...{ meta: metaCreator != null ? metaCreator(payload) : undefined },
    });
    return withType(actionType, ac) as FSACreator<T, B<P>, B<M>>;
  }

  const actionBuilder: BuildAction<T> = {
    empty: createEmpty,
    payload: createPayload,
    fsa: createFsa,
  };
  return actionBuilder;
}

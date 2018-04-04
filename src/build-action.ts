import {
  StringType,
  TypeMeta,
  EmptyAction,
  PayloadAction,
  PayloadMetaAction,
  Box,
  Unbox,
} from './';

export type EACreator<Type extends string> = () => EmptyAction<Type>;

export type PACreator<Type extends string, Payload> = (
  payload: Payload
) => PayloadAction<Type, Payload>;

export type EmptyOrPayload<Type extends string, Payload extends Box<any>> = Payload extends Box<
  void
>
  ? EACreator<Type>
  : PACreator<Type, Unbox<Payload>>;

export type FSACreator<
  Type extends string,
  Payload extends Box<any>,
  Meta extends Box<any> = Box<void>,
  Arg extends Box<any> = Box<void>
> = Arg extends Box<void>
  ? Meta extends Box<void>
    ? () => PayloadAction<Type, Unbox<Payload>>
    : () => PayloadMetaAction<Type, Unbox<Payload>, Unbox<Meta>>
  : Meta extends Box<void>
    ? (payload: Unbox<Arg>) => PayloadAction<Type, Unbox<Payload>>
    : (payload: Unbox<Arg>) => PayloadMetaAction<Type, Unbox<Payload>, Unbox<Meta>>;

export type AsyncCreator<Type extends string, RequestPayload, SuccessPayload, FailurePayload> = {
  request: EmptyOrPayload<Type & 'REQUEST', Box<RequestPayload>>;
  success: EmptyOrPayload<Type & 'SUCCESS', Box<SuccessPayload>>;
  failure: EmptyOrPayload<Type & 'FAILURE', Box<FailurePayload>>;
};

/**
 * @description create an action creator of a given function that contains hidden "type" metadata
 */
export interface BuildAction<Type extends string> {
  empty(): EACreator<Type>;
  payload<Payload>(): EmptyOrPayload<Type, Box<Payload>>;
  async<RequestPayload, SuccessPayload, FailurePayload>(): AsyncCreator<
    Type,
    RequestPayload,
    SuccessPayload,
    FailurePayload
  >;
  fsa<Payload, Meta = void>(
    payloadCreator: () => Payload,
    metaCreator?: () => Meta
  ): FSACreator<Type, Box<Payload>, Box<Meta>>;
  fsa<Arg, Payload, Meta = void>(
    payloadCreator: (payload: Arg) => Payload,
    metaCreator?: (payload: Arg) => Meta
  ): FSACreator<Type, Box<Payload>, Box<Meta>, Box<Arg>>;
}

function attachGetType<T extends string, AC>(
  ac: AC & TypeMeta<T>,
  actionType: T
): AC & TypeMeta<T> {
  ac.getType = () => actionType;
  return ac;
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
    return attachGetType(ac, actionType);
  }

  function createPayload<P>(): EmptyOrPayload<T, Box<P>> {
    const ac = (payload: P) => ({ type: actionType, payload });
    return attachGetType(ac, actionType) as EmptyOrPayload<T, Box<P>>;
  }

  function createFsa<P, M, A>(
    payloadCreator: (a?: A) => P,
    metaCreator?: (a?: A) => M
  ): FSACreator<T, Box<P>, Box<M>> {
    const ac = (payload?: A) => ({
      type: actionType,
      ...{ payload: payloadCreator != null ? payloadCreator(payload) : undefined },
      ...{ meta: metaCreator != null ? metaCreator(payload) : undefined },
    });
    return attachGetType(ac, actionType) as FSACreator<T, Box<P>, Box<M>>;
  }

  function createAsync<R, S, F>(): AsyncCreator<T, R, S, F> {
    const atRequest = actionType + ('_' + 'REQUEST');
    const atSuccess = actionType + ('_' + 'SUCCESS');
    const atFailure = actionType + ('_' + 'FAILURE');

    const acRequest = (payload: R) => ({
      type: atRequest,
      ...{ payload: payload != null ? payload : undefined },
    });
    const acSuccess = (payload: S) => ({
      type: atSuccess,
      ...{ payload: payload != null ? payload : undefined },
    });
    const acFailure = (payload: F) => ({
      type: atFailure,
      ...{ payload: payload != null ? payload : undefined },
    });

    return {
      request: attachGetType(acRequest, atRequest) as EmptyOrPayload<T & 'REQUEST', Box<R>>,
      success: attachGetType(acSuccess, atSuccess) as EmptyOrPayload<T & 'SUCCESS', Box<S>>,
      failure: attachGetType(acFailure, atFailure) as EmptyOrPayload<T & 'FAILURE', Box<F>>,
    };
  }

  const actionBuilder: BuildAction<T> = {
    empty: createEmpty,
    payload: createPayload,
    async: createAsync,
    fsa: createFsa,
  };
  return actionBuilder;
}

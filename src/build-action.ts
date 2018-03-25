import {
  StringType,
  TypeMeta,
  EmptyAction,
  PayloadAction,
  PayloadMetaAction,
} from './';

export type EACreator<Type extends string> =
  () => EmptyAction<Type>;

export type PACreator<Type extends string, Payload> =
  Payload extends void ? EACreator<Type>
  : (payload: Payload) => PayloadAction<Type, Payload>;

export type FSACreator<Type extends string, Payload, Meta = void, Arg = void> =
  Arg extends void ? Meta extends void ? () => PayloadAction<Type, Payload>
  : () => PayloadMetaAction<Type, Payload, Meta> :
  Meta extends void ? (payload: Arg) => PayloadAction<Type, Payload>
  : (payload: Arg) => PayloadMetaAction<Type, Payload, Meta>;

/**
 * @description create an action creator of a given function that contains hidden "type" metadata
 */
export interface BuildAction<Type extends string> {
  empty(): EACreator<Type>;
  payload<Payload>(): PACreator<Type, Payload>;
  async<RequestPayload, SuccessPayload, FailurePayload>(): {
    request: PACreator<Type & 'REQUEST', RequestPayload>;
    success: PACreator<Type & 'SUCCESS', SuccessPayload>;
    failure: PACreator<Type & 'FAILURE', FailurePayload>;
  };
  fsa<Payload, Meta = void>(
    payloadCreator: () => Payload,
    metaCreator?: () => Meta
  ): FSACreator<Type, Payload, Meta>;
  fsa<Arg, Payload, Meta = void>(
    payloadCreator: (payload: Arg) => Payload,
    metaCreator?: (payload: Arg) => Meta
  ): FSACreator<Type, Payload, Meta, Arg>;
}

function attachGetType<T extends string, AC>(
  ac: AC & TypeMeta<T>,
  actionType: T
): AC & TypeMeta<T> {
  ac.getType = () => actionType;
  return ac;
}

/** implementation */
export function buildAction<T extends StringType>(
  actionType: T
): BuildAction<T> {
  if (actionType == null) {
    throw new Error('first argument is missing');
  } else {
    if (typeof actionType !== 'string'
      && typeof actionType !== 'symbol') {
      throw new Error('first argument should be type of: string | symbol');
    }
  }

  function createEmpty(): EACreator<T> {
    const ac = () => ({ type: actionType });
    return attachGetType(ac, actionType);
  }

  function createPayload<P>(): PACreator<T, P> {
    const ac = (payload: P) => ({ type: actionType, payload });
    return attachGetType(ac, actionType) as PACreator<T, P>;
  }

  function createFsa<P, M, A>(
    payloadCreator: (a?: A) => P,
    metaCreator?: (a?: A) => M
  ): FSACreator<T, P, M> {
    const ac = (payload?: A) => ({
      type: actionType,
      ...{ payload: payloadCreator != null ? payloadCreator(payload) : undefined },
      ...{ meta: metaCreator != null ? metaCreator(payload) : undefined },
    });
    return attachGetType(ac, actionType) as FSACreator<T, P, M>;
  }

  function createAsync<R, S, F>(): {
    request: PACreator<T & 'REQUEST', R>;
    success: PACreator<T & 'SUCCESS', S>;
    failure: PACreator<T & 'FAILURE', F>;
  } {
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
      request: attachGetType(acRequest, atRequest) as PACreator<T & 'REQUEST', R>,
      success: attachGetType(acSuccess, atSuccess) as PACreator<T & 'SUCCESS', S>,
      failure: attachGetType(acFailure, atFailure) as PACreator<T & 'FAILURE', F>,
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

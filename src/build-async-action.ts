import { StringType, B, MapperActionCreator, FsaActionCreator, withType } from './';

export interface BuildAsyncAction<
  T1 extends StringType,
  T2 extends StringType,
  T3 extends StringType
> {
  withTypes<P1, P2, P3>(): AsyncActionWithTypes<T1, T2, T3, P1, P2, P3>;
  withMappers<A1 = void, P1 = void, A2 = void, P2 = void, A3 = void, P3 = void>(
    requestMapper: (a?: A1) => P1,
    successMapper: (a?: A2) => P2,
    failureMapper: (a?: A3) => P3
  ): AsyncActionWithMappers<T1, T2, T3, A1, P1, A2, P2, A3, P3>;
}

export type AsyncActionWithTypes<
  T1 extends StringType,
  T2 extends StringType,
  T3 extends StringType,
  P1,
  P2,
  P3
> = {
  request: FsaActionCreator<T1, B<P1>>;
  success: FsaActionCreator<T2, B<P2>>;
  failure: FsaActionCreator<T3, B<P3>>;
};

export type AsyncActionWithMappers<
  T1 extends StringType,
  T2 extends StringType,
  T3 extends StringType,
  A1 = void,
  P1 = void,
  A2 = void,
  P2 = void,
  A3 = void,
  P3 = void
> = {
  request: MapperActionCreator<T1, B<A1>, B<P1>>;
  success: MapperActionCreator<T2, B<A2>, B<P2>>;
  failure: MapperActionCreator<T3, B<A3>, B<P3>>;
};

/** implementation */
export function buildAsyncAction<
  T1 extends StringType,
  T2 extends StringType,
  T3 extends StringType
>(requestType: T1, successType: T2, failureType: T3): BuildAsyncAction<T1, T2, T3> {
  [requestType, successType, failureType].forEach((arg, idx) => {
    if (arg == null) {
      throw new Error(`Argument (${idx}) is missing`);
    } else {
      if (typeof arg !== 'string' && typeof arg !== 'symbol') {
        throw new Error(`Argument (${idx}) should be of type: string | symbol`);
      }
    }
  });
  function withTypes<P1, P2, P3>(): AsyncActionWithTypes<T1, T2, T3, P1, P2, P3> {
    const requestCreator = (payload?: P1) => ({
      type: requestType,
      payload,
    });
    const successCreator = (payload?: P2) => ({
      type: successType,
      payload,
    });
    const failureCreator = (payload?: P3) => ({
      type: failureType,
      payload,
    });

    return {
      request: withType(requestType, requestCreator) as FsaActionCreator<T1, B<P1>>,
      success: withType(successType, successCreator) as FsaActionCreator<T2, B<P2>>,
      failure: withType(failureType, failureCreator) as FsaActionCreator<T3, B<P3>>,
    };
  }

  function withMappers<A1, P1, A2, P2, A3, P3>(
    requestMapper: (a?: A1) => P1,
    successMapper: (a?: A2) => P2,
    failureMapper: (a?: A3) => P3
  ): AsyncActionWithMappers<T1, T2, T3, A1, P1, A2, P2, A3, P3> {
    const requestCreator = (payload?: A1) => ({
      type: requestType,
      payload: requestMapper != null ? requestMapper(payload) : undefined,
    });
    const successCreator = (payload?: A2) => ({
      type: successType,
      payload: successMapper != null ? successMapper(payload) : undefined,
    });
    const failureCreator = (payload?: A3) => ({
      type: failureType,
      payload: failureMapper != null ? failureMapper(payload) : undefined,
    });

    return {
      request: withType(requestType, requestCreator) as MapperActionCreator<T1, B<A1>, B<P1>>,
      success: withType(successType, successCreator) as MapperActionCreator<T2, B<A2>, B<P2>>,
      failure: withType(failureType, failureCreator) as MapperActionCreator<T3, B<A3>, B<P3>>,
    };
  }

  return {
    withTypes,
    withMappers,
  };
}

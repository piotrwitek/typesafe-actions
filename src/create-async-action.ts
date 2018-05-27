import { StringType, B, MapBuilder, FsaBuilder } from './types';
import { validateActionType, withType } from './utils';

export interface CreateAsyncAction<
  T1 extends StringType,
  T2 extends StringType,
  T3 extends StringType
> {
  // tslint:disable-next-line:callable-types
  <P1, P2, P3>(): AsyncActionBuilder<T1, T2, T3, P1, P2, P3>;
  // withMappers<A1 = void, P1 = void, A2 = void, P2 = void, A3 = void, P3 = void>(
  //   requestMapper: (a?: A1) => P1,
  //   successMapper: (a?: A2) => P2,
  //   failureMapper: (a?: A3) => P3
  // ): AsyncActionWithMappers<T1, T2, T3, A1, P1, A2, P2, A3, P3>;
}

export type AsyncActionBuilder<
  T1 extends StringType,
  T2 extends StringType,
  T3 extends StringType,
  P1,
  P2,
  P3
> = {
  request: FsaBuilder<T1, B<P1>>;
  success: FsaBuilder<T2, B<P2>>;
  failure: FsaBuilder<T3, B<P3>>;
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
  request: MapBuilder<T1, B<A1>, B<P1>>;
  success: MapBuilder<T2, B<A2>, B<P2>>;
  failure: MapBuilder<T3, B<A3>, B<P3>>;
};

/** implementation */
export function createAsyncAction<
  T1 extends StringType,
  T2 extends StringType,
  T3 extends StringType
>(
  requestType: T1,
  successType: T2,
  failureType: T3
): CreateAsyncAction<T1, T2, T3> {
  [requestType, successType, failureType].forEach((arg, idx) => {
    validateActionType(arg, idx + 1);
  });

  function constructor<P1, P2, P3>(): AsyncActionBuilder<
    T1,
    T2,
    T3,
    P1,
    P2,
    P3
  > {
    return {
      request: withType(requestType, type => (payload?: P1) => ({
        type: requestType,
        payload,
      })) as FsaBuilder<T1, B<P1>>,
      success: withType(successType, type => (payload?: P2) => ({
        type: successType,
        payload,
      })) as FsaBuilder<T2, B<P2>>,
      failure: withType(failureType, type => (payload?: P3) => ({
        type: failureType,
        payload,
      })) as FsaBuilder<T3, B<P3>>,
    };
  }

  // function withMappers<A1, P1, A2, P2, A3, P3>(
  //   requestMapper: (a?: A1) => P1,
  //   successMapper: (a?: A2) => P2,
  //   failureMapper: (a?: A3) => P3
  // ): AsyncActionWithMappers<T1, T2, T3, A1, P1, A2, P2, A3, P3> {
  //   return {
  //     request: withType(requestType, type => (payload?: A1) => ({
  //       type,
  //       payload: requestMapper != null ? requestMapper(payload) : undefined,
  //     })) as MapBuilder<T1, B<A1>, B<P1>>,
  //     success: withType(successType, type => (payload?: A2) => ({
  //       type,
  //       payload: successMapper != null ? successMapper(payload) : undefined,
  //     })) as MapBuilder<T2, B<A2>, B<P2>>,
  //     failure: withType(failureType, type => (payload?: A3) => ({
  //       type,
  //       payload: failureMapper != null ? failureMapper(payload) : undefined,
  //     })) as MapBuilder<T3, B<A3>, B<P3>>,
  //   };
  // }

  return Object.assign(constructor, {});
}

import {
  StringType,
  Box,
  ActionBuilderCreator,
  ActionBuilderMap,
} from './type-helpers';
import { createCustomAction } from './create-custom-action';
import { checkInvalidActionTypeInArray } from './utils/validation';

export interface AsyncActionBuilder<
  T1 extends StringType,
  T2 extends StringType,
  T3 extends StringType
> {
  // tslint:disable-next-line:callable-types
  <P1, P2, P3>(): AsyncActionBuilderCreator<T1, T2, T3, P1, P2, P3>;
  // withMappers<A1 = undefined, P1 = undefined, A2 = undefined, P2 = undefined, A3 = undefined, P3 = undefined>(
  //   requestMapper: (a?: A1) => P1,
  //   successMapper: (a?: A2) => P2,
  //   failureMapper: (a?: A3) => P3
  // ): AsyncActionBuilderWithMappers<T1, T2, T3, A1, P1, A2, P2, A3, P3>;
}

export type AsyncActionBuilderCreator<
  T1 extends StringType,
  T2 extends StringType,
  T3 extends StringType,
  P1,
  P2,
  P3
> = {
  request: ActionBuilderCreator<T1, P1>;
  success: ActionBuilderCreator<T2, P2>;
  failure: ActionBuilderCreator<T3, P3>;
};

export type AsyncActionBuilderWithMappers<
  T1 extends StringType,
  T2 extends StringType,
  T3 extends StringType,
  A1 = undefined,
  P1 = undefined,
  A2 = undefined,
  P2 = undefined,
  A3 = undefined,
  P3 = undefined
> = {
  request: ActionBuilderMap<T1, Box<A1>, Box<P1>>;
  success: ActionBuilderMap<T2, Box<A2>, Box<P2>>;
  failure: ActionBuilderMap<T3, Box<A3>, Box<P3>>;
};

/**
 * implementation
 */
export function createAsyncAction<
  T1 extends StringType,
  T2 extends StringType,
  T3 extends StringType
>(
  requestType: T1,
  successType: T2,
  failureType: T3
): AsyncActionBuilder<T1, T2, T3> {
  [requestType, successType, failureType].forEach(
    checkInvalidActionTypeInArray
  );

  function constructor<P1, P2, P3>(): AsyncActionBuilderCreator<
    T1,
    T2,
    T3,
    P1,
    P2,
    P3
  > {
    return {
      request: createCustomAction(requestType, type => (payload?: P1) => ({
        type,
        payload,
      })) as ActionBuilderCreator<T1, P1>,
      success: createCustomAction(successType, type => (payload?: P2) => ({
        type,
        payload,
      })) as ActionBuilderCreator<T2, P2>,
      failure: createCustomAction(failureType, type => (payload?: P3) => ({
        type,
        payload,
      })) as ActionBuilderCreator<T3, P3>,
    };
  }

  // function withMappers<A1, P1, A2, P2, A3, P3>(
  //   requestMapper: (a?: A1) => P1,
  //   successMapper: (a?: A2) => P2,
  //   failureMapper: (a?: A3) => P3
  // ): AsyncActionBuilderWithMappers<T1, T2, T3, A1, P1, A2, P2, A3, P3> {
  //   return {
  //     request: createCustomAction(requestType, type => (payload?: A1) => ({
  //       type,
  //       payload: requestMapper != null ? requestMapper(payload) : undefined,
  //     })) as MapBuilder<T1, B<A1>, B<P1>>,
  //     success: createCustomAction(successType, type => (payload?: A2) => ({
  //       type,
  //       payload: successMapper != null ? successMapper(payload) : undefined,
  //     })) as MapBuilder<T2, B<A2>, B<P2>>,
  //     failure: createCustomAction(failureType, type => (payload?: A3) => ({
  //       type,
  //       payload: failureMapper != null ? failureMapper(payload) : undefined,
  //     })) as MapBuilder<T3, B<A3>, B<P3>>,
  //   };
  // }

  return Object.assign(constructor, {});
}

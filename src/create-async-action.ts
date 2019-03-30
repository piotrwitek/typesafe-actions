import {
  StringType,
  ActionBuilderConstructor,
  // ActionBuilderMap,
} from './type-helpers';
import { createCustomAction } from './create-custom-action';
import { checkInvalidActionTypeInArray } from './utils/validation';

export interface AsyncActionBuilder<
  T1 extends StringType,
  T2 extends StringType,
  T3 extends StringType
> {
  // tslint:disable-next-line:callable-types
  <P1, P2, P3>(): AsyncActionBuilderConstructor<T1, T2, T3, P1, P2, P3>;
  // withMappers<A1 = undefined, P1 = undefined, A2 = undefined, P2 = undefined, A3 = undefined, P3 = undefined>(
  //   requestMapper: (a?: A1) => P1,
  //   successMapper: (a?: A2) => P2,
  //   failureMapper: (a?: A3) => P3
  // ): AsyncActionBuilderWithMappers<T1, T2, T3, A1, P1, A2, P2, A3, P3>;
}

export type AsyncActionBuilderConstructor<
  T1 extends StringType,
  T2 extends StringType,
  T3 extends StringType,
  P1,
  P2,
  P3
> = {
  request: ActionBuilderConstructor<T1, P1>;
  success: ActionBuilderConstructor<T2, P2>;
  failure: ActionBuilderConstructor<T3, P3>;
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

  function constructor<P1, P2, P3>(): AsyncActionBuilderConstructor<
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
      })) as ActionBuilderConstructor<T1, P1>,
      success: createCustomAction(successType, type => (payload?: P2) => ({
        type,
        payload,
      })) as ActionBuilderConstructor<T2, P2>,
      failure: createCustomAction(failureType, type => (payload?: P3) => ({
        type,
        payload,
      })) as ActionBuilderConstructor<T3, P3>,
    };
  }

  return Object.assign(constructor);
}

// export type AsyncActionBuilderWithMappers<
//   T1 extends StringType,
//   T2 extends StringType,
//   T3 extends StringType,
//   A1 = undefined,
//   P1 = undefined,
//   A2 = undefined,
//   P2 = undefined,
//   A3 = undefined,
//   P3 = undefined
//   > = {
//     request: ActionBuilderMap<T1, A1, P1>;
//     success: ActionBuilderMap<T2, A2, P2>;
//     failure: ActionBuilderMap<T3, A3, P3>;
//   };

// function withMappers<A1, P1, A2, P2, A3, P3>(
//   requestMapper: (a?: A1) => P1,
//   successMapper: (a?: A2) => P2,
//   failureMapper: (a?: A3) => P3
// ): AsyncActionBuilderWithMappers<T1, T2, T3, A1, P1, A2, P2, A3, P3> {
//   return {
//     request: createCustomAction(requestType, type => (payload?: A1) => ({
//       type,
//       payload: requestMapper != null ? requestMapper(payload) : undefined,
//     })) as MapBuilder<T1, A1, P1>,
//     success: createCustomAction(successType, type => (payload?: A2) => ({
//       type,
//       payload: successMapper != null ? successMapper(payload) : undefined,
//     })) as MapBuilder<T2, A2, P2>,
//     failure: createCustomAction(failureType, type => (payload?: A3) => ({
//       type,
//       payload: failureMapper != null ? failureMapper(payload) : undefined,
//     })) as MapBuilder<T3, A3, P3>,
//   };
// }

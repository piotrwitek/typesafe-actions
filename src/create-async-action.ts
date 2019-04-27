import {
  TypeConstant,
  ActionBuilderConstructor,
  // ActionBuilderMap,
} from './type-helpers';
import { createCustomAction } from './create-custom-action';
import { checkInvalidActionTypeInArray } from './utils/validation';
import { createStandardAction } from './create-standard-action';

export interface AsyncActionBuilder<
  TType1 extends TypeConstant,
  TType2 extends TypeConstant,
  TType3 extends TypeConstant,
  TType4 extends TypeConstant
> {
  // tslint:disable-next-line:callable-types
  <TPayload1, TPayload2, TPayload3, TPayload4>(): {
    request: ActionBuilderConstructor<TType1, TPayload1>;
    success: ActionBuilderConstructor<TType2, TPayload2>;
    failure: ActionBuilderConstructor<TType3, TPayload3>;
    cancel: ActionBuilderConstructor<TType4, TPayload4>;
  };
  <TPayload1, TPayload2, TPayload3>(): {
    request: ActionBuilderConstructor<TType1, TPayload1>;
    success: ActionBuilderConstructor<TType2, TPayload2>;
    failure: ActionBuilderConstructor<TType3, TPayload3>;
  };
}

/**
 * implementation
 */
export function createAsyncAction<
  TType1 extends TypeConstant,
  TType2 extends TypeConstant,
  TType3 extends TypeConstant,
  TType4 extends TypeConstant
>(
  requestType: TType1,
  successType: TType2,
  failureType: TType3,
  cancelType?: TType4
): AsyncActionBuilder<TType1, TType2, TType3, TType4> {
  [requestType, successType, failureType].forEach(
    checkInvalidActionTypeInArray
  );

  const constructor = (<TPayload1, TPayload2, TPayload3, TPayload4>() => {
    return {
      request: createStandardAction(requestType)<TPayload1>(),
      success: createStandardAction(successType)<TPayload2>(),
      failure: createStandardAction(failureType)<TPayload3>(),
      cancel: cancelType && createStandardAction(cancelType)<TPayload4>(),
    };
  }) as AsyncActionBuilder<TType1, TType2, TType3, TType4>;

  const api = Object.assign<
    AsyncActionBuilder<TType1, TType2, TType3, TType4>,
    {}
  >(constructor, {
    // extension point for chain api
  });

  return api;
}

// export interface AsyncActionBuilder<
// {
// withMappers<A1 = undefined, P1 = undefined, A2 = undefined, P2 = undefined, A3 = undefined, P3 = undefined>(
//   requestMapper: (a?: A1) => P1,
//   successMapper: (a?: A2) => P2,
//   failureMapper: (a?: A3) => P3
// ): AsyncActionBuilderWithMappers<T1, T2, T3, A1, P1, A2, P2, A3, P3>;
// }

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

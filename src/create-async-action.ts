import {
  TypeConstant,
  ActionCreatorBuilder,
  // ActionBuilderMap,
} from './type-helpers';
import { checkInvalidActionTypeInArray } from './utils/validation';
import { createAction } from './create-action';

export type AsyncActionCreator<
  TRequest extends [T1, P1],
  TSuccess extends [T2, P2],
  TFailure extends [T3, P3],
  TCancel extends [T4, P4] = never,
  T1 extends TypeConstant = TRequest[0],
  P1 = TRequest[1],
  T2 extends TypeConstant = TSuccess[0],
  P2 = TSuccess[1],
  T3 extends TypeConstant = TFailure[0],
  P3 = TFailure[1],
  T4 extends TypeConstant = TCancel[0],
  P4 = TCancel[1]
> = {
  request: ActionCreatorBuilder<T1, P1>;
  success: ActionCreatorBuilder<T2, P2>;
  failure: ActionCreatorBuilder<T3, P3>;
  cancel: TCancel extends [TypeConstant, any]
    ? ActionCreatorBuilder<T4, P4>
    : never;
};

export interface AsyncActionBuilder<
  TType1 extends TypeConstant,
  TType2 extends TypeConstant,
  TType3 extends TypeConstant,
  TType4 extends TypeConstant
> {
  <TPayload1, TPayload2, TPayload3, TPayload4>(): AsyncActionCreator<
    [TType1, TPayload1],
    [TType2, TPayload2],
    [TType3, TPayload3],
    [TType4, TPayload4]
  >;
  <TPayload1, TPayload2, TPayload3>(): AsyncActionCreator<
    [TType1, TPayload1],
    [TType2, TPayload2],
    [TType3, TPayload3]
  >;
}

/**
 * @description create an async action-creator object that contains `request`, `success` and `failure` actions as props
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
      request: createAction(requestType)<TPayload1>(),
      success: createAction(successType)<TPayload2>(),
      failure: createAction(failureType)<TPayload3>(),
      cancel: cancelType && createAction(cancelType)<TPayload4>(),
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

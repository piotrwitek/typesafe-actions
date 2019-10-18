import {
  TypeConstant,
  ActionBuilderConstructor,
  // ActionBuilderMap,
} from './type-helpers';
import { checkInvalidActionTypeInArray } from './utils/validation';
import { createStandardAction } from './create-standard-action';

type ActionParams = [TypeConstant, any, any] | [TypeConstant, any];

type ActionParamsConstructor<
  TType extends TypeConstant,
  TPayload extends any = undefined,
  TMeta extends any = undefined
> = [TMeta] extends [undefined] ? [TType, TPayload] : [TType, TPayload, TMeta];

type ActionBuilderConstructorFromActionParams<
  TActionParams extends ActionParams
> = TActionParams['length'] extends 3
  ? ActionBuilderConstructor<
      TActionParams[0],
      TActionParams[1],
      TActionParams[2]
    >
  : ActionBuilderConstructor<TActionParams[0], TActionParams[1]>;

type AsyncActionCreatorWithoutCancel<
  TRequest extends ActionParams,
  TSuccess extends ActionParams,
  TFailure extends ActionParams
> = {
  request: ActionBuilderConstructorFromActionParams<TRequest>;
  success: ActionBuilderConstructorFromActionParams<TSuccess>;
  failure: ActionBuilderConstructorFromActionParams<TFailure>;
};

export type AsyncActionCreator<
  TRequest extends ActionParams,
  TSuccess extends ActionParams,
  TFailure extends ActionParams,
  TCancel extends ActionParams | undefined = undefined
> = AsyncActionCreatorWithoutCancel<TRequest, TSuccess, TFailure> &
  (TCancel extends ActionParams
    ? {
        cancel: ActionBuilderConstructorFromActionParams<TCancel>;
      }
    : {});

export interface AsyncActionBuilder<
  TType1 extends TypeConstant,
  TType2 extends TypeConstant,
  TType3 extends TypeConstant,
  TType4 extends TypeConstant | undefined = undefined
> {
  <
    TPayload1,
    TPayload2,
    TPayload3,
    TPayload4,
    TMeta1 = undefined,
    TMeta2 = undefined,
    TMeta3 = undefined,
    TMeta4 = undefined
  >(): AsyncActionCreator<
    ActionParamsConstructor<TType1, TPayload1, TMeta1>,
    ActionParamsConstructor<TType2, TPayload2, TMeta2>,
    ActionParamsConstructor<TType3, TPayload3, TMeta3>,
    TType4 extends TypeConstant
      ? ActionParamsConstructor<TType4, TPayload4, TMeta4>
      : undefined
  >;
  <
    TPayload1,
    TPayload2,
    TPayload3,
    TMeta1 = undefined,
    TMeta2 = undefined,
    TMeta3 = undefined
  >(): AsyncActionCreator<
    ActionParamsConstructor<TType1, TPayload1, TMeta1>,
    ActionParamsConstructor<TType2, TPayload2, TMeta2>,
    ActionParamsConstructor<TType3, TPayload3, TMeta3>
  >;
}
/*
export function createAsyncAction<
  TType1 extends TypeConstant,
  TType2 extends TypeConstant,
  TType3 extends TypeConstant,
  TType4 extends TypeConstant
  >(
  requestType: TType1,
  successType: TType2,
  failureType: TType3
): AsyncActionBuilder<TType1, TType2, TType3, never>;

export function createAsyncAction<
  TType1 extends TypeConstant,
  TType2 extends TypeConstant,
  TType3 extends TypeConstant,
  TType4 extends TypeConstant
  >(
  requestType: TType1,
  successType: TType2,
  failureType: TType3,
  cancelType: TType4
): AsyncActionBuilder<TType1, TType2, TType3, TType4>;
*/
/**
 * implementation
 */
export function createAsyncAction<
  TType1 extends TypeConstant,
  TType2 extends TypeConstant,
  TType3 extends TypeConstant,
  TType4 extends TypeConstant | undefined = undefined
>(
  requestType: TType1,
  successType: TType2,
  failureType: TType3,
  cancelType?: TType4
): AsyncActionBuilder<TType1, TType2, TType3, TType4> {
  [requestType, successType, failureType].forEach(
    checkInvalidActionTypeInArray
  );

  const constructor = (<
    TPayload1,
    TPayload2,
    TPayload3,
    TPayload4,
    TMeta1,
    TMeta2,
    TMeta3,
    TMeta4
  >() => {
    return {
      request: createStandardAction(requestType)<TPayload1, TMeta1>(),
      success: createStandardAction(successType)<TPayload2, TMeta2>(),
      failure: createStandardAction(failureType)<TPayload3, TMeta3>(),
      cancel:
        cancelType &&
        createStandardAction(cancelType as TypeConstant)<TPayload4, TMeta4>(),
    } as any;
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

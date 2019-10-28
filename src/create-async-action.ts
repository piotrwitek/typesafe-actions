import {
  TypeConstant,
  ActionCreatorBuilder,
  ActionBuilder,
} from './type-helpers';
import { createAction } from './create-action';

export function throwInvalidAsyncActionArgument(argPosition: number): never {
  throw new Error(
    `Argument ${argPosition} is invalid, it should be an action type of "string | symbol" or a tuple of "[string | symbol, Function, Function?]"`
  );
}

interface AsyncActionType<
  TType1 extends TypeConstant,
  TPayload1 extends any,
  TMeta1 extends any,
  TArgs1 extends any[],
  TType2 extends TypeConstant,
  TPayload2 extends any,
  TMeta2 extends any,
  TArgs2 extends any[],
  TType3 extends TypeConstant,
  TPayload3 extends any,
  TMeta3 extends any,
  TArgs3 extends any[],
  TType4 extends TypeConstant,
  TPayload4 extends any,
  TMeta4 extends any,
  TArgs4 extends any[]
> {
  // tslint:disable-next-line: callable-types
  <
    TPayloadMeta1 extends
      | TPayload1
      | [TPayload1, TMeta1] = TMeta1 extends undefined
      ? TPayload1
      : [TPayload1, TMeta1],
    TPayloadMeta2 extends
      | TPayload2
      | [TPayload2, TMeta2] = TMeta2 extends undefined
      ? TPayload2
      : [TPayload2, TMeta2],
    TPayloadMeta3 extends
      | TPayload3
      | [TPayload3, TMeta3] = TMeta3 extends undefined
      ? TPayload3
      : [TPayload3, TMeta3],
    TPayloadMeta4 extends
      | TPayload4
      | [TPayload4, TMeta4] = TMeta3 extends undefined
      ? TPayload4
      : [TPayload4, TMeta4]
  >(): {
    request: [TArgs1] extends [never]
      ? ActionCreatorBuilder<
          TType1,
          unknown extends TPayloadMeta1
            ? any
            : [TPayloadMeta1] extends [[infer T, any]]
            ? T
            : TPayloadMeta1,
          unknown extends TPayloadMeta1
            ? undefined
            : [TPayloadMeta1] extends [[any, infer T]]
            ? T
            : undefined
        >
      : (
          ...args: TArgs1
        ) => ActionBuilder<
          TType1,
          [TPayloadMeta1] extends [[infer T, any]] ? T : TPayloadMeta1,
          [TPayloadMeta1] extends [[any, infer T]] ? T : undefined
        >;
    success: [TArgs2] extends [never]
      ? ActionCreatorBuilder<
          TType2,
          unknown extends TPayloadMeta2
            ? any
            : [TPayloadMeta2] extends [[infer T, any]]
            ? T
            : TPayloadMeta2,
          unknown extends TPayloadMeta2
            ? undefined
            : [TPayloadMeta2] extends [[any, infer T]]
            ? T
            : undefined
        >
      : (
          ...args: TArgs2
        ) => ActionBuilder<
          TType2,
          [TPayloadMeta2] extends [[infer T, any]] ? T : TPayloadMeta2,
          [TPayloadMeta2] extends [[any, infer T]] ? T : undefined
        >;
    failure: [TArgs3] extends [never]
      ? ActionCreatorBuilder<
          TType3,
          unknown extends TPayloadMeta3
            ? any
            : [TPayloadMeta3] extends [[infer T, any]]
            ? T
            : TPayloadMeta3,
          unknown extends TPayloadMeta3
            ? undefined
            : [TPayloadMeta3] extends [[any, infer T]]
            ? T
            : undefined
        >
      : (
          ...args: TArgs3
        ) => ActionBuilder<
          TType3,
          [TPayloadMeta3] extends [[infer T, any]] ? T : TPayloadMeta3,
          [TPayloadMeta3] extends [[any, infer T]] ? T : undefined
        >;
    cancel: [TType4] extends [never]
      ? never
      : [TArgs4] extends [never]
      ? ActionCreatorBuilder<
          TType4,
          unknown extends TPayloadMeta4
            ? any
            : [TPayloadMeta4] extends [[infer T, any]]
            ? T
            : TPayloadMeta4,
          unknown extends TPayloadMeta4
            ? undefined
            : [TPayloadMeta4] extends [[any, infer T]]
            ? T
            : undefined
        >
      : (
          ...args: TArgs4
        ) => ActionBuilder<
          TType4,
          [TPayloadMeta4] extends [[infer T, any]] ? T : TPayloadMeta4,
          [TPayloadMeta4] extends [[any, infer T]] ? T : undefined
        >;
  };
}

export function createAsyncAction<
  TType1 extends TypeConstant,
  TType2 extends TypeConstant,
  TType3 extends TypeConstant,
  TType4 extends TypeConstant = never
>(
  requestArg: TType1,
  successArg: TType2,
  failureArg: TType3,
  cancelArg?: TType4
): AsyncActionType<
  TType1,
  unknown,
  unknown,
  never,
  TType2,
  unknown,
  unknown,
  never,
  TType3,
  unknown,
  unknown,
  never,
  TType4,
  unknown,
  unknown,
  never
>;

export function createAsyncAction<
  TType1 extends TypeConstant,
  TType2 extends TypeConstant,
  TType3 extends TypeConstant,
  TType4 extends TypeConstant = never,
  TPayloadCreator1 extends
    | ((...args: TArgs1) => TPayload1)
    | undefined = undefined,
  TPayloadCreator2 extends
    | ((...args: TArgs2) => TPayload2)
    | undefined = undefined,
  TPayloadCreator3 extends
    | ((...args: TArgs3) => TPayload3)
    | undefined = undefined,
  TPayloadCreator4 extends
    | ((...args: TArgs4) => TPayload4)
    | undefined = undefined,
  TMetaCreator1 extends ((...args: TArgs1) => TMeta1) | undefined = undefined,
  TMetaCreator2 extends ((...args: TArgs2) => TMeta2) | undefined = undefined,
  TMetaCreator3 extends ((...args: TArgs3) => TMeta3) | undefined = undefined,
  TMetaCreator4 extends ((...args: TArgs4) => TMeta4) | undefined = undefined,
  TPayload1 extends any = TPayloadCreator1 extends ((...args: any[]) => infer T)
    ? T
    : undefined,
  TMeta1 extends any = TMetaCreator1 extends ((...args: any[]) => infer T)
    ? T
    : undefined,
  TPayload2 extends any = TPayloadCreator2 extends ((...args: any[]) => infer T)
    ? T
    : undefined,
  TMeta2 extends any = TMetaCreator2 extends ((...args: any[]) => infer T)
    ? T
    : undefined,
  TPayload3 extends any = TPayloadCreator3 extends ((...args: any[]) => infer T)
    ? T
    : undefined,
  TMeta3 extends any = TMetaCreator3 extends ((...args: any[]) => infer T)
    ? T
    : undefined,
  TPayload4 extends any = TPayloadCreator4 extends ((...args: any[]) => infer T)
    ? T
    : undefined,
  TMeta4 extends any = TMetaCreator4 extends ((...args: any[]) => infer T)
    ? T
    : undefined,
  TArgs1 extends any[] = TPayloadCreator1 extends ((...args: infer T) => any)
    ? T
    : TMetaCreator1 extends ((...args: infer T) => any)
    ? T
    : never,
  TArgs2 extends any[] = TPayloadCreator2 extends ((...args: infer T) => any)
    ? T
    : TMetaCreator2 extends ((...args: infer T) => any)
    ? T
    : never,
  TArgs3 extends any[] = TPayloadCreator3 extends ((...args: infer T) => any)
    ? T
    : TMetaCreator3 extends ((...args: infer T) => any)
    ? T
    : never,
  TArgs4 extends any[] = TPayloadCreator4 extends ((...args: infer T) => any)
    ? T
    : TMetaCreator4 extends ((...args: infer T) => any)
    ? T
    : never
>(
  requestArg:
    | TType1
    | [TType1, TPayloadCreator1]
    | [TType1, TPayloadCreator1, TMetaCreator1],
  successArg:
    | TType2
    | [TType2, TPayloadCreator2]
    | [TType2, TPayloadCreator2, TMetaCreator2],
  failureArg:
    | TType3
    | [TType3, TPayloadCreator3]
    | [TType3, TPayloadCreator3, TMetaCreator3],
  cancelArg?:
    | TType4
    | [TType4, TPayloadCreator4]
    | [TType4, TPayloadCreator4, TMetaCreator4]
): AsyncActionType<
  TType1,
  TPayload1,
  TMeta1,
  TArgs1,
  TType2,
  TPayload2,
  TMeta2,
  TArgs2,
  TType3,
  TPayload3,
  TMeta3,
  TArgs3,
  TType4,
  TPayload4,
  TMeta4,
  TArgs4
>;

/**
 * @description create an async action-creator object that contains `request`, `success` and `failure` actions as props
 */
export function createAsyncAction<
  TType1 extends TypeConstant,
  TType2 extends TypeConstant,
  TType3 extends TypeConstant,
  TType4 extends TypeConstant = never,
  TPayloadCreator1 extends
    | ((...args: TArgs1) => TPayload1)
    | undefined = undefined,
  TPayloadCreator2 extends
    | ((...args: TArgs2) => TPayload2)
    | undefined = undefined,
  TPayloadCreator3 extends
    | ((...args: TArgs3) => TPayload3)
    | undefined = undefined,
  TPayloadCreator4 extends
    | ((...args: TArgs4) => TPayload4)
    | undefined = undefined,
  TMetaCreator1 extends ((...args: TArgs1) => TMeta1) | undefined = undefined,
  TMetaCreator2 extends ((...args: TArgs2) => TMeta2) | undefined = undefined,
  TMetaCreator3 extends ((...args: TArgs3) => TMeta3) | undefined = undefined,
  TMetaCreator4 extends ((...args: TArgs4) => TMeta4) | undefined = undefined,
  TPayload1 extends any = TPayloadCreator1 extends ((...args: any[]) => infer T)
    ? T
    : undefined,
  TMeta1 extends any = TMetaCreator1 extends ((...args: any[]) => infer T)
    ? T
    : undefined,
  TPayload2 extends any = TPayloadCreator2 extends ((...args: any[]) => infer T)
    ? T
    : undefined,
  TMeta2 extends any = TMetaCreator2 extends ((...args: any[]) => infer T)
    ? T
    : undefined,
  TPayload3 extends any = TPayloadCreator3 extends ((...args: any[]) => infer T)
    ? T
    : undefined,
  TMeta3 extends any = TMetaCreator3 extends ((...args: any[]) => infer T)
    ? T
    : undefined,
  TPayload4 extends any = TPayloadCreator4 extends ((...args: any[]) => infer T)
    ? T
    : undefined,
  TMeta4 extends any = TMetaCreator4 extends ((...args: any[]) => infer T)
    ? T
    : undefined,
  TArgs1 extends any[] = TPayloadCreator1 extends ((...args: infer T) => any)
    ? T
    : TMetaCreator1 extends ((...args: infer T) => any)
    ? T
    : never,
  TArgs2 extends any[] = TPayloadCreator2 extends ((...args: infer T) => any)
    ? T
    : TMetaCreator2 extends ((...args: infer T) => any)
    ? T
    : never,
  TArgs3 extends any[] = TPayloadCreator3 extends ((...args: infer T) => any)
    ? T
    : TMetaCreator3 extends ((...args: infer T) => any)
    ? T
    : never,
  TArgs4 extends any[] = TPayloadCreator4 extends ((...args: infer T) => any)
    ? T
    : TMetaCreator4 extends ((...args: infer T) => any)
    ? T
    : never
>(
  requestArg:
    | TType1
    | [TType1, TPayloadCreator1]
    | [TType1, TPayloadCreator1, TMetaCreator1],
  successArg:
    | TType2
    | [TType2, TPayloadCreator2]
    | [TType2, TPayloadCreator2, TMetaCreator2],
  failureArg:
    | TType3
    | [TType3, TPayloadCreator3]
    | [TType3, TPayloadCreator3, TMetaCreator3],
  cancelArg?:
    | TType4
    | [TType4, TPayloadCreator4]
    | [TType4, TPayloadCreator4, TMetaCreator4]
): AsyncActionType<
  TType1,
  TPayload1,
  TMeta1,
  TArgs1,
  TType2,
  TPayload2,
  TMeta2,
  TArgs2,
  TType3,
  TPayload3,
  TMeta3,
  TArgs3,
  TType4,
  TPayload4,
  TMeta4,
  TArgs4
> {
  const constructor = (<
    TP1 = undefined,
    TM1 = undefined,
    TP2 = undefined,
    TM2 = undefined,
    TP3 = undefined,
    TM3 = undefined,
    TP4 = undefined,
    TM4 = undefined
  >() => {
    const results = [requestArg, successArg, failureArg, cancelArg].map(
      (arg, index) => {
        if (Array.isArray(arg)) {
          return createAction(arg[0], arg[1] as any, arg[2] as any)();
        } else if (typeof arg === 'string' || typeof arg === 'symbol') {
          return createAction(arg as string)();
        } else if (index < 3) {
          throwInvalidAsyncActionArgument(index);
        }
      }
    );

    const [request, success, failure, cancel] = results;

    return {
      request,
      success,
      failure,
      cancel,
    };
  }) as AsyncActionType<
    TType1,
    TPayload1,
    TMeta1,
    TArgs1,
    TType2,
    TPayload2,
    TMeta2,
    TArgs2,
    TType3,
    TPayload3,
    TMeta3,
    TArgs3,
    TType4,
    TPayload4,
    TMeta4,
    TArgs4
  >;

  return constructor;
}

/**
 * PUBLIC API
 */

/**
 * @desc Infers Action union-type from action-creator map object
 */
export type ActionType<
  ActionCreatorOrMap
> = ActionCreatorOrMap extends ActionCreator<string>
  ? ReturnType<ActionCreatorOrMap>
  : ActionCreatorOrMap extends object
  ? {
      [K in keyof ActionCreatorOrMap]: ActionType<ActionCreatorOrMap[K]>
    }[keyof ActionCreatorOrMap]
  : ActionCreatorOrMap extends infer R // should be just never but compiler yell with circularly references itself error
  ? never
  : never;

/**
 * @desc Infers State object from reducer map object
 */
export type StateType<ReducerOrMap> = ReducerOrMap extends (
  ...args: any[]
) => any
  ? ReturnType<ReducerOrMap>
  : ReducerOrMap extends object
  ? { [K in keyof ReducerOrMap]: StateType<ReducerOrMap[K]> }
  : never;

/**
 * INTERNAL API
 */

/**
 * @private
 * @desc Representing action-type of string
 */
export type StringType = string;

/**
 * @private
 * @desc Action without Payload
 * @type T - ActionType
 */
export type EmptyAction<T extends StringType> = {
  type: T;
};

/**
 * @private
 * @desc Action with only Payload
 * @type T - ActionType
 * @type P - Payload
 */
export type PayloadAction<T extends StringType, P> = {
  type: T;
  payload: P;
};

/**
 * @private
 * @desc Action with only Meta
 * @type T - ActionType
 * @type P - Payload
 * @type M - Meta
 */
export type MetaAction<T extends StringType, M> = {
  type: T;
  meta: M;
};

/**
 * @private
 * @desc Action with both Payload and Meta
 * @type T - ActionType
 * @type P - Payload
 * @type M - Meta
 */
export type PayloadMetaAction<T extends StringType, P, M> = {
  type: T;
  payload: P;
  meta: M;
};

/**
 * TODO: NOT USED
 * @private
 * @desc Flux Standard Action
 * @type T - ActionType
 * @type P - Payload
 * @type M - Meta
 */
export interface FluxStandardAction<
  T extends StringType,
  P = undefined,
  M = undefined
> {
  type: T;
  payload: P;
  meta: M;
  error?: true;
}

/** @private */
export interface TypeMeta<T extends StringType> {
  getType?: () => T;
}

/** @private */
export type ActionCreator<T extends StringType> = (
  ...args: any[]
) => { type: T };

/** @private */
export type EmptyAC<T extends StringType> = () => EmptyAction<T>;

/** @private */
export type PayloadAC<T extends StringType, P> = (
  payload: P
) => PayloadAction<T, P>;

/** @private */
export type PayloadMetaAC<T extends StringType, P, M> = (
  payload: P,
  meta: M
) => PayloadMetaAction<T, P, M>;

/** @private */
export type IsEmpty<T> = T extends undefined
  ? never
  : T extends void
  ? never
  : T;
export type ActionBuilderConstructor<
  T extends StringType,
  TPayload extends any = undefined,
  TMeta extends any = undefined
> = [TMeta] extends [undefined]
  ? [IsEmpty<TPayload>] extends [never]
    ? unknown extends TPayload
      ? PayloadAC<T, TPayload>
      : unknown extends TMeta
      ? PayloadMetaAC<T, TPayload, TMeta>
      : EmptyAC<T>
    : PayloadAC<T, TPayload>
  : PayloadMetaAC<T, TPayload, TMeta>;

/** @private */
export type ActionBuilderMap<
  T extends StringType,
  TCustomAction extends any,
  TPayloadArg extends any = undefined,
  TMetaArg extends any = undefined
> = [TMetaArg] extends [undefined]
  ? [TPayloadArg] extends [undefined]
    ? () => { type: T } & TCustomAction
    : (payload: TPayloadArg) => { type: T } & TCustomAction
  : (payload: TPayloadArg, meta: TMetaArg) => { type: T } & TCustomAction;

/**
 * @desc Represent action-type of string
 */
export type StringType = string;

/**
 * @desc Represent action-type of symbol
 */
export type SymbolType = symbol;

/**
 * @desc Action without Payload
 * @type T - ActionType
 */
export type EmptyAction<T extends StringType> = {
  type: T;
};

/**
 * @desc Action with Payload
 * @type T - ActionType
 * @type P - Payload
 */
export type PayloadAction<T extends StringType, P> = {
  type: T;
  payload: P;
};

/**
 * @desc Action with Payload and Meta
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
 * @desc Flux Standard Action
 * @type T - ActionType
 * @type P - Payload
 * @type M - Meta
 */
export interface FluxStandardAction<T extends StringType, P = void, M = void> {
  type: T;
  payload: P;
  meta: M;
  error?: true;
}

/**
 * @desc Create a union type from action-creators map object
 * @type T - ActionType
 * @type P - Payload
 * @type M - Meta
 * @type E - Error
 */
export type ActionsUnion<ACOrACsObject> = ACOrACsObject extends ActionCreator
  ? ReturnType<ACOrACsObject>
  : ACOrACsObject extends object ? ActionCreatorsMap<ACOrACsObject>[keyof ACOrACsObject] : never;

/** @private */
export type B<T> = { v: T };
/** @private */
export type U<T extends B<any>> = T['v'];
/** @private */
export type NoArgCreator<Type extends StringType> = () => EmptyAction<Type>;
/** @private */
export type PayloadCreator<Type extends StringType, Payload> = (
  payload: Payload
) => PayloadAction<Type, Payload>;
/** @private */
export type PayloadMetaCreator<Type extends StringType, Payload, Meta> = (
  payload: Payload,
  meta?: Meta
) => PayloadMetaAction<Type, Payload, Meta>;
/** @private */
export type FsaActionCreator<
  Type extends StringType,
  Payload extends B<any> = B<void>,
  Meta extends B<any> = B<void>
> = Payload extends B<void>
  ? NoArgCreator<Type>
  : Meta extends B<void>
    ? PayloadCreator<Type, U<Payload>>
    : PayloadMetaCreator<Type, U<Payload>, U<Meta>>;
/** @private */
export type MapperActionCreator<
  Type extends StringType,
  Arg extends B<any> = B<void>,
  Payload extends B<any> = B<void>,
  Meta extends B<any> = B<void>
> = Arg extends B<void>
  ? Meta extends B<void>
    ? () => PayloadAction<Type, U<Payload>>
    : () => PayloadMetaAction<Type, U<Payload>, U<Meta>>
  : Meta extends B<void>
    ? (payload: U<Arg>) => PayloadAction<Type, U<Payload>>
    : (payload: U<Arg>) => PayloadMetaAction<Type, U<Payload>, U<Meta>>;
/** @private */
export type ActionCreator = (...args: any[]) => {};
/** @private */
export type ActionCreatorsMap<T> = { [K in keyof T]: ActionsUnion<T[K]> };

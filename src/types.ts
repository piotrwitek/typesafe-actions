/**
 * @private
 * @desc Representing action-type of string
 */
export type StringType = string;

/**
 * @private
 * @desc Representing action-type of symbol
 */
export type SymbolType = symbol;

/**
 * @private
 * @desc Representing generic action-type
 */
export type ActionType = StringType | SymbolType;

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
 * @desc Action with Payload
 * @type T - ActionType
 * @type P - Payload
 */
export type PayloadAction<T extends StringType, P> = {
  type: T;
  payload: P;
};

/**
 * @private
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
 * @private
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
 * @private
 */
export interface TypeMeta<T extends ActionType> {
  getType?: () => T;
}

/** @private */
export type B<T> = { v: T };
/** @private */
export type U<T extends B<any>> = T['v'];
/** @private */
export type NoArgCreator<T extends StringType> = () => EmptyAction<T>;
/** @private */
export type PayloadCreator<T extends StringType, P> = (
  payload: P
) => PayloadAction<T, P>;
/** @private */
export type PayloadMetaCreator<T extends StringType, P, M> = (
  payload: P,
  meta: M
) => PayloadMetaAction<T, P, M>;
/** @private */
export type FsaBuilder<
  T extends StringType,
  P extends B<any> = B<void>,
  M extends B<any> = B<void>
> = P extends B<void>
  ? NoArgCreator<T>
  : M extends B<void>
    ? PayloadCreator<T, U<P>>
    : PayloadMetaCreator<T, U<P>, U<M>>;
/** @private */
export type MapBuilder<
  T extends StringType,
  R extends B<any>,
  P extends B<any> = B<void>,
  M extends B<any> = B<void>
> = M extends B<void>
  ? P extends B<void>
    ? () => MapAction<{ type: T } & U<R>>
    : (payload: U<P>) => MapAction<{ type: T } & U<R>>
  : (payload: U<P>, meta: U<M>) => MapAction<{ type: T } & U<R>>;
/** @private */
export type MapAction<R extends { type: any }> = R;
/** @private */
export type ActionCreator<T extends StringType = StringType> = (
  ...args: any[]
) => { type: T };
/** @private */
export type ActionCreatorMap<T> = { [K in keyof T]: ActionUnion<T[K]> };

/** PUBLIC */

/**
 * @desc Create a union type from action-creator map object
 * @type T - ActionType
 * @type P - Payload
 * @type M - Meta
 * @type E - Error
 */
export type ActionUnion<ACOrACsObject> = ACOrACsObject extends ActionCreator
  ? ReturnType<ACOrACsObject>
  : ACOrACsObject extends object
    ? ActionCreatorMap<ACOrACsObject>[keyof ACOrACsObject]
    : never;

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
 * @desc FluxStandardAction - Flux Standard Action
 * @type T - ActionType
 * @type P - Payload
 * @type M - Meta
 * @type E - Error
 */
export interface FluxStandardAction<T extends StringType, P = undefined, M = undefined> {
  type: T;
  payload: P;
  meta: M;
  error?: true;
}

export type B<T> = { v: T };
export type U<T extends B<any>> = T['v'];

export type EACreator<Type extends StringType> = () => EmptyAction<Type>;

export type PACreator<Type extends StringType, Payload> = (
  payload: Payload
) => PayloadAction<Type, Payload>;

export type EmptyOrPayload<Type extends StringType, Payload extends B<any>> = Payload extends B<
  void
>
  ? EACreator<Type>
  : PACreator<Type, U<Payload>>;

export type FSACreator<
  Type extends StringType,
  Payload extends B<any>,
  Meta extends B<any> = B<void>,
  Arg extends B<any> = B<void>
> = Arg extends B<void>
  ? Meta extends B<void>
    ? () => PayloadAction<Type, U<Payload>>
    : () => PayloadMetaAction<Type, U<Payload>, U<Meta>>
  : Meta extends B<void>
    ? (payload: U<Arg>) => PayloadAction<Type, U<Payload>>
    : (payload: U<Arg>) => PayloadMetaAction<Type, U<Payload>, U<Meta>>;

export type ActionCreator = (...args: any[]) => {};
export type ActionCreatorMap<T> = { [K in keyof T]: ActionsUnion<T[K]> };
export type ActionsUnion<FnOrObj> = FnOrObj extends ActionCreator
  ? ReturnType<FnOrObj>
  : FnOrObj extends object ? ActionCreatorMap<FnOrObj>[keyof FnOrObj] : never;

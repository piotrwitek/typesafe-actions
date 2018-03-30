/**
 * @type StringType - Represent action-type of string
 */
export type StringType = string;

/**
 * @type StringType - Represent action-type of symbol
 */
export type SymbolType = symbol;

/**
 * @type EmptyAction - Empty Action
 * @template T - Action Type
 */
export type EmptyAction<T extends StringType> = {
  type: T;
};

/**
 * @type PayloadAction - Action with Payload
 * @template T - Action Type
 * @template P - Payload Type
 */
export type PayloadAction<T extends StringType, P> = {
  type: T;
  payload: P;
};

/**
 * @type PayloadAction - Action with Payload
 * @template T - Action Type
 * @template P - Payload Type
 */
export type PayloadMetaAction<T extends StringType, P, M> = {
  type: T;
  payload: P;
  meta: M;
};

/**
 * @type FluxStandardAction - Flux Standard Action
 * @template T - Action Type
 * @template P - Payload Type
 * @template M - Meta Type
 */
export interface FluxStandardAction<T extends StringType, P = undefined, M = undefined, E = boolean> {
  type: T;
  payload: P;
  meta: M;
  error: E;
}

export type ActionCreator = (...args: any[]) => {};
export type ActionCreatorMap<T> = {
  [K in keyof T]: ActionsUnion<T[K]>
};
export type ActionsUnion<Obj> = (
  // tslint:disable-next-line:ban-types
  Obj extends ActionCreator ? ReturnType<Obj> :
  Obj extends object ? ActionCreatorMap<Obj>[keyof Obj] :
  Obj
);

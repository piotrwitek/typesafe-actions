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

export type ReturnType<T> = T extends (...args: any[]) => infer R ? R : T;

export type ActionCreator = (...args: any[]) => {};
export type AsyncActionCreator = { [K in 'request' | 'success' | 'failure']: ActionCreator };
export type ActionCreatorMap<P extends string> = { [K in P]: ActionCreator | AsyncActionCreator };

export type ActionsUnion<Obj extends ActionCreatorMap<keyof Obj>> = {
  [K in keyof Obj]: Obj[K] extends AsyncActionCreator ?
  ReturnType<Obj[K]['request' | 'success' | 'failure']> : ReturnType<Obj[K]>
}[keyof Obj];

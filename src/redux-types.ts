/**
 * @type EmptyAction - Empty Action
 * @template T - Action Type
 */
export type EmptyAction<T extends string> = {
  type: T;
};

/**
 * @type PayloadAction - Action with Payload
 * @template T - Action Type
 * @template P - Payload Type
 */
export type PayloadAction<T extends string, P> = {
  type: T;
  payload: P;
};

/**
 * @type PayloadAction - Action with Payload
 * @template T - Action Type
 * @template P - Payload Type
 */
export type PayloadMetaAction<T extends string, P, M> = {
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
export type FluxStandardAction<T extends string, P, M = undefined> = {
  type: T;
  payload: P | Error;
  meta?: M,
  error?: boolean;
};

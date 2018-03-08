/**
 * @type ActionType - Represent action-type type
 * @template T - Action Type
 */
export type ActionType = string;

/**
 * @type EmptyAction - Empty Action
 * @template T - Action Type
 */
export type EmptyAction<T extends ActionType> = {
  type: T;
};

/**
 * @type PayloadAction - Action with Payload
 * @template T - Action Type
 * @template P - Payload Type
 */
export type PayloadAction<T extends ActionType, P> = {
  type: T;
  payload: P;
};

/**
 * @type PayloadAction - Action with Payload
 * @template T - Action Type
 * @template P - Payload Type
 */
export type PayloadMetaAction<T extends ActionType, P, M> = {
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
export type FluxStandardAction<T extends ActionType, P = any, M = any> = {
  type: T;
  payload?: P;
  meta?: M,
  error?: boolean;
};

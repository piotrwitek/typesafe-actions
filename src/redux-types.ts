/**
 * @type StringType - Represent action-type type
 * @template T - Action Type
 */
export type StringType = string;

/**
 * @type EmptyAction - Empty Action
 * @template T - Action Type
 */
export interface EmptyAction<T extends StringType> {
  type: T;
}

/**
 * @type PayloadAction - Action with Payload
 * @template T - Action Type
 * @template P - Payload Type
 */
export interface PayloadAction<T extends StringType, P> {
  type: T;
  payload: P;
}

/**
 * @type PayloadAction - Action with Payload
 * @template T - Action Type
 * @template P - Payload Type
 */
export interface PayloadMetaAction<T extends StringType, P, M> {
  type: T;
  payload: P;
  meta: M;
}

/**
 * @type FluxStandardAction - Flux Standard Action
 * @template T - Action Type
 * @template P - Payload Type
 * @template M - Meta Type
 */
export interface FluxStandardAction<T extends StringType, P = any, M = any> {
  type: T;
  payload?: P;
  meta?: M,
  error?: boolean;
}

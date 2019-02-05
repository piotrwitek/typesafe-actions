import {
  StringType,
  EmptyAction,
  PayloadAction,
  PayloadMetaAction,
  ErrorAction,
  PayloadErrorAction,
  MetaErrorAction,
  PayloadMetaErrorAction
} from './types';

export function action<T extends StringType>(type: T): EmptyAction<T>;

export function action<T extends StringType, P = undefined>(
  type: T,
  payload: P
): PayloadAction<T, P>;

export function action<T extends StringType, P = undefined, M = undefined>(
  type: T,
  payload: P,
  meta: M
): PayloadMetaAction<T, P, M>;

export function action<T extends StringType, E = undefined>(
  type: T,
  error: E,
): ErrorAction<T, E>;

export function action<T extends StringType, P = undefined, E = undefined>(
  type: T,
  payload: P,
  error: E,
): PayloadErrorAction<T, P, E>;

export function action<T extends StringType, M = undefined, E = undefined>(
  type: T,
  meta: M,
  error: E,
): MetaErrorAction<T, M, E>;

export function action<T extends StringType, P = undefined, M = undefined, E = undefined>(
  type: T,
  payload: P,
  meta: M,
  error: E,
): PayloadMetaErrorAction<T, P, M, E>;

/**
 * @description flux standard action factory
 * @example
 * ```
 * const add = (amount: number, meta?: MetaShape, error?: boolean) => action('INCREMENT', amount, meta, false);
 * ```
 */
export function action<T extends StringType, P = undefined, M = undefined, E = undefined>(
  type: T,
  payload?: P,
  meta?: M,
  error?: E
) {
  return { type, payload, meta, error } as any;
}

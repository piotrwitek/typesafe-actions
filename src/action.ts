import { StringType } from './type-helpers';
import {
  checkIsEmpty,
  throwIsEmpty,
  checkInvalidActionType,
  throwInvalidActionCreator,
} from './utils/validation';

export function action<T extends StringType, E>(
  type: T,
  payload: undefined,
  meta: undefined,
  error: E
): { type: T; error: E };

export function action<T extends StringType, M, E>(
  type: T,
  payload: undefined,
  meta: M,
  error: E
): { type: T; meta: M; error: E };

export function action<T extends StringType, P, E>(
  type: T,
  payload: P,
  meta: undefined,
  error: E
): { type: T; payload: P; error: E };

export function action<T extends StringType, P, M, E>(
  type: T,
  payload: P,
  meta: M,
  error: E
): { type: T; payload: P; meta: M; error: E };

export function action<T extends StringType, M>(
  type: T,
  payload: undefined,
  meta: M
): { type: T; meta: M };

export function action<T extends StringType, P, M>(
  type: T,
  payload: P,
  meta: M
): { type: T; payload: P; meta: M };

export function action<T extends StringType, P>(
  type: T,
  payload: P
): { type: T; payload: P };

export function action<T extends StringType>(type: T): { type: T };

/**
 * @description flux standard action factory
 * @example
 * ```
 * const add = (amount: number, meta?: MetaShape) => action('INCREMENT', amount, meta);
 * ```
 */
export function action<
  T extends StringType,
  P = undefined,
  M = undefined,
  E = undefined
>(type: T, payload?: P, meta?: M, error?: E) {
  if (checkIsEmpty(type)) {
    throwIsEmpty(1);
  }

  if (checkInvalidActionType(type)) {
    throwInvalidActionCreator(1);
  }

  return { type, payload, meta, error } as any;
}

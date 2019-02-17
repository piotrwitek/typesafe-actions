import {
  StringType,
  EmptyAction,
  PayloadAction,
  PayloadMetaAction,
  MetaAction,
} from './types';
import {
  checkIsEmpty,
  throwIsEmpty,
  checkInvalidActionType,
  throwInvalidActionCreator,
} from './utils/validation';

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
export function action<T extends StringType, P = undefined, M = undefined>(
  type: T,
  payload?: P,
  meta?: M
) {
  if (checkIsEmpty(type)) {
    throwIsEmpty(1);
  }

  if (checkInvalidActionType(type)) {
    throwInvalidActionCreator(1);
  }

  return { type, payload, meta } as any;
}

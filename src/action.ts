import { StringType } from '.';

/**
 * @description flux standard action factory
 */
// export function action<T extends StringType, P, M>(
//   type: T,
//   payload: P,
//   meta: M
// ): { type: T; payload: P; meta: M };
// export function action<T extends StringType, P>(
//   type: T,
//   payload: P
// ): { type: T; payload: P };
// export function action<T extends StringType>(type: T): { type: T };

/** implementation */
export function action<T extends StringType, P = void, M = void>(
  type: T,
  payload?: P,
  meta?: M
): P extends void
  ? { type: T }
  : M extends void
    ? { type: T; payload: P }
    : { type: T; payload: P; meta: M } {
  return { type, payload, meta } as any;
}

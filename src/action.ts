export function action<T extends string, P, M>(
  type: T,
  payload: P,
  meta: M
): { type: T; payload: P; meta: M };
export function action<T extends string, P>(type: T, payload: P): { type: T; payload: P };
export function action<T extends string>(type: T): { type: T };
export function action<T extends string, P, M>(type: T, payload?: P, meta?: M) {
  return { type, payload, meta };
}

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

// dynamic return type
export interface BuildAsyncAction {
  create<T extends string>(type: T): <P>(payload: P) => { type: T; payload: P };
}

declare const ta: BuildAsyncAction;
const ac = ta.create('asdf');
ac(3);
ac('a');

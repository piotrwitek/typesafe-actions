export type ActionCreator<T extends string, P> =
  | (() => { type: T })
  | ((...args: any[]) => { type: T, payload: P, meta?: {}, error?: boolean });

export type TSActionCreator<AC, T extends string> = AC & {
  readonly type: T,
};

export function createAction<T extends string>(
  typeString: T,
): TSActionCreator<(() => { type: T }), T>;
export function createAction<T extends string, TS extends T, P, AC extends ActionCreator<T, P>>(
  typeString: TS,
  creatorFunction?: (type: T) => AC,
): TSActionCreator<AC, T>;
export function createAction<T extends string, TS extends T, P, AC extends ActionCreator<T, P>>(
  typeString: TS,
  creatorFunction?: (type: T) => AC,
): TSActionCreator<AC, T> {
  if (creatorFunction) {
    if (typeof creatorFunction !== 'function') {
      throw new Error('second argument is not a function');
    }

    const actionCreator: any = creatorFunction(typeString);
    actionCreator.type = typeString;

    return actionCreator;
  } else {
    const actionCreator: any =
      () => ({ type: typeString });
    actionCreator.type = typeString;

    return actionCreator;
  }
}

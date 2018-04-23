import { StringType, ActionCreator, action } from '.';

/**
 * @description typesafe action creator factory
 */
export function typesafeAction<
  T extends StringType,
  AC extends ActionCreator<T>
>(
  type: T,
  constructorFunction: (
    action: <P = void, M = void>(
      payload?: P,
      meta?: M
    ) => P extends void
      ? { type: T }
      : M extends void
        ? { type: T; payload: P }
        : { type: T; payload: P; meta: M }
  ) => AC
): AC {
  const actionCreator: AC = constructorFunction(action.bind(null, type));
  return Object.assign(actionCreator, { getType: () => type });
}

import { StringType, ActionCreator } from './types';
import { action } from './action';

/**
 * @description typesafe action-creator factory
 */
export function createAction<
  T extends StringType,
  AC extends ActionCreator<T> = () => { type: T }
>(
  type: T,
  creatorHandler?: (
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
  const actionCreator: AC =
    creatorHandler == null
      ? ((() => action(type)) as AC)
      : creatorHandler(action.bind(null, type));

  return Object.assign(actionCreator, { getType: () => type });
}

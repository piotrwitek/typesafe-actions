import { StringType, ActionCreator } from './types';
import { validateActionType } from './utils';
import { action } from './action';

/**
 * @description typesafe action-creator factory
 */
export function createAction<
  T extends StringType,
  AC extends ActionCreator<T> = () => { type: T }
>(
  actionType: T,
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
  validateActionType(actionType);

  const actionCreator: AC =
    creatorHandler == null
      ? ((() => action(actionType)) as AC)
      : creatorHandler(action.bind(null, actionType));

  return Object.assign(actionCreator, { getType: () => actionType });
}

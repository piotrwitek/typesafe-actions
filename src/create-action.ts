import { StringType, ActionCreator, PayloadMetaAction } from './types';
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
    action: <P = undefined, M = undefined>(
      payload?: P,
      meta?: M
    ) => PayloadMetaAction<T, P, M>
  ) => AC
): AC {
  validateActionType(actionType);

  const actionCreator: AC =
    creatorHandler == null
      ? ((() => action(actionType)) as AC)
      : creatorHandler(action.bind(null, actionType));

  return Object.assign(actionCreator, {
    getType: () => actionType,
  });
}

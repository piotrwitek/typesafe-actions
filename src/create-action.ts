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
  actionResolverHandler?: (
    resolve: <P = void, M = void>(
      payload?: P,
      meta?: M
    ) => PayloadMetaAction<T, P, M>
  ) => AC
): AC {
  validateActionType(actionType);

  const actionCreator: AC =
    actionResolverHandler == null
      ? ((() => action(actionType)) as AC)
      : actionResolverHandler(action.bind(null, actionType));

  return Object.assign(actionCreator, {
    getType: () => actionType,
    // redux-actions compatibility
    toString: () => actionType,
  });
}

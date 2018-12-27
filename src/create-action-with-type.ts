import { ActionCreator, StringOrSymbol } from './types';

/**
 * @description decorate any action-creator to make it compatible with `typesafe-actions`
 * @description (usefull to make third-party action-creator work with typesafe helpers)
 */
export function createActionWithType<
  T extends StringOrSymbol,
  AC extends ActionCreator<T> = () => { type: T }
>(type: T, actionCreatorHandler?: (type: T) => AC): AC {
  const actionCreator: AC =
    actionCreatorHandler != null
      ? actionCreatorHandler(type)
      : ((() => ({ type })) as AC);

  return Object.assign(actionCreator, {
    getType: () => type,
    // redux-actions compatibility
    toString: () => type,
  });
}

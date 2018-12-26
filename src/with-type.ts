import { ActionCreator, StringType } from './types';

/**
 * @description decorate any action-creator to make it compatible with `typesafe-actions`
 * @description (usefull to make third-party action-creator work with typesafe helpers)
 */
export function withType<T extends StringType, AC extends ActionCreator<T>>(
  type: T,
  constructorFunction?: (type: T) => AC
): AC {
  const actionCreator: AC =
    constructorFunction != null
      ? constructorFunction(type)
      : ((() => ({ type })) as AC);

  return Object.assign(actionCreator, {
    getType: () => type,
    // redux-actions compatibility
    toString: () => type,
  });
}

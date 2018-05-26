import { ActionCreator, StringType } from './types';

/** @internal */
export function validateActionType(arg: any, idx: number = 1): void {
  if (arg == null) {
    throw new Error(`Argument (#${idx}) is missing`);
  } else {
    if (typeof arg !== 'string' && typeof arg !== 'symbol') {
      throw new Error(`Argument (#${idx}) should be of type: string | symbol`);
    }
  }
}

/**
 * @internal
 * @description decorate any action-creator to make it compatible with `typesafe-actions`
 * @description (usefull to make third-party action-creator compatible)
 */
export function withType<T extends StringType, AC extends ActionCreator<T>>(
  type: T,
  constructorFunction?: (type: T) => AC
): AC {
  const actionCreator: AC =
    constructorFunction != null
      ? constructorFunction(type)
      : ((() => ({ type })) as AC);
  return Object.assign(actionCreator, { getType: () => type });
}

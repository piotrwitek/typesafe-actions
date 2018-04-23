import { ActionCreator, ActionType, StringType } from '.';

/**
 * @private
 * @internal
 */
export interface TypeMeta<T extends ActionType> {
  getType?: () => T;
}

/**
 * @private
 * @internal
 * @description decorate any action creator to make it compatible with `typesafe-actions`
 * @description (works with third-party libs)
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

/**
 * @description get the "type literal" of a given action creator
 */
export function getType<T extends StringType>(
  creator: ActionCreator<T> & TypeMeta<T>
): T {
  if (creator == null) {
    throw new Error('first argument is missing');
  }

  if (creator.getType == null) {
    throw new Error('first argument is not an instance of "typesafe-actions"');
  }

  return creator.getType();
}

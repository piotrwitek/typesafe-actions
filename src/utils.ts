import { ActionCreator, StringType } from './types';

export function validateActionType(actionType: any): void {
  if (actionType == null) {
    throw new Error('action type argument is missing');
  } else {
    if (typeof actionType !== 'string' && typeof actionType !== 'symbol') {
      throw new Error(
        'action type argument should be type of: string | symbol'
      );
    }
  }
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

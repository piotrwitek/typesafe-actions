export interface TypeGetter<T> { getType?: () => T }

/**
 * @description get the "type literal" of a given action creator
 */
export function getType<T extends string>(
  actionCreator: ((...args: any[]) => { type: T }) & TypeGetter<T>,
): T {
  if (actionCreator == null) {
    throw new Error('first argument is missing');
  }

  if (actionCreator.getType == null) {
    throw new Error('first argument is not an instance of "typesafe-actions"');
  }

  return actionCreator.getType();
}

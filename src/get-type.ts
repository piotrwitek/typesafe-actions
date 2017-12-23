export interface TypeGetter<T> { getType?: () => T }

export function getType<T extends string>(
  actionCreator: ((...args: any[]) => { type: T }) & TypeGetter<T>,
): T {
  if (actionCreator == null || actionCreator.getType == null) {
    throw new Error('first argument is not a "ts-action-creator" instance');
  }

  return actionCreator.getType();
}

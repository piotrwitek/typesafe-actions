export interface TypeGetter<T> { getType?: () => T }

export function getType<T extends string>(
  f: ((...args: any[]) => { type: T }) & TypeGetter<T>,
): T {
  if (f == null || f.getType == null) {
    throw new Error('first argument is not a "ts-action-creator" instance');
  }

  return f.getType();
}

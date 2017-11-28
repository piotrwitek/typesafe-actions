export interface TypeGetter<T> { getType?: () => T }

export function getType<T extends string>(
  f: ((...args: any[]) => { type: T }) & TypeGetter<T>,
): T {
  return f.getType!();
}

/** @internal */
export function testType<T>(a?: T): T {
  return a as any;
}

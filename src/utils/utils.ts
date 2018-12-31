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

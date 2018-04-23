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

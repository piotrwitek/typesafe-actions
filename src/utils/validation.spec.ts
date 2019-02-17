import { validateIsActionType, checkIsEmpty } from './validation';

/** HELPERS */

const expectToThrowError = (cb: () => void, expectedMessage: string) => {
  try {
    cb();
    expect(false).toBeTruthy();
  } catch ({ message }) {
    expect(message).toEqual(expectedMessage);
  }
};

const expectNotToThrowError = (cb: () => void) => {
  try {
    cb();
  } catch (err) {
    expect(false).toBeTruthy();
  }
};

/** TESTS */

describe('checkIsEmpty', () => {
  it('assert true when input is empty', () => {
    expect(checkIsEmpty(null)).toBeTruthy();
    expect(checkIsEmpty(undefined)).toBeTruthy();
  });
});

describe('validateIsActionType', () => {
  const INVALID_TYPE =
    'Argument 1 is invalid, it should be of type: string | symbol';

  it('throws an error when number is given as an action type', () =>
    expectToThrowError(() => validateIsActionType(4 as any), INVALID_TYPE));

  it('throws an error when object is given as an action type', () =>
    expectToThrowError(() => validateIsActionType({} as any), INVALID_TYPE));

  it('throws no error when symbol is given', () =>
    expectNotToThrowError(() => validateIsActionType('FOO' as 'FOO')));

  it('throws no error when string is given', () =>
    expectNotToThrowError(() => validateIsActionType('FOO' as string)));
});

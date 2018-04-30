import { validateActionType } from './utils';
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

describe('utils.validateActionType()', () => {
  it('throws an error when no action is given', () =>
    expectToThrowError(
      () => validateActionType(null),
      'action type argument is missing'
    ));

  const INVALID_TYPE =
    'action type argument should be type of: string | symbol';

  it('throws an error when number is given as an action type', () =>
    expectToThrowError(() => validateActionType(4), INVALID_TYPE));

  it('throws an error when object is given as an action type', () =>
    expectToThrowError(() => validateActionType({}), INVALID_TYPE));

  it('throws no error when symbol is given', () =>
    expectNotToThrowError(() => validateActionType('FOO' as 'FOO')));

  it('throws no error when string is given', () =>
    expectNotToThrowError(() => validateActionType('FOO' as string)));
});

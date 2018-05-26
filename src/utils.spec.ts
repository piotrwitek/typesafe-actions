import { getType } from './get-type';
import { validateActionType, withType } from './utils';

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

describe('utils.validateActionType', () => {
  it('throws an error when no action is given', () =>
    expectToThrowError(
      () => validateActionType(null),
      'Argument (#1) is missing'
    ));

  const INVALID_TYPE = 'Argument (#1) should be of type: string | symbol';

  it('throws an error when number is given as an action type', () =>
    expectToThrowError(() => validateActionType(4), INVALID_TYPE));

  it('throws an error when object is given as an action type', () =>
    expectToThrowError(() => validateActionType({}), INVALID_TYPE));

  it('throws no error when symbol is given', () =>
    expectNotToThrowError(() => validateActionType('FOO' as 'FOO')));

  it('throws no error when string is given', () =>
    expectNotToThrowError(() => validateActionType('FOO' as string)));
});

describe('utils.withType', () => {
  it('with type only', () => {
    const increment = withType('WITH_TYPE_ONLY', type => {
      return () => ({ type });
    });
    const typeLiteral: 'WITH_TYPE_ONLY' = getType(increment);
    expect(typeLiteral).toBe('WITH_TYPE_ONLY');
  });

  it('with type only using symbol nominal-type pattern', () => {
    enum Increment {}
    const INCREMENT = (Symbol(1) as any) as Increment & string;
    const increment = withType(INCREMENT, type => () => ({ type }));
    const typeLiteral: Increment = getType(increment);
    expect(typeLiteral).toBe(INCREMENT);
    expect(typeLiteral).not.toBe('WITH_TYPE_ONLY');
  });

  it('with payload', () => {
    const add = withType('WITH_MAPPED_PAYLOAD', type => {
      return (amount: number) => ({ type, payload: amount });
    });

    const typeLiteral: 'WITH_MAPPED_PAYLOAD' = getType(add);
    expect(typeLiteral).toBe('WITH_MAPPED_PAYLOAD');
  });

  it('with payload and meta', () => {
    const showNotification = withType(
      'SHOW_NOTIFICATION',
      type => (message: string, scope: string) => ({
        type,
        payload: message,
        meta: scope,
      })
    );
    const typeLiteral: 'SHOW_NOTIFICATION' = getType(showNotification);
    expect(typeLiteral).toBe('SHOW_NOTIFICATION');
  });
});

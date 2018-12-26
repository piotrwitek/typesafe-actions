import { getType } from './get-type';
import { withType } from './with-type';

describe('withType', () => {
  it('with type only', () => {
    const increment = withType('WITH_TYPE_ONLY', type => {
      return () => ({ type });
    });
    const typeLiteral: 'WITH_TYPE_ONLY' = getType(increment);
    expect(typeLiteral).toBe('WITH_TYPE_ONLY');
  });

  it('with type only using symbol nominal-type pattern', () => {
    const INCREMENT = (Symbol(1) as any) as 'INCREMENT';
    const increment = withType(INCREMENT, type => () => ({ type }));
    const typeLiteral: 'INCREMENT' = getType(increment);
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

import { createAction, getType } from './';

describe('createAction', () => {
  it('only type', () => {
    const increment = createAction('WITH_TYPE_ONLY', action => {
      return () => action();
    });
    const typeLiteral: 'WITH_TYPE_ONLY' = getType(increment);
    expect(typeLiteral).toBe('WITH_TYPE_ONLY');
  });

  it('only type as symbol', () => {
    enum Increment {}
    const INCREMENT = (Symbol(1) as any) as Increment & string;
    const a: string = INCREMENT; // Ok
    // const b: typeof INCREMENT = 'INCREMENT'; // Error
    const increment = createAction(INCREMENT, action => {
      return () => action();
    });
    const typeLiteral: typeof INCREMENT = getType(increment);
    expect(typeLiteral).toBe(INCREMENT);
    expect(typeLiteral).not.toBe('WITH_TYPE_ONLY');
  });

  it('with payload', () => {
    const add = createAction('WITH_PAYLOAD', action => {
      return (amount: number) => action(amount);
    });

    const typeLiteral: 'WITH_PAYLOAD' = getType(add);
    expect(typeLiteral).toBe('WITH_PAYLOAD');
  });

  it('with payload and meta', () => {
    const showNotification = createAction(
      'SHOW_NOTIFICATION',
      action => (message: string, scope: string) => action(message, scope)
    );
    const typeLiteral: 'SHOW_NOTIFICATION' = getType(showNotification);
    expect(typeLiteral).toBe('SHOW_NOTIFICATION');
  });
});

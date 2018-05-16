import { createAction, getType } from './';

describe('createAction', () => {
  it('with type only', () => {
    const increment = createAction('WITH_TYPE_ONLY');
    const typeLiteral: 'WITH_TYPE_ONLY' = getType(increment);
    expect(typeLiteral).toBe('WITH_TYPE_ONLY');
  });

  it('with type only using symbol nominal-type pattern', () => {
    enum Increment {}
    const INCREMENT = (Symbol(1) as any) as Increment & string;
    const increment = createAction(INCREMENT, resolve => {
      return () => resolve();
    });
    const typeLiteral: typeof INCREMENT = getType(increment);
    expect(typeLiteral).toBe(INCREMENT);
    expect(typeLiteral).not.toBe('WITH_TYPE_ONLY');
  });

  it('with payload', () => {
    const add = createAction('WITH_PAYLOAD', resolve => {
      return (amount: number) => resolve(amount);
    });
    const typeLiteral: 'WITH_PAYLOAD' = getType(add);
    expect(typeLiteral).toBe('WITH_PAYLOAD');
  });

  it('with payload and meta', () => {
    const getTodo = createAction('GET_TODO', resolve => {
      return (id: string, token: string) => resolve(id, token);
    });
    const typeLiteral: 'GET_TODO' = getType(getTodo);
    expect(typeLiteral).toBe('GET_TODO');
  });
});

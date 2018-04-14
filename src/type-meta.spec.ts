import { buildAction, getType } from '.';

describe('getType', () => {
  it('no payload', () => {
    const increment = buildAction('INCREMENT')();
    const type: 'INCREMENT' = getType(increment);
    expect(type).toBe('INCREMENT');
  });

  it('no payload alternative', () => {
    const increment = buildAction('INCREMENT')<void>();
    const type: 'INCREMENT' = getType(increment);
    expect(type).toBe('INCREMENT');
  });

  it('with payload', () => {
    const add = buildAction('ADD')<number>();
    const type: 'ADD' = getType(add);
    expect(type).toBe('ADD');
  });

  it('with map', () => {
    const showNotification = buildAction('SHOW_NOTIFICATION').map(() => ({
      payload: 'hardcoded message',
    }));
    const type: 'SHOW_NOTIFICATION' = getType(showNotification);
    expect(type).toBe('SHOW_NOTIFICATION');
  });

  it('with symbol as action type', () => {
    enum Increment {}
    const INCREMENT = (Symbol(1) as any) as Increment & string;
    const a: string = INCREMENT; // Ok
    // const b: typeof INCREMENT = 'INCREMENT'; // Error
    const increment = buildAction(INCREMENT)();
    const type: typeof INCREMENT = getType(increment);
    expect(type).toBe(INCREMENT);
    expect(type).not.toBe('INCREMENT');
  });

  // TODO: #3
  // should error when missing argument
  // should error when passed invalid arguments
  // check object, empty array, primitives
});

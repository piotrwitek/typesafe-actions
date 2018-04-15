import { buildAction, getType, withType, action } from '.';

describe('utils', () => {
  describe('getType', () => {
    it('only type', () => {
      const increment = buildAction('INCREMENT')();
      const typeLiteral: 'INCREMENT' = getType(increment);
      expect(typeLiteral).toBe('INCREMENT');
    });

    it('only type alternative', () => {
      const increment = buildAction('INCREMENT')<void>();
      const typeLiteral: 'INCREMENT' = getType(increment);
      expect(typeLiteral).toBe('INCREMENT');
    });

    it('only type as symbol', () => {
      enum Increment {}
      const INCREMENT = (Symbol(1) as any) as Increment & string;
      const a: string = INCREMENT; // Ok
      // const b: typeof INCREMENT = 'INCREMENT'; // Error
      const increment = buildAction(INCREMENT)();
      const typeLiteral: typeof INCREMENT = getType(increment);
      expect(typeLiteral).toBe(INCREMENT);
      expect(typeLiteral).not.toBe('INCREMENT');
    });

    it('with payload', () => {
      const add = buildAction('ADD')<number>();
      const typeLiteral: 'ADD' = getType(add);
      expect(typeLiteral).toBe('ADD');
    });

    it('with payload map', () => {
      const showNotification = buildAction('SHOW_NOTIFICATION').map(() => ({
        payload: 'hardcoded message',
      }));
      const typeLiteral: 'SHOW_NOTIFICATION' = getType(showNotification);
      expect(typeLiteral).toBe('SHOW_NOTIFICATION');
    });
  });

  describe('withType', () => {
    it('only type', () => {
      const increment = withType('INCREMENT', type => () => action(type));
      const typeLiteral: 'INCREMENT' = getType(increment);
      expect(typeLiteral).toBe('INCREMENT');
    });

    it('only type as symbol', () => {
      enum Increment {}
      const INCREMENT = (Symbol(1) as any) as Increment & string;
      const a: string = INCREMENT; // Ok
      // const b: typeof INCREMENT = 'INCREMENT'; // Error
      const increment = withType(INCREMENT, type => () => action(type));
      const typeLiteral: typeof INCREMENT = getType(increment);
      expect(typeLiteral).toBe(INCREMENT);
      expect(typeLiteral).not.toBe('INCREMENT');
    });

    it('with payload', () => {
      const add = withType('ADD', type => (amount: number) =>
        action(type, amount)
      );
      const typeLiteral: 'ADD' = getType(add);
      expect(typeLiteral).toBe('ADD');
    });

    it('with payload and meta', () => {
      const showNotification = withType(
        'SHOW_NOTIFICATION',
        type => (message: string, scope: string) => action(type, message, scope)
      );
      const typeLiteral: 'SHOW_NOTIFICATION' = getType(showNotification);
      expect(typeLiteral).toBe('SHOW_NOTIFICATION');
    });

    // const newCreateAction = withType(
    //   'GET_TODO',
    //   type => (token: string, id: string) => ({
    //     type,
    //     payload: id,
    //     meta: token,
    //   })
    // );

    // const newCreateActionPlus = withType(
    //   'GET_TODO',
    //   type => (token: string, id: string) => action(type, id, token)
    // );
  });
  // TODO: #3
  // should error when missing argument
  // should error when passed invalid arguments
  // check object, empty array, primitives
});

import { buildAction, getType, withType, action } from '.';

describe('type-meta', () => {
  describe('getType', () => {
    it('with type only', () => {
      const increment = buildAction('WITH_TYPE_ONLY')();
      const typeLiteral: 'WITH_TYPE_ONLY' = getType(increment);
      expect(typeLiteral).toBe('WITH_TYPE_ONLY');
    });

    it('with type only', () => {
      const increment = buildAction('WITH_TYPE_ONLY')<void>();
      const typeLiteral: 'WITH_TYPE_ONLY' = getType(increment);
      expect(typeLiteral).toBe('WITH_TYPE_ONLY');
    });

    it('with type as symbol', () => {
      enum Increment {}
      const INCREMENT = (Symbol(1) as any) as Increment & string;
      const a: string = INCREMENT; // Ok
      // const b: typeof INCREMENT = 'INCREMENT'; // Error
      const increment = buildAction(INCREMENT)();
      const typeLiteral: typeof INCREMENT = getType(increment);
      expect(typeLiteral).toBe(INCREMENT);
      expect(typeLiteral).not.toBe('WITH_TYPE_ONLY');
    });

    it('with payload', () => {
      const add = buildAction('WITH_MAPPED_PAYLOAD')<number>();
      const typeLiteral: 'WITH_MAPPED_PAYLOAD' = getType(add);
      expect(typeLiteral).toBe('WITH_MAPPED_PAYLOAD');
    });

    it('with mapped payload', () => {
      const showNotification = buildAction('SHOW_NOTIFICATION').map(() => ({
        payload: 'hardcoded message',
      }));
      const typeLiteral: 'SHOW_NOTIFICATION' = getType(showNotification);
      expect(typeLiteral).toBe('SHOW_NOTIFICATION');
    });
  });

  describe('withType', () => {
    it('only type', () => {
      const increment = withType('WITH_TYPE_ONLY', type => () => action(type));
      const typeLiteral: 'WITH_TYPE_ONLY' = getType(increment);
      expect(typeLiteral).toBe('WITH_TYPE_ONLY');
    });

    it('only type as symbol', () => {
      enum Increment {}
      const INCREMENT = (Symbol(1) as any) as Increment & string;
      const a: string = INCREMENT; // Ok
      // const b: typeof INCREMENT = 'INCREMENT'; // Error
      const increment = withType(INCREMENT, type => () => action(type));
      const typeLiteral: typeof INCREMENT = getType(increment);
      expect(typeLiteral).toBe(INCREMENT);
      expect(typeLiteral).not.toBe('WITH_TYPE_ONLY');
    });

    it('with payload', () => {
      const add = withType('WITH_MAPPED_PAYLOAD', type => (amount: number) =>
        action(type, amount)
      );
      const typeLiteral: 'WITH_MAPPED_PAYLOAD' = getType(add);
      expect(typeLiteral).toBe('WITH_MAPPED_PAYLOAD');
    });

    it('with payload and meta', () => {
      const showNotification = withType(
        'SHOW_NOTIFICATION',
        type => (message: string, scope: string) => action(type, message, scope)
      );
      const typeLiteral: 'SHOW_NOTIFICATION' = getType(showNotification);
      expect(typeLiteral).toBe('SHOW_NOTIFICATION');
    });

    // docs example
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
    //   type => (id: string, token?: string) => action(type, id, { token })
    // );
  });
});

import { buildAction, getType, withType } from '.';

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
      const increment = withType('WITH_TYPE_ONLY', type => {
        return () => ({ type });
      });
      const typeLiteral: 'WITH_TYPE_ONLY' = getType(increment);
      expect(typeLiteral).toBe('WITH_TYPE_ONLY');
    });

    it('only type as symbol', () => {
      enum Increment {}
      const INCREMENT = (Symbol(1) as any) as Increment & string;
      const a: string = INCREMENT; // Ok
      // const b: typeof INCREMENT = 'INCREMENT'; // Error
      const increment = withType(INCREMENT, type => () => ({ type }));
      const typeLiteral: typeof INCREMENT = getType(increment);
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
});

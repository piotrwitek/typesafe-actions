import { createAction, getType } from '.';

describe('Redux Utils', () => {
  describe('createAction', () => {

    it('no payload', () => {
      const increment = createAction('INCREMENT');

      const action: { type: 'INCREMENT' } = increment();
      expect(action).toEqual({ type: 'INCREMENT' });
      const type: 'INCREMENT' = increment.getType!();
      const type2: 'INCREMENT' = getType(increment);
      expect(type).toBe('INCREMENT');
      expect(type2).toBe('INCREMENT');
    });

    it('no payload alternative', () => {
      const increment = createAction('INCREMENT', () => ({ type: 'INCREMENT' }));

      const action: { type: 'INCREMENT' } = increment();
      expect(action).toEqual({ type: 'INCREMENT' });
      const type: 'INCREMENT' = increment.getType!();
      const type2: 'INCREMENT' = getType(increment);
      expect(type).toBe('INCREMENT');
      expect(type2).toBe('INCREMENT');
    });

    it('with payload', () => {
      const add = createAction('ADD',
        (amount: number) => ({ type: 'ADD', payload: amount }),
      );

      const action: { type: 'ADD', payload: number } = add(10);
      expect(action).toEqual({ type: 'ADD', payload: 10 });
      const type: 'ADD' = add.getType!();
      const type2: 'ADD' = getType(add);
      expect(type).toBe('ADD');
      expect(type2).toBe('ADD');
    });

    it('with payload and meta', () => {
      const notify = createAction('NOTIFY',
        (username: string, message: string) => ({
          type: 'NOTIFY',
          payload: { message: `${username}: ${message}` },
          meta: { username, message },
        }),
      );

      const action: {
        type: 'NOTIFY',
        payload: { message: string },
        meta: { username: string, message: string },
      } = notify('Piotr', 'Hello!');
      expect(action).toEqual({
        type: 'NOTIFY',
        payload: { message: 'Piotr: Hello!' },
        meta: { username: 'Piotr', message: 'Hello!' },
      });
      const type: 'NOTIFY' = notify.getType!();
      const type2: 'NOTIFY' = getType(notify);
      expect(type).toBe('NOTIFY');
      expect(type2).toBe('NOTIFY');
    });

    it('with payload and no params', () => {
      const showNotification = createAction('SHOW_NOTIFICATION',
        () => ({
          type: 'SHOW_NOTIFICATION',
          payload: 'default message',
        }),
      );

      const action: { type: 'SHOW_NOTIFICATION', payload: string } = showNotification();
      expect(action).toEqual({
        type: 'SHOW_NOTIFICATION',
        payload: 'default message',
      });
      const type: 'SHOW_NOTIFICATION' = showNotification.getType!();
      const type2: 'SHOW_NOTIFICATION' = getType(showNotification);
      expect(type).toBe('SHOW_NOTIFICATION');
      expect(type2).toBe('SHOW_NOTIFICATION');
    });

    it('with payload and optional param', () => {
      const showNotification = createAction('SHOW_NOTIFICATION',
        (message?: string) => ({
          type: 'SHOW_NOTIFICATION',
          payload: message,
        }),
      );

      const action: { type: 'SHOW_NOTIFICATION', payload: string | undefined } = showNotification();
      expect(action).toEqual({
        type: 'SHOW_NOTIFICATION',
        payload: undefined,
      });
      const type: 'SHOW_NOTIFICATION' = showNotification.getType!();
      const type2: 'SHOW_NOTIFICATION' = getType(showNotification);
      expect(type).toBe('SHOW_NOTIFICATION');
      expect(type2).toBe('SHOW_NOTIFICATION');
    });

    it('with meta and no params', () => {
      const showError = createAction('SHOW_ERROR',
        () => ({
          type: 'SHOW_ERROR',
          meta: { type: 'error' },
        }),
      );

      const action: { type: 'SHOW_ERROR', meta: { type: string } } = showError();
      expect(action).toEqual({
        type: 'SHOW_ERROR',
        meta: { type: 'error' },
      });
      const type: 'SHOW_ERROR' = showError.getType!();
      const type2: 'SHOW_ERROR' = getType(showError);
      expect(type).toBe('SHOW_ERROR');
      expect(type2).toBe('SHOW_ERROR');
    });

    it('with meta and optional param', () => {
      const showError = createAction('SHOW_ERROR',
        (message?: string) => ({
          type: 'SHOW_ERROR',
          payload: message,
          meta: { type: 'error' },
        }),
      );

      const action: { type: 'SHOW_ERROR', payload: string | undefined, meta: { type: string } } = showError();
      expect(action).toEqual({
        type: 'SHOW_ERROR',
        payload: undefined,
        meta: { type: 'error' },
      });
      const type: 'SHOW_ERROR' = showError.getType!();
      const type2: 'SHOW_ERROR' = getType(showError);
      expect(type).toBe('SHOW_ERROR');
      expect(type2).toBe('SHOW_ERROR');
    });

  });

});

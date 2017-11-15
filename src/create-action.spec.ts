import { createAction } from '.';

describe('Redux Utils', () => {
  describe('createAction', () => {

    it('no payload', () => {
      const increment = createAction('INCREMENT');

      expect(increment()).toEqual({ type: 'INCREMENT' });
      expect(increment.type).toBe('INCREMENT');
    });

    it('with payload', () => {
      const add = createAction('ADD', (type: 'ADD') => (amount: number) =>
        ({ type, payload: amount }),
      );

      expect(add(10)).toEqual({ type: 'ADD', payload: 10 });
      expect(add.type).toBe('ADD');
    });

    it('with payload and meta', () => {
      const notify = createAction('NOTIFY', (type: 'NOTIFY') =>
        (username: string, message: string) => ({
          type,
          payload: { message: `${username}: ${message}` },
          meta: { username, message },
        }),
      );

      expect(notify('Piotr', 'Hello!')).toEqual({
        type: 'NOTIFY',
        payload: { message: 'Piotr: Hello!' },
        meta: { username: 'Piotr', message: 'Hello!' },
      });
      expect(notify.type).toBe('NOTIFY');
    });

    it('with payload and no params', () => {
      const showNotification = createAction('SHOW_NOTIFICATION', (type: 'SHOW_NOTIFICATION') =>
        () => ({ type, payload: 'default message' }),
      );
      const result = showNotification();

      expect(result).toEqual({
        type: 'SHOW_NOTIFICATION',
        payload: 'default message',
      });
      expect(showNotification.type).toBe('SHOW_NOTIFICATION');
    });

    it('with payload and optional param', () => {
      const showNotification = createAction('SHOW_NOTIFICATION', (type: 'SHOW_NOTIFICATION') =>
        (message?: string) => ({ type, payload: message }),
      );

      expect(showNotification()).toEqual({
        type: 'SHOW_NOTIFICATION',
        payload: undefined,
      });
      expect(showNotification.type).toBe('SHOW_NOTIFICATION');
    });

    it('with meta and no params', () => {
      const showError = createAction('SHOW_ERROR', (type: 'SHOW_ERROR') =>
        () => ({ type, meta: { type: 'error' } }),
      );

      expect(showError()).toEqual({
        type: 'SHOW_ERROR',
        meta: { type: 'error' },
      });
      expect(showError.type).toBe('SHOW_ERROR');
    });

    it('with meta and optional param', () => {
      const showError = createAction('SHOW_ERROR', (type: 'SHOW_ERROR') =>
        (message?: string) => ({ type, payload: message, meta: { type: 'error' } }),
      );

      expect(showError()).toEqual({
        type: 'SHOW_ERROR',
        payload: undefined,
        meta: { type: 'error' },
      });
      expect(showError.type).toBe('SHOW_ERROR');
    });

  });

});

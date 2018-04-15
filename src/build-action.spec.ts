import { buildAction, getType, ActionsUnion } from '.';

describe('buildAction', () => {
  describe('constructor', () => {
    it('with type only', () => {
      const increment = buildAction('INCREMENT')();
      const action: { type: 'INCREMENT' } = increment();
      expect(action).toEqual({ type: 'INCREMENT' });
    });

    it('with type only - alternative', () => {
      const increment = buildAction('INCREMENT')<void>();
      const action: { type: 'INCREMENT' } = increment();
      expect(action).toEqual({ type: 'INCREMENT' });
    });

    it('with type as symbol', () => {
      enum Increment {}
      const INCREMENT = (Symbol(1) as any) as Increment & string;
      const a: string = INCREMENT; // Ok
      // const b: typeof INCREMENT = 'INCREMENT'; // Error
      const increment = buildAction(INCREMENT)();
      const action: { type: typeof INCREMENT } = increment();
      expect(action).toEqual({ type: INCREMENT });
      expect(action).not.toEqual({ type: 'INCREMENT' });
    });

    it('with number payload', () => {
      const add = buildAction('ADD')<number>();
      const action: { type: 'ADD'; payload: number } = add(10);
      expect(action).toEqual({ type: 'ADD', payload: 10 });
    });

    it('with boolean payload', () => {
      const set = buildAction('SET')<boolean>();
      const action: { type: 'SET'; payload: boolean } = set(true);
      expect(action).toEqual({ type: 'SET', payload: true });
    });

    it('with literals union payload', () => {
      type NetStatus = 'up' | 'down' | 'unknown';
      const set = buildAction('SET')<NetStatus>();
      const action: { type: 'SET'; payload: NetStatus } = set('up');
      expect(action).toEqual({ type: 'SET', payload: 'up' });
    });

    it('with primitives union payload', () => {
      const union = buildAction('UNION')<string | null | number>();
      const action: { type: 'UNION'; payload: string | null | number } = union(
        'foo'
      );
      expect(action).toEqual({ type: 'UNION', payload: 'foo' });
      const action2: { type: 'UNION'; payload: string | null | number } = union(
        null
      );
      expect(action2).toEqual({ type: 'UNION', payload: null });
      const action3: { type: 'UNION'; payload: string | null | number } = union(
        3
      );
      expect(action3).toEqual({ type: 'UNION', payload: 3 });
    });
  });

  describe('map', () => {
    it('with payload and no params', () => {
      const showNotification = buildAction('SHOW_NOTIFICATION').map(() => ({
        payload: 'hardcoded message',
      }));
      const action: {
        type: 'SHOW_NOTIFICATION';
        payload: string;
      } = showNotification();
      expect(action).toEqual({
        type: 'SHOW_NOTIFICATION',
        payload: 'hardcoded message',
      });
    });

    it('with payload and param', () => {
      const showNotification = buildAction('SHOW_NOTIFICATION').map(
        (payload: string) => ({
          payload,
        })
      );
      const action: {
        type: 'SHOW_NOTIFICATION';
        payload: string;
      } = showNotification('info message');
      expect(action).toEqual({
        type: 'SHOW_NOTIFICATION',
        payload: 'info message',
      });
    });

    it('with payload and union param', () => {
      const showNotification = buildAction('SHOW_NOTIFICATION').map(
        (payload: string | null | number) => ({
          payload,
        })
      );
      const action: {
        type: 'SHOW_NOTIFICATION';
        payload: string | null | number;
      } = showNotification('info message');
      expect(action).toEqual({
        type: 'SHOW_NOTIFICATION',
        payload: 'info message',
      });
      const action2: {
        type: 'SHOW_NOTIFICATION';
        payload: string | null | number;
      } = showNotification(null);
      expect(action2).toEqual({
        type: 'SHOW_NOTIFICATION',
        payload: null,
      });
      const action3: {
        type: 'SHOW_NOTIFICATION';
        payload: string | null | number;
      } = showNotification(3);
      expect(action3).toEqual({
        type: 'SHOW_NOTIFICATION',
        payload: 3,
      });
    });

    it('with payload and meta', () => {
      type Notification = { username: string; message?: string };
      const notify = buildAction('NOTIFY').map(
        ({ username, message }: Notification) => ({
          payload: `${username}: ${message || ''}`,
          meta: { username, message },
        })
      );
      const action: {
        type: 'NOTIFY';
        payload: string;
        meta: Notification;
      } = notify({ username: 'Piotr', message: 'Hello!' });
      expect(action).toEqual({
        type: 'NOTIFY',
        payload: 'Piotr: Hello!',
        meta: { username: 'Piotr', message: 'Hello!' },
      });
    });

    it('with payload and meta and no params', () => {
      const showError = buildAction('SHOW_ERROR').map(() => ({
        payload: 'hardcoded error',
        meta: { severity: 'error' },
      }));
      const action: {
        type: 'SHOW_ERROR';
        payload: string;
        meta: { severity: string };
      } = showError();
      expect(action).toEqual({
        type: 'SHOW_ERROR',
        payload: 'hardcoded error',
        meta: { severity: 'error' },
      });
    });

    it('with payload and meta and param', () => {
      const showError = buildAction('SHOW_ERROR').map((message: string) => ({
        payload: message,
        meta: { severity: 'error' },
      }));
      const action: {
        type: 'SHOW_ERROR';
        payload: string;
        meta: { severity: string };
      } = showError('error message');
      expect(action).toEqual({
        type: 'SHOW_ERROR',
        payload: 'error message',
        meta: { severity: 'error' },
      });
    });
  });

  // TODO: #3
  // should error when missing argument
  // should error when passed invalid arguments
  // check object, empty array, primitives
});

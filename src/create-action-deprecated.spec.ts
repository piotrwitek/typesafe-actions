import { createActionDeprecated } from './create-action-deprecated';
import { testType } from './test-utils';

describe('createActionDeprecated', () => {
  it('no payload', () => {
    const increment = createActionDeprecated('INCREMENT');

    const action: { type: 'INCREMENT' } = increment();
    expect(action).toEqual({ type: 'INCREMENT' });
  });

  it('no payload alternative', () => {
    const increment = createActionDeprecated('INCREMENT', () => ({
      type: 'INCREMENT',
    }));

    const action: { type: 'INCREMENT' } = increment();
    expect(action).toEqual({ type: 'INCREMENT' });
  });

  it('with payload', () => {
    const add = createActionDeprecated('ADD', (amount: number) => ({
      type: 'ADD',
      payload: amount,
    }));

    const action: { type: 'ADD'; payload: number } = add(10);
    expect(action).toEqual({ type: 'ADD', payload: 10 });
  });

  it('with payload and meta', () => {
    const notify = createActionDeprecated(
      'NOTIFY',
      (username: string, message: string) => ({
        type: 'NOTIFY',
        payload: { message: `${username}: ${message}` },
        meta: { username, message },
      })
    );

    const action: {
      type: 'NOTIFY';
      payload: { message: string };
      meta: { username: string; message: string };
    } = notify('Piotr', 'Hello!');
    expect(action).toEqual({
      type: 'NOTIFY',
      payload: { message: 'Piotr: Hello!' },
      meta: { username: 'Piotr', message: 'Hello!' },
    });
  });

  it('with payload and no params', () => {
    const showNotification = createActionDeprecated(
      'SHOW_NOTIFICATION',
      () => ({
        type: 'SHOW_NOTIFICATION',
        payload: 'default message',
      })
    );

    const action: {
      type: 'SHOW_NOTIFICATION';
      payload: string;
    } = showNotification();
    expect(action).toEqual({
      type: 'SHOW_NOTIFICATION',
      payload: 'default message',
    });
  });

  it('with payload and optional param', () => {
    const showNotification = createActionDeprecated(
      'SHOW_NOTIFICATION',
      (message?: string) => ({
        type: 'SHOW_NOTIFICATION',
        payload: message,
      })
    );

    const action: {
      type: 'SHOW_NOTIFICATION';
      payload: string | undefined;
    } = showNotification();
    expect(action).toEqual({
      type: 'SHOW_NOTIFICATION',
      payload: undefined,
    });
  });

  it('with meta and no params', () => {
    const showError = createActionDeprecated('SHOW_ERROR', () => ({
      type: 'SHOW_ERROR',
      meta: { type: 'error' },
    }));

    const action: { type: 'SHOW_ERROR'; meta: { type: string } } = showError();
    expect(action).toEqual({
      type: 'SHOW_ERROR',
      meta: { type: 'error' },
    });
  });

  it('with meta and optional param', () => {
    const showError = createActionDeprecated(
      'SHOW_ERROR',
      (message?: string) => ({
        type: 'SHOW_ERROR',
        payload: message,
        meta: { type: 'error' },
      })
    );

    const action: {
      type: 'SHOW_ERROR';
      payload: string | undefined;
      meta: { type: string };
    } = showError();
    expect(action).toEqual({
      type: 'SHOW_ERROR',
      payload: undefined,
      meta: { type: 'error' },
    });
  });

  it('should work with symbol as action type', () => {
    const INCREMENT = Symbol(1);
    testType<symbol>(INCREMENT); // Ok
    // testType<typeof INCREMENT>('INCREMENT'); // Error
    const increment = createActionDeprecated(INCREMENT);

    const action: { type: symbol } = increment();
    expect(action).toEqual({ type: INCREMENT });
    expect(action).not.toEqual({ type: 'INCREMENT' });
  });

  it('should work with symbol nominal-type pattern as action type', () => {
    enum Increment {}
    const INCREMENT = (Symbol(1) as any) as Increment & string; // nominal-type workaround
    testType<string>(INCREMENT); // Ok
    // testType<typeof INCREMENT>('INCREMENT'); // Error
    const increment = createActionDeprecated(INCREMENT);

    const action: { type: typeof INCREMENT } = increment();
    expect(action).toEqual({ type: INCREMENT });
    expect(action).not.toEqual({ type: 'INCREMENT' });
  });
});

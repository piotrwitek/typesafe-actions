import { createAction, getType } from '.';

describe('getType', () => {

  it('no payload', () => {
    const increment = createAction('INCREMENT');

    const type: 'INCREMENT' = getType(increment);
    expect(type).toBe('INCREMENT');
  });

  it('no payload alternative', () => {
    const increment = createAction('INCREMENT', () => ({ type: 'INCREMENT' }));

    const type: 'INCREMENT' = getType(increment);
    expect(type).toBe('INCREMENT');
  });

  it('with payload', () => {
    const add = createAction('ADD',
      (amount: number) => ({ type: 'ADD', payload: amount }),
    );

    const type: 'ADD' = getType(add);
    expect(type).toBe('ADD');
  });

  it('with payload and meta', () => {
    const notify = createAction('NOTIFY',
      (username: string, message: string) => ({
        type: 'NOTIFY',
        payload: { message: `${username}: ${message}` },
        meta: { username, message },
      }),
    );

    const type: 'NOTIFY' = getType(notify);
    expect(type).toBe('NOTIFY');
  });

  it('with payload and no params', () => {
    const showNotification = createAction('SHOW_NOTIFICATION',
      () => ({
        type: 'SHOW_NOTIFICATION',
        payload: 'default message',
      }),
    );

    const type: 'SHOW_NOTIFICATION' = getType(showNotification);
    expect(type).toBe('SHOW_NOTIFICATION');
  });

  it('with payload and optional param', () => {
    const showNotification = createAction('SHOW_NOTIFICATION',
      (message?: string) => ({
        type: 'SHOW_NOTIFICATION',
        payload: message,
      }),
    );

    const type: 'SHOW_NOTIFICATION' = getType(showNotification);
    expect(type).toBe('SHOW_NOTIFICATION');
  });

  it('with meta and no params', () => {
    const showError = createAction('SHOW_ERROR',
      () => ({
        type: 'SHOW_ERROR',
        meta: { type: 'error' },
      }),
    );

    const type: 'SHOW_ERROR' = getType(showError);
    expect(type).toBe('SHOW_ERROR');
  });

  it('with meta and optional param', () => {
    const showError = createAction('SHOW_ERROR',
      (message?: string) => ({
        type: 'SHOW_ERROR',
        payload: message,
        meta: { type: 'error' },
      }),
    );

    const type: 'SHOW_ERROR' = getType(showError);
    expect(type).toBe('SHOW_ERROR');
  });

});

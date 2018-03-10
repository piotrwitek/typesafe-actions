import { createAction, getType } from '.';

describe('createAction', () => {

  // TODO: #3
  // should error when missing argument
  // should error when passed invalid arguments
  // check object, empty array, primitives

  it('no payload', () => {
    const increment = createAction('INCREMENT');

    const action: { type: 'INCREMENT' } = increment();
    expect(action).toEqual({ type: 'INCREMENT' });
    const type: 'INCREMENT' = increment.getType!();
    expect(type).toBe('INCREMENT');
  });

  it('no payload alternative', () => {
    const increment = createAction('INCREMENT', () => ({ type: 'INCREMENT' }));

    const action: { type: 'INCREMENT' } = increment();
    expect(action).toEqual({ type: 'INCREMENT' });
    const type: 'INCREMENT' = increment.getType!();
    expect(type).toBe('INCREMENT');
  });

  it('with payload', () => {
    const add = createAction('ADD',
      (amount: number) => ({ type: 'ADD', payload: amount }),
    );

    const action: { type: 'ADD', payload: number } = add(10);
    expect(action).toEqual({ type: 'ADD', payload: 10 });
    const type: 'ADD' = add.getType!();
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
    expect(type).toBe('NOTIFY');
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
    expect(type).toBe('SHOW_NOTIFICATION');
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
    expect(type).toBe('SHOW_NOTIFICATION');
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

    const action: { type: 'SHOW_ERROR', payload: string | undefined, meta: { type: string } } = showError();
    expect(action).toEqual({
      type: 'SHOW_ERROR',
      payload: undefined,
      meta: { type: 'error' },
    });
    const type: 'SHOW_ERROR' = showError.getType!();
    expect(type).toBe('SHOW_ERROR');
  });

  it('should work at runtime with symbol as action type', () => {
    enum Increment { }
    const INCREMENT = Symbol(1) as any as Increment & string;
    const a: string = INCREMENT; // Ok
    // const b: typeof INCREMENT = 'INCREMENT'; // Error
    const increment = createAction(INCREMENT);
    const decrement = createAction(Symbol(2));

    const action: { type: typeof INCREMENT } = increment();
    expect(action).toEqual({ type: INCREMENT });
    expect(action).not.toEqual({ type: 'INCREMENT' });
    const type: typeof INCREMENT = increment.getType!();
    expect(type).toBe(INCREMENT);
    expect(type).not.toBe('INCREMENT');
  });

});

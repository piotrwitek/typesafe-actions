import * as Types from './types';
import { createStandardAction } from './create-standard-action';

it.skip('skip', () => undefined);

describe('constructor', () => {
  describe('toString() method return a type', () => {
    const actionCreator = createStandardAction('TO_STRING')();
    // @dts-jest:pass:snap
    actionCreator.toString(); // => 'TO_STRING'
  });

  describe('with symbol', () => {
    const WITH_SYMBOL = Symbol(1);
    const withSymbol = createStandardAction(WITH_SYMBOL as any)();
    // @dts-jest:pass:snap
    withSymbol(); // => { type: WITH_SYMBOL }
  });

  describe('with type only', () => {
    const increment = createStandardAction('INCREMENT')();
    // @dts-jest:pass:snap
    increment(); // => { type: 'INCREMENT' }
  });

  describe('with type only - void', () => {
    const increment = createStandardAction('INCREMENT')<void>();
    // @dts-jest:pass:snap
    increment(); // => { type: 'INCREMENT' }
  });

  describe('with payload - number', () => {
    const add = createStandardAction('WITH_MAPPED_PAYLOAD')<number>();
    // @dts-jest:pass:snap
    add(10); // => { type: 'WITH_MAPPED_PAYLOAD', payload: 10 }
  });

  describe('with payload - boolean', () => {
    const set = createStandardAction('SET')<boolean>();
    // @dts-jest:pass:snap
    set(true); // => { type: 'SET', payload: true }
  });

  describe('with payload - literal string union', () => {
    type NetStatus = 'up' | 'down' | 'unknown';
    const set = createStandardAction('SET')<NetStatus>();
    // @dts-jest:pass:snap
    set('up'); // => { type: 'SET', payload: 'up' }
  });

  describe('with payload - primitives union', () => {
    const union = createStandardAction('UNION')<string | null | number>();
    // @dts-jest:pass:snap
    union('foo'); // => { type: 'UNION', payload: 'foo' }
    // @dts-jest:pass:snap
    union(null); // => { type: 'UNION', payload: null }
    // @dts-jest:pass:snap
    union(3); // => { type: 'UNION', payload: 3 }
  });

  describe('with meta', () => {
    const action = createStandardAction('WITH_META')<void, string>();
    // @dts-jest:pass:snap
    action(undefined, 'token'); // => { type: 'WITH_META', meta: 'token' }
  });

  describe('with payload and meta', () => {
    const action = createStandardAction('WITH_PAYLOAD_META')<number, string>();
    // @dts-jest:pass:snap
    action(1, 'token'); // => { type: 'WITH_PAYLOAD_META', payload: 1, meta: 'token' }
  });
});

describe('map', () => {
  describe('with type only', () => {
    const increment = createStandardAction('INCREMENT').map(() => ({}));
    // @dts-jest:pass:snap
    increment(); // => { type: 'INCREMENT' }
  });

  describe('with payload - no param', () => {
    const showNotification = createStandardAction('SHOW_NOTIFICATION').map(
      () => ({
        payload: 'hardcoded message',
      })
    );
    // @dts-jest:pass:snap
    showNotification(); // => { type: 'SHOW_NOTIFICATION', payload: 'hardcoded message' }
  });

  describe('with payload - primitive param', () => {
    const showNotification = createStandardAction('SHOW_NOTIFICATION').map(
      (payload: string) => ({
        payload,
      })
    );
    // @dts-jest:pass:snap
    showNotification('info message'); // => { type: 'SHOW_NOTIFICATION', payload: 'info message' }
  });

  describe('with payload - union param', () => {
    const showNotification = createStandardAction('SHOW_NOTIFICATION').map(
      (payload: string | null | number) => ({
        payload,
      })
    );
    // @dts-jest:pass:snap
    showNotification('info message'); // => { type: 'SHOW_NOTIFICATION', payload: 'info message' }
    // @dts-jest:pass:snap
    showNotification(null); // => { type: 'SHOW_NOTIFICATION', payload: null }
    // @dts-jest:pass:snap
    showNotification(3); // => { type: 'SHOW_NOTIFICATION', payload: 3 }
  });

  describe('with meta - no param', () => {
    const showNotification = createStandardAction('SHOW_NOTIFICATION').map(
      () => ({
        meta: 'hardcoded message',
      })
    );
    // @dts-jest:pass:snap
    showNotification(); // => { type: 'SHOW_NOTIFICATION', meta: 'hardcoded message' }
  });

  describe('with meta - primitive param', () => {
    const showNotification = createStandardAction('SHOW_NOTIFICATION').map(
      (meta: string) => ({
        meta,
      })
    );
    // @dts-jest:pass:snap
    showNotification('info message'); // => { type: 'SHOW_NOTIFICATION', meta: 'info message' }
  });

  describe('with meta - union param', () => {
    const showNotification = createStandardAction('SHOW_NOTIFICATION').map(
      (meta: string | null | number) => ({
        meta,
      })
    );
    // @dts-jest:pass:snap
    showNotification('info message'); // => { type: 'SHOW_NOTIFICATION', meta: 'info message' }
    // @dts-jest:pass:snap
    showNotification(null); // => { type: 'SHOW_NOTIFICATION', meta: null }
    // @dts-jest:pass:snap
    showNotification(3); // => { type: 'SHOW_NOTIFICATION', meta: 3 }
  });

  describe('with payload and meta - no param', () => {
    const showError = createStandardAction('SHOW_ERROR').map(() => ({
      payload: 'hardcoded error',
      meta: { severity: 'error' },
    }));
    // @dts-jest:pass:snap
    showError(); // => { type: 'SHOW_ERROR', payload: 'hardcoded error', meta: { severity: 'error' } }
  });

  describe('with payload and meta - string param', () => {
    const showError = createStandardAction('SHOW_ERROR').map(
      (message: string) => ({
        payload: message,
        meta: { severity: 'error' },
      })
    );
    // @dts-jest:pass:snap
    showError('error message'); // => { type: 'SHOW_ERROR', payload: 'error message', meta: { severity: 'error' } }
  });

  describe('with payload and meta - object param', () => {
    type Notification = { username: string; message?: string };
    const notify = createStandardAction('WITH_PAYLOAD_META').map(
      ({ username, message }: Notification) => ({
        payload: `${username}: ${message || ''}`,
        meta: { username, message },
      })
    );
    // tslint:disable:max-line-length
    // @dts-jest:pass:snap
    notify({ username: 'Piotr', message: 'Hello!' }); // => { type: 'WITH_PAYLOAD_META', payload: 'Piotr: Hello!', meta: { username: 'Piotr', message: 'Hello!' } }
  });
});

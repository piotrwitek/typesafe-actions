import { createActionWithType } from './create-action-with-type';

describe('createActionWithType', () => {
  it('with type only using symbol', () => {
    const INCREMENT = Symbol(1);
    const increment = createActionWithType(INCREMENT, type => () => ({ type }));
    const actual: {
      type: typeof INCREMENT;
    } = increment();
    expect(actual).toEqual({ type: INCREMENT });
  });

  it('with type only', () => {
    const increment = createActionWithType('WITH_TYPE_ONLY');
    const actual: {
      type: 'WITH_TYPE_ONLY';
    } = increment();
    expect(actual).toEqual({ type: 'WITH_TYPE_ONLY' });
  });

  it('with payload', () => {
    const add = createActionWithType('WITH_PAYLOAD', type => {
      return (amount: number) => ({ type, payload: amount });
    });
    const actual: {
      type: 'WITH_PAYLOAD';
      payload: number;
    } = add(1);
    expect(actual).toEqual({ type: 'WITH_PAYLOAD', payload: 1 });
  });

  it('with optional payload', () => {
    const create = createActionWithType('WITH_OPTIONAL_PAYLOAD', type => {
      return (id?: number) => ({ type, payload: id });
    });
    const actual1: {
      type: 'WITH_OPTIONAL_PAYLOAD';
      payload: number | undefined;
    } = create();
    expect(actual1).toEqual({
      type: 'WITH_OPTIONAL_PAYLOAD',
      payload: undefined,
    });
    const actual2: {
      type: 'WITH_OPTIONAL_PAYLOAD';
      payload: number | undefined;
    } = create(1);
    expect(actual2).toEqual({ type: 'WITH_OPTIONAL_PAYLOAD', payload: 1 });
  });

  it('with payload and meta', () => {
    const showNotification = createActionWithType(
      'SHOW_NOTIFICATION',
      type => (message: string, scope: string) => ({
        type,
        payload: message,
        meta: scope,
      })
    );
    const actual: {
      type: 'SHOW_NOTIFICATION';
      payload: string;
      meta: string;
    } = showNotification('Hello!', 'info');
    expect(actual).toEqual({
      type: 'SHOW_NOTIFICATION',
      payload: 'Hello!',
      meta: 'info',
    });
  });
});

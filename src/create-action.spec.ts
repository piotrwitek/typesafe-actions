import { createAction } from './';
import { types } from './test-utils';

describe('createAction', () => {
  it('toString', () => {
    const action = createAction(types.WITH_TYPE_ONLY, resolve => {
      return () => resolve();
    });
    expect(action.toString()).toBe('WITH_TYPE_ONLY');
    expect((action as any) == 'WITH_TYPE_ONLY').toBe(true);
  });

  it('with type only - shorthand', () => {
    const action = createAction(types.WITH_TYPE_ONLY);
    const actual: { type: 'WITH_TYPE_ONLY' } = action();
    expect(actual).toEqual({ type: 'WITH_TYPE_ONLY' });
  });

  it('with type only', () => {
    const action = createAction(types.WITH_TYPE_ONLY, resolve => {
      return () => resolve();
    });
    const actual: { type: 'WITH_TYPE_ONLY' } = action();
    expect(actual).toEqual({ type: 'WITH_TYPE_ONLY' });
  });

  it('with payload', () => {
    const action = createAction(types.WITH_PAYLOAD, resolve => {
      return (id: number) => resolve(id);
    });
    const actual: { type: 'WITH_PAYLOAD'; payload: number } = action(1);
    expect(actual).toEqual({ type: 'WITH_PAYLOAD', payload: 1 });
  });

  it('with meta', () => {
    const action = createAction(types.WITH_META, resolve => {
      return (token: string) => resolve(undefined, token);
    });
    const actual: { type: 'WITH_META'; meta: string } = action('token');
    expect(actual).toEqual({ type: 'WITH_META', meta: 'token' });
  });

  it('with payload and meta', () => {
    const action = createAction(types.WITH_PAYLOAD_META, resolve => {
      return (id: number, token: string) => resolve(id, token);
    });
    const actual: {
      type: 'WITH_PAYLOAD_META';
      payload: number;
      meta: string;
    } = action(1, 'token');
    expect(actual).toEqual({
      type: 'WITH_PAYLOAD_META',
      payload: 1,
      meta: 'token',
    });
  });
});

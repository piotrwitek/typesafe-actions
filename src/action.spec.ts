import { action } from './action';
import { types } from './test-utils';

describe('action', () => {
  it('with type only', () => {
    const actual: { type: 'WITH_TYPE_ONLY' } = action(types.WITH_TYPE_ONLY);
    expect(actual).toEqual({ type: 'WITH_TYPE_ONLY' });
  });

  it('with payload', () => {
    const actual: { type: 'WITH_PAYLOAD'; payload: number } = action(
      types.WITH_PAYLOAD,
      1
    );
    expect(actual).toEqual({ type: 'WITH_PAYLOAD', payload: 1 });
  });

  it('with meta', () => {
    const actual: { type: 'WITH_META'; meta: string } = action(
      types.WITH_META,
      undefined,
      'token'
    );
    expect(actual).toEqual({ type: 'WITH_META', meta: 'token' });
  });

  it('with payload and meta', () => {
    const actual: {
      type: 'WITH_PAYLOAD_META';
      payload: number;
      meta: string;
    } = action(types.WITH_PAYLOAD_META, 1, 'token');
    expect(actual).toEqual({
      type: 'WITH_PAYLOAD_META',
      payload: 1,
      meta: 'token',
    });
  });
});

import { getType } from './';
import { actions, types } from './test-utils';

describe('getType', () => {
  it('with type only', () => {
    const typeLiteral: 'WITH_TYPE_ONLY' = getType(actions.withTypeOnly);
    expect(typeLiteral).toBe('WITH_TYPE_ONLY');
  });

  it('with type as symbol', () => {
    const typeLiteral: 'WITH_SYMBOL_TYPE' = getType(actions.withSymbolType);
    expect(typeLiteral).toBe(types.WITH_SYMBOL_TYPE);
    expect(typeLiteral).not.toBe('WITH_SYMBOL_TYPE');
  });

  it('with payload', () => {
    const typeLiteral: 'WITH_PAYLOAD' = getType(actions.withPayload);
    expect(typeLiteral).toBe('WITH_PAYLOAD');
  });

  it('with mapped payload', () => {
    const typeLiteral: 'WITH_MAPPED_PAYLOAD' = getType(
      actions.withMappedPayload
    );
    expect(typeLiteral).toBe('WITH_MAPPED_PAYLOAD');
  });
});

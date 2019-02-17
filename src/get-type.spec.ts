import * as Types from './types';
import { getType } from './get-type';
import { actions } from './utils/action-creator-fixtures';

describe('getType', () => {
  it('with type as string', () => {
    const typeLiteral = getType(actions.withTypeOnly);
    // @dts-jest:pass:snap
    typeLiteral;
    expect(typeLiteral).toBe('WITH_TYPE_ONLY');
  });

  it('with payload', () => {
    const typeLiteral = getType(actions.withPayload);
    // @dts-jest:pass:snap
    typeLiteral;
    expect(typeLiteral).toBe('WITH_PAYLOAD');
  });

  it('with mapped payload', () => {
    const typeLiteral = getType(actions.withMappedPayload);
    // @dts-jest:pass:snap
    typeLiteral;
    expect(typeLiteral).toBe('WITH_MAPPED_PAYLOAD');
  });
});

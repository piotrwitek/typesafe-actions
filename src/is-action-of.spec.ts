import { ActionsUnion, buildAction, isActionOf } from '.';
import { actions, testType } from './utils';
const {
  withTypeOnly,
  withPayload,
  withPayloadMeta,
  withMappedPayload,
  withMappedPayloadMeta,
} = actions;

describe('isActionOf', () => {
  it('should work with actions from buildAction with type only', () => {
    expect(isActionOf(withTypeOnly)(withTypeOnly())).toBeTruthy();
    expect(isActionOf(withTypeOnly, withTypeOnly())).toBeTruthy();
    expect(isActionOf([withTypeOnly])(withTypeOnly())).toBeTruthy();
    expect(isActionOf([withTypeOnly], withTypeOnly())).toBeTruthy();
    expect(isActionOf(withTypeOnly)(withPayload(2))).toBeFalsy();
    expect(isActionOf(withTypeOnly, withPayload(2))).toBeFalsy();
    expect(isActionOf([withTypeOnly])(withPayload(2))).toBeFalsy();
    expect(isActionOf([withTypeOnly], withPayload(2))).toBeFalsy();
  });

  it('should work with actions from buildAction with map', () => {
    expect(isActionOf(withMappedPayload)(withMappedPayload(2))).toBeTruthy();
    expect(isActionOf(withMappedPayload, withMappedPayload(2))).toBeTruthy();
    expect(isActionOf([withMappedPayload])(withMappedPayload(2))).toBeTruthy();
    expect(isActionOf([withMappedPayload], withMappedPayload(2))).toBeTruthy();
    expect(isActionOf(withMappedPayload)(withTypeOnly())).toBeFalsy();
    expect(isActionOf(withMappedPayload, withTypeOnly())).toBeFalsy();
    expect(isActionOf([withMappedPayload])(withTypeOnly())).toBeFalsy();
    expect(isActionOf([withMappedPayload], withTypeOnly())).toBeFalsy();
  });

  it('should work with actions from buildAction mixed', () => {
    expect(
      isActionOf([withTypeOnly, withPayload])(withTypeOnly())
    ).toBeTruthy();
    expect(
      isActionOf([withTypeOnly, withPayload], withTypeOnly())
    ).toBeTruthy();
    expect(
      isActionOf([withTypeOnly, withPayload])(withPayload(2))
    ).toBeTruthy();
    expect(
      isActionOf([withTypeOnly, withPayload], withPayload(2))
    ).toBeTruthy();
    expect(
      isActionOf([withTypeOnly, withPayload])(withMappedPayload(2))
    ).toBeFalsy();
    expect(
      isActionOf([withTypeOnly, withPayload], withMappedPayload(2))
    ).toBeFalsy();
  });

  const actual0 = withTypeOnly();
  const expected0 = { type: 'WITH_TYPE_ONLY' };
  const actual1 = withPayload(2);
  const expected1 = { type: 'WITH_PAYLOAD', payload: 2 };
  const actual2 = withPayloadMeta(2, 'metaValue');
  const expected2 = {
    type: 'WITH_PAYLOAD_META',
    payload: 2,
    meta: 'metaValue',
  };
  const actual3 = withMappedPayload(2);
  const expected3 = { type: 'WITH_MAPPED_PAYLOAD', payload: 2 };
  const actual4 = withMappedPayloadMeta(2, 'metaValue');
  const expected4 = {
    type: 'WITH_MAPPED_PAYLOAD_META',
    payload: 2,
    meta: 'metaValue',
  };

  const $action = [actual0, actual1, actual2, actual3, actual4];

  it('should correctly assert for array with one actionCreator', () => {
    const actual: Array<{ type: 'WITH_TYPE_ONLY' }> = $action.filter(
      isActionOf([withTypeOnly])
    );
    expect(actual).toHaveLength(1);
    expect(actual).toEqual([expected0]);
  });

  it('should correctly assert for array with two actionCreators', () => {
    const actual: Array<
      { type: 'WITH_TYPE_ONLY' } | { type: 'WITH_PAYLOAD'; payload: number }
    > = $action.filter(isActionOf([withTypeOnly, withPayload]));
    expect(actual).toHaveLength(2);
    expect(actual).toEqual([expected0, expected1]);
  });

  it('should correctly assert for array with three actionCreators', () => {
    const actual: Array<
      | { type: 'WITH_TYPE_ONLY' }
      | { type: 'WITH_PAYLOAD'; payload: number }
      | { type: 'WITH_PAYLOAD_META'; payload: number; meta: string }
    > = $action.filter(
      isActionOf([withTypeOnly, withPayload, withPayloadMeta])
    );
    expect(actual).toHaveLength(3);
    expect(actual).toEqual([expected0, expected1, expected2]);
  });

  it('should correctly assert for array with four actionCreators', () => {
    const actual: Array<
      | { type: 'WITH_TYPE_ONLY' }
      | { type: 'WITH_PAYLOAD'; payload: number }
      | { type: 'WITH_PAYLOAD_META'; payload: number; meta: string }
      | ({ type: 'WITH_MAPPED_PAYLOAD' } & { payload: number })
    > = $action.filter(
      isActionOf([
        withTypeOnly,
        withPayload,
        withPayloadMeta,
        withMappedPayload,
      ])
    );
    expect(actual).toEqual([expected0, expected1, expected2, expected3]);
  });

  it('should correctly assert for array with five actionCreators', () => {
    const actual: Array<
      | { type: 'WITH_TYPE_ONLY' }
      | { type: 'WITH_PAYLOAD'; payload: number }
      | { type: 'WITH_PAYLOAD_META'; payload: number; meta: string }
      | ({ type: 'WITH_MAPPED_PAYLOAD' } & { payload: number })
      | ({ type: 'WITH_MAPPED_PAYLOAD_META' } & {
          payload: number;
          meta: string;
        })
    > = $action.filter(
      isActionOf([
        withTypeOnly,
        withPayload,
        withPayloadMeta,
        withMappedPayload,
        withMappedPayloadMeta,
      ])
    );
    expect(actual).toHaveLength(5);
    expect(actual).toEqual([
      expected0,
      expected1,
      expected2,
      expected3,
      expected4,
    ]);
  });
});

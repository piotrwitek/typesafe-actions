import { isActionOf } from './is-action-of';
import { actions, testType } from './test-utils';
const {
  withTypeOnly,
  withPayload,
  withPayloadMeta,
  withMappedPayload,
  withMappedPayloadMeta,
} = actions;

/** FIXTURES */
const typeOnlyAction = withTypeOnly();
const typeOnlyExpected = { type: 'WITH_TYPE_ONLY' };
const payloadAction = withPayload(2);
const payloadExpected = { type: 'WITH_PAYLOAD', payload: 2 };
const payloadMetaAction = withPayloadMeta(2, 'metaValue');
const payloadMetaExpected = {
  type: 'WITH_PAYLOAD_META',
  payload: 2,
  meta: 'metaValue',
};
const mappedPayloadAction = withMappedPayload(2);
const mappedPayloadExpected = { type: 'WITH_MAPPED_PAYLOAD', payload: 2 };
const mappedPayloadMetaAction = withMappedPayloadMeta(2, 'metaValue');
const mappedPayloadMetaExpected = {
  type: 'WITH_MAPPED_PAYLOAD_META',
  payload: 2,
  meta: 'metaValue',
};

const $action = [
  typeOnlyAction,
  payloadAction,
  payloadMetaAction,
  mappedPayloadAction,
  mappedPayloadMetaAction,
];

describe('isActionOf', () => {
  it('should work with type only actions', () => {
    expect(isActionOf(withTypeOnly)(typeOnlyAction)).toBeTruthy();
    expect(isActionOf(withTypeOnly, typeOnlyAction)).toBeTruthy();
    expect(isActionOf([withTypeOnly])(typeOnlyAction)).toBeTruthy();
    expect(isActionOf([withTypeOnly], typeOnlyAction)).toBeTruthy();
    expect(isActionOf(withTypeOnly)(payloadAction)).toBeFalsy();
    expect(isActionOf(withTypeOnly, payloadAction)).toBeFalsy();
    expect(isActionOf([withTypeOnly])(payloadAction)).toBeFalsy();
    expect(isActionOf([withTypeOnly], payloadAction)).toBeFalsy();
  });

  it('should work with with mapped actions', () => {
    expect(isActionOf(withMappedPayload)(mappedPayloadAction)).toBeTruthy();
    expect(isActionOf(withMappedPayload, mappedPayloadAction)).toBeTruthy();
    expect(isActionOf([withMappedPayload])(mappedPayloadAction)).toBeTruthy();
    expect(isActionOf([withMappedPayload], mappedPayloadAction)).toBeTruthy();
    expect(isActionOf(withMappedPayload)(typeOnlyAction)).toBeFalsy();
    expect(isActionOf(withMappedPayload, typeOnlyAction)).toBeFalsy();
    expect(isActionOf([withMappedPayload])(typeOnlyAction)).toBeFalsy();
    expect(isActionOf([withMappedPayload], typeOnlyAction)).toBeFalsy();
  });

  it('should work with array of mixed actions', () => {
    expect(
      isActionOf([withTypeOnly, withPayload])(typeOnlyAction)
    ).toBeTruthy();
    expect(
      isActionOf([withTypeOnly, withPayload], typeOnlyAction)
    ).toBeTruthy();
    expect(isActionOf([withTypeOnly, withPayload])(payloadAction)).toBeTruthy();
    expect(isActionOf([withTypeOnly, withPayload], payloadAction)).toBeTruthy();
    expect(
      isActionOf([withTypeOnly, withPayload])(mappedPayloadAction)
    ).toBeFalsy();
    expect(
      isActionOf([withTypeOnly, withPayload], mappedPayloadAction)
    ).toBeFalsy();
  });

  it('should correctly assert for array with one actionCreator', () => {
    const actual: Array<{ type: 'WITH_TYPE_ONLY' }> = $action.filter(
      isActionOf([withTypeOnly])
    );
    expect(actual).toHaveLength(1);
    expect(actual).toEqual([typeOnlyExpected]);
  });

  it('should correctly assert for array with two actionCreators', () => {
    const actual: Array<
      { type: 'WITH_TYPE_ONLY' } | { type: 'WITH_PAYLOAD'; payload: number }
    > = $action.filter(isActionOf([withTypeOnly, withPayload]));
    expect(actual).toHaveLength(2);
    expect(actual).toEqual([typeOnlyExpected, payloadExpected]);
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
    expect(actual).toEqual([
      typeOnlyExpected,
      payloadExpected,
      payloadMetaExpected,
    ]);
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
    expect(actual).toEqual([
      typeOnlyExpected,
      payloadExpected,
      payloadMetaExpected,
      mappedPayloadExpected,
    ]);
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
      typeOnlyExpected,
      payloadExpected,
      payloadMetaExpected,
      mappedPayloadExpected,
      mappedPayloadMetaExpected,
    ]);
  });
});

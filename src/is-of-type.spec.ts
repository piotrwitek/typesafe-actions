import { isOfType } from './is-of-type';
import { types, actions } from './test-utils';
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
// const payloadMetaExpected = {
//   type: 'WITH_PAYLOAD_META',
//   payload: 2,
//   meta: 'metaValue',
// };
const mappedPayloadAction = withMappedPayload(2);
// const mappedPayloadExpected = { type: 'WITH_MAPPED_PAYLOAD', payload: 2 };
const mappedPayloadMetaAction = withMappedPayloadMeta(2, 'metaValue');
// const mappedPayloadMetaExpected = {
//   type: 'WITH_MAPPED_PAYLOAD_META',
//   payload: 2,
//   meta: 'metaValue',
// };

const $action = [
  typeOnlyAction,
  payloadAction,
  payloadMetaAction,
  mappedPayloadAction,
  mappedPayloadMetaAction,
];

describe('isOfType', () => {
  it('should work with type only actions', () => {
    expect(isOfType(types.WITH_TYPE_ONLY)(typeOnlyAction)).toBeTruthy();
    expect(isOfType(types.WITH_TYPE_ONLY, typeOnlyAction)).toBeTruthy();
    expect(isOfType(types.WITH_TYPE_ONLY)(payloadAction)).toBeFalsy();
    expect(isOfType(types.WITH_TYPE_ONLY, payloadAction)).toBeFalsy();
  });

  it('should work with with mapped actions', () => {
    expect(
      isOfType(types.WITH_MAPPED_PAYLOAD)(mappedPayloadAction)
    ).toBeTruthy();
    expect(
      isOfType(types.WITH_MAPPED_PAYLOAD, mappedPayloadAction)
    ).toBeTruthy();
    expect(isOfType(types.WITH_MAPPED_PAYLOAD)(typeOnlyAction)).toBeFalsy();
    expect(isOfType(types.WITH_MAPPED_PAYLOAD, typeOnlyAction)).toBeFalsy();
  });

  it('should correctly assert for array with one actionCreator', () => {
    const actual: Array<{ type: 'WITH_TYPE_ONLY' }> = $action.filter(
      isOfType(types.WITH_TYPE_ONLY)
    );
    expect(actual).toHaveLength(1);
    expect(actual).toEqual([typeOnlyExpected]);
  });

  it('should correctly assert for array of action types and action', () => {
    expect(
      isOfType(
        [types.WITH_MAPPED_PAYLOAD, types.WITH_TYPE_ONLY],
        typeOnlyAction
      )
    ).toBeTruthy();
    expect(
      isOfType([types.WITH_MAPPED_PAYLOAD, types.WITH_TYPE_ONLY])(
        typeOnlyAction
      )
    ).toBeTruthy();
    expect(isOfType([types.WITH_PAYLOAD], typeOnlyAction)).toBeFalsy();
    expect(isOfType([types.WITH_PAYLOAD])(typeOnlyAction)).toBeFalsy();
  });

  it('should correctly assert for an array of action types', () => {
    const actual: Array<
      { type: 'WITH_TYPE_ONLY' } | { type: 'WITH_PAYLOAD'; payload: number }
    > = $action.filter(isOfType([types.WITH_TYPE_ONLY, types.WITH_PAYLOAD]));
    expect(actual).toHaveLength(2);
    expect(actual).toEqual([typeOnlyExpected, payloadExpected]);
  });
});

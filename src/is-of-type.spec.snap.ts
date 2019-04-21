import * as T from './type-helpers';
import { isOfType } from './is-of-type';

import { actions, types } from './type-helpers-fixtures';
const {
  withTypeOnly,
  withPayload,
  withPayloadMeta,
  withMappedPayload,
  withMappedPayloadMeta,
} = actions;

/** HELPERS */

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

/** TESTS */

describe('isOfType', () => {
  describe('should work with single action-type arg', () => {
    // @dts-jest:pass:snap -> boolean
    isOfType(types.WITH_TYPE_ONLY)(typeOnlyAction); // => true
    // @dts-jest:pass:snap -> boolean
    isOfType(types.WITH_TYPE_ONLY, typeOnlyAction); // => true
    // @dts-jest:pass:snap -> boolean
    isOfType(types.WITH_TYPE_ONLY)(payloadAction); // => false
    // @dts-jest:pass:snap -> boolean
    isOfType(types.WITH_TYPE_ONLY, payloadAction); // => false
    // @dts-jest:pass:snap -> boolean
    isOfType([types.WITH_TYPE_ONLY])(typeOnlyAction); // => true
    // @dts-jest:pass:snap -> boolean
    isOfType([types.WITH_TYPE_ONLY], typeOnlyAction); // => true
    // @dts-jest:pass:snap -> boolean
    isOfType([types.WITH_TYPE_ONLY])(payloadAction); // => false
    // @dts-jest:pass:snap -> boolean
    isOfType([types.WITH_TYPE_ONLY], payloadAction); // => false
  });

  describe('should work with multiple action-type args', () => {
    // @dts-jest:pass:snap -> boolean
    isOfType([types.WITH_TYPE_ONLY, types.WITH_PAYLOAD])(typeOnlyAction); // => true
    // @dts-jest:pass:snap -> boolean
    isOfType([types.WITH_TYPE_ONLY, types.WITH_PAYLOAD], typeOnlyAction); // => true
    // @dts-jest:pass:snap -> boolean
    isOfType([types.WITH_TYPE_ONLY, types.WITH_PAYLOAD])(payloadAction); // => true
    // @dts-jest:pass:snap -> boolean
    isOfType([types.WITH_TYPE_ONLY, types.WITH_PAYLOAD], payloadAction); // => true
    // @dts-jest:pass:snap -> boolean
    isOfType([types.WITH_TYPE_ONLY, types.WITH_PAYLOAD])(mappedPayloadAction); // => false
    // @dts-jest:pass:snap -> boolean
    isOfType([types.WITH_TYPE_ONLY, types.WITH_PAYLOAD], mappedPayloadAction); // => false
  });

  describe('should correctly assert for an array with 1 arg', () => {
    const actual = $action.filter(isOfType(types.WITH_TYPE_ONLY));
    // @dts-jest:pass:snap -> T.EmptyAction<"WITH_TYPE_ONLY">[]
    actual; // => [typeOnlyExpected]
  });

  describe('should correctly assert for an array with 2 args', () => {
    const actual = $action.filter(
      isOfType([types.WITH_TYPE_ONLY, types.WITH_PAYLOAD])
    );
    // @dts-jest:pass:snap -> (T.EmptyAction<"WITH_TYPE_ONLY"> | T.PayloadAction<"WITH_PAYLOAD", number>)[]
    actual; // => [typeOnlyExpected, payloadExpected]
  });

  describe('should correctly assert for an array with 3 args', () => {
    const actual = $action.filter(
      isOfType([
        types.WITH_TYPE_ONLY,
        types.WITH_PAYLOAD,
        types.WITH_PAYLOAD_META,
      ])
    );
    // @dts-jest:pass:snap -> (T.EmptyAction<"WITH_TYPE_ONLY"> | T.PayloadAction<"WITH_PAYLOAD", number> | T.PayloadMetaAction<"WITH_PAYLOAD_META", number, string>)[]
    actual; // => [typeOnlyExpected,payloadExpected,payloadMetaExpected]
  });

  describe('should correctly assert for an array with 4 args', () => {
    const actual = $action.filter(
      isOfType([
        types.WITH_TYPE_ONLY,
        types.WITH_PAYLOAD,
        types.WITH_PAYLOAD_META,
        types.WITH_MAPPED_PAYLOAD,
      ])
    );
    // @dts-jest:pass:snap -> (T.EmptyAction<"WITH_TYPE_ONLY"> | T.PayloadAction<"WITH_PAYLOAD", number> | ({ type: "WITH_MAPPED_PAYLOAD"; } & { payload: number; }) | T.PayloadMetaAction<"WITH_PAYLOAD_META", number, string>)[]
    actual; // => [typeOnlyExpected,payloadExpected,payloadMetaExpected,mappedPayloadExpected]
  });

  describe('should correctly assert for an array with 4 args', () => {
    const actual = $action.filter(
      isOfType([
        types.WITH_TYPE_ONLY,
        types.WITH_PAYLOAD,
        types.WITH_PAYLOAD_META,
        types.WITH_MAPPED_PAYLOAD,
        types.WITH_MAPPED_PAYLOAD_META,
      ])
    );
    // @dts-jest:pass:snap -> (T.EmptyAction<"WITH_TYPE_ONLY"> | T.PayloadAction<"WITH_PAYLOAD", number> | ({ type: "WITH_MAPPED_PAYLOAD"; } & { payload: number; }) | T.PayloadMetaAction<"WITH_PAYLOAD_META", number, string> | ({ type: "WITH_MAPPED_PAYLOAD_META"; } & { payload: number; meta: string; }))[]
    actual; // => [typeOnlyExpected,payloadExpected,payloadMetaExpected,mappedPayloadExpected,mappedPayloadMetaExpected]
  });

  describe('should correctly assert type with "any" action', () => {
    const action: any = withMappedPayload(1234);
    if (
      isOfType(
        [types.WITH_MAPPED_PAYLOAD, types.WITH_MAPPED_PAYLOAD_META],
        action
      )
    ) {
      // @dts-jest:pass:snap -> any
      action; // => {"payload": 1234, "type": "WITH_MAPPED_PAYLOAD"}
    }
    if (
      isOfType([types.WITH_MAPPED_PAYLOAD, types.WITH_MAPPED_PAYLOAD_META])(
        action
      )
    ) {
      // @dts-jest:pass:snap -> any
      action; // => {"payload": 1234, "type": "WITH_MAPPED_PAYLOAD"}
    }
  });
});

import * as T from './type-helpers';
import { isActionOf } from './is-action-of';

import { actions } from './type-helpers-fixtures';
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

describe('isActionOf', () => {
  describe('should work with single action-creator arg', () => {
    // @dts-jest:pass:snap -> boolean
    isActionOf(withTypeOnly)(typeOnlyAction); // => true
    // @dts-jest:pass:snap -> boolean
    isActionOf(withTypeOnly, typeOnlyAction); // => true
    // @dts-jest:pass:snap -> boolean
    isActionOf(withTypeOnly)(payloadAction); // => false
    // @dts-jest:pass:snap -> boolean
    isActionOf(withTypeOnly, payloadAction); // => false
    // @dts-jest:pass:snap -> boolean
    isActionOf([withTypeOnly])(typeOnlyAction); // => true
    // @dts-jest:pass:snap -> boolean
    isActionOf([withTypeOnly], typeOnlyAction); // => true
    // @dts-jest:pass:snap -> boolean
    isActionOf([withTypeOnly])(payloadAction); // => false
    // @dts-jest:pass:snap -> boolean
    isActionOf([withTypeOnly], payloadAction); // => false
  });

  describe('should work with multiple action-creator args', () => {
    // @dts-jest:pass:snap -> boolean
    isActionOf([withTypeOnly, withPayload])(typeOnlyAction); // => true
    // @dts-jest:pass:snap -> boolean
    isActionOf([withTypeOnly, withPayload], typeOnlyAction); // => true
    // @dts-jest:pass:snap -> boolean
    isActionOf([withTypeOnly, withPayload])(payloadAction); // => true
    // @dts-jest:pass:snap -> boolean
    isActionOf([withTypeOnly, withPayload], payloadAction); // => true
    // @dts-jest:pass:snap -> boolean
    isActionOf([withTypeOnly, withPayload])(mappedPayloadAction); // => false
    // @dts-jest:pass:snap -> boolean
    isActionOf([withTypeOnly, withPayload], mappedPayloadAction); // => false
  });

  describe('should correctly assert for an array with 1 arg', () => {
    const actual = $action.filter(isActionOf([withTypeOnly]));
    // @dts-jest:pass:snap -> T.EmptyAction<"WITH_TYPE_ONLY">[]
    actual; // => [typeOnlyExpected]
  });

  describe('should correctly assert for an array with 2 args', () => {
    const actual = $action.filter(isActionOf([withTypeOnly, withPayload]));
    // @dts-jest:pass:snap -> (T.EmptyAction<"WITH_TYPE_ONLY"> | T.PayloadAction<"WITH_PAYLOAD", number>)[]
    actual; // => [typeOnlyExpected, payloadExpected]
  });

  describe('should correctly assert for an array with 3 args', () => {
    const actual = $action.filter(
      isActionOf([withTypeOnly, withPayload, withPayloadMeta])
    );
    // @dts-jest:pass:snap -> (T.EmptyAction<"WITH_TYPE_ONLY"> | T.PayloadAction<"WITH_PAYLOAD", number> | T.PayloadMetaAction<"WITH_PAYLOAD_META", number, string>)[]
    actual; // => [typeOnlyExpected,payloadExpected,payloadMetaExpected]
  });

  describe('should correctly assert for an array with 4 args', () => {
    const actual = $action.filter(
      isActionOf([
        withTypeOnly,
        withPayload,
        withPayloadMeta,
        withMappedPayload,
      ])
    );
    // @dts-jest:pass:snap -> (T.EmptyAction<"WITH_TYPE_ONLY"> | T.PayloadAction<"WITH_PAYLOAD", number> | ({ type: "WITH_MAPPED_PAYLOAD"; } & { payload: number; }) | T.PayloadMetaAction<"WITH_PAYLOAD_META", number, string>)[]
    actual; // => [typeOnlyExpected,payloadExpected,payloadMetaExpected,mappedPayloadExpected]
  });

  describe('should correctly assert for an array with 5 args', () => {
    const actual = $action.filter(
      isActionOf([
        withTypeOnly,
        withPayload,
        withPayloadMeta,
        withMappedPayload,
        withMappedPayloadMeta,
      ])
    );
    // @dts-jest:pass:snap -> (T.EmptyAction<"WITH_TYPE_ONLY"> | T.PayloadAction<"WITH_PAYLOAD", number> | ({ type: "WITH_MAPPED_PAYLOAD"; } & { payload: number; }) | T.PayloadMetaAction<"WITH_PAYLOAD_META", number, string> | ({ type: "WITH_MAPPED_PAYLOAD_META"; } & { payload: number; meta: string; }))[]
    actual; // => [typeOnlyExpected,payloadExpected,payloadMetaExpected,mappedPayloadExpected,mappedPayloadMetaExpected]
  });

  describe('should correctly assert type with "any" action', () => {
    const action: any = withMappedPayload(1234);
    if (isActionOf([withMappedPayload, withMappedPayloadMeta], action)) {
      // @dts-jest:pass:snap -> ({ type: "WITH_MAPPED_PAYLOAD"; } & { payload: number; }) | ({ type: "WITH_MAPPED_PAYLOAD_META"; } & { payload: number; meta: string; })
      action; // => {"payload": 1234, "type": "WITH_MAPPED_PAYLOAD"}
    }

    if (isActionOf([withMappedPayload, withMappedPayloadMeta])(action)) {
      // @dts-jest:pass:snap -> ({ type: "WITH_MAPPED_PAYLOAD"; } & { payload: number; }) | ({ type: "WITH_MAPPED_PAYLOAD_META"; } & { payload: number; meta: string; })
      action; // => {"payload": 1234, "type": "WITH_MAPPED_PAYLOAD"}
    }
  });
});

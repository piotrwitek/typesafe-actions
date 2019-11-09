import * as TH from './type-helpers';
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

// @dts-jest:group should work with single action-type arg
{
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
}

// @dts-jest:group should work with multiple action-type args
{
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
}

// @dts-jest:group should correctly assert for an array with 1 arg
{
  const actual = $action.filter(isOfType(types.WITH_TYPE_ONLY));
  // @dts-jest:pass:snap -> TH.EmptyAction<"WITH_TYPE_ONLY">[]
  actual; // => [typeOnlyExpected]
}

// @dts-jest:group should correctly assert for an array with 2 args
{
  const actual = $action.filter(
    isOfType([types.WITH_TYPE_ONLY, types.WITH_PAYLOAD])
  );
  // @dts-jest:pass:snap -> (TH.EmptyAction<"WITH_TYPE_ONLY"> | TH.PayloadAction<"WITH_PAYLOAD", number>)[]
  actual; // => [typeOnlyExpected, payloadExpected]
}

// @dts-jest:group should correctly assert for an array with 3 args
{
  const actual = $action.filter(
    isOfType([
      types.WITH_TYPE_ONLY,
      types.WITH_PAYLOAD,
      types.WITH_PAYLOAD_META,
    ])
  );
  // @dts-jest:pass:snap -> (TH.EmptyAction<"WITH_TYPE_ONLY"> | TH.PayloadAction<"WITH_PAYLOAD", number> | TH.PayloadMetaAction<"WITH_PAYLOAD_META", number, string>)[]
  actual; // => [typeOnlyExpected,payloadExpected,payloadMetaExpected]
}

// @dts-jest:group should correctly assert for an array with 4 args
{
  const actual = $action.filter(
    isOfType([
      types.WITH_TYPE_ONLY,
      types.WITH_PAYLOAD,
      types.WITH_PAYLOAD_META,
      types.WITH_MAPPED_PAYLOAD,
    ])
  );
  // @dts-jest:pass:snap -> (TH.EmptyAction<"WITH_TYPE_ONLY"> | TH.PayloadAction<"WITH_PAYLOAD", number> | TH.PayloadAction<"WITH_MAPPED_PAYLOAD", number> | TH.PayloadMetaAction<"WITH_PAYLOAD_META", number, string>)[]
  actual; // => [typeOnlyExpected,payloadExpected,payloadMetaExpected,mappedPayloadExpected]
}

// @dts-jest:group should correctly assert for an array with 4 args
{
  const actual = $action.filter(
    isOfType([
      types.WITH_TYPE_ONLY,
      types.WITH_PAYLOAD,
      types.WITH_PAYLOAD_META,
      types.WITH_MAPPED_PAYLOAD,
      types.WITH_MAPPED_PAYLOAD_META,
    ])
  );
  // @dts-jest:pass:snap -> (TH.EmptyAction<"WITH_TYPE_ONLY"> | TH.PayloadAction<"WITH_PAYLOAD", number> | TH.PayloadAction<"WITH_MAPPED_PAYLOAD", number> | TH.PayloadMetaAction<"WITH_PAYLOAD_META", number, string> | TH.PayloadMetaAction<"WITH_MAPPED_PAYLOAD_META", number, string>)[]
  actual; // => [typeOnlyExpected,payloadExpected,payloadMetaExpected,mappedPayloadExpected,mappedPayloadMetaExpected]
}

// @dts-jest:group should correctly assert type with "any" action
{
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
}

import * as TH from './type-helpers';
import { isActionOf } from './is-action-of';

import { actions } from './type-helpers-fixtures';
const {
  withTypeOnly,
  withPayload,
  withPayloadMeta,
  withMappedPayload,
  withMappedPayloadMeta,
  asyncAction,
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
const asyncRequestAction = asyncAction.request();
const asyncRequestExpected = { type: 'FETCH_USER_REQUEST' };
const asyncSuccessPayload = {
  firstName: 'Ada',
  lastName: 'Lovelace',
};
const asyncSuccessAction = asyncAction.success(asyncSuccessPayload);
const asyncSuccessExpected = {
  type: 'FETCH_USER_SUCCESS',
  payload: asyncSuccessPayload,
};
const asyncFailurePayload = new Error('Unable to fetch user');
const asyncFailureAction = asyncAction.failure(asyncFailurePayload);
const asyncFailureExpected = {
  type: 'FETCH_USER_FAILURE',
  payload: asyncFailurePayload,
};

const $action = [
  typeOnlyAction,
  payloadAction,
  payloadMetaAction,
  mappedPayloadAction,
  mappedPayloadMetaAction,
  asyncRequestAction,
  asyncSuccessAction,
  asyncFailureAction,
];

/** TESTS */

// @dts-jest:group should work with single action-creator arg
{
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
}

// @dts-jest:group should work with multiple action-creator args
{
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
}

// @dts-jest:group should correctly assert for an array with 1 arg
{
  const actual = $action.filter(isActionOf([withTypeOnly]));
  // @dts-jest:pass:snap -> TH.EmptyAction<"WITH_TYPE_ONLY">[]
  actual; // => [typeOnlyExpected]
}

// @dts-jest:group should correctly assert for an array with 2 args
{
  const actual = $action.filter(isActionOf([withTypeOnly, withPayload]));
  // @dts-jest:pass:snap -> (TH.EmptyAction<"WITH_TYPE_ONLY"> | TH.PayloadAction<"WITH_PAYLOAD", number>)[]
  actual; // => [typeOnlyExpected, payloadExpected]
}

// @dts-jest:group should correctly assert for an array with 3 args
{
  const actual = $action.filter(
    isActionOf([withTypeOnly, withPayload, withPayloadMeta])
  );
  // @dts-jest:pass:snap -> (TH.EmptyAction<"WITH_TYPE_ONLY"> | TH.PayloadAction<"WITH_PAYLOAD", number> | TH.PayloadMetaAction<"WITH_PAYLOAD_META", number, string>)[]
  actual; // => [typeOnlyExpected,payloadExpected,payloadMetaExpected]
}

// @dts-jest:group should correctly assert for an array with 4 args
{
  const actual = $action.filter(
    isActionOf([withTypeOnly, withPayload, withPayloadMeta, withMappedPayload])
  );
  // @dts-jest:pass:snap -> (TH.EmptyAction<"WITH_TYPE_ONLY"> | TH.PayloadAction<"WITH_PAYLOAD", number> | TH.PayloadAction<"WITH_MAPPED_PAYLOAD", number> | TH.PayloadMetaAction<"WITH_PAYLOAD_META", number, string>)[]
  actual; // => [typeOnlyExpected,payloadExpected,payloadMetaExpected,mappedPayloadExpected]
}

// @dts-jest:group should correctly assert for an array with 5 args
{
  const actual = $action.filter(
    isActionOf([
      withTypeOnly,
      withPayload,
      withPayloadMeta,
      withMappedPayload,
      withMappedPayloadMeta,
    ])
  );
  // @dts-jest:pass:snap -> (TH.EmptyAction<"WITH_TYPE_ONLY"> | TH.PayloadAction<"WITH_PAYLOAD", number> | TH.PayloadAction<"WITH_MAPPED_PAYLOAD", number> | TH.PayloadMetaAction<"WITH_PAYLOAD_META", number, string> | TH.PayloadMetaAction<"WITH_MAPPED_PAYLOAD_META", number, string>)[]
  actual; // => [typeOnlyExpected,payloadExpected,payloadMetaExpected,mappedPayloadExpected,mappedPayloadMetaExpected]
}

// @dts-jest:group should correctly assert type with "any" action
{
  const action: any = withPayload(1234);

  if (isActionOf([withPayload, withPayloadMeta], action)) {
    // @dts-jest:pass:snap -> TH.PayloadAction<"WITH_PAYLOAD", number> | TH.PayloadMetaAction<"WITH_PAYLOAD_META", number, string>
    action; // => {"payload": 1234, "type": "WITH_PAYLOAD"}
  }
  if (isActionOf([withPayload, withPayloadMeta])(action)) {
    // @dts-jest:pass:snap -> TH.PayloadAction<"WITH_PAYLOAD", number> | TH.PayloadMetaAction<"WITH_PAYLOAD_META", number, string>
    action; // => {"payload": 1234, "type": "WITH_PAYLOAD"}
  }
}

// @dts-jest:group should work with async action-creator objects
{
  // @dts-jest:pass:snap -> boolean
  isActionOf(asyncAction)(asyncRequestAction); // => true
  // @dts-jest:pass:snap -> boolean
  isActionOf(asyncAction, asyncSuccessAction); // => true
  // @dts-jest:pass:snap -> boolean
  isActionOf(asyncAction)(asyncFailureAction); // => true
  // @dts-jest:pass:snap -> boolean
  isActionOf(asyncAction, payloadAction); // => false
}

// @dts-jest:group should correctly assert for async action-creator objects
{
  const actual = $action.filter(isActionOf(asyncAction));
  // @dts-jest:pass:snap -> (TH.EmptyAction<"FETCH_USER_REQUEST"> | TH.PayloadAction<"FETCH_USER_SUCCESS", { firstName: string; lastName: string; }> | TH.PayloadAction<"FETCH_USER_FAILURE", Error>)[]
  actual; // => [asyncRequestExpected,asyncSuccessExpected,asyncFailureExpected]
}

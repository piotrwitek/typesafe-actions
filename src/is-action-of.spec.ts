import * as TH from './type-helpers';
import { createAsyncAction } from './create-async-action';
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

const $action = [
  typeOnlyAction,
  payloadAction,
  payloadMetaAction,
  mappedPayloadAction,
  mappedPayloadMetaAction,
];

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

const asyncActionWithCancel = createAsyncAction(
  'FETCH_TODOS_REQUEST',
  'FETCH_TODOS_SUCCESS',
  'FETCH_TODOS_FAILURE',
  'FETCH_TODOS_CANCEL'
)<undefined, string[], Error, string>();

const asyncCancelRequestAction = asyncActionWithCancel.request();
const asyncCancelSuccessAction = asyncActionWithCancel.success(['a']);
const asyncCancelFailureAction = asyncActionWithCancel.failure(
  new Error('boom')
);
const asyncCancelAction = asyncActionWithCancel.cancel('reason');

const anotherAsyncAction = createAsyncAction(
  'LOAD_ITEM_REQUEST',
  'LOAD_ITEM_SUCCESS',
  'LOAD_ITEM_FAILURE'
)<undefined, number, Error>();

const anotherAsyncSuccessAction = anotherAsyncAction.success(42);

const $asyncAndRegularActions = [
  typeOnlyAction,
  payloadAction,
  asyncRequestAction,
  asyncSuccessAction,
  asyncFailureAction,
];

/** TESTS */

// @dts-jest:group should work with single action-creator arg
{
  // @dts-jest:pass:snap
  isActionOf(withTypeOnly)(typeOnlyAction); // => true
  // @dts-jest:pass:snap
  isActionOf(withTypeOnly, typeOnlyAction); // => true
  // @dts-jest:pass:snap
  isActionOf(withTypeOnly)(payloadAction); // => false
  // @dts-jest:pass:snap
  isActionOf(withTypeOnly, payloadAction); // => false
  // @dts-jest:pass:snap
  isActionOf([withTypeOnly])(typeOnlyAction); // => true
  // @dts-jest:pass:snap
  isActionOf([withTypeOnly], typeOnlyAction); // => true
  // @dts-jest:pass:snap
  isActionOf([withTypeOnly])(payloadAction); // => false
  // @dts-jest:pass:snap
  isActionOf([withTypeOnly], payloadAction); // => false
}

// @dts-jest:group should work with multiple action-creator args
{
  // @dts-jest:pass:snap
  isActionOf([withTypeOnly, withPayload])(typeOnlyAction); // => true
  // @dts-jest:pass:snap
  isActionOf([withTypeOnly, withPayload], typeOnlyAction); // => true
  // @dts-jest:pass:snap
  isActionOf([withTypeOnly, withPayload])(payloadAction); // => true
  // @dts-jest:pass:snap
  isActionOf([withTypeOnly, withPayload], payloadAction); // => true
  // @dts-jest:pass:snap
  isActionOf([withTypeOnly, withPayload])(mappedPayloadAction); // => false
  // @dts-jest:pass:snap
  isActionOf([withTypeOnly, withPayload], mappedPayloadAction); // => false
}

// @dts-jest:group should correctly assert for an array with 1 arg
{
  const actual = $action.filter(isActionOf([withTypeOnly]));
  // @dts-jest:pass:snap
  actual; // => [typeOnlyExpected]
}

// @dts-jest:group should correctly assert for an array with 2 args
{
  const actual = $action.filter(isActionOf([withTypeOnly, withPayload]));
  // @dts-jest:pass:snap
  actual; // => [typeOnlyExpected, payloadExpected]
}

// @dts-jest:group should correctly assert for an array with 3 args
{
  const actual = $action.filter(
    isActionOf([withTypeOnly, withPayload, withPayloadMeta])
  );
  // @dts-jest:pass:snap
  actual; // => [typeOnlyExpected,payloadExpected,payloadMetaExpected]
}

// @dts-jest:group should correctly assert for an array with 4 args
{
  const actual = $action.filter(
    isActionOf([withTypeOnly, withPayload, withPayloadMeta, withMappedPayload])
  );
  // @dts-jest:pass:snap
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
  // @dts-jest:pass:snap
  actual; // => [typeOnlyExpected,payloadExpected,payloadMetaExpected,mappedPayloadExpected,mappedPayloadMetaExpected]
}

// @dts-jest:group should correctly assert type with "any" action
{
  const action: any = withPayload(1234);

  if (isActionOf([withPayload, withPayloadMeta], action)) {
    // @dts-jest:pass:snap
    action; // => {"payload": 1234, "type": "WITH_PAYLOAD"}
  }
  if (isActionOf([withPayload, withPayloadMeta])(action)) {
    // @dts-jest:pass:snap
    action; // => {"payload": 1234, "type": "WITH_PAYLOAD"}
  }
}

// @dts-jest:group should work with a single async-action object
{
  // @dts-jest:pass:snap
  isActionOf(asyncAction)(asyncRequestAction); // => true
  // @dts-jest:pass:snap
  isActionOf(asyncAction, asyncRequestAction); // => true
  // @dts-jest:pass:snap
  isActionOf(asyncAction)(asyncSuccessAction); // => true
  // @dts-jest:pass:snap
  isActionOf(asyncAction, asyncSuccessAction); // => true
  // @dts-jest:pass:snap
  isActionOf(asyncAction)(asyncFailureAction); // => true
  // @dts-jest:pass:snap
  isActionOf(asyncAction, asyncFailureAction); // => true
  // @dts-jest:pass:snap
  isActionOf(asyncAction)(payloadAction); // => false
  // @dts-jest:pass:snap
  isActionOf(asyncAction, payloadAction); // => false
  // @dts-jest:pass:snap
  isActionOf(asyncAction)(typeOnlyAction); // => false
  // @dts-jest:pass:snap
  isActionOf(asyncAction, mappedPayloadAction); // => false
}

// @dts-jest:group should work with async-action objects that include cancel
{
  // @dts-jest:pass:snap
  isActionOf(asyncActionWithCancel, asyncCancelRequestAction); // => true
  // @dts-jest:pass:snap
  isActionOf(asyncActionWithCancel)(asyncCancelSuccessAction); // => true
  // @dts-jest:pass:snap
  isActionOf(asyncActionWithCancel, asyncCancelFailureAction); // => true
  // @dts-jest:pass:snap
  isActionOf(asyncActionWithCancel)(asyncCancelAction); // => true
  // @dts-jest:pass:snap
  isActionOf(asyncActionWithCancel, asyncRequestAction); // => false
  // @dts-jest:pass:snap
  isActionOf(asyncActionWithCancel, payloadAction); // => false
}

// @dts-jest:group should work with an array of async-action objects
{
  // @dts-jest:pass:snap
  isActionOf([asyncAction])(asyncRequestAction); // => true
  // @dts-jest:pass:snap
  isActionOf([asyncAction], asyncSuccessAction); // => true
  // @dts-jest:pass:snap
  isActionOf([asyncAction, anotherAsyncAction])(asyncFailureAction); // => true
  // @dts-jest:pass:snap
  isActionOf([asyncAction, anotherAsyncAction], anotherAsyncSuccessAction); // => true
  // @dts-jest:pass:snap
  isActionOf([asyncAction, anotherAsyncAction])(payloadAction); // => false
  // @dts-jest:pass:snap
  isActionOf([asyncAction, anotherAsyncAction], typeOnlyAction); // => false
}

// @dts-jest:group should work with mixed async-action objects and action-creators
{
  // @dts-jest:pass:snap
  isActionOf([asyncAction, withPayload])(asyncRequestAction); // => true
  // @dts-jest:pass:snap
  isActionOf([asyncAction, withPayload], payloadAction); // => true
  // @dts-jest:pass:snap
  isActionOf([withTypeOnly, asyncAction])(typeOnlyAction); // => true
  // @dts-jest:pass:snap
  isActionOf([withTypeOnly, asyncAction], asyncFailureAction); // => true
  // @dts-jest:pass:snap
  isActionOf([asyncAction, withPayload])(mappedPayloadAction); // => false
  // @dts-jest:pass:snap
  isActionOf([asyncAction, withPayload], mappedPayloadMetaAction); // => false
}

// @dts-jest:group should correctly filter actions for a single async-action object
{
  const actual = $asyncAndRegularActions.filter(isActionOf(asyncAction));
  // @dts-jest:pass:snap
  actual; // => [asyncRequestExpected,asyncSuccessExpected,asyncFailureExpected]
}

// @dts-jest:group should correctly filter actions for mixed async and regular creators
{
  const actual = $asyncAndRegularActions.filter(
    isActionOf([asyncAction, withPayload])
  );
  // @dts-jest:pass:snap
  actual; // => [payloadExpected,asyncRequestExpected,asyncSuccessExpected,asyncFailureExpected]
}

// @dts-jest:group should correctly assert type for a single async-action object
{
  const action: any = asyncSuccessAction;

  if (isActionOf(asyncAction, action)) {
    // @dts-jest:pass:snap
    action; // => {"payload": {"firstName": "Ada", "lastName": "Lovelace"}, "type": "FETCH_USER_SUCCESS"}
  }
  if (isActionOf(asyncAction)(action)) {
    // @dts-jest:pass:snap
    action; // => {"payload": {"firstName": "Ada", "lastName": "Lovelace"}, "type": "FETCH_USER_SUCCESS"}
  }
}

// @dts-jest:group should correctly assert type for async-action objects with cancel
{
  const action: any = asyncCancelAction;

  if (isActionOf(asyncActionWithCancel, action)) {
    // @dts-jest:pass:snap
    action; // => {"payload": "reason", "type": "FETCH_TODOS_CANCEL"}
  }
  if (isActionOf(asyncActionWithCancel)(action)) {
    // @dts-jest:pass:snap
    action; // => {"payload": "reason", "type": "FETCH_TODOS_CANCEL"}
  }
}

// @dts-jest:group should correctly assert type for mixed async and regular creators
{
  const action: any = payloadAction;

  if (isActionOf([asyncAction, withPayload], action)) {
    // @dts-jest:pass:snap
    action; // => {"payload": 2, "type": "WITH_PAYLOAD"}
  }
  if (isActionOf([asyncAction, withPayload])(action)) {
    // @dts-jest:pass:snap
    action; // => {"payload": 2, "type": "WITH_PAYLOAD"}
  }
}

// @dts-jest:group should still match individual async action-creators
{
  // @dts-jest:pass:snap
  isActionOf(asyncAction.request, asyncRequestAction); // => true
  // @dts-jest:pass:snap
  isActionOf(asyncAction.success)(asyncSuccessAction); // => true
  // @dts-jest:pass:snap
  isActionOf(asyncAction.failure, asyncFailureAction); // => true
  // @dts-jest:pass:snap
  isActionOf(asyncAction.request, asyncSuccessAction); // => false
  // @dts-jest:pass:snap
  isActionOf([asyncAction.request, asyncAction.success], asyncFailureAction); // => false
}

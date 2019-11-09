import * as TH from './type-helpers';
import { testType } from './utils/testing';
import { getType } from './get-type';
import { isOfType } from './is-of-type';
import { isActionOf } from './is-action-of';
import { StateType, ActionType } from './type-helpers';

import { actions, types } from './type-helpers-fixtures';
const {
  withTypeOnly,
  withPayload,
  withPayloadMeta,
  withMappedPayload,
  withMappedPayloadMeta,
  asyncAction,
} = actions;

// @dts-jest:group StateType
{
  const reducer = (
    state: boolean = false,
    action: ActionType<typeof withTypeOnly>
  ) => {
    switch (action.type) {
      case getType(withTypeOnly):
        return true;
      default:
        return false;
    }
  };

  // @dts-jest:pass:snap
  testType<StateType<typeof reducer>>();
  // @dts-jest:pass:snap
  reducer(undefined, withTypeOnly()); // => true
}

// @dts-jest:group ActionType
{
  // @dts-jest:pass:snap
  testType<ActionType<typeof actions>>();
  type RootAction = ActionType<typeof actions>;

  function getTypeReducer(action: RootAction): RootAction | undefined {
    switch (action.type) {
      case getType(actions.deep.nested.withTypeOnly): {
        return testType<{ type: 'VERY_DEEP_WITH_TYPE_ONLY' }>(action);
      }
      case getType(withTypeOnly): {
        return testType<{ type: 'WITH_TYPE_ONLY' }>(action);
      }
      case getType(withPayload): {
        return testType<{ type: 'WITH_PAYLOAD'; payload: number }>(action);
      }
      case getType(withPayloadMeta): {
        return testType<{
          type: 'WITH_PAYLOAD_META';
          payload: number;
          meta: string;
        }>(action);
      }
      case getType(withMappedPayload): {
        return testType<{ type: 'WITH_MAPPED_PAYLOAD'; payload: number }>(
          action
        );
      }
      case getType(withMappedPayloadMeta): {
        return testType<{
          type: 'WITH_MAPPED_PAYLOAD_META';
          payload: number;
          meta: string;
        }>(action);
      }
      case getType(asyncAction.request): {
        return testType<{
          type: 'FETCH_USER_REQUEST';
        }>(action);
      }
      case getType(asyncAction.success): {
        return testType<{
          type: 'FETCH_USER_SUCCESS';
          payload: { firstName: string; lastName: string };
        }>(action);
      }
      case getType(asyncAction.failure): {
        return testType<{
          type: 'FETCH_USER_FAILURE';
          payload: Error;
        }>(action);
      }

      default:
        return undefined;
    }
  }

  function isActionOfReducer(action: RootAction): RootAction | undefined {
    if (isActionOf(actions.deep.nested.withTypeOnly, action)) {
      return testType<{ type: 'VERY_DEEP_WITH_TYPE_ONLY' }>(action);
    } else if (isActionOf(withTypeOnly, action)) {
      return testType<{ type: 'WITH_TYPE_ONLY' }>(action);
    } else if (isActionOf(withPayload, action)) {
      return testType<{ type: 'WITH_PAYLOAD'; payload: number }>(action);
    } else if (isActionOf(withPayloadMeta, action)) {
      return testType<{
        type: 'WITH_PAYLOAD_META';
        payload: number;
        meta: string;
      }>(action);
    } else if (isActionOf(withMappedPayload, action)) {
      return testType<{ type: 'WITH_MAPPED_PAYLOAD'; payload: number }>(action);
    } else if (isActionOf(withMappedPayloadMeta, action)) {
      return testType<{
        type: 'WITH_MAPPED_PAYLOAD_META';
        payload: number;
        meta: string;
      }>(action);
    } else if (isActionOf(asyncAction.request, action)) {
      return testType<{
        type: 'FETCH_USER_REQUEST';
      }>(action);
    }

    return undefined;
  }

  function isActionOfCurriedReducer(
    action: RootAction
  ): RootAction | undefined {
    if (isActionOf(actions.deep.nested.withTypeOnly)(action)) {
      return testType<{ type: 'VERY_DEEP_WITH_TYPE_ONLY' }>(action);
    } else if (isActionOf(withTypeOnly)(action)) {
      return testType<{ type: 'WITH_TYPE_ONLY' }>(action);
    } else if (isActionOf(withPayload)(action)) {
      return testType<{ type: 'WITH_PAYLOAD'; payload: number }>(action);
    } else if (isActionOf(withPayloadMeta)(action)) {
      return testType<{
        type: 'WITH_PAYLOAD_META';
        payload: number;
        meta: string;
      }>(action);
    } else if (isActionOf(withMappedPayload)(action)) {
      return testType<{ type: 'WITH_MAPPED_PAYLOAD'; payload: number }>(action);
    } else if (isActionOf(withMappedPayloadMeta)(action)) {
      return testType<{
        type: 'WITH_MAPPED_PAYLOAD_META';
        payload: number;
        meta: string;
      }>(action);
    } else if (isActionOf(asyncAction.request)(action)) {
      return testType<{
        type: 'FETCH_USER_REQUEST';
      }>(action);
    }

    return undefined;
  }

  function isActionOfArrayReducer(action: RootAction): RootAction | undefined {
    if (isActionOf([actions.deep.nested.withTypeOnly])(action)) {
      return testType<{ type: 'VERY_DEEP_WITH_TYPE_ONLY' }>(action);
    } else if (isActionOf([withTypeOnly])(action)) {
      return testType<{ type: 'WITH_TYPE_ONLY' }>(action);
    } else if (isActionOf([withTypeOnly])(action)) {
      return testType<{ type: 'WITH_TYPE_ONLY' }>(action);
    } else if (isActionOf([withPayload])(action)) {
      return testType<{ type: 'WITH_PAYLOAD'; payload: number }>(action);
    } else if (isActionOf([withPayloadMeta])(action)) {
      return testType<{
        type: 'WITH_PAYLOAD_META';
        payload: number;
        meta: string;
      }>(action);
    } else if (isActionOf([withMappedPayload])(action)) {
      return testType<{ type: 'WITH_MAPPED_PAYLOAD'; payload: number }>(action);
    } else if (isActionOf([withMappedPayloadMeta])(action)) {
      return testType<{
        type: 'WITH_MAPPED_PAYLOAD_META';
        payload: number;
        meta: string;
      }>(action);
    } else if (isActionOf([asyncAction.request])(action)) {
      return testType<{
        type: 'FETCH_USER_REQUEST';
      }>(action);
    }

    return undefined;
  }

  function isOfTypeReducer(action: RootAction): RootAction | undefined {
    if (isOfType(types.VERY_DEEP_WITH_TYPE_ONLY, action)) {
      return testType<{ type: 'VERY_DEEP_WITH_TYPE_ONLY' }>(action);
    } else if (isOfType(types.WITH_TYPE_ONLY, action)) {
      return testType<{ type: 'WITH_TYPE_ONLY' }>(action);
    } else if (isOfType(types.WITH_PAYLOAD, action)) {
      return testType<{ type: 'WITH_PAYLOAD'; payload: number }>(action);
    } else if (isOfType(types.WITH_PAYLOAD_META, action)) {
      return testType<{
        type: 'WITH_PAYLOAD_META';
        payload: number;
        meta: string;
      }>(action);
    } else if (isOfType(types.WITH_MAPPED_PAYLOAD, action)) {
      return testType<{ type: 'WITH_MAPPED_PAYLOAD'; payload: number }>(action);
    } else if (isOfType(types.WITH_MAPPED_PAYLOAD_META, action)) {
      return testType<{
        type: 'WITH_MAPPED_PAYLOAD_META';
        payload: number;
        meta: string;
      }>(action);
    } else if (isOfType('FETCH_USER_REQUEST', action)) {
      return testType<{ type: 'FETCH_USER_REQUEST' }>(action);
    }

    return undefined;
  }

  function isOfTypeCurriedReducer(action: RootAction): RootAction | undefined {
    if (isOfType(types.VERY_DEEP_WITH_TYPE_ONLY)(action)) {
      return testType<{ type: 'VERY_DEEP_WITH_TYPE_ONLY' }>(action);
    } else if (isOfType(types.WITH_TYPE_ONLY)(action)) {
      return testType<{ type: 'WITH_TYPE_ONLY' }>(action);
    } else if (isOfType(types.WITH_PAYLOAD)(action)) {
      return testType<{ type: 'WITH_PAYLOAD'; payload: number }>(action);
    } else if (isOfType(types.WITH_PAYLOAD_META)(action)) {
      return testType<{
        type: 'WITH_PAYLOAD_META';
        payload: number;
        meta: string;
      }>(action);
    } else if (isOfType(types.WITH_MAPPED_PAYLOAD)(action)) {
      return testType<{ type: 'WITH_MAPPED_PAYLOAD'; payload: number }>(action);
    } else if (isOfType(types.WITH_MAPPED_PAYLOAD_META)(action)) {
      return testType<{
        type: 'WITH_MAPPED_PAYLOAD_META';
        payload: number;
        meta: string;
      }>(action);
    } else if (isOfType('FETCH_USER_REQUEST')(action)) {
      return testType<{ type: 'FETCH_USER_REQUEST' }>(action);
    }

    return undefined;
  }

  const emptyAction = withTypeOnly();
  const expectedEmptyAction = { type: 'WITH_TYPE_ONLY' };
  // @dts-jest:pass:snap
  getTypeReducer(emptyAction); // => expectedEmptyAction
  // @dts-jest:pass:snap
  isActionOfReducer(emptyAction); // => expectedEmptyAction
  // @dts-jest:pass:snap
  isActionOfCurriedReducer(emptyAction); // => expectedEmptyAction
  // @dts-jest:pass:snap
  isActionOfArrayReducer(emptyAction); // => expectedEmptyAction
  // @dts-jest:pass:snap
  isOfTypeReducer(emptyAction); // => expectedEmptyAction
  // @dts-jest:pass:snap
  isOfTypeCurriedReducer(emptyAction); // => expectedEmptyAction

  const payloadAction = withPayload(2);
  const expectedPayloadAction = { type: 'WITH_PAYLOAD', payload: 2 };
  // @dts-jest:pass:snap
  getTypeReducer(payloadAction); // => expectedPayloadAction
  // @dts-jest:pass:snap
  isActionOfReducer(payloadAction); // => expectedPayloadAction
  // @dts-jest:pass:snap
  isActionOfCurriedReducer(payloadAction); // => expectedPayloadAction
  // @dts-jest:pass:snap
  isActionOfArrayReducer(payloadAction); // => expectedPayloadAction
  // @dts-jest:pass:snap
  isOfTypeReducer(payloadAction); // => expectedPayloadAction
  // @dts-jest:pass:snap
  isOfTypeCurriedReducer(payloadAction); // => expectedPayloadAction

  const payloadMetaAction = withPayloadMeta(2, 'metaValue');
  const expectedPayloadMetaAction = {
    type: 'WITH_PAYLOAD_META',
    payload: 2,
    meta: 'metaValue',
  };
  // @dts-jest:pass:snap
  getTypeReducer(payloadMetaAction); // => expectedPayloadMetaAction
  // @dts-jest:pass:snap
  isActionOfReducer(payloadMetaAction); // => expectedPayloadMetaAction
  // @dts-jest:pass:snap
  isActionOfCurriedReducer(payloadMetaAction); // => expectedPayloadMetaAction
  // @dts-jest:pass:snap
  isActionOfArrayReducer(payloadMetaAction); // => expectedPayloadMetaAction
  // @dts-jest:pass:snap
  isOfTypeReducer(payloadMetaAction); // => expectedPayloadMetaAction
  // @dts-jest:pass:snap
  isOfTypeCurriedReducer(payloadMetaAction); // => expectedPayloadMetaAction

  const mappedPayloadAction = withMappedPayload(2);
  const expectedMappedPayloadAction = {
    type: 'WITH_MAPPED_PAYLOAD',
    payload: 2,
  };
  // @dts-jest:pass:snap
  getTypeReducer(mappedPayloadAction); // => expectedMappedPayloadAction
  // @dts-jest:pass:snap
  isActionOfReducer(mappedPayloadAction); // => expectedMappedPayloadAction
  // @dts-jest:pass:snap
  isActionOfCurriedReducer(mappedPayloadAction); // => expectedMappedPayloadAction
  // @dts-jest:pass:snap
  isActionOfArrayReducer(mappedPayloadAction); // => expectedMappedPayloadAction
  // @dts-jest:pass:snap
  isOfTypeReducer(mappedPayloadAction); // => expectedMappedPayloadAction
  // @dts-jest:pass:snap
  isOfTypeCurriedReducer(mappedPayloadAction); // => expectedMappedPayloadAction

  const mappedPayloadMetaAction = withMappedPayloadMeta(2, 'metaValue');
  const expectedMappedPayloadMetaAction = {
    type: 'WITH_MAPPED_PAYLOAD_META',
    payload: 2,
    meta: 'metaValue',
  };
  // @dts-jest:pass:snap
  getTypeReducer(mappedPayloadMetaAction); // => expectedMappedPayloadMetaAction
  // @dts-jest:pass:snap
  isActionOfReducer(mappedPayloadMetaAction); // => expectedMappedPayloadMetaAction
  // @dts-jest:pass:snap
  isActionOfCurriedReducer(mappedPayloadMetaAction); // => expectedMappedPayloadMetaAction
  // @dts-jest:pass:snap
  isActionOfArrayReducer(mappedPayloadMetaAction); // => expectedMappedPayloadMetaAction
  // @dts-jest:pass:snap
  isOfTypeReducer(mappedPayloadMetaAction); // => expectedMappedPayloadMetaAction
  // @dts-jest:pass:snap
  isOfTypeCurriedReducer(mappedPayloadMetaAction); // => expectedMappedPayloadMetaAction

  const asyncActionRequest = asyncAction.request();
  const expectedAsyncActionRequest = {
    type: 'FETCH_USER_REQUEST',
  };
  // @dts-jest:pass:snap
  getTypeReducer(asyncActionRequest); // => expectedAsyncActionRequest
  // @dts-jest:pass:snap
  isActionOfReducer(asyncActionRequest); // => expectedAsyncActionRequest
  // @dts-jest:pass:snap
  isActionOfCurriedReducer(asyncActionRequest); // => expectedAsyncActionRequest
  // @dts-jest:pass:snap
  isActionOfArrayReducer(asyncActionRequest); // => expectedAsyncActionRequest
  // @dts-jest:pass:snap
  isOfTypeReducer(asyncActionRequest); // => expectedAsyncActionRequest
  // @dts-jest:pass:snap
  isOfTypeCurriedReducer(asyncActionRequest); // => expectedAsyncActionRequest
}

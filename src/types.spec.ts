import { getType } from './get-type';
import { isOfType } from './is-of-type';
import { isActionOf } from './is-action-of';
import { StateType, ActionType } from './types';

import { types, actions, testType, User } from './test-utils';
const {
  withTypeOnly,
  withPayload,
  withPayloadMeta,
  withMappedPayload,
  withMappedPayloadMeta,
  asyncAction,
} = actions;

describe('StateType', () => {
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

  type ReducerState = StateType<typeof reducer>;
  testType<ReducerState>(true);
  expect(reducer(undefined, withTypeOnly())).toBe(true);
});

describe('ActionType', () => {
  type RootAction = ActionType<typeof actions>;

  function getTypeReducer(action: RootAction): RootAction | undefined {
    switch (action.type) {
      case getType(actions.very.deep.withTypeOnly): {
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
          payload: User;
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
    if (isActionOf(actions.very.deep.withTypeOnly, action)) {
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
    if (isActionOf(actions.very.deep.withTypeOnly)(action)) {
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
    if (isActionOf([actions.very.deep.withTypeOnly])(action)) {
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

  describe('action-helpers - createStandardAction', () => {
    it('should return action with type only', () => {
      const actual = withTypeOnly();
      const expected = { type: 'WITH_TYPE_ONLY' };
      expect(getTypeReducer(actual)).toEqual(expected);
      expect(isActionOfReducer(actual)).toEqual(expected);
      expect(isActionOfCurriedReducer(actual)).toEqual(expected);
      expect(isActionOfArrayReducer(actual)).toEqual(expected);
      expect(isOfTypeReducer(actual)).toEqual(expected);
      expect(isOfTypeCurriedReducer(actual)).toEqual(expected);
    });

    it('should return action with payload', () => {
      const actual = withPayload(2);
      const expected = { type: 'WITH_PAYLOAD', payload: 2 };
      expect(getTypeReducer(actual)).toEqual(expected);
      expect(isActionOfReducer(actual)).toEqual(expected);
      expect(isActionOfCurriedReducer(actual)).toEqual(expected);
      expect(isActionOfArrayReducer(actual)).toEqual(expected);
      expect(isOfTypeReducer(actual)).toEqual(expected);
      expect(isOfTypeCurriedReducer(actual)).toEqual(expected);
    });

    it('should return action with payload and meta', () => {
      const actual = withPayloadMeta(2, 'metaValue');
      const expected = {
        type: 'WITH_PAYLOAD_META',
        payload: 2,
        meta: 'metaValue',
      };
      expect(getTypeReducer(actual)).toEqual(expected);
      expect(isActionOfReducer(actual)).toEqual(expected);
      expect(isActionOfCurriedReducer(actual)).toEqual(expected);
      expect(isActionOfArrayReducer(actual)).toEqual(expected);
      expect(isOfTypeReducer(actual)).toEqual(expected);
      expect(isOfTypeCurriedReducer(actual)).toEqual(expected);
    });

    it('should return action with mapped payload', () => {
      const actual = withMappedPayload(2);
      const expected = { type: 'WITH_MAPPED_PAYLOAD', payload: 2 };
      expect(getTypeReducer(actual)).toEqual(expected);
      expect(isActionOfReducer(actual)).toEqual(expected);
      expect(isActionOfCurriedReducer(actual)).toEqual(expected);
      expect(isActionOfArrayReducer(actual)).toEqual(expected);
      expect(isOfTypeReducer(actual)).toEqual(expected);
      expect(isOfTypeCurriedReducer(actual)).toEqual(expected);
    });

    it('should return action with mapped payload and meta', () => {
      const actual = withMappedPayloadMeta(2, 'metaValue');
      const expected = {
        type: 'WITH_MAPPED_PAYLOAD_META',
        payload: 2,
        meta: 'metaValue',
      };
      expect(getTypeReducer(actual)).toEqual(expected);
      expect(isActionOfReducer(actual)).toEqual(expected);
      expect(isActionOfCurriedReducer(actual)).toEqual(expected);
      expect(isActionOfArrayReducer(actual)).toEqual(expected);
      expect(isOfTypeReducer(actual)).toEqual(expected);
      expect(isOfTypeCurriedReducer(actual)).toEqual(expected);
    });

    it('should return action with async action', () => {
      const actual = asyncAction.request();
      const expected = {
        type: 'FETCH_USER_REQUEST',
      };
      expect(getTypeReducer(actual)).toEqual(expected);
      expect(isActionOfReducer(actual)).toEqual(expected);
      expect(isActionOfCurriedReducer(actual)).toEqual(expected);
      expect(isActionOfArrayReducer(actual)).toEqual(expected);
      expect(isOfTypeReducer(actual)).toEqual(expected);
      expect(isOfTypeCurriedReducer(actual)).toEqual(expected);
    });
  });
});

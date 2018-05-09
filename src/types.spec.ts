import { getType, isOfType, isActionOf } from './';
import { ActionsUnion } from './types';
import { types, actions, testType, User } from './test-utils';
const {
  withSymbolType,
  withTypeOnly,
  withPayload,
  withPayloadMeta,
  withMappedPayload,
  withMappedPayloadMeta,
  asyncAction,
} = actions;

describe('ActionsUnion', () => {
  type RootAction = ActionsUnion<typeof actions>;

  function switchReducer(action: RootAction): RootAction | undefined {
    switch (action.type) {
      case getType(actions.very.deep.withTypeOnly): {
        return testType<{ type: 'VERY_DEEP_WITH_TYPE_ONLY' }>(action);
      }
      case getType(withSymbolType): {
        return testType<{ type: 'WITH_SYMBOL_TYPE' }>(action);
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

  function ifReducer(action: RootAction): RootAction | undefined {
    if (isActionOf(actions.very.deep.withTypeOnly, action)) {
      return testType<{ type: 'VERY_DEEP_WITH_TYPE_ONLY' }>(action);
    } else if (isActionOf(withSymbolType, action)) {
      return testType<{ type: 'WITH_SYMBOL_TYPE' }>(action);
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

  function ifReducerCurried(action: RootAction): RootAction | undefined {
    if (isActionOf(actions.very.deep.withTypeOnly)(action)) {
      return testType<{ type: 'VERY_DEEP_WITH_TYPE_ONLY' }>(action);
    } else if (isActionOf(withSymbolType)(action)) {
      return testType<{ type: 'WITH_SYMBOL_TYPE' }>(action);
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

  function ifReducerArray(action: RootAction): RootAction | undefined {
    if (isActionOf([actions.very.deep.withTypeOnly])(action)) {
      return testType<{ type: 'VERY_DEEP_WITH_TYPE_ONLY' }>(action);
    } else if (isActionOf([withSymbolType])(action)) {
      return testType<{ type: 'WITH_SYMBOL_TYPE' }>(action);
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

  function hasReducer(action: RootAction): RootAction | undefined {
    if (isOfType(types.VERY_DEEP_WITH_TYPE_ONLY, action)) {
      return testType<{ type: 'VERY_DEEP_WITH_TYPE_ONLY' }>(action);
    } else if (isOfType(types.WITH_SYMBOL_TYPE, action)) {
      return testType<{ type: 'WITH_SYMBOL_TYPE' }>(action);
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

  function hasReducerCurried(action: RootAction): RootAction | undefined {
    if (isOfType(types.VERY_DEEP_WITH_TYPE_ONLY)(action)) {
      return testType<{ type: 'VERY_DEEP_WITH_TYPE_ONLY' }>(action);
    } else if (isOfType(types.WITH_SYMBOL_TYPE)(action)) {
      return testType<{ type: 'WITH_SYMBOL_TYPE' }>(action);
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

  describe('with createStandardAction', () => {
    it('should return action with symbol type', () => {
      const actual = withSymbolType();
      const expected = { type: types.WITH_SYMBOL_TYPE };
      expect(switchReducer(actual)).toEqual(expected);
      expect(ifReducer(actual)).toEqual(expected);
      expect(ifReducerCurried(actual)).toEqual(expected);
      expect(ifReducerArray(actual)).toEqual(expected);
      expect(hasReducer(actual)).toEqual(expected);
      expect(hasReducerCurried(actual)).toEqual(expected);
    });

    it('should return action with type only', () => {
      const actual = withTypeOnly();
      const expected = { type: 'WITH_TYPE_ONLY' };
      expect(switchReducer(actual)).toEqual(expected);
      expect(ifReducer(actual)).toEqual(expected);
      expect(ifReducerCurried(actual)).toEqual(expected);
      expect(ifReducerArray(actual)).toEqual(expected);
      expect(hasReducer(actual)).toEqual(expected);
      expect(hasReducerCurried(actual)).toEqual(expected);
    });

    it('should return action with payload', () => {
      const actual = withPayload(2);
      const expected = { type: 'WITH_PAYLOAD', payload: 2 };
      expect(switchReducer(actual)).toEqual(expected);
      expect(ifReducer(actual)).toEqual(expected);
      expect(ifReducerCurried(actual)).toEqual(expected);
      expect(ifReducerArray(actual)).toEqual(expected);
      expect(hasReducer(actual)).toEqual(expected);
      expect(hasReducerCurried(actual)).toEqual(expected);
    });

    it('should return action with payload and meta', () => {
      const actual = withPayloadMeta(2, 'metaValue');
      const expected = {
        type: 'WITH_PAYLOAD_META',
        payload: 2,
        meta: 'metaValue',
      };
      expect(switchReducer(actual)).toEqual(expected);
      expect(ifReducer(actual)).toEqual(expected);
      expect(ifReducerCurried(actual)).toEqual(expected);
      expect(ifReducerArray(actual)).toEqual(expected);
      expect(hasReducer(actual)).toEqual(expected);
      expect(hasReducerCurried(actual)).toEqual(expected);
    });

    it('should return action with mapped payload', () => {
      const actual = withMappedPayload(2);
      const expected = { type: 'WITH_MAPPED_PAYLOAD', payload: 2 };
      expect(switchReducer(actual)).toEqual(expected);
      expect(ifReducer(actual)).toEqual(expected);
      expect(ifReducerCurried(actual)).toEqual(expected);
      expect(ifReducerArray(actual)).toEqual(expected);
      expect(hasReducer(actual)).toEqual(expected);
      expect(hasReducerCurried(actual)).toEqual(expected);
    });

    it('should return action with mapped payload and meta', () => {
      const actual = withMappedPayloadMeta(2, 'metaValue');
      const expected = {
        type: 'WITH_MAPPED_PAYLOAD_META',
        payload: 2,
        meta: 'metaValue',
      };
      expect(switchReducer(actual)).toEqual(expected);
      expect(ifReducer(actual)).toEqual(expected);
      expect(ifReducerCurried(actual)).toEqual(expected);
      expect(ifReducerArray(actual)).toEqual(expected);
      expect(hasReducer(actual)).toEqual(expected);
      expect(hasReducerCurried(actual)).toEqual(expected);
    });

    it('should return action with async action', () => {
      const actual = asyncAction.request();
      const expected = {
        type: 'FETCH_USER_REQUEST',
      };
      expect(switchReducer(actual)).toEqual(expected);
      expect(ifReducer(actual)).toEqual(expected);
      expect(ifReducerCurried(actual)).toEqual(expected);
      expect(ifReducerArray(actual)).toEqual(expected);
      expect(hasReducer(actual)).toEqual(expected);
      expect(hasReducerCurried(actual)).toEqual(expected);
    });
  });
});

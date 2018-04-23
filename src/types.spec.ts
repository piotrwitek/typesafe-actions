import { buildAction, getType, isOfType, isActionOf } from './';
import { ActionsUnion } from './types';
import { types, actions, testType } from './test-utils';
const {
  withTypeOnly,
  withPayload,
  withPayloadMeta,
  withMappedPayload,
  withMappedPayloadMeta,
} = actions;

describe('ActionsUnion', () => {
  type RootAction = ActionsUnion<typeof actions>;
  function switchReducer(action: RootAction): RootAction {
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
    }
  }

  function ifReducer(action: RootAction): RootAction {
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
    }
    return action;
  }

  function ifReducerCurried(action: RootAction): RootAction {
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
    }
    return action;
  }

  function ifReducerArray(action: RootAction): RootAction {
    if (isActionOf([actions.very.deep.withTypeOnly])(action)) {
      return testType<{ type: 'VERY_DEEP_WITH_TYPE_ONLY' }>(action);
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
    }
    return action;
  }

  function hasReducer(action: RootAction): RootAction {
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
    }
    return action;
  }

  function hasReducerCurried(action: RootAction): RootAction {
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
    }
    return action;
  }

  describe('with buildAction', () => {
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
  });
});

import { createAction } from './create-action';
import { createAsyncAction } from './create-async-action';
import { createCustomAction } from './create-custom-action';

/**
 * Fixtures
 */

export namespace types {
  // String Literal Types
  export const VERY_DEEP_WITH_TYPE_ONLY = 'VERY_DEEP_WITH_TYPE_ONLY';
  export const WITH_TYPE_ONLY = 'WITH_TYPE_ONLY';
  export const WITH_PAYLOAD = 'WITH_PAYLOAD';
  export const WITH_OPTIONAL_PAYLOAD = 'WITH_OPTIONAL_PAYLOAD';
  export const WITH_PAYLOAD_META = 'WITH_PAYLOAD_META';
  export const WITH_MAPPED_PAYLOAD = 'WITH_MAPPED_PAYLOAD';
  export const WITH_MAPPED_PAYLOAD_META = 'WITH_MAPPED_PAYLOAD_META';
}

export const actions = {
  deep: {
    nested: {
      withTypeOnly: createCustomAction(types.VERY_DEEP_WITH_TYPE_ONLY),
    },
  },
  withTypeOnly: createAction(types.WITH_TYPE_ONLY)<undefined>(),
  withPayload: createAction(types.WITH_PAYLOAD)<number>(),
  withOptionalPayload: createAction(types.WITH_OPTIONAL_PAYLOAD)<
    number | undefined
  >(),
  withPayloadMeta: createAction(types.WITH_PAYLOAD_META)<number, string>(),
  withMappedPayload: createAction(
    types.WITH_MAPPED_PAYLOAD,
    (payload: number) => payload
  )(),
  withMappedPayloadMeta: createAction(
    types.WITH_MAPPED_PAYLOAD_META,
    (payload: number, meta: string) => payload,
    (payload: number, meta: string) => meta
  )(),
  asyncAction: createAsyncAction(
    'FETCH_USER_REQUEST',
    'FETCH_USER_SUCCESS',
    'FETCH_USER_FAILURE'
  )<undefined, { firstName: string; lastName: string }, Error>(),
};

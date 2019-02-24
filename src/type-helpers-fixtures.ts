import { createStandardAction } from './create-standard-action';
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
  export const WITH_META = 'WITH_META';
  export const WITH_PAYLOAD_META = 'WITH_PAYLOAD_META';
  export const WITH_MAPPED_PAYLOAD = 'WITH_MAPPED_PAYLOAD';
  export const WITH_MAPPED_META = 'WITH_MAPPED_META';
  export const WITH_MAPPED_PAYLOAD_META = 'WITH_MAPPED_PAYLOAD_META';
  export const SIMPLE_WITH_TYPE_ONLY = 'SIMPLE_WITH_TYPE_ONLY';
  export const SIMPLE_WITH_PAYLOAD = 'SIMPLE_WITH_PAYLOAD';
  export const SIMPLE_WITH_OPTIONAL_PAYLOAD = 'SIMPLE_WITH_OPTIONAL_PAYLOAD';
  export const SIMPLE_WITH_META = 'SIMPLE_WITH_META';
  export const SIMPLE_WITH_PAYLOAD_META = 'SIMPLE_WITH_PAYLOAD_META';
}

export const actions = {
  deep: {
    nested: {
      withTypeOnly: createCustomAction(types.VERY_DEEP_WITH_TYPE_ONLY),
    },
  },
  withTypeOnly: createStandardAction(types.WITH_TYPE_ONLY)<undefined>(),
  withPayload: createStandardAction(types.WITH_PAYLOAD)<number>(),
  withOptionalPayload: createStandardAction(types.WITH_OPTIONAL_PAYLOAD)<
    number | undefined
  >(),
  withMeta: createStandardAction(types.WITH_META)<undefined, string>(),
  withPayloadMeta: createStandardAction(types.WITH_PAYLOAD_META)<
    number,
    string
  >(),
  withMappedPayload: createStandardAction(types.WITH_MAPPED_PAYLOAD).map(
    (payload: number) => ({ payload })
  ),
  withMappedMeta: createStandardAction(types.WITH_MAPPED_META).map(
    (meta: string) => ({ meta })
  ),
  withMappedPayloadMeta: createStandardAction(
    types.WITH_MAPPED_PAYLOAD_META
  ).map((payload: number, meta: string) => ({ payload, meta })),
  asyncAction: createAsyncAction(
    'FETCH_USER_REQUEST',
    'FETCH_USER_SUCCESS',
    'FETCH_USER_FAILURE'
  )<undefined, { firstName: string; lastName: string }, Error>(),
};

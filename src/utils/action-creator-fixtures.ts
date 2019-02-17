import { action } from '../action';
import { createStandardAction } from '../create-standard-action';
import { createAsyncAction } from '../create-async-action';

import { types } from './type-fixtures';

/**
 * Fixtures
 */

export const actions = {
  very: {
    deep: {
      withTypeOnly: createStandardAction(types.VERY_DEEP_WITH_TYPE_ONLY)(),
    },
  },
  withTypeOnly: createStandardAction(types.WITH_TYPE_ONLY)<void>(),
  withPayload: createStandardAction(types.WITH_PAYLOAD)<number>(),
  withOptionalPayload: createStandardAction(types.WITH_OPTIONAL_PAYLOAD)<
    number | undefined
  >(),
  withMeta: createStandardAction(types.WITH_META)<void, string>(),
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
  )<void, { firstName: string; lastName: string }, Error>(),
  simpleWithTypeOnly: () => action(types.SIMPLE_WITH_TYPE_ONLY),
  simpleWithPayload: (int: number) => action(types.SIMPLE_WITH_PAYLOAD, int),
  simpleWithOptionalPayload: (int?: number) =>
    action(types.SIMPLE_WITH_OPTIONAL_PAYLOAD, int),
  simpleWithMeta: (str: string) =>
    action(types.SIMPLE_WITH_META, undefined, str),
  simpleWithPayloadMeta: (int: number, str: string) =>
    action(types.SIMPLE_WITH_PAYLOAD_META, int, str),
};

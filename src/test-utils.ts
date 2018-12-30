import { action } from './action';
import { createStandardAction } from './create-standard-action';
import { createAsyncAction } from './create-async-action';

/** @internal */
export function testType<T>(a: T): T {
  return a;
}

/**
 * Fixtures
 */

/** @internal */
export type User = { firstName: string; lastName: string };

/** @internal */
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
export type TypesKeys = keyof typeof types;

/** @internal */
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
  )<void, User, Error>(),
  simpleWithTypeOnly: () => action(types.SIMPLE_WITH_TYPE_ONLY),
  simpleWithPayload: (int: number) => action(types.SIMPLE_WITH_PAYLOAD, int),
  simpleWithOptionalPayload: (int?: number) =>
    action(types.SIMPLE_WITH_OPTIONAL_PAYLOAD, int),
  simpleWithMeta: (str: string) =>
    action(types.SIMPLE_WITH_META, undefined, str),
  simpleWithPayloadMeta: (int: number, str: string) =>
    action(types.SIMPLE_WITH_PAYLOAD_META, int, str),
};

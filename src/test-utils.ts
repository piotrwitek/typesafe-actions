import { createStandardAction, createAsyncAction } from './';

/**
 * Fixtures
 */

export type User = { firstName: string; lastName: string };

export namespace types {
  // Symbol
  export const WITH_SYMBOL_TYPE = (Symbol(1) as any) as 'WITH_SYMBOL_TYPE';
  // String Literal
  export const VERY_DEEP_WITH_TYPE_ONLY = 'VERY_DEEP_WITH_TYPE_ONLY';
  export const WITH_TYPE_ONLY = 'WITH_TYPE_ONLY';
  export const WITH_PAYLOAD = 'WITH_PAYLOAD';
  export const WITH_PAYLOAD_META = 'WITH_PAYLOAD_META';
  export const WITH_MAPPED_PAYLOAD = 'WITH_MAPPED_PAYLOAD';
  export const WITH_MAPPED_PAYLOAD_META = 'WITH_MAPPED_PAYLOAD_META';
}

export const actions = {
  withSymbolType: createStandardAction(types.WITH_SYMBOL_TYPE)(),
  very: {
    deep: {
      withTypeOnly: createStandardAction(types.VERY_DEEP_WITH_TYPE_ONLY)(),
    },
  },
  withTypeOnly: createStandardAction(types.WITH_TYPE_ONLY)<void>(),
  withPayload: createStandardAction(types.WITH_PAYLOAD)<number>(),
  withPayloadMeta: createStandardAction(types.WITH_PAYLOAD_META)<
    number,
    string
  >(),
  withMappedPayload: createStandardAction(types.WITH_MAPPED_PAYLOAD).map(
    (payload: number) => ({ payload })
  ),
  withMappedPayloadMeta: createStandardAction(
    types.WITH_MAPPED_PAYLOAD_META
  ).map((payload: number, meta: string) => ({ payload, meta })),
  asyncAction: createAsyncAction(
    'FETCH_USER_REQUEST',
    'FETCH_USER_SUCCESS',
    'FETCH_USER_FAILURE'
  )<void, User, Error>(),
};

/**
 *  Utils
 */
export function testType<T>(a: T): T {
  return a;
}

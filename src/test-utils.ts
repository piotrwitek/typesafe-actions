import { action, createStandardAction, createAsyncAction } from './';

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
// enum SymbolType {}

/** @internal */
export namespace types {
  // Symbol Types
  // export const WITH_SYMBOL_TYPE = (Symbol(1) as any) as SymbolType & string;
  // String Literal Types
  export const VERY_DEEP_WITH_TYPE_ONLY = 'VERY_DEEP_WITH_TYPE_ONLY';
  export const WITH_TYPE_ONLY = 'WITH_TYPE_ONLY';
  export const WITH_PAYLOAD = 'WITH_PAYLOAD';
  export const WITH_META = 'WITH_META';
  export const WITH_PAYLOAD_META = 'WITH_PAYLOAD_META';
  export const WITH_MAPPED_PAYLOAD = 'WITH_MAPPED_PAYLOAD';
  export const WITH_MAPPED_META = 'WITH_MAPPED_META';
  export const WITH_MAPPED_PAYLOAD_META = 'WITH_MAPPED_PAYLOAD_META';
  export const SIMPLE_WITH_TYPE_ONLY = 'SIMPLE_WITH_TYPE_ONLY';
  export const SIMPLE_WITH_PAYLOAD = 'SIMPLE_WITH_PAYLOAD';
  export const SIMPLE_WITH_META = 'SIMPLE_WITH_META';
  export const SIMPLE_WITH_PAYLOAD_META = 'SIMPLE_WITH_PAYLOAD_META';
}
export type TypesKeys = keyof typeof types;

/** @internal */
export const actions = {
  // withSymbolType: createStandardAction(types.WITH_SYMBOL_TYPE)(),
  very: {
    deep: {
      withTypeOnly: createStandardAction(types.VERY_DEEP_WITH_TYPE_ONLY)(),
    },
  },
  withTypeOnly: createStandardAction(types.WITH_TYPE_ONLY)<void>(),
  withPayload: createStandardAction(types.WITH_PAYLOAD)<number>(),
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
  simpleWithMeta: (str: string) =>
    action(types.SIMPLE_WITH_META, undefined, str),
  simpleWithPayloadMeta: (int: number, str: string) =>
    action(types.SIMPLE_WITH_PAYLOAD_META, int, str),
};

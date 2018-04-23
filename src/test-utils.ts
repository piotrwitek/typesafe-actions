/**
 * Fixtures
 */
import { buildAction } from './';

export namespace types {
  export const VERY_DEEP_WITH_TYPE_ONLY = 'VERY_DEEP_WITH_TYPE_ONLY';
  export const WITH_TYPE_ONLY = 'WITH_TYPE_ONLY';
  export const WITH_PAYLOAD = 'WITH_PAYLOAD';
  export const WITH_PAYLOAD_META = 'WITH_PAYLOAD_META';
  export const WITH_MAPPED_PAYLOAD = 'WITH_MAPPED_PAYLOAD';
  export const WITH_MAPPED_PAYLOAD_META = 'WITH_MAPPED_PAYLOAD_META';
}

export const actions = {
  very: {
    deep: { withTypeOnly: buildAction(types.VERY_DEEP_WITH_TYPE_ONLY)() },
  },
  withTypeOnly: buildAction(types.WITH_TYPE_ONLY)<void>(),
  withPayload: buildAction(types.WITH_PAYLOAD)<number>(),
  withPayloadMeta: buildAction(types.WITH_PAYLOAD_META)<number, string>(),
  withMappedPayload: buildAction(types.WITH_MAPPED_PAYLOAD).map(
    (payload: number) => ({ payload })
  ),
  withMappedPayloadMeta: buildAction(types.WITH_MAPPED_PAYLOAD_META).map(
    (payload: number, meta: string) => ({ payload, meta })
  ),
  // todo: add actionCreator
};

/**
 *  Utils
 */
export function testType<T>(a: T): T {
  return a;
}

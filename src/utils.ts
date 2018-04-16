export function testType<T>(a: T): T {
  return a;
}

import { buildAction } from './';
export const actions = {
  very: { deep: { withTypeOnly: buildAction('VERY_DEEP_WITH_TYPE_ONLY')() } },
  withTypeOnly: buildAction('WITH_TYPE_ONLY')<void>(),
  withPayload: buildAction('WITH_PAYLOAD')<number>(),
  withPayloadMeta: buildAction('WITH_PAYLOAD_META')<number, string>(),
  withMappedPayload: buildAction('WITH_MAPPED_PAYLOAD').map(
    (payload: number) => ({ payload })
  ),
  withMappedPayloadMeta: buildAction('WITH_MAPPED_PAYLOAD_META').map(
    (payload: number, meta: string) => ({ payload, meta })
  ),
  // todo: add actionCreator
};

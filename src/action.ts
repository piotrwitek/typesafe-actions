import { StringType, PayloadMetaAction } from './types';

/**
 * @description flux standard action factory
 */
export function action<T extends StringType, P = undefined, M = undefined>(
  type: T,
  payload?: P,
  meta?: M
): PayloadMetaAction<T, P, M> {
  return { type, payload, meta } as any;
}

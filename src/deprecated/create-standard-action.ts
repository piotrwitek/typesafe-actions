import { TypeConstant, ActionCreatorBuilder } from '../type-helpers';
import {
  checkIsEmpty,
  throwIsEmpty,
  checkInvalidActionType,
  throwInvalidActionType,
} from '../utils/validation';
import { createCustomAction } from './create-custom-action';

/** @private */
export type ActionBuilderMap<
  TType extends TypeConstant,
  TActionProps extends any,
  TPayloadArg extends any = undefined,
  TMetaArg extends any = undefined
> = [TMetaArg] extends [undefined]
  ? [TPayloadArg] extends [undefined]
    ? () => { type: TType } & TActionProps
    : (payload: TPayloadArg) => { type: TType } & TActionProps
  : (payload: TPayloadArg, meta: TMetaArg) => { type: TType } & TActionProps;

export interface ActionBuilder<T extends TypeConstant> {
  <P = undefined, M = undefined>(): ActionCreatorBuilder<T, P, M>;
  map<R, P = undefined, M = undefined>(
    fn: (payload: P, meta: M) => R
  ): ActionBuilderMap<T, R, P, M>;
}

/**
 * @description create an action-creator of a given function that contains hidden "type" metadata
 */
export function createStandardAction<T extends TypeConstant>(
  type: T
): ActionBuilder<T> {
  if (checkIsEmpty(type)) {
    throwIsEmpty(1);
  }

  if (checkInvalidActionType(type)) {
    throwInvalidActionType(1);
  }

  function constructor<P, M = undefined>(): ActionCreatorBuilder<T, P, M> {
    return createCustomAction(type, _type => (payload: P, meta: M) => ({
      type: _type,
      payload,
      meta,
    })) as ActionCreatorBuilder<T, P, M>;
  }

  function map<R, P, M>(
    fn: (payload: P, meta: M) => R
  ): ActionBuilderMap<T, R, P, M> {
    return createCustomAction(type, _type => (payload: P, meta: M) =>
      Object.assign(fn(payload, meta), { type: _type })
    ) as ActionBuilderMap<T, R, P, M>;
  }

  return Object.assign(constructor, { map });
}

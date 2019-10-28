import {
  TypeConstant,
  ResolveType,
  ActionCreatorTypeMetadata,
} from './type-helpers';
import {
  checkIsEmpty,
  throwIsEmpty,
  checkInvalidActionType,
  throwInvalidActionType,
} from './utils/validation';

/**
 * @description create custom action-creator using constructor function with injected type argument
 */
export function createCustomAction<
  TType extends TypeConstant,
  TArgs extends any[] = [],
  TReturn extends any = {}
>(
  type: TType,
  createHandler?: (...args: TArgs) => TReturn
): ((...args: TArgs) => ResolveType<{ type: TType } & TReturn>) &
  ActionCreatorTypeMetadata<TType> {
  if (checkIsEmpty(type)) {
    throwIsEmpty(1);
  }

  if (checkInvalidActionType(type)) {
    throwInvalidActionType(1);
  }

  const actionCreator = (...args: TArgs) => {
    const customProps =
      createHandler != null ? createHandler(...args) : undefined;
    return { type, ...customProps } as ResolveType<{ type: TType } & TReturn>;
  };

  const typeMeta = {
    getType: () => type,
    // redux-actions compatibility
    toString: () => type,
  } as ActionCreatorTypeMetadata<TType>;

  return Object.assign(actionCreator, typeMeta);
}

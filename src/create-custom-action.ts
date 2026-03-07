import {
  TypeConstant,
  ResolveType,
  ActionCreatorTypeMetadata,
  Action,
} from './type-helpers';
import {
  checkIsEmpty,
  throwIsEmpty,
  checkInvalidActionType,
  throwInvalidActionType,
} from './utils/validation';

/**
 * @desc Redux Toolkit compatible action creator with type property and match method
 */
export interface ActionCreatorWithType<
  TType extends TypeConstant,
  TReturn extends Action<TType>
> extends ActionCreatorTypeMetadata<TType> {
  type: TType;
  match(action: Action<TypeConstant>): action is TReturn;
}

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
  ActionCreatorWithType<TType, ResolveType<{ type: TType } & TReturn>> {
  if (checkIsEmpty(type)) {
    throwIsEmpty(1);
  }

  if (checkInvalidActionType(type)) {
    throwInvalidActionType(1);
  }

  const actionCreator = (...args: TArgs) => {
    const customProps =
      createHandler != null ? createHandler(...args) : undefined;
    return Object.assign(
      { type },
      customProps
    ) as ResolveType<{ type: TType } & TReturn>;
  };

  const typeMeta = {
    type,
    getType: () => type,
    // redux-actions compatibility
    toString: () => type,
    // Redux Toolkit compatibility - type predicate for matching actions
    match: (action: Action<TypeConstant>): action is ResolveType<{ type: TType } & TReturn> => {
      return action.type === type;
    },
  } as ActionCreatorWithType<TType, ResolveType<{ type: TType } & TReturn>>;

  return Object.assign(actionCreator, typeMeta);
}

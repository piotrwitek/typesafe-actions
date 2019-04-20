// @ts-ignore
import { RootAction } from '.';
import { getType } from './get-type';
import {
  checkValidActionCreator,
  checkValidActionType,
  throwInvalidActionTypeOrActionCreator,
} from './utils/validation';

export function createReducer<S, A extends { type: string } = RootAction>(
  initialState: S
) {
  type AddHandler<TAllActions extends A> = <
    TType extends TAllActions['type'],
    TTypeAction extends TAllActions extends { type: TType }
      ? TAllActions
      : never,
    TCreator extends (...args: any[]) => TAllActions,
    TCreatorAction extends TAllActions extends ReturnType<TCreator>
      ? TAllActions
      : never,
    TActionIntersection extends TTypeAction extends TCreatorAction
      ? TTypeAction
      : never
  >(
    actionsTypes: TType | TCreator | TType[] | TCreator[],
    actionsHandler: (state: S, action: TActionIntersection) => S
  ) => Exclude<TAllActions, TTypeAction & TCreatorAction> extends never
    ? Reducer
    : Reducer & {
        addHandler: AddHandler<
          Exclude<TAllActions, TTypeAction & TCreatorAction>
        >;
      };

  type AddHandlerChain = { addHandler: AddHandler<A> };

  const handlers: Record<string, Reducer> = {};

  type Reducer = (state: S, action: A) => S;
  const reducer: Reducer = (state = initialState, action) => {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    } else {
      return state;
    }
  };

  const addHandler = ((actionsTypes, actionsHandler: Reducer) => {
    const creatorsOrTypes = Array.isArray(actionsTypes)
      ? actionsTypes
      : [actionsTypes];

    creatorsOrTypes
      .map(acOrType =>
        checkValidActionCreator(acOrType)
          ? getType(acOrType)
          : checkValidActionType(acOrType)
          ? acOrType
          : throwInvalidActionTypeOrActionCreator()
      )
      .forEach(type => (handlers[type] = actionsHandler));
    return chain;
  }) as AddHandler<A>;

  const chain: Reducer & AddHandlerChain = Object.assign(reducer, {
    addHandler,
  });

  return chain;
}

// @ts-ignore
import { RootAction } from './';
import { getType } from './get-type';
import {
  checkValidActionCreator,
  checkValidActionType,
  throwInvalidActionTypeOrActionCreator,
} from './utils/validation';
import { Reducer, Action } from './type-helpers';

type AddHandler<S, TAllActions extends Action> = <
  TType extends TAllActions['type'],
  TTypeAction extends TAllActions extends { type: TType } ? TAllActions : never,
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
  ? Reducer<S, TAllActions>
  : Reducer<S, TAllActions> & {
      addHandler: AddHandler<
        S,
        Exclude<TAllActions, TTypeAction & TCreatorAction>
      >;
    };

export function createReducer<S, A extends Action = RootAction>(
  initialState: S
) {
  const handlers: Record<string, (state: S, action: RootAction) => S> = {};

  const reducer: Reducer<S, A> = (state = initialState, action) => {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    } else {
      return state;
    }
  };

  const addHandler = ((actionsTypes, actionsHandler) => {
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

    return chainApi;
  }) as AddHandler<S, A>;

  const chainApi: Reducer<S, A> & {
    addHandler: AddHandler<S, A>;
  } = Object.assign(reducer, {
    addHandler,
  });

  return chainApi;
}

// @ts-ignore
import { RootAction } from './';
import { getType } from './get-type';
import {
  checkValidActionCreator,
  checkValidActionType,
  throwInvalidActionTypeOrActionCreator,
} from './utils/validation';
import { Reducer, Action } from './type-helpers';

type HandleActionChainApi<
  S,
  TAllActions extends Action,
  TNotHandledActions extends Action
> = <
  TType extends TNotHandledActions['type'],
  TTypeAction extends TNotHandledActions extends { type: TType }
    ? TNotHandledActions
    : never,
  TCreator extends (...args: any[]) => TNotHandledActions,
  TCreatorAction extends TNotHandledActions extends ReturnType<TCreator>
    ? TNotHandledActions
    : never,
  TActionIntersection extends TTypeAction extends TCreatorAction
    ? TTypeAction
    : never
>(
  singleOrMultipleCreatorsAndTypes: TType | TType[] | TCreator | TCreator[],
  reducer: (state: S, action: TActionIntersection) => S
) => Exclude<TNotHandledActions, TTypeAction & TCreatorAction> extends never
  ? Reducer<S, TAllActions>
  : Reducer<S, TAllActions> & {
      handleAction: HandleActionChainApi<
        S,
        TAllActions,
        Exclude<TNotHandledActions, TTypeAction & TCreatorAction>
      >;
    };

export function createReducer<S, A extends Action = RootAction>(
  initialState: S
): Reducer<S, A> & {
  handleAction: HandleActionChainApi<S, A, A>;
} {
  const reducers: Record<string, (state: S, action: RootAction) => S> = {};

  const rootReducer: Reducer<S, A> = (state = initialState, action) => {
    if (reducers.hasOwnProperty(action.type)) {
      return reducers[action.type](state, action);
    } else {
      return state;
    }
  };

  const handleAction = ((singleOrMultipleCreatorsAndTypes, reducer) => {
    const creatorsAndTypes = Array.isArray(singleOrMultipleCreatorsAndTypes)
      ? singleOrMultipleCreatorsAndTypes
      : [singleOrMultipleCreatorsAndTypes];

    creatorsAndTypes
      .map(acOrType =>
        checkValidActionCreator(acOrType)
          ? getType(acOrType)
          : checkValidActionType(acOrType)
          ? acOrType
          : throwInvalidActionTypeOrActionCreator()
      )
      .forEach(type => (reducers[type] = reducer));

    return chainApi;
  }) as HandleActionChainApi<S, A, A>;

  const chainApi = Object.assign(rootReducer, {
    handleAction,
  } as const);

  return chainApi;
}

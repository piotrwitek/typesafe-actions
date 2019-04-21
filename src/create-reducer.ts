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
  TState,
  TNotHandledAction extends Action,
  TRootAction extends Action
> = <
  TType extends TNotHandledAction['type'],
  TTypeAction extends TNotHandledAction extends { type: TType }
    ? TNotHandledAction
    : never,
  TCreator extends (...args: any[]) => TNotHandledAction,
  TCreatorAction extends TNotHandledAction extends ReturnType<TCreator>
    ? TNotHandledAction
    : never,
  TActionIntersection extends TTypeAction extends TCreatorAction
    ? TTypeAction
    : never
>(
  singleOrMultipleCreatorsAndTypes: TType | TType[] | TCreator | TCreator[],
  reducer: (state: TState, action: TActionIntersection) => TState
) => [Exclude<TNotHandledAction, TTypeAction & TCreatorAction>] extends [never]
  ? Reducer<TState, TRootAction> & {
      reducers: Record<
        TActionIntersection['type'],
        (state: TState, action: TRootAction) => TState
      >;
    }
  : Reducer<TState, TRootAction> & {
      reducers: Record<
        TActionIntersection['type'],
        (state: TState, action: TRootAction) => TState
      >;
      handleAction: HandleActionChainApi<
        TState,
        Exclude<TNotHandledAction, TTypeAction & TCreatorAction>,
        TNotHandledAction
      >;
    };

export function createReducer<TState, TAllActions extends Action = RootAction>(
  initialState: TState,
  initialReducers: Record<
    RootAction['type'],
    (state: TState, action: RootAction) => TState
  > = {}
) {
  const reducers = { ...initialReducers };

  const rootReducer: Reducer<TState, TAllActions> = (
    state = initialState,
    action
  ) => {
    if (reducers.hasOwnProperty(action.type)) {
      const reducer = reducers[action.type];
      if (typeof reducer !== 'function') {
        throw Error(
          `Reducer under "${action.type}" key is not a valid reducer`
        );
      }
      return reducer(state, action);
    } else {
      return state;
    }
  };

  const handleAction = ((singleOrMultipleCreatorsAndTypes, reducer) => {
    const creatorsAndTypes = Array.isArray(singleOrMultipleCreatorsAndTypes)
      ? singleOrMultipleCreatorsAndTypes
      : [singleOrMultipleCreatorsAndTypes];

    const newReducers: typeof initialReducers = {};
    creatorsAndTypes
      .map(acOrType =>
        checkValidActionCreator(acOrType)
          ? getType(acOrType)
          : checkValidActionType(acOrType)
          ? acOrType
          : throwInvalidActionTypeOrActionCreator()
      )
      .forEach(type => (newReducers[type] = reducer));

    return createReducer<TState, TAllActions>(initialState, {
      ...reducers,
      ...newReducers,
    });
  }) as HandleActionChainApi<TState, TAllActions, TAllActions>;

  return Object.assign(rootReducer, {
    reducers: { ...reducers },
    handleAction,
  } as const);
}

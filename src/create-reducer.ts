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
      handlers: Record<
        TActionIntersection['type'],
        (state: TState, action: TRootAction) => TState
      >;
    }
  : Reducer<TState, TRootAction> & {
      handlers: Record<
        TActionIntersection['type'],
        (state: TState, action: TRootAction) => TState
      >;
      handleAction: HandleActionChainApi<
        TState,
        Exclude<TNotHandledAction, TTypeAction & TCreatorAction>,
        TNotHandledAction
      >;
    };

export function createReducer<TState, TRootAction extends Action = RootAction>(
  initialState: TState,
  initialHandlers: Record<
    RootAction['type'],
    (state: TState, action: RootAction) => TState
  > = {}
) {
  const handlers = { ...initialHandlers };

  const rootReducer: Reducer<TState, TRootAction> = (
    state = initialState,
    action
  ) => {
    if (handlers.hasOwnProperty(action.type)) {
      const reducer = handlers[action.type];
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

    const newHandlers: typeof initialHandlers = {};
    creatorsAndTypes
      .map(acOrType =>
        checkValidActionCreator(acOrType)
          ? getType(acOrType)
          : checkValidActionType(acOrType)
          ? acOrType
          : throwInvalidActionTypeOrActionCreator()
      )
      .forEach(type => (newHandlers[type] = reducer));

    return createReducer<TState, TRootAction>(initialState, {
      ...handlers,
      ...newHandlers,
    });
  }) as HandleActionChainApi<TState, TRootAction, TRootAction>;

  return Object.assign(rootReducer, {
    handlers: { ...handlers },
    handleAction,
  } as const);
}

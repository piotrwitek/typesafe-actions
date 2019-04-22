import { getType } from './get-type';
import {
  checkValidActionCreator,
  checkValidActionType,
  throwInvalidActionTypeOrActionCreator,
} from './utils/validation';
import { Reducer, Action, Types } from './type-helpers';

export type RootAction = Types extends { RootAction: infer T } ? T : any;

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

type GetAction<T extends Action, P extends T['type']> = T extends {
  type: P;
}
  ? T
  : never;

type InitialHandler<TState, TRootAction extends Action> = {
  [P in TRootAction['type']]?: (
    state: TState,
    action: GetAction<TRootAction, P>
  ) => TState
};

export function createReducer<TState, TRootAction extends Action = RootAction>(
  initialState: TState,
  initialHandlers: InitialHandler<TState, TRootAction> = {}
) {
  const handlers: Partial<
    Record<any, (state: TState, action: any) => TState>
  > = {
    ...initialHandlers,
  };

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

    const newHandlers: typeof handlers = {};
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

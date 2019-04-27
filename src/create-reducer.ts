import { getType } from './get-type';
import {
  checkValidActionCreator,
  checkValidActionType,
  throwInvalidActionTypeOrActionCreator,
} from './utils/validation';
import { Reducer, Action, Types } from './type-helpers';

// RootAction is injected from consumer or any
export type RootAction = Types extends { RootAction: infer T } ? T : any;

type CreateReducerChainApi<
  TState,
  TPrevNotHandledAction extends Action,
  TRootAction extends Action
> = <
  TType extends TPrevNotHandledAction['type'],
  THandledTypeAction extends TPrevNotHandledAction extends Action<TType>
    ? TPrevNotHandledAction
    : never,
  TCreator extends (...args: any[]) => TPrevNotHandledAction,
  THandledCreatorAction extends TPrevNotHandledAction extends ReturnType<
    TCreator
  >
    ? TPrevNotHandledAction
    : never,
  THandledAction extends THandledTypeAction extends THandledCreatorAction
    ? THandledTypeAction
    : never
>(
  singleOrMultipleCreatorsAndTypes: TType | TType[] | TCreator | TCreator[],
  reducer: (state: TState, action: THandledAction) => TState
) => [
  Exclude<TPrevNotHandledAction, THandledTypeAction & THandledCreatorAction>
] extends [never]
  ? Reducer<TState, TRootAction> & {
      handlers: Record<
        TRootAction['type'],
        (state: TState, action: TRootAction) => TState
      >;
    }
  : Reducer<TState, TRootAction> & {
      handlers: Record<
        Exclude<
          TRootAction,
          Exclude<
            TPrevNotHandledAction,
            THandledTypeAction & THandledCreatorAction
          >
        >['type'],
        (state: TState, action: TRootAction) => TState
      >;
      handleAction: CreateReducerChainApi<
        TState,
        Exclude<
          TPrevNotHandledAction,
          THandledTypeAction & THandledCreatorAction
        >,
        TRootAction
      >;
    };

type GetAction<
  TAction extends Action,
  TType extends TAction['type']
> = TAction extends Action<TType> ? TAction : never;

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
  }) as CreateReducerChainApi<TState, TRootAction, TRootAction>;

  const chainApi = Object.assign(rootReducer, {
    handlers: { ...handlers },
    handleAction,
  } as const);

  return chainApi;
}

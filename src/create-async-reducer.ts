import { createReducer } from './create-reducer';
import { Action, Reducer } from './type-helpers';

export type AsyncActionCreatorMap<
  TRequestAction extends Action = Action,
  TSuccessAction extends Action = Action,
  TFailureAction extends Action = Action,
  TCancelAction extends Action = Action
> = {
  request: (...args: any[]) => TRequestAction;
  success: (...args: any[]) => TSuccessAction;
  failure: (...args: any[]) => TFailureAction;
  cancel?: (...args: any[]) => TCancelAction;
};

type ActionFromCreator<TActionCreator> = TActionCreator extends (
  ...args: any[]
) => infer TAction
  ? TAction
  : never;

export type AsyncReducerHandlers<
  TState,
  TAsyncAction extends AsyncActionCreatorMap
> = {
  request?: (
    state: TState,
    action: ActionFromCreator<TAsyncAction['request']>
  ) => TState;
  success?: (
    state: TState,
    action: ActionFromCreator<TAsyncAction['success']>
  ) => TState;
  failure?: (
    state: TState,
    action: ActionFromCreator<TAsyncAction['failure']>
  ) => TState;
  cancel?: (
    state: TState,
    action: ActionFromCreator<TAsyncAction['cancel']>
  ) => TState;
};

export type AsyncActionType<TAsyncAction extends AsyncActionCreatorMap> =
  | ActionFromCreator<TAsyncAction['request']>
  | ActionFromCreator<TAsyncAction['success']>
  | ActionFromCreator<TAsyncAction['failure']>
  | ActionFromCreator<TAsyncAction['cancel']>;

/**
 * @description create a reducer that handles request, success, failure and optional cancel async action creators
 */
export function createAsyncReducer<
  TState,
  TAsyncAction extends AsyncActionCreatorMap
>(
  asyncAction: TAsyncAction,
  initialState: TState,
  handlers: AsyncReducerHandlers<TState, TAsyncAction>
): Reducer<TState, AsyncActionType<TAsyncAction>> {
  let reducer = createReducer<TState, AsyncActionType<TAsyncAction>>(
    initialState
  ) as any;

  if (handlers.request != null) {
    reducer = reducer.handleAction(asyncAction.request, handlers.request);
  }
  if (handlers.success != null) {
    reducer = reducer.handleAction(asyncAction.success, handlers.success);
  }
  if (handlers.failure != null) {
    reducer = reducer.handleAction(asyncAction.failure, handlers.failure);
  }
  if (asyncAction.cancel != null && handlers.cancel != null) {
    reducer = reducer.handleAction(asyncAction.cancel, handlers.cancel);
  }

  return reducer;
}

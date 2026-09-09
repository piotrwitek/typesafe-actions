import { createReducer } from './create-reducer';
import { getType } from './get-type';
import { Action, ActionCreator } from './type-helpers';

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

export type ActionFromCreator<TActionCreator> = TActionCreator extends (
  ...args: any[]
) => infer TAction
  ? TAction
  : never;

export type AsyncActionPayload<TActionCreator> = ActionFromCreator<
  TActionCreator
> extends { payload: infer TPayload }
  ? TPayload
  : never;

export type AsyncSuccessPayload<
  TAsyncAction extends AsyncActionCreatorMap
> = AsyncActionPayload<TAsyncAction['success']>;

export type AsyncFailurePayload<
  TAsyncAction extends AsyncActionCreatorMap
> = AsyncActionPayload<TAsyncAction['failure']>;

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
    action: ActionFromCreator<NonNullable<TAsyncAction['cancel']>>
  ) => TState;
};

export type AsyncActionType<TAsyncAction extends AsyncActionCreatorMap> =
  | ActionFromCreator<TAsyncAction['request']>
  | ActionFromCreator<TAsyncAction['success']>
  | ActionFromCreator<TAsyncAction['failure']>
  | ActionFromCreator<NonNullable<TAsyncAction['cancel']>>;

type AsyncHandler<TState> = (state: TState, action: Action) => TState;

function assertAsyncActionCreatorMap(asyncAction: AsyncActionCreatorMap): void {
  if (
    asyncAction == null ||
    typeof asyncAction.request !== 'function' ||
    typeof asyncAction.success !== 'function' ||
    typeof asyncAction.failure !== 'function'
  ) {
    throw new Error(
      'asyncAction argument is invalid, it should be an object created with createAsyncAction()'
    );
  }
}

function registerHandler<TState>(
  handlersMap: { [type: string]: AsyncHandler<TState> },
  actionCreator: ActionCreator | undefined,
  handler: AsyncHandler<TState> | undefined
): void {
  if (actionCreator != null && handler != null) {
    handlersMap[getType(actionCreator)] = handler;
  }
}

/**
 * @description create a typesafe reducer for an async action-creator map
 * (`request` / `success` / `failure` / optional `cancel`). Each handler receives
 * the exact action type produced by the matching creator, so generic factories
 * can read success and failure payloads without switches or casts.
 *
 * The returned reducer keeps the `createReducer` chain API (`handleAction`,
 * `handleType`, `handlers`) so extra actions can be composed afterwards.
 */
export function createAsyncReducer<
  TState,
  TAsyncAction extends AsyncActionCreatorMap
>(
  initialState: TState,
  asyncAction: TAsyncAction,
  handlers: AsyncReducerHandlers<TState, TAsyncAction>
) {
  assertAsyncActionCreatorMap(asyncAction);

  const handlersMap: { [type: string]: AsyncHandler<TState> } = {};

  registerHandler(handlersMap, asyncAction.request, handlers.request as
    | AsyncHandler<TState>
    | undefined);
  registerHandler(handlersMap, asyncAction.success, handlers.success as
    | AsyncHandler<TState>
    | undefined);
  registerHandler(handlersMap, asyncAction.failure, handlers.failure as
    | AsyncHandler<TState>
    | undefined);
  registerHandler(handlersMap, asyncAction.cancel, handlers.cancel as
    | AsyncHandler<TState>
    | undefined);

  return createReducer(initialState, handlersMap);
}

/**
 * @description one-liner boolean reducer for an async action-creator map.
 * `request` sets `true`; `success`, `failure`, and `cancel` set `false`.
 */
export function createLoadingReducer<
  TAsyncAction extends AsyncActionCreatorMap
>(asyncAction: TAsyncAction, initialState: boolean = false) {
  return createAsyncReducer<boolean, TAsyncAction>(initialState, asyncAction, {
    request: (): boolean => true,
    success: (): boolean => false,
    failure: (): boolean => false,
    cancel: (): boolean => false,
  });
}

/**
 * @description one-liner error reducer for an async action-creator map.
 * `failure` stores the failure payload; `request` and `success` clear it.
 * The state type is inferred from the async failure action payload.
 */
export function createErrorReducer<TAsyncAction extends AsyncActionCreatorMap>(
  asyncAction: TAsyncAction,
  initialState: AsyncFailurePayload<TAsyncAction> | null = null
) {
  return createAsyncReducer<
    AsyncFailurePayload<TAsyncAction> | null,
    TAsyncAction
  >(initialState, asyncAction, {
    request: (): AsyncFailurePayload<TAsyncAction> | null => null,
    success: (): AsyncFailurePayload<TAsyncAction> | null => null,
    failure: (
      _state: AsyncFailurePayload<TAsyncAction> | null,
      action: ActionFromCreator<TAsyncAction['failure']>
    ): AsyncFailurePayload<TAsyncAction> | null =>
      (action as { payload: AsyncFailurePayload<TAsyncAction> }).payload,
  });
}

import {
  TypeConstant,
  Action,
  Reducer,
} from './type-helpers';
import { getType } from './get-type';
import { createReducer } from './create-reducer';

/**
 * @description Create a reducer that automatically handles all phases of an async action.
 *
 * @example
 * ```ts
 * const fetchUserActions = createAsyncAction(
 *   'FETCH_USER_REQUEST',
 *   'FETCH_USER_SUCCESS',
 *   'FETCH_USER_FAILURE'
 * )<void, User, Error>();
 *
 * interface UserState {
 *   data: User | null;
 *   loading: boolean;
 *   error: Error | null;
 * }
 *
 * const enhancedReducer = createAsyncReducer<UserState>(
 *   { data: null, loading: false, error: null },
 *   fetchUserActions,
 *   {
 *     request: (state) => ({ ...state, loading: true, error: null }),
 *     success: (state, action) => ({ ...state, loading: false, data: action.payload }),
 *     failure: (state, action) => ({ ...state, loading: false, error: action.payload }),
 *   }
 * );
 * ```
 */
export function createAsyncReducer<TState>(
  initialState: TState,
  asyncAction: { request: any; success: any; failure: any; cancel?: any },
  handlers: {
    request?: (state: TState, action: any) => TState;
    success?: (state: TState, action: any) => TState;
    failure?: (state: TState, action: any) => TState;
    cancel?: (state: TState, action: any) => TState;
  }
): Reducer<TState, any> {
  const handlersMap: Record<string, (state: TState, action: any) => TState> = {};

  if (handlers.request) {
    handlersMap[getType(asyncAction.request)] = handlers.request;
  }
  if (handlers.success) {
    handlersMap[getType(asyncAction.success)] = handlers.success;
  }
  if (handlers.failure) {
    handlersMap[getType(asyncAction.failure)] = handlers.failure;
  }
  if (handlers.cancel && asyncAction.cancel) {
    handlersMap[getType(asyncAction.cancel)] = handlers.cancel;
  }

  return createReducer<TState>(initialState, handlersMap as any);
}

/**
 * @description Create a loading reducer that tracks loading state for an async action.
 * Sets loading to `true` on request, and `false` on success or failure.
 *
 * @example
 * ```ts
 * const fetchUserActions = createAsyncAction(
 *   'FETCH_USER_REQUEST',
 *   'FETCH_USER_SUCCESS',
 *   'FETCH_USER_FAILURE'
 * )<void, User, Error>();
 *
 * const loadingReducer = createLoadingReducer(fetchUserActions);
 * // loadingReducer(false, fetchUserActions.request()) => true
 * // loadingReducer(true, fetchUserActions.success(user)) => false
 * // loadingReducer(true, fetchUserActions.failure(error)) => false
 * ```
 */
export function createLoadingReducer<TAction extends { request: any; success: any; failure: any }>(
  asyncAction: TAction
): Reducer<boolean, any> {
  return createReducer<boolean>(false, {
    [getType(asyncAction.request)]: () => true,
    [getType(asyncAction.success)]: () => false,
    [getType(asyncAction.failure)]: () => false,
  });
}

/**
 * @description Create an error reducer that tracks error state for an async action.
 * Sets error to the failure payload on failure, and `null` on success.
 *
 * @example
 * ```ts
 * const fetchUserActions = createAsyncAction(
 *   'FETCH_USER_REQUEST',
 *   'FETCH_USER_SUCCESS',
 *   'FETCH_USER_FAILURE'
 * )<void, User, Error>();
 *
 * const errorReducer = createErrorReducer(fetchUserActions);
 * // errorReducer(null, fetchUserActions.failure(new Error('fail'))) => Error('fail')
 * // errorReducer(Error('fail'), fetchUserActions.success(user)) => null
 * ```
 */
export function createErrorReducer<TAction extends { success: any; failure: any }>(
  asyncAction: TAction
): Reducer<any, any> {
  return createReducer<any>(null, {
    [getType(asyncAction.failure)]: (_state: any, action: any) => action.payload,
    [getType(asyncAction.success)]: () => null,
  });
}

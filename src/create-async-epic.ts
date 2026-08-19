/* tslint:disable:import-blacklist no-submodule-imports */
import { Observable, of } from 'rxjs';
import { catchError, filter, map, switchMap, takeUntil } from 'rxjs/operators';
import { Action, TypeConstant } from './type-helpers';
import { isActionOf, ActionCreator } from './is-action-of';

/**
 * @desc Type for a redux-observable Epic
 */
export type Epic<
  TInput extends Action = Action,
  TOutput extends Action = TInput,
  TState = void,
  TServices = void
> = (
  action$: Observable<TInput>,
  state$: Observable<TState>,
  services: TServices
) => Observable<TOutput>;

/**
 * @desc Creates a redux-observable Epic that automatically handles the async action pattern.
 * The factory wires up request filtering, success mapping, error catching, and cancel handling.
 *
 * @example
 * ```ts
 * import { createAsyncAction } from 'typesafe-actions';
 * import { createAsyncEpic } from 'typesafe-actions/create-async-epic';
 *
 * const fetchUsers = createAsyncAction(
 *   '@users/FETCH_REQUEST',
 *   '@users/FETCH_SUCCESS',
 *   '@users/FETCH_FAILURE'
 * )<undefined, User[], Error>();
 *
 * const fetchUsersEpic = createAsyncEpic(
 *   fetchUsers,
 *   (requestAction, state$, services) =>
 *     services.api.getUsers()
 * );
 * ```
 */
export function createAsyncEpic<TState, TServices, TPayload>(
  asyncActions: {
    request: ActionCreator<{ type: TypeConstant }>;
    success: ActionCreator<{ type: TypeConstant }>;
    failure: ActionCreator<{ type: TypeConstant }>;
    cancel?: ActionCreator<{ type: TypeConstant }>;
  },
  handler: (
    requestAction: any,
    state$: Observable<TState>,
    services: TServices
  ) => Observable<TPayload>
): Epic<any, any, TState, TServices> {
  return (action$, state$, services) => {
    const requestAction$ = action$.pipe(
      filter(isActionOf(asyncActions.request))
    );

    const cancelAction$ = asyncActions.cancel
      ? action$.pipe(filter(isActionOf(asyncActions.cancel)))
      : (of() as Observable<Action>);

    return requestAction$.pipe(
      switchMap((action: any) =>
        handler(action, state$, services).pipe(
          map((result: TPayload) => asyncActions.success(result as any)),
          catchError((error: any) => of(asyncActions.failure(error))),
          takeUntil(cancelAction$)
        )
      )
    );
  };
}

/**
 * @desc Creates a redux-observable OperatorFunction that catches errors and dispatches a failure action.
 *
 * @example
 * ```ts
 * fetchUsers.pipe(
 *   map(fetchUsers.success),
 *   catchErrorOperator(fetchUsers.failure)
 * )
 * ```
 */
export function catchErrorOperator<T, R extends Action>(
  failureActionCreator: (error: any) => R
): import('rxjs').OperatorFunction<T, T | R> {
  return (source$: Observable<T>) =>
    source$.pipe(catchError((error: any) => of(failureActionCreator(error))));
}

/**
 * @desc Creates a redux-observable OperatorFunction that takesUntil a matching action is dispatched.
 *
 * @example
 * ```ts
 * fetchUsers.pipe(
 *   takeUntilAction(action$, fetchUsers.cancel)
 * )
 * ```
 */
export function takeUntilAction<T>(
  action$: Observable<Action>,
  actionCreator: (...args: any[]) => Action
): import('rxjs').OperatorFunction<T, T> {
  return (source$: Observable<T>) =>
    source$.pipe(takeUntil(action$.pipe(filter(isActionOf(actionCreator)))));
}

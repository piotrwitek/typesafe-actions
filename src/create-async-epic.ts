import { Observable, of } from 'rxjs';
import { filter, switchMap, map, catchError, takeUntil } from 'rxjs/operators';
import { isActionOf } from './is-action-of';

/**
 * Type representing an async action creator created with `createAsyncAction`.
 */
interface AsyncActionCreatorLike {
  request: (...args: any[]) => any;
  success: (payload: any) => any;
  failure: (error: any) => any;
  cancel?: (...args: any[]) => any;
}

/**
 * Creates a redux-observable epic that automatically handles the request/success/failure
 * lifecycle of a `createAsyncAction` action creator.
 *
 * @param asyncAction - The async action creator (created with `createAsyncAction`)
 * @param sourceFactory - A function that receives the action payload and returns an
 *   Observable of the result to be passed to `success`. Errors are automatically caught
 *   and dispatched to `failure`.
 *
 * @example
 * ```ts
 * const loadTodosAsync = createAsyncAction(
 *   'LOAD_TODOS_REQUEST',
 *   'LOAD_TODOS_SUCCESS',
 *   'LOAD_TODOS_FAILURE',
 *   'LOAD_TODOS_CANCEL'
 * )<void, Todo[], Error, void>();
 *
 * const loadTodosEpic: RootEpic = (action$, state$, { api }) =>
 *   createAsyncEpic(loadTodosAsync, () =>
 *     from(api.todos.loadSnapshot())
 *   )(action$, state$);
 * ```
 */
export function createAsyncEpic<
  TCreator extends AsyncActionCreatorLike
>(
  asyncAction: TCreator,
  sourceFactory: (...args: any[]) => Observable<any>
): (action$: Observable<any>, state$: any, deps?: any) => Observable<any> {
  return (action$: Observable<any>) =>
    action$.pipe(
      filter(isActionOf(asyncAction.request)),
      switchMap((action) =>
        sourceFactory(action.payload).pipe(
          map((result) => asyncAction.success(result)),
          catchError((error) =>
            of(
              asyncAction.failure(
                error instanceof Error ? error : new Error(String(error))
              )
            )
          ),
          asyncAction.cancel
            ? takeUntil(
                action$.pipe(filter(isActionOf(asyncAction.cancel!)))
              )
            : (x: any) => x
        )
      )
    );
}

import { ActionsObservable } from 'redux-observable';
import { from, of, Observable, OperatorFunction, pipe } from 'rxjs';
import { filter, switchMap, map, catchError, takeUntil } from 'rxjs/operators';
import {
  isActionOf,
  RootEpic,
  RootAction,
  AsyncActionCreator,
} from 'typesafe-actions';

import { loadTodosAsync, saveTodosAsync } from './actions';
import { getTodos } from './selectors';

export const takeUntilAction = <T>(
  action$: Observable<RootAction>,
  action: (payload: Error) => RootAction
): OperatorFunction<T, T> =>
  takeUntil(action$.pipe(filter(isActionOf(action))));

export const catchErrorAndHandleWithAction = <T, R>(
  action: (payload: Error) => R
): OperatorFunction<T, T | R> => catchError(response => of(action(response)));

export const createAsyncActionEpic = <
  TAsyncAction extends AsyncActionCreator<any, any, any, any>
>(
  asyncAction: TAsyncAction,
  action$: Observable<any>,
  source$: Observable<ReturnType<TAsyncAction['success']>['payload']>
): Observable<
  ReturnType<TAsyncAction['success']> | ReturnType<TAsyncAction['failure']>
> =>
  action$.pipe(
    filter(isActionOf(asyncAction.request)),
    switchMap(() =>
      source$.pipe(
        map(asyncAction.success),
        catchError(message => of(asyncAction.failure(message) as any)),
        takeUntil(action$.pipe(filter(isActionOf(saveTodosAsync.cancel))))
      )
    )
  );

export const loadTodosEpicT: RootEpic = (action$, state$, { api }) =>
  createAsyncActionEpic(
    loadTodosAsync,
    action$,
    from(api.todos.loadSnapshot())
  );

export const loadTodosEpic: RootEpic = (action$, state$, { api }) =>
  action$.pipe(
    filter(isActionOf(loadTodosAsync.request)),
    switchMap(() =>
      from(api.todos.loadSnapshot()).pipe(
        map(loadTodosAsync.success),
        catchError((message: string) => of(loadTodosAsync.failure(message))),
        takeUntil(action$.pipe(filter(isActionOf(saveTodosAsync.cancel))))
      )
    ),
    switchMap(a => a)
  );

export const saveTodosEpicT: RootEpic = (action$, state$, { api }) =>
  createAsyncActionEpic(
    saveTodosAsync,
    action$,
    from(api.todos.saveSnapshot(getTodos(state$.value.todos)))
  );

export const saveTodosEpic: RootEpic = (action$, state$, { api }) =>
  action$.pipe(
    filter(isActionOf(saveTodosAsync.request)),
    switchMap(() =>
      from(api.todos.saveSnapshot(getTodos(state$.value.todos))).pipe(
        map(saveTodosAsync.success),
        catchError((message: string) => of(saveTodosAsync.failure(message))),
        takeUntil(action$.pipe(filter(isActionOf(saveTodosAsync.cancel))))
      )
    )
  );

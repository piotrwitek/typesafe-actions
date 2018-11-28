import { RootAction, RootState, RootService } from 'MyTypes';
import { isActionOf } from 'typesafe-actions';
import { Epic } from 'redux-observable';
import { from, of } from 'rxjs';
import { filter, switchMap, map, catchError } from 'rxjs/operators';

import { fetchTodos } from './actions';

export const fetchTodosFlow: Epic<
  RootAction,
  RootAction,
  RootState,
  RootService
> = (action$, store, { api }) =>
  action$.pipe(
    filter(isActionOf(fetchTodos.request)),
    switchMap(() =>
      from(api.todos.getAll()).pipe(
        map(fetchTodos.success),
        catchError((message: string) => of(fetchTodos.failure(message)))
      )
    )
  );

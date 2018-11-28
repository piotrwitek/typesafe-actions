import cuid from 'cuid';
import { createStandardAction, createAsyncAction } from 'typesafe-actions';

import { Todo } from './models';

const ADD = 'ADD_TODO';

export const addTodo = createStandardAction(ADD).map(
  ({ title }: { title: string }): { payload: Todo } => ({
    payload: {
      title,
      id: cuid(),
    },
  })
);

export const fetchTodos = createAsyncAction(
  'FETCH_TODOS_REQUEST',
  'FETCH_TODOS_SUCCESS',
  'FETCH_TODOS_FAILURE'
)<void, Todo[], string>();

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

export const loadTodosAsync = createAsyncAction(
  'LOAD_TODOS_REQUEST',
  'LOAD_TODOS_SUCCESS',
  'LOAD_TODOS_FAILURE'
)<void, Todo[], string>();

export const saveTodosAsync = createAsyncAction(
  'SAVE_TODOS_REQUEST',
  'SAVE_TODOS_SUCCESS',
  'SAVE_TODOS_FAILURE'
)<void, void, string>();

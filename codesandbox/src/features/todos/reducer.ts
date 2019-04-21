import { Todo } from 'MyModels';
import { combineReducers } from 'redux';
import { createReducer } from 'typesafe-actions';

import { loadTodosAsync, addTodo, removeTodo } from './actions';

export const isLoadingTodos = createReducer(false as boolean)
  .addHandler([loadTodosAsync.request], (state, action) => true)
  .addHandler(
    [loadTodosAsync.success, loadTodosAsync.failure],
    (state, action) => false
  );

export const todos = createReducer([
  {
    id: '0',
    title: 'You can add new todos using the form or load saved snapshot...',
  },
] as readonly Todo[])
  .addHandler(loadTodosAsync.success, (state, action) => action.payload)
  .addHandler(addTodo, (state, action) => [...state, action.payload])
  .addHandler(removeTodo, (state, action) =>
    state.filter(i => i.id !== action.payload)
  );

export default combineReducers({
  isLoadingTodos,
  todos,
});

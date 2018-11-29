import { combineReducers } from 'redux';
import { getType } from 'typesafe-actions';

import { Todo } from './models';
import * as actions from './actions';

export type SandboxState = Readonly<{
  isLoadingTodos: boolean;
  todos: Todo[];
}>;

export default combineReducers<SandboxState, import('MyTypes').RootAction>({
  isLoadingTodos: (state = false, action) => {
    switch (action.type) {
      case getType(actions.loadTodosAsync.request):
      case getType(actions.saveTodosAsync.request):
        return true;

      case getType(actions.loadTodosAsync.success):
      case getType(actions.loadTodosAsync.failure):
      case getType(actions.saveTodosAsync.success):
      case getType(actions.saveTodosAsync.failure):
        return false;

      default:
        return state;
    }
  },
  todos: (
    state = [
      {
        id: '0',
        title:
          'Please add todos using the form or load snapshot from server...',
      },
    ],
    action
  ) => {
    switch (action.type) {
      case getType(actions.addTodo):
        return [...state, action.payload];

      case getType(actions.loadTodosAsync.success):
        return action.payload;

      default:
        return state;
    }
  },
});

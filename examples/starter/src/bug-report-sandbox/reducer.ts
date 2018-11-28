import { combineReducers } from 'redux';
import { getType } from 'typesafe-actions';

import { Todo } from './models';
import * as actions from './actions';

export type SandboxState = Readonly<{
  todos: Todo[];
}>;

export default combineReducers<SandboxState, import('MyTypes').RootAction>({
  todos: (
    state = [{ id: '0', title: 'Please add more items using the form...' }],
    action
  ) => {
    switch (action.type) {
      case getType(actions.addTodo):
        return [...state, action.payload];

      case getType(actions.fetchTodos.success):
        return action.payload;

      default:
        return state;
    }
  },
});

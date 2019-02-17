import { RootAction } from 'MyTypes';
import { Todo } from 'MyModels';
import * as React from 'react';
import { getType } from 'typesafe-actions';

import * as actions from './actions';

// TODO: implement
type AsyncState<T> = any;
const initAsyncState: any = {};
const reduceAsyncState: any = {};
const createAsyncAction: any = {};

const loadTodosAsync = createAsyncAction('LOAD_TODOS')<void, Todo[], Error>();

export type TodosState = AsyncState<Todo[]>;

export default (
  state: TodosState = initAsyncState<TodosState>([
    { id: '0', title: 'Hello!' },
  ]),
  action: RootAction
) => {
  switch (action.type) {
    // high-level API - handling all three fetch states (request, failure, success)
    case getType(loadTodosAsync):
      return reduceAsyncState<TodosState>((state, data) => data)(state, action);
      return state.matchAction({
        ready: state => action.payload,
      })(action);
      return state.to(action);

    // low level API
    case getType(loadTodosAsync.request):
      return state.toPending();
    case getType(loadTodosAsync.failure):
      return state.toError(action.payload);
    case getType(loadTodosAsync.success):
      return state.toReady(action.payload);

    // handling synchronous use-cases
    case getType(actions.addTodo):
      return state.setValue([...state.getValue(), action.payload]);
    case getType(actions.removeTodo):
      return state.setValue(
        state.getValue().filter(i => i.id !== action.payload)
      );

    default:
      return state;
  }
};

export type RootState = Readonly<{
  todos: TodosState;
}>;

const TodoList = ({ todos }: RootState) => {
  const Items = todos.match({
    pending: cachedData => [<Loader />, cachedData],
    error: (err, cachedData) => {
      console.log('');
      return cachedData;
    },
    ready: (data, cachedData) => data.map(i => i.title),
  });
};

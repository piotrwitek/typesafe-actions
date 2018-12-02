import { RootState } from 'MyTypes';
import * as React from 'react';
import { connect } from 'react-redux';

import { Todo } from '../models';
import * as selectors from '../selectors';
import { removeTodo } from '../actions';

import TodoItem from './TodoItem';

const mapStateToProps = (state: RootState) => ({
  isLoading: state.sandbox.isLoadingTodos,
  todos: selectors.getTodos(state.sandbox),
});

const dispatchProps = {
  removeTodo,
};

type Props = typeof dispatchProps & {
  isLoading: boolean;
  todos: Todo[];
};

function TodoList({ isLoading, todos = [], removeTodo }: Props) {
  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <ul style={getStyle()}>
      {todos.map(todo => (
        <li key={todo.id}>
          <TodoItem
            title={todo.title}
            onRemoveClick={() => removeTodo(todo.id)}
          />
        </li>
      ))}
    </ul>
  );
}

const getStyle = (): React.CSSProperties => ({
  textAlign: 'left',
  margin: 'auto',
  maxWidth: 500,
});

export default connect(
  mapStateToProps,
  dispatchProps
)(TodoList);

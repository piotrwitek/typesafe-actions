import { RootState } from 'typesafe-actions';
import * as React from 'react';
import { connect } from 'react-redux';

import * as selectors from '../selectors';
import * as actions from '../actions';

import TodoListItem from './TodoListItem';

const mapStateToProps = (state: RootState) => ({
  isLoading: state.todos.isLoadingTodos,
  todos: selectors.getTodos(state.todos),
});
const dispatchProps = {
  removeTodo: actions.removeTodo,
};

type Props = ReturnType<typeof mapStateToProps> & typeof dispatchProps;

function TodoList({ isLoading, todos = [], removeTodo }: Props) {
  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <ul style={getStyle()}>
      {todos.map(todo => (
        <li key={todo.id}>
          <TodoListItem
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

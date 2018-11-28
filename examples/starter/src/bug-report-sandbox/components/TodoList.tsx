import { RootState } from 'MyTypes';
import * as React from 'react';
import { connect } from 'react-redux';

import { models, selectors } from '..';

import TodoItem from './TodoItem';

interface Props {
  todos: models.Todo[];
}

function TodoList({ todos = [] }: Props) {
  return (
    <ul style={getStyle()}>
      {todos.map(todo => (
        <li key={todo.id}>
          <TodoItem item={todo} />
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

const mapStateToProps = (state: RootState) => ({
  todos: selectors.getTodos(state.sandbox),
});

export default connect(mapStateToProps)(TodoList);

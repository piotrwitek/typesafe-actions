import { RootState } from 'MyTypes';
import * as React from 'react';
import { connect } from 'react-redux';

import { Todo } from '../models';
import * as selectors from '../selectors';

import TodoItem from './TodoItem';

interface Props {
  todos: Todo[];
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

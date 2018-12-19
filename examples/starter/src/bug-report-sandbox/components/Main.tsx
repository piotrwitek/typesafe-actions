import * as React from 'react';

import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';
import TodoListActions from './TodoListActions';

export default () => (
  <section>
    <TodoListActions />
    <br />
    <AddTodoForm />
    <hr />
    <TodoList />
  </section>
);

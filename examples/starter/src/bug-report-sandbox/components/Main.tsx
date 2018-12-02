import * as React from 'react';

import TodoList from './TodoList';
import AddTodoForm from './TodoForm';
import TodoActions from './TodoActions';

export default () => (
  <section>
    <TodoActions />
    <br />
    <AddTodoForm />
    <hr />
    <TodoList />
  </section>
);

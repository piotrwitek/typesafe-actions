import * as React from 'react';

import TodoList from './TodoList';
import AddTodoForm from './TodoForm';

export default () => (
  <section>
    <AddTodoForm />
    <hr />
    <TodoList />
  </section>
);

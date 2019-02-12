// import { createSelector } from 'reselect';

import { SandboxState } from './reducer';

export const getTodos = (state: SandboxState) => state.todos;

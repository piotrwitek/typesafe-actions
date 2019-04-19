export const add = (amount: number) => createAction('ADD', amount);
export const increment = () => createAction('INCREMENT');
const actions = { add, increment };

declare module '.' {
  export type RootAction = ActionType<typeof actions>;
}

import { ActionType, action as createAction, createReducer } from '.';

const initialState = 0;

export const counterReducer = createReducer(initialState)
  .addHandler([add], (state, action) => {
    return state + action.payload;
  })
  .addHandler([increment], (state, _) => {
    return state + 1;
  });

const counterState = counterReducer(0, increment());

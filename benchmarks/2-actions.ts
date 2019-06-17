import { ActionType, createAction, createReducer } from '../src';

export const actions = {
  a1: createAction('a1'),
  a2: createAction('a2'),
};

export type RootAction = ActionType<typeof actions>;

// handling half the available actions for proportional benchmark test cases
export const reducer1 = createReducer<number, RootAction>(0).handleAction(
  actions.a1,
  state => state
);
export const reducer2 = createReducer<number, RootAction>(0).handleAction(
  actions.a2,
  state => state
);

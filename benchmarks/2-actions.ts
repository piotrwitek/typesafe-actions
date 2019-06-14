import { ActionType, createAction, createReducer } from '../src';

const actions = {
  a1: createAction('a1'),
  a2: createAction('a2'),
};

export type RootAction = ActionType<typeof actions>;

// handling half the available actions for proportional benchmark test cases
const reducer = createReducer<number, RootAction>(0).handleAction(
  actions.a1,
  state => state
);

// tslint:disable-next-line: no-console
console.log(reducer(0, { type: 'a1' }));

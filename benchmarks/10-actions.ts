import { ActionType, createAction, createReducer } from '..';

const actions = {
  a1: createAction('a1'),
  a2: createAction('a2'),
  a3: createAction('a3'),
  a4: createAction('a4'),
  a5: createAction('a5'),
  a6: createAction('a6'),
  a7: createAction('a7'),
  a8: createAction('a8'),
  a9: createAction('a9'),
  a10: createAction('a10'),
};

export type RootAction = ActionType<typeof actions>;

// handling half the available actions for proportional benchmark test cases
const reducer = createReducer<number, RootAction>(0)
  .handleAction(actions.a1, state => state)
  .handleAction(actions.a2, state => state)
  .handleAction(actions.a3, state => state)
  .handleAction(actions.a4, state => state)
  .handleAction(actions.a5, state => state);

// tslint:disable-next-line: no-console
console.log(reducer(0, { type: 'a1' }));

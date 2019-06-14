import { ActionType, createAction, createReducer } from '../src';

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
  a11: createAction('a11'),
  a12: createAction('a12'),
  a13: createAction('a13'),
  a14: createAction('a14'),
  a15: createAction('a15'),
  a16: createAction('a16'),
  a17: createAction('a17'),
  a18: createAction('a18'),
  a19: createAction('a19'),
  a20: createAction('a20'),
  a21: createAction('a21'),
  a22: createAction('a22'),
  a23: createAction('a23'),
  a24: createAction('a24'),
  a25: createAction('a25'),
  a26: createAction('a26'),
  a27: createAction('a27'),
  a28: createAction('a28'),
  a29: createAction('a29'),
  a30: createAction('a30'),
  a31: createAction('a31'),
  a32: createAction('a32'),
  a33: createAction('a33'),
  a34: createAction('a34'),
  a35: createAction('a35'),
  a36: createAction('a36'),
  a37: createAction('a37'),
  a38: createAction('a38'),
  a39: createAction('a39'),
  a40: createAction('a40'),
  a41: createAction('a41'),
  a42: createAction('a42'),
  a43: createAction('a43'),
  a44: createAction('a44'),
  a45: createAction('a45'),
  a46: createAction('a46'),
  a47: createAction('a47'),
  a48: createAction('a48'),
  a49: createAction('a49'),
  a50: createAction('a50'),
};

export type RootAction = ActionType<typeof actions>;

// handling half the available actions for proportional benchmark test cases
const reducer = createReducer<number, RootAction>(0)
  .handleAction(actions.a1, state => state)
  .handleAction(actions.a2, state => state)
  .handleAction(actions.a3, state => state)
  .handleAction(actions.a4, state => state)
  .handleAction(actions.a5, state => state)
  .handleAction(actions.a6, state => state)
  .handleAction(actions.a7, state => state)
  .handleAction(actions.a8, state => state)
  .handleAction(actions.a9, state => state)
  .handleAction(actions.a10, state => state)
  .handleAction(actions.a11, state => state)
  .handleAction(actions.a12, state => state)
  .handleAction(actions.a13, state => state)
  .handleAction(actions.a14, state => state)
  .handleAction(actions.a15, state => state)
  .handleAction(actions.a16, state => state)
  .handleAction(actions.a17, state => state)
  .handleAction(actions.a18, state => state)
  .handleAction(actions.a19, state => state)
  .handleAction(actions.a20, state => state)
  .handleAction(actions.a21, state => state)
  .handleAction(actions.a22, state => state)
  .handleAction(actions.a23, state => state)
  .handleAction(actions.a24, state => state)
  .handleAction(actions.a25, state => state);

// tslint:disable-next-line: no-console
console.log(reducer(0, { type: 'a1' }));

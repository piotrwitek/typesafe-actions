import {
  ActionType,
  createAction,
  createReducer,
  createStandardAction,
} from '../src';

export const actions = {
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
export const actions2 = {
  a1: createStandardAction('b1')<string>(),
  a2: createStandardAction('b2')<string>(),
  a3: createStandardAction('b3')<string>(),
  a4: createStandardAction('b4')<string>(),
  a5: createStandardAction('b5')<string>(),
  a6: createStandardAction('b6')<string>(),
  a7: createStandardAction('b7')<string>(),
  a8: createStandardAction('b8')<string>(),
  a9: createStandardAction('b9')<string>(),
  a10: createStandardAction('b10')<string>(),
  a11: createStandardAction('b11')<string>(),
  a12: createStandardAction('b12')<string>(),
  a13: createStandardAction('b13')<string>(),
  a14: createStandardAction('b14')<string>(),
  a15: createStandardAction('b15')<string>(),
  a16: createStandardAction('b16')<string>(),
  a17: createStandardAction('b17')<string>(),
  a18: createStandardAction('b18')<string>(),
  a19: createStandardAction('b19')<string>(),
  a20: createStandardAction('b20')<string>(),
  a21: createStandardAction('b21')<string>(),
  a22: createStandardAction('b22')<string>(),
  a23: createStandardAction('b23')<string>(),
  a24: createStandardAction('b24')<string>(),
  a25: createStandardAction('b25')<string>(),
  a26: createStandardAction('b26')<string, number>(),
  a27: createStandardAction('b27')<string, number>(),
  a28: createStandardAction('b28')<string, number>(),
  a29: createStandardAction('b29')<string, number>(),
  a30: createStandardAction('b30')<string, number>(),
  a31: createStandardAction('b31')<string, number>(),
  a32: createStandardAction('b32')<string, number>(),
  a33: createStandardAction('b33')<string, number>(),
  a34: createStandardAction('b34')<string, number>(),
  a35: createStandardAction('b35')<string, number>(),
  a36: createStandardAction('b36')<string, number>(),
  a37: createStandardAction('b37')<string, number>(),
  a38: createStandardAction('b38')<string, number>(),
  a39: createStandardAction('b39')<string, number>(),
  a40: createStandardAction('b40')<string, number>(),
  a41: createStandardAction('b41')<string, number>(),
  a42: createStandardAction('b42')<string, number>(),
  a43: createStandardAction('b43')<string, number>(),
  a44: createStandardAction('b44')<string, number>(),
  a45: createStandardAction('b45')<string, number>(),
  a46: createStandardAction('b46')<string, number>(),
  a47: createStandardAction('b47')<string, number>(),
  a48: createStandardAction('b48')<string, number>(),
  a49: createStandardAction('b49')<string, number>(),
  a50: createStandardAction('b50')<string, number>(),
};

export type RootAction = ActionType<typeof actions | typeof actions2>;

// handling half the available actions for proportional benchmark test cases
export const reducer1 = createReducer<number, RootAction>(0)
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

export const reducer2 = createReducer<number, RootAction>(0)
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

export const reducer3 = createReducer<number, RootAction>(0)
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

export const reducer4 = createReducer<number, RootAction>(0)
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

export const reducer5 = createReducer<number, RootAction>(0)
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

export const reducer6 = createReducer<number, RootAction>(0)
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

export const reducer7 = createReducer<number, RootAction>(0)
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

export const reducer8 = createReducer<number, RootAction>(0)
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

export const reducer9 = createReducer<number, RootAction>(0)
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

export const reducer10 = createReducer<number, RootAction>(0)
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

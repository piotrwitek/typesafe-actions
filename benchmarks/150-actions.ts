import { ActionType, createAction, createReducer } from '../src';

export const actions = {
  a1: createAction('a1')(),
  a2: createAction('a2')(),
  a3: createAction('a3')(),
  a4: createAction('a4')(),
  a5: createAction('a5')(),
  a6: createAction('a6')(),
  a7: createAction('a7')(),
  a8: createAction('a8')(),
  a9: createAction('a9')(),
  a10: createAction('a10')(),
  a11: createAction('a11')(),
  a12: createAction('a12')(),
  a13: createAction('a13')(),
  a14: createAction('a14')(),
  a15: createAction('a15')(),
  a16: createAction('a16')(),
  a17: createAction('a17')(),
  a18: createAction('a18')(),
  a19: createAction('a19')(),
  a20: createAction('a20')(),
  a21: createAction('a21')(),
  a22: createAction('a22')(),
  a23: createAction('a23')(),
  a24: createAction('a24')(),
  a25: createAction('a25')(),
  a26: createAction('a26')(),
  a27: createAction('a27')(),
  a28: createAction('a28')(),
  a29: createAction('a29')(),
  a30: createAction('a30')(),
  a31: createAction('a31')(),
  a32: createAction('a32')(),
  a33: createAction('a33')(),
  a34: createAction('a34')(),
  a35: createAction('a35')(),
  a36: createAction('a36')(),
  a37: createAction('a37')(),
  a38: createAction('a38')(),
  a39: createAction('a39')(),
  a40: createAction('a40')(),
  a41: createAction('a41')(),
  a42: createAction('a42')(),
  a43: createAction('a43')(),
  a44: createAction('a44')(),
  a45: createAction('a45')(),
  a46: createAction('a46')(),
  a47: createAction('a47')(),
  a48: createAction('a48')(),
  a49: createAction('a49')(),
  a50: createAction('a50')(),
  b1: createAction('b1')(),
  b2: createAction('b2')(),
  b3: createAction('b3')(),
  b4: createAction('b4')(),
  b5: createAction('b5')(),
  b6: createAction('b6')(),
  b7: createAction('b7')(),
  b8: createAction('b8')(),
  b9: createAction('b9')(),
  b10: createAction('b10')(),
  b11: createAction('b11')(),
  b12: createAction('b12')(),
  b13: createAction('b13')(),
  b14: createAction('b14')(),
  b15: createAction('b15')(),
  b16: createAction('b16')(),
  b17: createAction('b17')(),
  b18: createAction('b18')(),
  b19: createAction('b19')(),
  b20: createAction('b20')(),
  b21: createAction('b21')(),
  b22: createAction('b22')(),
  b23: createAction('b23')(),
  b24: createAction('b24')(),
  b25: createAction('b25')(),
  b26: createAction('b26')(),
  b27: createAction('b27')(),
  b28: createAction('b28')(),
  b29: createAction('b29')(),
  b30: createAction('b30')(),
  b31: createAction('b31')(),
  b32: createAction('b32')(),
  b33: createAction('b33')(),
  b34: createAction('b34')(),
  b35: createAction('b35')(),
  b36: createAction('b36')(),
  b37: createAction('b37')(),
  b38: createAction('b38')(),
  b39: createAction('b39')(),
  b40: createAction('b40')(),
  b41: createAction('b41')(),
  b42: createAction('b42')(),
  b43: createAction('b43')(),
  b44: createAction('b44')(),
  b45: createAction('b45')(),
  b46: createAction('b46')(),
  b47: createAction('b47')(),
  b48: createAction('b48')(),
  b49: createAction('b49')(),
  b50: createAction('b50')(),
  c1: createAction('c1')<string>(),
  c2: createAction('c2')<string>(),
  c3: createAction('c3')<string>(),
  c4: createAction('c4')<string>(),
  c5: createAction('c5')<string>(),
  c6: createAction('c6')<string>(),
  c7: createAction('c7')<string>(),
  c8: createAction('c8')<string>(),
  c9: createAction('c9')<string>(),
  c10: createAction('c10')<string>(),
  c11: createAction('c11')<string>(),
  c12: createAction('c12')<string>(),
  c13: createAction('c13')<string>(),
  c14: createAction('c14')<string>(),
  c15: createAction('c15')<string>(),
  c16: createAction('c16')<string>(),
  c17: createAction('c17')<string>(),
  c18: createAction('c18')<string>(),
  c19: createAction('c19')<string>(),
  c20: createAction('c20')<string>(),
  c21: createAction('c21')<string>(),
  c22: createAction('c22')<string>(),
  c23: createAction('c23')<string>(),
  c24: createAction('c24')<string>(),
  c25: createAction('c25')<string>(),
  c26: createAction('c26')<string, number>(),
  c27: createAction('c27')<string, number>(),
  c28: createAction('c28')<string, number>(),
  c29: createAction('c29')<string, number>(),
  c30: createAction('c30')<string, number>(),
  c31: createAction('c31')<string, number>(),
  c32: createAction('c32')<string, number>(),
  c33: createAction('c33')<string, number>(),
  c34: createAction('c34')<string, number>(),
  c35: createAction('c35')<string, number>(),
  c36: createAction('c36')<string, number>(),
  c37: createAction('c37')<string, number>(),
  c38: createAction('c38')<string, number>(),
  c39: createAction('c39')<string, number>(),
  c40: createAction('c40')<string, number>(),
  c41: createAction('c41')<string, number>(),
  c42: createAction('c42')<string, number>(),
  c43: createAction('c43')<string, number>(),
  c44: createAction('c44')<string, number>(),
  c45: createAction('c45')<string, number>(),
  c46: createAction('c46')<string, number>(),
  c47: createAction('c47')<string, number>(),
  c48: createAction('c48')<string, number>(),
  c49: createAction('c49')<string, number>(),
  c50: createAction('c50')<string, number>(),
};

export type RootAction = ActionType<typeof actions>;

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
  .handleAction(actions.a25, state => state)
  .handleAction(actions.a26, state => state)
  .handleAction(actions.a27, state => state)
  .handleAction(actions.a28, state => state)
  .handleAction(actions.a29, state => state)
  .handleAction(actions.a30, state => state)
  .handleAction(actions.a31, state => state)
  .handleAction(actions.a32, state => state)
  .handleAction(actions.a33, state => state)
  .handleAction(actions.a34, state => state)
  .handleAction(actions.a35, state => state)
  .handleAction(actions.a36, state => state)
  .handleAction(actions.a37, state => state)
  .handleAction(actions.a38, state => state)
  .handleAction(actions.a39, state => state)
  .handleAction(actions.a40, state => state)
  .handleAction(actions.a41, state => state)
  .handleAction(actions.a42, state => state)
  .handleAction(actions.a43, state => state)
  .handleAction(actions.a44, state => state)
  .handleAction(actions.a45, state => state)
  .handleAction(actions.a46, state => state)
  .handleAction(actions.a47, state => state)
  .handleAction(actions.a48, state => state)
  .handleAction(actions.a49, state => state)
  .handleAction(actions.a50, state => state)
  .handleAction(actions.b1, state => state)
  .handleAction(actions.b2, state => state)
  .handleAction(actions.b3, state => state)
  .handleAction(actions.b4, state => state)
  .handleAction(actions.b5, state => state)
  .handleAction(actions.b6, state => state)
  .handleAction(actions.b7, state => state)
  .handleAction(actions.b8, state => state)
  .handleAction(actions.b9, state => state)
  .handleAction(actions.b10, state => state)
  .handleAction(actions.b11, state => state)
  .handleAction(actions.b12, state => state)
  .handleAction(actions.b13, state => state)
  .handleAction(actions.b14, state => state)
  .handleAction(actions.b15, state => state)
  .handleAction(actions.b16, state => state)
  .handleAction(actions.b17, state => state)
  .handleAction(actions.b18, state => state)
  .handleAction(actions.b19, state => state)
  .handleAction(actions.b20, state => state)
  .handleAction(actions.b21, state => state)
  .handleAction(actions.b22, state => state)
  .handleAction(actions.b23, state => state)
  .handleAction(actions.b24, state => state)
  .handleAction(actions.b25, state => state)
  .handleAction(actions.c1, state => state)
  .handleAction(actions.c2, state => state)
  .handleAction(actions.c3, state => state)
  .handleAction(actions.c4, state => state)
  .handleAction(actions.c5, state => state)
  .handleAction(actions.c6, state => state)
  .handleAction(actions.c7, state => state)
  .handleAction(actions.c8, state => state)
  .handleAction(actions.c9, state => state)
  .handleAction(actions.c10, state => state)
  .handleAction(actions.c11, state => state)
  .handleAction(actions.c12, state => state)
  .handleAction(actions.c13, state => state)
  .handleAction(actions.c14, state => state)
  .handleAction(actions.c15, state => state)
  .handleAction(actions.c16, state => state)
  .handleAction(actions.c17, state => state)
  .handleAction(actions.c18, state => state)
  .handleAction(actions.c19, state => state)
  .handleAction(actions.c20, state => state)
  .handleAction(actions.c21, state => state)
  .handleAction(actions.c22, state => state)
  .handleAction(actions.c23, state => state)
  .handleAction(actions.c24, state => state)
  .handleAction(actions.c25, state => state);

export const reducer2 = createReducer<number, RootAction>(0)
  .handleAction(actions.b1, state => state)
  .handleAction(actions.b2, state => state)
  .handleAction(actions.b3, state => state)
  .handleAction(actions.b4, state => state)
  .handleAction(actions.b5, state => state)
  .handleAction(actions.b6, state => state)
  .handleAction(actions.b7, state => state)
  .handleAction(actions.b8, state => state)
  .handleAction(actions.b9, state => state)
  .handleAction(actions.b10, state => state)
  .handleAction(actions.b11, state => state)
  .handleAction(actions.b12, state => state)
  .handleAction(actions.b13, state => state)
  .handleAction(actions.b14, state => state)
  .handleAction(actions.b15, state => state)
  .handleAction(actions.b16, state => state)
  .handleAction(actions.b17, state => state)
  .handleAction(actions.b18, state => state)
  .handleAction(actions.b19, state => state)
  .handleAction(actions.b20, state => state)
  .handleAction(actions.b21, state => state)
  .handleAction(actions.b22, state => state)
  .handleAction(actions.b23, state => state)
  .handleAction(actions.b24, state => state)
  .handleAction(actions.b25, state => state)
  .handleAction(actions.c1, state => state)
  .handleAction(actions.c2, state => state)
  .handleAction(actions.c3, state => state)
  .handleAction(actions.c4, state => state)
  .handleAction(actions.c5, state => state)
  .handleAction(actions.c6, state => state)
  .handleAction(actions.c7, state => state)
  .handleAction(actions.c8, state => state)
  .handleAction(actions.c9, state => state)
  .handleAction(actions.c10, state => state)
  .handleAction(actions.c11, state => state)
  .handleAction(actions.c12, state => state)
  .handleAction(actions.c13, state => state)
  .handleAction(actions.c14, state => state)
  .handleAction(actions.c15, state => state)
  .handleAction(actions.c16, state => state)
  .handleAction(actions.c17, state => state)
  .handleAction(actions.c18, state => state)
  .handleAction(actions.c19, state => state)
  .handleAction(actions.c20, state => state)
  .handleAction(actions.c21, state => state)
  .handleAction(actions.c22, state => state)
  .handleAction(actions.c23, state => state)
  .handleAction(actions.c24, state => state)
  .handleAction(actions.c25, state => state);

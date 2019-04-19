import { ActionType, createStandardAction, createReducer } from '.';

export const add = createStandardAction('ADD')<number>();
export const increment = createStandardAction('INCREMENT')();
const actions = { add, increment };

declare module '.' {
  export type RootAction = ActionType<typeof actions>;
}

const initialState = 0;

export const counterReducer = createReducer(initialState)
  .addHandler([add], (state, action) => {
    return state + action.payload;
  })
  .addHandler([increment], (state, _) => {
    return state + 1;
  });

// @dts-jest:pass:snap
counterReducer(0, increment()); // => 1
// @dts-jest:pass:snap
counterReducer(0, add(4)); // => 4

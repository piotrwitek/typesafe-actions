import * as T from './type-helpers'; // type-tests global
import { ActionType } from './type-helpers';
import { createStandardAction } from './create-standard-action';
import { createReducer } from './create-reducer';

const add = createStandardAction('ADD')<number>();
const increment = createStandardAction('INCREMENT')();
const actions = { add, increment };

declare module './' {
  export type RootAction = ActionType<typeof actions>;
}

// TODO: add type-test cases

const initialState = 0;
describe('With Action Creators', () => {
  const counterReducer1 = createReducer(initialState).addHandler(
    [add, increment],
    (state, action) => {
      return state + (action.type === 'ADD' ? action.payload : 1);
    }
  );
  const counterReducer2 = createReducer(initialState)
    .addHandler([add], (state, action) => {
      return state + action.payload;
    })
    .addHandler([increment], (state, _) => {
      return state + 1;
    });
  const counterReducer3 = createReducer(initialState)
    .addHandler(add, (state, action) => {
      return state + action.payload;
    })
    .addHandler(increment, (state, _) => {
      return state + 1;
    });

  [counterReducer1, counterReducer2, counterReducer3].forEach(fn => {
    // @dts-jest:pass:snap
    fn(0, {} as any); // => 0
    // @dts-jest:pass:snap
    fn(0, increment()); // => 1
    // @dts-jest:pass:snap
    fn(0, add(4)); // => 4
  });
});

describe('With Action Types', () => {
  const counterReducer1 = createReducer(initialState).addHandler(
    ['ADD', 'INCREMENT'],
    (state, action) => {
      return state + (action.type === 'ADD' ? action.payload : 1);
    }
  );

  const counterReducer2 = createReducer(initialState)
    .addHandler(['ADD'], (state, action) => {
      return state + action.payload;
    })
    .addHandler(['INCREMENT'], (state, _) => {
      return state + 1;
    });
  const counterReducer3 = createReducer(initialState)
    .addHandler('ADD', (state, action) => {
      return state + action.payload;
    })
    .addHandler('INCREMENT', (state, _) => {
      return state + 1;
    });

  [counterReducer1, counterReducer2, counterReducer3].forEach(fn => {
    // @dts-jest:pass:snap
    fn(0, {} as any); // => 0
    // @dts-jest:pass:snap
    fn(0, increment()); // => 1
    // @dts-jest:pass:snap
    fn(0, add(4)); // => 4
  });
});

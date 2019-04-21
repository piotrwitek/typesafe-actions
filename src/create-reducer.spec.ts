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
  // @dts-jest:pass:snap
  const counterReducer1 = createReducer(initialState).handleAction(
    [add, increment],
    (state, action) => {
      return state + (action.type === 'ADD' ? action.payload : 1);
    }
  );
  // @dts-jest:pass:snap
  const counterReducer2 = createReducer(initialState)
    .handleAction([add], (state, action) => {
      return state + action.payload;
    })
    .handleAction([increment], (state, _) => {
      return state + 1;
    });
  // @dts-jest:pass:snap
  const counterReducer3 = createReducer(initialState)
    .handleAction(add, (state, action) => {
      return state + action.payload;
    })
    .handleAction(increment, (state, _) => {
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
  //
  // @dts-jest:pass:snap
  const counterReducer1 = createReducer(initialState).handleAction(
    ['ADD', 'INCREMENT'],
    (state, action) => {
      return state + (action.type === 'ADD' ? action.payload : 1);
    }
  );
  // @dts-jest:pass:snap
  const counterReducer2 = createReducer(initialState)
    .handleAction(['ADD'], (state, action) => {
      return state + action.payload;
    })
    .handleAction(['INCREMENT'], (state, _) => {
      return state + 1;
    });
  // @dts-jest:pass:snap
  const counterReducer3 = createReducer(initialState)
    .handleAction('ADD', (state, action) => {
      return state + action.payload;
    })
    .handleAction('INCREMENT', (state, _) => {
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

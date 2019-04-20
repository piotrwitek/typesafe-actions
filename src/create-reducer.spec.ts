import { ActionType, createStandardAction, createReducer } from '.';

const add = createStandardAction('ADD')<number>();
const increment = createStandardAction('INCREMENT')();
const actions = { add, increment };

declare module '.' {
  export type RootAction = ActionType<typeof actions>;
}

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
    fn(0, increment()); // => 1
    // @dts-jest:pass:snap
    fn(0, add(4)); // => 4
  });
});

// wroc do implementacji ze nie mozna podac dwoch tych samych parametrow
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
    fn(0, increment()); // => 1
    // @dts-jest:pass:snap
    fn(0, add(4)); // => 4
  });
});

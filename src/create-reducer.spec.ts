import * as T from './type-helpers'; // type-tests global
import { ActionType } from './type-helpers';
import { createStandardAction } from './create-standard-action';
import { createReducer } from './create-reducer';
import { getType } from './get-type';

const add = createStandardAction('ADD')<number>();
const increment = createStandardAction('INCREMENT')();
const actions = { add, increment };

declare module './' {
  export type RootAction = ActionType<typeof actions>;
}

const initialState = 0;

// @dts-jest:group With Action Creators
{
  const reducerTest = createReducer(initialState);

  const counterReducer1 = reducerTest.handleAction(
    [add, increment],
    (state, action) => {
      return state + (action.type === 'ADD' ? action.payload : 1);
    }
  );
  // @dts-jest:pass:snap
  counterReducer1;
  // @dts-jest:pass
  Object.keys({ ...counterReducer1.reducers }); // => ["ADD", "INCREMENT"]
  // @dts-jest:pass
  Object.keys({ ...reducerTest.reducers }); // => []

  const counterReducer2 = reducerTest
    .handleAction([add], (state, action) => {
      return state + action.payload;
    })
    .handleAction([increment], (state, _) => {
      return state + 1;
    });
  // @dts-jest:pass:snap
  counterReducer2;
  // @dts-jest:pass
  Object.keys({ ...counterReducer2.reducers }); // => ["ADD", "INCREMENT"]
  // @dts-jest:pass
  Object.keys({ ...reducerTest.reducers }); // => []

  const counterReducer3 = reducerTest.handleAction(add, (state, action) => {
    return state + action.payload;
  });
  // @dts-jest:pass:snap
  counterReducer3;
  // @dts-jest:pass
  Object.keys({ ...counterReducer3.reducers }); // => [ "ADD"]
  // @dts-jest:pass
  Object.keys({ ...reducerTest.reducers }); // => []

  const counterReducer4 = reducerTest.handleAction(increment, (state, _) => {
    return state + 1;
  });
  // @dts-jest:pass:snap
  counterReducer4;
  // @dts-jest:pass
  Object.keys({ ...counterReducer4.reducers }); // => [ "INCREMENT"]
  // @dts-jest:pass
  Object.keys({ ...reducerTest.reducers }); // => []

  {
    [
      counterReducer1,
      counterReducer2,
      createReducer(initialState, {
        [getType(add)]: counterReducer3.reducers.ADD,
        [getType(increment)]: counterReducer4.reducers.INCREMENT,
      }),
    ].forEach(fn => {
      // @dts-jest:pass
      fn(0, {} as any); // => 0
      // @dts-jest:pass
      fn(0, increment()); // => 1
      // @dts-jest:pass
      fn(0, add(4)); // => 4
    });
  }
}

// @dts-jest:group With Action Types
{
  const reducerTest = createReducer(initialState);

  const counterReducer1 = reducerTest.handleAction(
    ['ADD', 'INCREMENT'],
    (state, action) => {
      return state + (action.type === 'ADD' ? action.payload : 1);
    }
  );
  // @dts-jest:pass:snap
  counterReducer1;
  // @dts-jest:pass
  Object.keys({ ...counterReducer1.reducers }); // => ["ADD", "INCREMENT"]
  // @dts-jest:pass
  Object.keys({ ...reducerTest.reducers }); // => []

  const counterReducer2 = reducerTest
    .handleAction(['ADD'], (state, action) => {
      return state + action.payload;
    })
    .handleAction(['INCREMENT'], (state, _) => {
      return state + 1;
    });
  // @dts-jest:pass:snap
  counterReducer2;
  // @dts-jest:pass
  Object.keys({ ...counterReducer2.reducers }); // => ["ADD", "INCREMENT"]
  // @dts-jest:pass
  Object.keys({ ...reducerTest.reducers }); // => []

  const counterReducer3 = reducerTest.handleAction('ADD', (state, action) => {
    return state + action.payload;
  });
  // @dts-jest:pass:snap
  counterReducer3;
  // @dts-jest:pass
  Object.keys({ ...counterReducer3.reducers }); // => ["ADD"]
  // @dts-jest:pass
  Object.keys({ ...reducerTest.reducers }); // => []

  const counterReducer4 = reducerTest.handleAction('INCREMENT', (state, _) => {
    return state + 1;
  });
  // @dts-jest:pass:snap
  counterReducer4;
  // @dts-jest:pass
  Object.keys({ ...counterReducer4.reducers }); // => [ "INCREMENT"]
  // @dts-jest:pass
  Object.keys({ ...reducerTest.reducers }); // => []

  {
    [
      counterReducer1,
      counterReducer2,
      createReducer(initialState, {
        ADD: counterReducer3.reducers.ADD,
        INCREMENT: counterReducer4.reducers.INCREMENT,
      }),
    ].forEach(fn => {
      // @dts-jest:pass
      fn(0, {} as any); // => 0
      // @dts-jest:pass
      fn(0, increment()); // => 1
      // @dts-jest:pass
      fn(0, add(4)); // => 4
    });
  }
}

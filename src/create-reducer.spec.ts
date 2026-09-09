import * as T from './type-helpers'; // type-tests global
import { ActionType } from './type-helpers';
import { createAction } from './create-action';
import { createReducer } from './create-reducer';
import { getType } from './get-type';

const add = createAction('ADD')<number>();
const increment = createAction('INCREMENT')();
const decrement = createAction('DECREMENT')();
const actions = {
  add,
  increment,
  decrement,
};

declare module './type-helpers' {
  interface Types {
    RootAction: ActionType<typeof actions>;
  }
}

const initialState = 0;

// @dts-jest:group With Action Creators
{
  const emptyReducer = createReducer(initialState);

  const counterReducer1 = emptyReducer.handleAction(
    [add, increment],
    (state, action) => state + (action.type === 'ADD' ? action.payload : 1)
  );
  // @dts-jest:pass:snap
  counterReducer1.handlers;
  // @dts-jest:pass
  Object.keys({ ...counterReducer1.handlers }); // => ["ADD", "INCREMENT"]
  // @dts-jest:pass
  Object.keys({ ...emptyReducer.handlers }); // => []

  const counterReducer2 = emptyReducer
    .handleAction([add], (state, action) => state + action.payload)
    .handleAction([increment], (state, _) => state + 1);
  // @dts-jest:pass:snap
  counterReducer2.handlers;
  // @dts-jest:pass
  Object.keys({ ...counterReducer2.handlers }); // => ["ADD", "INCREMENT"]
  // @dts-jest:pass
  Object.keys({ ...emptyReducer.handlers }); // => []

  const counterReducer3 = emptyReducer.handleAction(
    add,
    (state, action) => state + action.payload
  );
  // @dts-jest:pass:snap
  counterReducer3.handlers;
  // @dts-jest:pass
  Object.keys({ ...counterReducer3.handlers }); // => [ "ADD"]
  // @dts-jest:pass
  Object.keys({ ...emptyReducer.handlers }); // => []

  const counterReducer4 = emptyReducer.handleAction(
    increment,
    (state, _) => state + 1
  );
  // @dts-jest:pass:snap
  counterReducer4.handlers;
  // @dts-jest:pass
  Object.keys({ ...counterReducer4.handlers }); // => [ "INCREMENT"]
  // @dts-jest:pass
  Object.keys({ ...emptyReducer.handlers }); // => []

  {
    [
      counterReducer1,
      counterReducer2,
      createReducer(initialState, {
        [getType(add)]: counterReducer3.handlers.ADD,
        [getType(increment)]: counterReducer4.handlers.INCREMENT,
      }),
      // has to be typed as any because of typescript bug: https://github.com/microsoft/TypeScript/issues/29718
      createReducer(initialState, {
        [getType(add)]: (state: any, action: any) => state + action.payload,
        [getType(increment)]: (state: any, _: any) => state + 1,
      }),
      createReducer<number, ActionType<typeof actions>>(initialState, {
        [getType(add)]: (state: any, action: any) => state + action.payload,
        [getType(increment)]: (state: any, _: any) => state + 1,
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

// @dts-jest:group Type refinement checks
{
  type State = {
    foo: string | null;
  };

  const defaultState: State = {
    foo: null,
  };

  const actions2 = {
    foo1: createAction('foo1')<string>(),
    foo2: createAction('foo2')<string>(),
    foo3: createAction('foo3')(),
    foo4: createAction('foo4')(),
  };

  type Action = ActionType<typeof actions2>;

  const reducer = createReducer<State, Action>(defaultState)
    .handleAction(actions2.foo1, (state, action) => {
      // @dts-jest:pass:snap
      state;
      // @dts-jest:pass:snap
      action;

      return {
        ...state,
        foo: action.payload,
      };
    })
    .handleAction(actions2.foo2, (state, action) => {
      // @dts-jest:pass:snap
      state;
      // @dts-jest:pass:snap
      action;

      return {
        ...state,
        foo: action.payload,
      };
    })
    .handleAction(actions2.foo3, (state, action) => {
      // @dts-jest:pass:snap
      state;
      // @dts-jest:pass:snap
      action;

      return {
        ...state,
        foo: 'empty',
      };
    })
    .handleAction(actions2.foo4, (state, action) => {
      // @dts-jest:pass:snap
      state;
      // @dts-jest:pass:snap
      action;

      return {
        ...state,
        foo: 'empty',
      };
    });

  // @dts-jest:pass:snap
  reducer.handlers;

  {
    [
      reducer(defaultState, actions2.foo1('check')),
      reducer(defaultState, actions2.foo2('check')),
    ].forEach(reducerResult => {
      // @dts-jest:pass:snap
      reducerResult; // => { foo: "check" }
    });

    [
      reducer(defaultState, actions2.foo3()),
      reducer(defaultState, actions2.foo4()),
    ].forEach(reducerResult => {
      // @dts-jest:pass:snap
      reducerResult; // => { foo: "empty" }
    });
  }
}

// @dts-jest:group With Action Types
{
  const reducerTest = createReducer(initialState);

  const counterReducer1 = reducerTest.handleType(
    ['ADD', 'INCREMENT'],
    (state, action) => state + (action.type === 'ADD' ? action.payload : 1)
  );
  // @dts-jest:pass:snap
  counterReducer1.handlers;
  // @dts-jest:pass
  Object.keys({ ...counterReducer1.handlers }); // => ["ADD", "INCREMENT"]
  // @dts-jest:pass
  Object.keys({ ...reducerTest.handlers }); // => []

  const counterReducer2 = reducerTest
    .handleType(['ADD'], (state, action) => state + action.payload)
    .handleType(['INCREMENT'], (state, _) => state + 1);
  // @dts-jest:pass:snap
  counterReducer2.handlers;
  // @dts-jest:pass
  Object.keys({ ...counterReducer2.handlers }); // => ["ADD", "INCREMENT"]
  // @dts-jest:pass
  Object.keys({ ...reducerTest.handlers }); // => []

  const counterReducer3 = reducerTest.handleType(
    'ADD',
    (state, action) => state + action.payload
  );
  // @dts-jest:pass:snap
  counterReducer3.handlers;
  // @dts-jest:pass
  Object.keys({ ...counterReducer3.handlers }); // => ["ADD"]
  // @dts-jest:pass
  Object.keys({ ...reducerTest.handlers }); // => []

  const counterReducer4 = reducerTest.handleType(
    'INCREMENT',
    (state, _) => state + 1
  );
  // @dts-jest:pass:snap
  counterReducer4.handlers;
  // @dts-jest:pass
  Object.keys({ ...counterReducer4.handlers }); // => [ "INCREMENT"]
  // @dts-jest:pass
  Object.keys({ ...reducerTest.handlers }); // => []

  {
    [
      counterReducer1,
      counterReducer2,
      createReducer(initialState, {
        ADD: counterReducer3.handlers.ADD,
        INCREMENT: counterReducer4.handlers.INCREMENT,
      }),
      createReducer(initialState, {
        ADD: (state, action) => state + action.payload,
        INCREMENT: (state, action) => state + 1,
      }),
      createReducer<number, ActionType<typeof actions>>(initialState, {
        ADD: (state, action) => state + action.payload,
        INCREMENT: (state, action) => state + 1,
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

// @dts-jest:group Default handler
{
  const requestStart = createAction('REQUEST_START')();
  const requestSuccess = createAction('REQUEST_SUCCESS')();
  const requestFailure = createAction('REQUEST_FAILURE')();
  const requestActions = {
    requestStart,
    requestSuccess,
    requestFailure,
  };
  type RequestAction = ActionType<typeof requestActions>;

  const emptyLoadingReducer = createReducer<boolean, RequestAction>(false);
  const loadingReducerWithStart = emptyLoadingReducer.handleAction(
    requestStart,
    () => true
  );

  type RemainingRequestHandler = Parameters<
    typeof loadingReducerWithStart.defaultHandler
  >[0];
  type RemainingRequestAction = Parameters<RemainingRequestHandler>[1];
  const remainingRequestAction = {} as RemainingRequestAction;
  // @dts-jest:pass:snap
  remainingRequestAction;

  const loadingReducer = loadingReducerWithStart.defaultHandler(() => false);

  // @dts-jest:pass:snap
  loadingReducer.handlers;
  // @dts-jest:pass
  Object.keys({ ...loadingReducer.handlers }); // => ["REQUEST_START"]
  // @dts-jest:pass
  Object.keys({ ...emptyLoadingReducer.handlers }); // => []

  // @dts-jest:pass
  loadingReducer(false, requestStart()); // => true
  // @dts-jest:pass
  loadingReducer(true, requestSuccess()); // => false
  // @dts-jest:pass
  loadingReducer(true, requestFailure()); // => false

  const loadingReducerByType = emptyLoadingReducer
    .handleType('REQUEST_START', () => true)
    .defaultHandler(() => false);

  // @dts-jest:pass:snap
  loadingReducerByType.handlers;
  // @dts-jest:pass
  loadingReducerByType(false, requestStart()); // => true
  // @dts-jest:pass
  loadingReducerByType(true, requestSuccess()); // => false

  const fallbackOnlyChain = createReducer<number, RequestAction>(0);
  type FallbackOnlyHandler = Parameters<
    typeof fallbackOnlyChain.defaultHandler
  >[0];
  type FallbackOnlyAction = Parameters<FallbackOnlyHandler>[1];
  const fallbackOnlyAction = {} as FallbackOnlyAction;
  // @dts-jest:pass:snap
  fallbackOnlyAction;

  const fallbackOnlyReducer = fallbackOnlyChain.defaultHandler(
    state => state + 1
  );

  // @dts-jest:pass
  Object.keys({ ...fallbackOnlyReducer.handlers }); // => []
  // @dts-jest:pass
  fallbackOnlyReducer(0, requestStart()); // => 1

  type SessionState = { token: string | null };
  const signOut = createAction('SIGN_OUT')();
  const setToken = createAction('SET_TOKEN')<string>();
  const sessionActions = {
    signOut,
    setToken,
  };
  type SessionAction = ActionType<typeof sessionActions>;
  const sessionInitialState: SessionState = { token: null };

  const sessionReducer = createReducer<SessionState, SessionAction>(
    sessionInitialState
  ).handleAction(setToken, (_state, action) => ({ token: action.payload }));

  const rootSessionWithSignOut = createReducer<SessionState, SessionAction>(
    sessionInitialState
  ).handleAction(signOut, (_state, action) =>
    sessionReducer(undefined, action)
  );

  type RemainingSessionHandler = Parameters<
    typeof rootSessionWithSignOut.defaultHandler
  >[0];
  type RemainingSessionAction = Parameters<RemainingSessionHandler>[1];
  const remainingSessionAction = {} as RemainingSessionAction;
  // @dts-jest:pass:snap
  remainingSessionAction;
  // @dts-jest:pass
  remainingSessionAction.payload;

  const rootSessionReducer = rootSessionWithSignOut.defaultHandler(
    (state, action) => sessionReducer(state, action)
  );

  // @dts-jest:pass:snap
  rootSessionReducer.handlers;
  // @dts-jest:pass
  rootSessionReducer({ token: 'abc' }, signOut()); // => { token: null }
  // @dts-jest:pass
  rootSessionReducer({ token: null }, setToken('xyz')); // => { token: "xyz" }
}

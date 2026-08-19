<div align="center">

# typesafe-actions

Typesafe utilities designed to reduce types **verbosity**
and **complexity** in Redux Architecture.

_This library is part of the [React & Redux TypeScript Guide](https://github.com/piotrwitek/react-redux-typescript-guide)_ ecosystem :book:  
[![Latest Stable Version](https://img.shields.io/npm/v/typesafe-actions.svg)](https://www.npmjs.com/package/typesafe-actions)
[![NPM Downloads](https://img.shields.io/npm/dm/typesafe-actions.svg)](https://www.npmjs.com/package/typesafe-actions)
[![NPM Downloads](https://img.shields.io/npm/dt/typesafe-actions.svg)](https://www.npmjs.com/package/typesafe-actions)
[![Bundlephobia Size](https://img.shields.io/bundlephobia/minzip/typesafe-actions.svg)](https://www.npmjs.com/package/typesafe-actions)

[![Build Status](https://semaphoreci.com/api/v1/piotrekwitek/typesafe-actions/branches/master/shields_badge.svg)](https://semaphoreci.com/piotrwitek/typesafe-actions)
[![Dependency Status](https://img.shields.io/david/piotrwitek/typesafe-actions.svg)](https://david-dm.org/piotrwitek/typesafe-actions)
[![License](https://img.shields.io/npm/l/typesafe-actions.svg?style=flat)](https://david-dm.org/piotrwitek/typesafe-actions?type=peer)

_Found it useful? Want more updates?_

[**Show your support by giving a :star:**](https://github.com/piotrwitek/typesafe-actions/stargazers)

<a href="https://www.buymeacoffee.com/piotrekwitek">
  <img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" alt="Buy Me a Coffee">
</a>

<a href="https://www.patreon.com/piotrekwitek">
  <img src="https://c5.patreon.com/external/logo/become_a_patron_button@2x.png" alt="Become a Patron" width="160">
</a>

<br/><hr/>

</div>

### **Features**
- Easily create completely typesafe [Actions](#action-creators-api) or even [Async Actions](#createasyncaction)
- No boilerplate and completely typesafe [Reducers](#reducer-creators-api)
- Game-changing [Helper Types](#type-helpers-api) for Redux

### **Examples**

- Todo-App playground: [Codesandbox](https://codesandbox.io/s/github/piotrwitek/typesafe-actions/tree/master/codesandbox)
- React, Redux, TypeScript - RealWorld App: [Github](https://github.com/piotrwitek/react-redux-typescript-realworld-app) | [Demo](https://react-redux-typescript-realworld-app.netlify.com/)

### **Goals**

- **Secure and Minimal** - no third-party dependencies, according to `size-snapshot` (Minified: 3.48 KB, Gzipped: 1.03 KB), check also on [bundlephobia](https://bundlephobia.com/result?p=typesafe-actions)
- **Optimized** - distribution packages bundled in 3 different formats (`cjs`, `esm` and `umd`) with separate bundles for dev & prod (same as `react`)
- **Quality** - complete test-suite for an entire API surface containing regular runtime tests and extra type-tests to guarantee **type soundness** and to prevent regressions in the future TypeScript versions
- **Performance** - integrated performance benchmarks to guarantee that the computational complexity of types are in check and there are no slow-downs when your application grow `npm run benchmark:XXX`

---

## Table of Contents

- [Installation](#installation)
- [Tutorial](#tutorial-v5)
  - [Choose Your Path](#choose-your-path)
  - [Path A: Using Type Constants](#path-a-using-type-constants)
    - [Step 1: Define Type Constants](#path-a-step-1-define-type-constants)
    - [Step 2: Create Actions](#path-a-step-2-create-actions)
    - [Step 3: Create Async Actions](#path-a-step-3-create-async-actions)
    - [Step 4: Create Reducers](#path-a-step-4-create-reducers)
    - [Step 5: Async Flows](#path-a-step-5-async-flows)
  - [Path B: Using Action Creator Instances](#path-b-using-action-creator-instances)
    - [Step 1: Create Actions](#path-b-step-1-create-actions)
    - [Step 2: Create Async Actions](#path-b-step-2-create-async-actions)
    - [Step 3: Create Reducers](#path-b-step-3-create-reducers)
    - [Step 4: Async Flows](#path-b-step-4-async-flows)
  - [Combining Both Paths](#combining-both-paths)
- [API Reference](#api-reference)
  - [Action-Creators API](#action-creators-api)
    - [`action`](#action)
    - [`createAction`](#createaction)
    - [`createCustomAction`](#createcustomaction)
    - [`createAsyncAction`](#createasyncaction)
  - [Reducer-Creators API](#reducer-creators-api)
    - [`createReducer`](#createreducer)
  - [Action-Helpers API](#action-helpers-api)
    - [`getType`](#gettype)
    - [`isActionOf`](#isactionof)
    - [`isOfType`](#isoftype)
  - [Type-Helpers API](#type-helpers-api)
    - [`ActionType`](#actiontype)
    - [`StateType`](#statetype)
- [Migration from v4](#migration-from-v4-to-v5)
- [Compatibility Notes](#compatibility-notes)
- [Contributing](#contributing)
- [License](#license)

---

## Installation

```bash
# NPM
npm install typesafe-actions

# YARN
yarn add typesafe-actions
```

---

## Tutorial v5

### Choose Your Path

`typesafe-actions` supports **two alternative patterns** for organizing your Redux code. Pick the one that fits your team's style:

| | **Path A: Type Constants** | **Path B: Action Creator Instances** |
|---|---|---|
| **Style** | Define string constants in a separate file | Action creators hold their own type |
| **Reducer matching** | `isOfType(TYPE)` | `getType(creator)` / `isActionOf(creator)` |
| **Best for** | Teams coming from traditional Redux | Teams wanting less boilerplate |
| **Extra file** | Yes (`constants.ts`) | No |

Both paths produce identical runtime behavior and full type-safety. You can mix them within the same project if needed.

> **WARNING**  
> Please make sure that you are familiar with the following TypeScript concepts: [Type Inference](https://www.typescriptlang.org/docs/handbook/type-inference.html), [Control flow analysis](https://github.com/Microsoft/TypeScript/wiki/What%27s-new-in-TypeScript#control-flow-based-type-analysis), [Tagged union types](https://github.com/Microsoft/TypeScript/wiki/What%27s-new-in-TypeScript#tagged-union-types), [Generics](https://www.typescriptlang.org/docs/handbook/generics.html) and [Advanced Types](https://www.typescriptlang.org/docs/handbook/advanced-types.html).

Let's build a simple **counter** app with both paths to showcase the differences.

---

### Path A: Using Type Constants

This is the traditional Redux approach where you define action type strings in a dedicated constants file.

#### Path A - Step 1: Define Type Constants

```ts
// features/counter/constants.ts

// The type literal is preserved for type-safety
export const INCREMENT = 'counter/INCREMENT';
export const DECREMENT = 'counter/DECREMENT';
export const ADD = 'counter/ADD';
```

> **IMPORTANT**: Always use simple string literal assignments with `const`. Dynamic string operations (concatenation, template literals) will widen the type to `string` and break type inference.

```ts
// ❌ Incorrect - type becomes `string`
const PREFIX = 'counter';
export const ADD = PREFIX + '/ADD'; // => string

// ✅ Correct - type stays as literal
export const ADD = 'counter/ADD'; // => 'counter/ADD'
```

#### Path A - Step 2: Create Actions

```ts
// features/counter/actions.ts
import { createAction } from 'typesafe-actions';
import { INCREMENT, DECREMENT, ADD } from './constants';

export const increment = createAction(INCREMENT)();
// increment: () => { type: "counter/INCREMENT" }

export const decrement = createAction(DECREMENT)();
// decrement: () => { type: "counter/DECREMENT" }

export const add = createAction(ADD)<number>();
// add: (payload: number) => { type: "counter/ADD"; payload: number }

export type CounterAction =
  | ReturnType<typeof increment>
  | ReturnType<typeof decrement>
  | ReturnType<typeof add>;
```

#### Path A - Step 3: Create Async Actions

```ts
// features/counter/async-actions.ts
import { createAsyncAction } from 'typesafe-actions';

export const fetchCountAsync = createAsyncAction(
  'counter/FETCH_COUNT_REQUEST',
  'counter/FETCH_COUNT_SUCCESS',
  'counter/FETCH_COUNT_FAILURE'
)<string, number, Error>();

// fetchCountAsync.request(params) => { type: "counter/FETCH_COUNT_REQUEST", payload: string }
// fetchCountAsync.success(count) => { type: "counter/FETCH_COUNT_SUCCESS", payload: number }
// fetchCountAsync.failure(error) => { type: "counter/FETCH_COUNT_FAILURE", payload: Error }
```

#### Path A - Step 4: Create Reducers

Using `createReducer` with `isOfType`:

```ts
// features/counter/reducer.ts
import { createReducer, isOfType } from 'typesafe-actions';
import { INCREMENT, DECREMENT, ADD } from './constants';
import { CounterAction } from './actions';

const initialState = { count: 0 };

// Path A uses isOfType with string constants
export const counterReducer = createReducer(initialState, {
  [INCREMENT]: (state) => ({ count: state.count + 1 }),
  [DECREMENT]: (state) => ({ count: state.count - 1 }),
  [ADD]: (state, action) => ({ count: state.count + action.payload }),
});
```

Or using a traditional switch reducer with `isOfType`:

```ts
// features/counter/switch-reducer.ts
import { isOfType } from 'typesafe-actions';
import { INCREMENT, DECREMENT, ADD } from './constants';
import { CounterAction } from './actions';

const initialState = { count: 0 };

export function counterReducer(
  state = initialState,
  action: CounterAction
) {
  switch (action.type) {
    case INCREMENT:
      return { count: state.count + 1 };
    case DECREMENT:
      return { count: state.count - 1 };
    case ADD:
      return { count: state.count + action.payload };
    default:
      return state;
  }
}
```

#### Path A - Step 5: Async Flows

**With `redux-observable` epics:**

```ts
// features/counter/epics.ts
import { Epic } from 'redux-observable';
import { isOfType } from 'typesafe-actions';
import { filter, switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { fetchCountAsync } from './async-actions';

type RootAction = import('./actions').CounterAction;

export const fetchCountEpic: Epic<RootAction, RootAction, any, any> = (
  action$,
  _state$,
  { api }
) =>
  action$.pipe(
    filter(isOfType('counter/FETCH_COUNT_REQUEST')),
    switchMap((action) =>
      from(api.getCount(action.payload)).pipe(
        map(fetchCountAsync.success),
        catchError((err) => of(fetchCountAsync.failure(err)))
      )
    )
  );
```

**With `redux-saga`:**

```ts
// features/counter/sagas.ts
import { call, put, takeEvery } from 'redux-saga/effects';
import { fetchCountAsync } from './async-actions';

function* fetchCountSaga(action: ReturnType<typeof fetchCountAsync.request>) {
  try {
    const count: number = yield call(api.getCount, action.payload);
    yield put(fetchCountAsync.success(count));
  } catch (err) {
    yield put(fetchCountAsync.failure(err));
  }
}

export function* counterSaga() {
  yield takeEvery('counter/FETCH_COUNT_REQUEST', fetchCountSaga);
}
```

[⇧ back to top](#table-of-contents)

---

### Path B: Using Action Creator Instances

This approach eliminates the need for a separate constants file. Action creators carry their own type, and you use helper functions to match them.

#### Path B - Step 1: Create Actions

```ts
// features/counter/actions.ts
import { createAction, createCustomAction } from 'typesafe-actions';

export const increment = createAction('counter/INCREMENT')();
// increment: () => { type: "counter/INCREMENT" }

export const decrement = createAction('counter/DECREMENT')();
// decrement: () => { type: "counter/DECREMENT" }

export const add = createAction('counter/ADD')<number>();
// add: (payload: number) => { type: "counter/ADD"; payload: number }

// Custom action example (non-standard properties)
export const setMultiple = createCustomAction(
  'counter/SET_MULTIPLE',
  (counts: { a: number; b: number }) => counts
);
// setMultiple: (counts: { a: number; b: number }) =>
//   { type: "counter/SET_MULTIPLE"; a: number; b: number }

// Use ActionType helper to derive the union type
import { ActionType } from 'typesafe-actions';

export type CounterAction = ActionType<typeof import('./actions')>;
// Equivalent to: { type: "counter/INCREMENT" } | { type: "counter/DECREMENT" } | ...
```

> **TIP**: `ActionType` automatically infers the union type from all your action creators. No manual type definitions needed!

#### Path B - Step 2: Create Async Actions

```ts
// features/counter/async-actions.ts
import { createAsyncAction } from 'typesafe-actions';

export const fetchCountAsync = createAsyncAction(
  'counter/FETCH_COUNT_REQUEST',
  'counter/FETCH_COUNT_SUCCESS',
  'counter/FETCH_COUNT_FAILURE'
)<string, number, Error>();

// Same API as Path A, but the action types are now managed
// through the action creator objects themselves.
```

#### Path B - Step 3: Create Reducers

Using `createReducer` with action creator instances:

```ts
// features/counter/reducer.ts
import { createReducer } from 'typesafe-actions';
import * as actions from './actions';
import { fetchCountAsync } from './async-actions';

const initialState = { count: 0, loading: false };

// Path B uses action creator instances directly - no constants needed!
export const counterReducer = createReducer(initialState)
  .handleAction(actions.increment, (state) => ({
    ...state,
    count: state.count + 1,
  }))
  .handleAction(actions.decrement, (state) => ({
    ...state,
    count: state.count - 1,
  }))
  .handleAction(actions.add, (state, action) => ({
    ...state,
    count: state.count + action.payload,
  }))
  .handleAction(fetchCountAsync.request, (state) => ({
    ...state,
    loading: true,
  }))
  .handleAction(fetchCountAsync.success, (state, action) => ({
    ...state,
    count: action.payload,
    loading: false,
  }))
  .handleAction(fetchCountAsync.failure, (state) => ({
    ...state,
    loading: false,
  }));
```

Or using a traditional switch reducer with `getType`:

```ts
// features/counter/switch-reducer.ts
import { getType } from 'typesafe-actions';
import * as actions from './actions';
import { CounterAction } from './actions';

const initialState = { count: 0 };

export function counterReducer(
  state = initialState,
  action: CounterAction
) {
  switch (action.type) {
    case getType(actions.increment):
      return { count: state.count + 1 };
    case getType(actions.decrement):
      return { count: state.count - 1 };
    case getType(actions.add):
      return { count: state.count + action.payload };
    default:
      return state;
  }
}
```

#### Path B - Step 4: Async Flows

**With `redux-observable` epics:**

```ts
// features/counter/epics.ts
import { Epic } from 'redux-observable';
import { isActionOf } from 'typesafe-actions';
import { filter, switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { fetchCountAsync } from './async-actions';
import { CounterAction } from './actions';

export const fetchCountEpic: Epic<CounterAction, CounterAction, any, any> = (
  action$,
  _state$,
  { api }
) =>
  action$.pipe(
    // Use isActionOf with the action creator instance
    filter(isActionOf(fetchCountAsync.request)),
    switchMap((action) =>
      from(api.getCount(action.payload)).pipe(
        map(fetchCountAsync.success),
        catchError((err) => of(fetchCountAsync.failure(err)))
      )
    )
  );
```

**With `redux-saga`:**

```ts
// features/counter/sagas.ts
import { call, put, takeEvery } from 'redux-saga/effects';
import { getType } from 'typesafe-actions';
import { fetchCountAsync } from './async-actions';
import * as actions from './actions';

function* fetchCountSaga(action: ReturnType<typeof fetchCountAsync.request>) {
  try {
    const count: number = yield call(api.getCount, action.payload);
    yield put(fetchCountAsync.success(count));
  } catch (err) {
    yield put(fetchCountAsync.failure(err));
  }
}

export function* counterSaga() {
  // Use getType() with the action creator to get the string type
  yield takeEvery(getType(fetchCountAsync.request), fetchCountSaga);
}
```

[⇧ back to top](#table-of-contents)

---

### Combining Both Paths

You can use both patterns within the same project. For example:
- Use **Path B** for new features (less boilerplate)
- Use **Path A** when integrating with third-party libraries that expect string constants
- Use **Path A** for Redux DevTools compatibility (action type strings are more readable in the inspector)

Both paths produce **identical runtime behavior** and **full type-safety**. The choice is purely about code organization style.

[⇧ back to top](#table-of-contents)

---

## API Reference

### Action-Creators API

#### `action`

_Simple **action factory function** to simplify creation of type-safe actions._

> **WARNING**: This approach will **NOT WORK** with **action-helpers** (`getType`, `isActionOf`) because it creates plain action objects, not enhanced action-creators.

```ts
action(type, payload?, meta?, error?)
```

Examples:
```ts
import { action } from 'typesafe-actions';

const increment = () => action('INCREMENT');
// { type: 'INCREMENT' }

const createUser = (id: number, name: string) =>
  action('CREATE_USER', { id, name });
// { type: 'CREATE_USER'; payload: { id: number; name: string }; }

const getUsers = (params?: string) =>
  action('GET_USERS', undefined, params);
// { type: 'GET_USERS'; meta: string | undefined; }
```

> **TIP**: Starting from TypeScript v3.4 you can achieve similar results using the `as const` assertion.

```ts
const increment = () => ({ type: 'INCREMENT' } as const);
```

#### `createAction`

_Create an enhanced action-creator with unlimited number of arguments (v5 simplified API, compatible with `redux-actions`)._

Resulting action-creator will preserve semantic names of their arguments `(id, title, amount, etc...)`. Returned action object has predefined properties `({ type, payload, meta })`.

```ts
createAction(type)()
createAction(type)()
```

Examples:
```ts
import { createAction } from 'typesafe-actions';

// - with type only
const increment = createAction('INCREMENT')();
dispatch(increment());
// { type: 'INCREMENT' }

// - with type and payload
const add = createAction('ADD')<number>();
dispatch(add(10));
// { type: 'ADD', payload: 10 }

// - with custom payload creator (redux-actions style)
const addWithTransform = createAction(
  'ADD',
  (amount: number, label: string) => ({ amount, label })
)<{ amount: number; label: string }>();
dispatch(addWithTransform(5, 'step'));
// { type: 'ADD', payload: { amount: 5, label: 'step' } }
```

> **TIP**: The action-creator instance has a `toString()` method that returns the action type string, making it compatible with `redux-actions` ecosystem.

#### `createCustomAction`

_Create an enhanced action-creator with unlimited number of arguments and custom properties on the action object._

```ts
createCustomAction(type, (...args) => ({ customProp1, customProp2, ...customPropN }))
```

Examples:
```ts
import { createCustomAction } from 'typesafe-actions';

const add = createCustomAction(
  'CUSTOM',
  (first: number, second: number) => ({ customProp1: first, customProp2: second })
);
dispatch(add(1, 2));
// { type: "CUSTOM"; customProp1: 1; customProp2: 2 }
```

#### `createAsyncAction`

_Create an object containing three enhanced action-creators to simplify handling of async flows (e.g. network request - request/success/failure)._

```ts
createAsyncAction(
  requestType, successType, failureType, cancelType?
)<TRequestPayload, TSuccessPayload, TFailurePayload, TCancelPayload?>()
```

Examples:
```ts
import { createAsyncAction } from 'typesafe-actions';

const fetchUsersAsync = createAsyncAction(
  'FETCH_USERS_REQUEST',
  'FETCH_USERS_SUCCESS',
  'FETCH_USERS_FAILURE'
)<string, User[], Error>();

dispatch(fetchUsersAsync.request('all'));
dispatch(fetchUsersAsync.success([user1, user2]));
dispatch(fetchUsersAsync.failure(new Error('Network error')));

// With optional cancel action
const fetchUsersWithCancel = createAsyncAction(
  'FETCH_USERS_REQUEST',
  'FETCH_USERS_SUCCESS',
  'FETCH_USERS_FAILURE',
  'FETCH_USERS_CANCEL'
)<string, User[], Error, string>();

dispatch(fetchUsersWithCancel.cancel('User navigated away'));
```

[⇧ back to top](#table-of-contents)

---

### Reducer-Creators API

#### `createReducer`

_Create a typesafe reducer_

```ts
createReducer(initialState)
createReducer(initialState, handlersMap)
```

**Chain API style (recommended):**
```ts
import { createReducer } from 'typesafe-actions';

// Using action creator instances (Path B)
const counterReducer = createReducer(0)
  .handleAction(add, (state, action) => state + action.payload)
  .handleAction(increment, (state, _) => state + 1);

// Using type constants (Path A)
const counterReducer = createReducer(0)
  .handleType('ADD', (state, action) => state + action.payload)
  .handleType('INCREMENT', (state, _) => state + 1);
```

**Object map style:**
```ts
import { createReducer, getType } from 'typesafe-actions';

// Path B - with action creator instances via getType()
const counterReducer = createReducer(0, {
  [getType(increment)]: (state, _) => state + 1,
});

// Path A - with string constants
const counterReducer = createReducer(0, {
  INCREMENT: (state, _) => state + 1,
});
```

> **TIP**: When using the chain API with `.handleAction()`, TypeScript will show an error if you try to handle the same action creator twice, or if you haven't handled all actions in your union type. This is a great safety net!

[⇧ back to top](#table-of-contents)

---

### Action-Helpers API

#### `getType`

_Get the **type** property value (narrowed to literal type) of given enhanced action-creator._

```ts
getType(actionCreator)
```

**Best used with Path B (action creator instances).**

Examples:
```ts
import { getType, createAction } from 'typesafe-actions';

const add = createAction('ADD')<number>();

// In switch reducer
switch (action.type) {
  case getType(add):
    // action type is { type: "ADD"; payload: number }
    return state + action.payload;

  default:
    return state;
}

// Or with conditional statements
if (action.type === getType(add)) {
  // action type is { type: "ADD"; payload: number }
}
```

#### `isActionOf`

_Check if action is an instance of given enhanced action-creator(s) (narrows action type)._

> **WARNING**: Regular action creators and `action` will not work with this helper.

```ts
isActionOf(actionCreator, action)
isActionOf(actionCreator)(action)
isActionOf([actionCreator1, actionCreator2], action)
```

**Best used with Path B (action creator instances).**

Examples:
```ts
import { isActionOf } from 'typesafe-actions';
import { add, remove } from './todos-actions';

// With RxJS pipe
action$.pipe(
  filter(isActionOf(add)),
  tap(action => {
    // action type is { type: "todos/ADD"; payload: Todo }
    toastService.success('Todo added!');
  })
);

// Works with multiple actions!
action$.pipe(
  filter(isActionOf([add, remove])),
  // narrowed to union of both action types
);

// With conditional statements
if (isActionOf(add, action)) {
  return addTodo(state, action.payload);
}
```

#### `isOfType`

_Check if action type property is equal to given type-constant(s) (narrows action type)._

```ts
isOfType(type, action)
isOfType(type)(action)
isOfType([type1, type2], action)
```

**Best used with Path A (string type constants).**

Examples:
```ts
import { isOfType } from 'typesafe-actions';
import { ADD, REMOVE } from './todos-types';

// With RxJS pipe
action$.pipe(
  filter(isOfType(ADD)),
  tap(action => {
    // action type is { type: "todos/ADD"; payload: Todo }
    toastService.success('Todo added!');
  })
);

// Works with multiple types!
action$.pipe(
  filter(isOfType([ADD, REMOVE])),
  // narrowed to union of matching action types
);

// With conditional statements
if (isOfType(ADD, action)) {
  return addTodo(state, action.payload);
}
```

[⇧ back to top](#table-of-contents)

---

### Type-Helpers API

#### `ActionType`

_Powerful type-helper that will infer a union type from **import \* as ...** or action-creator map object._

```ts
import { ActionType } from 'typesafe-actions';

// with "import * as ..."
import * as todos from './actions';
export type TodosAction = ActionType<typeof todos>;
// TodosAction: { type: 'action1' } | { type: 'action2' } | { type: 'action3' }

// with nested action-creator map
const actions = {
  action1: createAction('action1'),
  nested: {
    action2: createAction('action2'),
  },
};
export type RootAction = ActionType<typeof actions>;
// RootAction: { type: 'action1' } | { type: 'action2' }
```

#### `StateType`

_Powerful type-helper that will infer state object type from **reducer function** and **nested/combined reducers**._

```ts
import { combineReducers } from 'redux';
import { StateType } from 'typesafe-actions';

// from reducer function
const todosReducer = createReducer([]).handleAction(addTodo, ...);
export type TodosState = StateType<typeof todosReducer>;

// from combined reducers
const rootReducer = combineReducers({
  todos: todosReducer,
  counters: countersReducer,
});
export type RootState = StateType<typeof rootReducer>;
```

[⇧ back to top](#table-of-contents)

---

## Migration from v4 to v5

**Breaking changes:**

1. `createStandardAction` was renamed to `createAction` and `.map()` method was removed in favor of a simpler `redux-actions` style API.

```ts
// v4
import { createStandardAction } from "typesafe-actions";
const add = createStandardAction('ADD')<number>();
const mapped = createStandardAction('NOTIFY').map((payload, meta) => ({
  payload: `Hello ${meta.username}`,
  meta,
}));

// v5
import { createAction } from "typesafe-actions";
const add = createAction('ADD')<number>();
// For mapped actions, use payload/meta creator functions
const mapped = createAction(
  'NOTIFY',
  (msg: string, meta: { username: string }) => `Hello ${meta.username}`,
  (msg: string, meta: { username: string }) => meta
)();
```

2. `createAction` (v4) was removed. Use the new v5 `createAction` instead.

```ts
// v4
const withPayload = createAction('CREATE_ACTION', resolve => {
  return (id: number, token: string) => resolve(id, token);
});

// v5
const withPayload = createAction('CREATE_ACTION')<number, string>();
```

3. `createCustomAction` API was simplified:

```ts
// v4
const add = createCustomAction('CUSTOM', type => {
  return (first: number, second: number) => ({ type, customProp1: first, customProp2: second });
});

// v5
const add = createCustomAction(
  'CUSTOM',
  (first: number, second: number) => ({ customProp1: first, customProp2: second })
);
```

4. `AsyncActionCreator` type was renamed to `AsyncActionCreatorBuilder`.

```ts
// v4
import { AsyncActionCreator } from "typesafe-actions"

// v5
import { AsyncActionCreatorBuilder } from "typesafe-actions"
```

5. All deprecated v4 creators are available under `deprecated` import for incremental migration:

```ts
import { deprecated } from "typesafe-actions";
const { createAction, createStandardAction, createCustomAction } = deprecated;
```

[⇧ back to top](#table-of-contents)

---

## Compatibility Notes

**TypeScript support**
- `5.X.X` - TypeScript v3.2+

**Browser support**

It's compatible with all modern browsers.

For older browsers support (e.g. IE <= 11) and some mobile devices you need to provide the following polyfills:
- [Object.assign](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign#Polyfill)
- [Array.prototype.includes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes)

**Recommended polyfill for IE**

To provide the best compatibility please include a popular polyfill package in your application, such as `core-js` or `react-app-polyfill` for `create-react-app`.

[⇧ back to top](#table-of-contents)

---

## Contributing

You can help make this project better by contributing. If you're planning to contribute please make sure to check our contributing guide: [CONTRIBUTING.md](/CONTRIBUTING.md)

[⇧ back to top](#table-of-contents)

---

## License

[MIT License](/LICENSE)

Copyright (c) 2017 Piotr Witek <piotrek.witek@gmail.com> (http://piotrwitek.github.io)

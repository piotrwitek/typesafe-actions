<div align="center">

# typesafe-actions

Typesafe utilities designed to reduce types **verbosity**
and **complexity** in Redux Architecture.

_This library is part of the [React & Redux TypeScript Guide](https://github.com/piotrwitek/react-redux-typescript-guide)_ ecosystem :book:  

[![Latest Stable Version](https://img.shields.io/npm/v/typesafe-actions.svg)](https://www.npmjs.com/package/typesafe-actions)
[![NPM Downloads](https://img.shields.io/npm/dm/typesafe-actions.svg)](https://www.npmjs.com/package/typesafe-actions)
[![NPM Downloads](https://img.shields.io/npm/dt/typesafe-actions.svg)](https://www.npmjs.com/package/typesafe-actions)
[![Bundlephobia Size](https://img.shields.io/bundlephobia/minzip/typesafe-actions.svg)](https://www.npmjs.com/package/typesafe-actions)

[![Build Status](https://semaphoreci.com/api/v1/piotrekwitek/typesafe-actions/branches/master/shields_badge.svg)](https://semaphoreci.com/piotrekwitek/typesafe-actions)
[![Dependency Status](https://img.shields.io/david/piotrwitek/typesafe-actions.svg)](https://david-dm.org/piotrwitek/typesafe-actions)
[![License](https://img.shields.io/npm/l/typesafe-actions.svg?style=flat)](https://david-dm.org/piotrwitek/typesafe-actions?type=peer)
[![Join the community on Spectrum](https://withspectrum.github.io/badge/badge.svg)](https://spectrum.chat/typesafe-actions)

_Found it useful? Want more updates?_

[**Show your support by giving a :star:**](https://github.com/piotrwitek/typesafe-actions/stargazers)

<!-- _Make a one time or a monthly donation to join [supporters](https://www.buymeacoffee.com/piotrekwitek)_ -->

<a href="https://www.buymeacoffee.com/piotrekwitek">
  <img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" alt="Buy Me a Coffee">
</a>

<!-- _Or become a [sponsor](..) to get your logo with a link on our README_ -->

<a href="https://www.patreon.com/piotrekwitek">
  <img src="https://c5.patreon.com/external/logo/become_a_patron_button@2x.png" alt="Become a Patron" width="160">
</a>

<br/><hr/>

### **What's new?**

:tada: _Now updated to support **TypeScript v3.7**_ :tada:

:tada: _Tutorial updated for **v5.x.x** — two guided usage paths below_ :tada:

:warning: Some API Docs examples still show the older v4 signatures.
<br/>*Use the [v4 → v5 migration guide](#v4xx-to-v5xx) and this issue as extra [v5.x.x API notes](https://github.com/piotrwitek/typesafe-actions/issues/143).*

<hr/><br/>

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

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Installation](#installation)
- [Tutorial](#tutorial)
  - [Choose a path](#choose-a-path)
  - [Shared todo model](#shared-todo-model)
  - [Path A: Action-creator instances](#path-a-action-creator-instances)
    - [Actions](#actions)
    - [Async actions](#async-actions)
    - [RootAction](#rootaction)
    - [Reducers](#reducers)
    - [Action helpers](#action-helpers)
    - [Async flows](#async-flows)
  - [Path B: Type constants](#path-b-type-constants)
    - [Constants](#constants)
    - [Actions](#actions-1)
    - [Async actions](#async-actions-1)
    - [RootAction](#rootaction-1)
    - [Reducers](#reducers-1)
    - [Action helpers](#action-helpers-1)
    - [Async flows](#async-flows-1)
  - [Using both paths together](#using-both-paths-together)
- [API Docs v4 (v5 is WIP #189)](#api-docs-v4-v5-is-wip-189)
  - [Action-Creators API](#action-creators-api)
    - [`action`](#action)
    - [`createAction`](#createaction)
    - [`createStandardAction`](#createstandardaction)
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
- [Migration Guides](#migration-guides)
  - [`v4.x.x` to `v5.x.x`](#v4xx-to-v5xx)
  - [`v3.x.x` to `v4.x.x`](#v3xx-to-v4xx)
  - [`v2.x.x` to `v3.x.x`](#v2xx-to-v3xx)
  - [`v1.x.x` to `v2.x.x`](#v1xx-to-v2xx)
  - [Migrating from `redux-actions` to `typesafe-actions`](#migrating-from-redux-actions-to-typesafe-actions)
- [Compatibility Notes](#compatibility-notes)
- [Recipes](#recipes)
  - [Restrict Meta type in `action` creator](#restrict-meta-type-in-action-creator)
- [Compare to others](#compare-to-others)
  - [`redux-actions`](#redux-actions)
- [Motivation](#motivation)
- [Contributing](#contributing)
- [Funding Issues](#funding-issues)
- [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

<hr/>

## Installation

```bash
# NPM
npm install typesafe-actions

# YARN
yarn add typesafe-actions
```

[⇧ back to top](#table-of-contents)

---

## Tutorial

This tutorial uses the **v5.x.x** API to build the common pieces of a Redux todo feature.

### Choose a path

`typesafe-actions` supports **two alternative paths**. Pick one and follow it all the way through — each path uses the helpers that work best for that style:

| | **Path A — action-creator instances** | **Path B — type constants** |
| --- | --- | --- |
| **Source of truth** | The action creator carries its own type | Exported string constants |
| **Reducers** | `handleAction`, `getType` | `handleType`, `case ADD` |
| **Guards / filters** | `isActionOf` | `isOfType` |
| **Choose this when** | Starting new code, or you can drop duplicated constants | An existing codebase already exports type constants |

> **RECOMMENDATION:**  
> Path A is the recommended v5 style. Action creators created by this library already expose their `type` through **action-helpers**, so you do not need a separate constants file. That is also the approach used in the `/codesandbox` playground.

> **WARNING**  
> Please make sure that you are familiar with the following TypeScript concepts to follow along: [Type Inference](https://www.typescriptlang.org/docs/handbook/type-inference.html), [Control flow analysis](https://github.com/Microsoft/TypeScript/wiki/What%27s-new-in-TypeScript#control-flow-based-type-analysis), [Tagged union types](https://github.com/Microsoft/TypeScript/wiki/What%27s-new-in-TypeScript#tagged-union-types), [Generics](https://www.typescriptlang.org/docs/handbook/generics.html) and [Advanced Types](https://www.typescriptlang.org/docs/handbook/advanced-types.html).

Both paths produce the same Flux Standard Actions at runtime and the same discriminated union through `ActionType`. Only the way you *refer* to an action type changes.

### Shared todo model

The examples below share this small domain model:

```ts
// features/todos/types.ts
export type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

export type TodosState = {
  todos: Todo[];
  isLoading: boolean;
  error?: string;
};

export const initialState: TodosState = {
  todos: [],
  isLoading: false,
};

export const nextId = (): string => Math.random().toString(36).slice(2);
```

Async examples call a tiny API. The default export is what `Services` refers to in the store augmentation below:

```ts
// store/services.ts
import { Todo } from '../features/todos/types';

const services = {
  todosApi: {
    getAll(_filter: string): Promise<Todo[]> {
      return Promise.resolve([]);
    },
  },
};

export default services;
```

[⇧ back to top](#table-of-contents)

### Path A: Action-creator instances

On this path the **action creator is the type**. Pass the creator to helpers — never re-export the string.

#### Actions

`createAction` is the v5 creator for Flux Standard Actions `({ type, payload?, meta? })`.

There are two equivalent forms:

1. **Generic payload** — arguments are `(payload, meta?)`.
2. **Payload / meta creators** — you keep named arguments `(title, id, …)` and map them to `payload` / `meta`.

```ts
// features/todos/actions.ts
import { createAction } from 'typesafe-actions';
import { nextId, Todo } from './types';

// empty action (no payload)
export const clearTodos = createAction('todos/CLEAR')();
// clearTodos: () => { type: "todos/CLEAR" }

// generic payload
export const toggle = createAction('todos/TOGGLE')<string>();
// toggle: (payload: string) => { type: "todos/TOGGLE"; payload: string }

// generic payload + meta
export const notify = createAction('todos/NOTIFY')<string, { scope: string }>();
// notify: (payload: string, meta: { scope: string }) => {
//   type: "todos/NOTIFY"; payload: string; meta: { scope: string }
// }

// meta only — pass `undefined` as the payload type argument
export const log = createAction('todos/LOG')<undefined, string>();
log(undefined, 'saved');

// payload creator — named args, mapped payload
export const add = createAction(
  'todos/ADD',
  (title: string) => ({ id: nextId(), title, completed: false })
)<Todo>();
// add: (title: string) => { type: "todos/ADD"; payload: Todo }

add('Write docs');
// { type: "todos/ADD", payload: { id: string, title: "Write docs", completed: false } }
```

> **TIP:** `log` is the meta-only form. Pass `undefined` as the payload type argument when the creator should take `meta` and no payload.

> **WARNING:**  
> The `action` factory creates **action objects**, not enhanced action-creators. It will **NOT WORK** with `getType` or `isActionOf`. Prefer `createAction`.

For non-standard action shapes, use [`createCustomAction`](#createcustomaction) (the v5 signature takes a handler, not a `type => …` callback):

```ts
// features/todos/legacy-actions.ts
import { createCustomAction } from 'typesafe-actions';
import { nextId } from './types';

export const addLegacy = createCustomAction(
  'todos/ADD_LEGACY',
  (title: string) => ({
    id: nextId(),
    title,
    completed: false,
  })
);
// addLegacy: (title: string) => { type: "todos/ADD_LEGACY"; id: string; title: string; completed: boolean }
```

#### Async actions

`createAsyncAction` groups `request` / `success` / `failure` (and optional `cancel`) creators:

```ts
// features/todos/actions.ts (continued)
import { createAsyncAction } from 'typesafe-actions';

export const fetchTodosAsync = createAsyncAction(
  'todos/FETCH_REQUEST',
  'todos/FETCH_SUCCESS',
  'todos/FETCH_FAILURE',
  'todos/FETCH_CANCEL'
)<string, Todo[], Error, string>();

fetchTodosAsync.request('all');
// { type: "todos/FETCH_REQUEST", payload: "all" }

fetchTodosAsync.success([{ id: '1', title: 'Write docs', completed: false }]);
// { type: "todos/FETCH_SUCCESS", payload: Todo[] }

fetchTodosAsync.failure(new Error('network'));
// { type: "todos/FETCH_FAILURE", payload: Error }

fetchTodosAsync.cancel('all');
// { type: "todos/FETCH_CANCEL", payload: "all" }
```

Use a `[payload, meta]` tuple when an async step also needs `meta`. Give that creator its own type strings so it does not collide with `fetchTodosAsync` inside one union:

```ts
// features/todos/actions-meta.ts
import { createAsyncAction } from 'typesafe-actions';
import { Todo } from './types';

export const fetchTodosWithMetaAsync = createAsyncAction(
  'todos/FETCH_META_REQUEST',
  'todos/FETCH_META_SUCCESS',
  'todos/FETCH_META_FAILURE'
)<[string, { startedAt: number }], Todo[], Error>();

fetchTodosWithMetaAsync.request('all', { startedAt: Date.now() });
// { type: "todos/FETCH_META_REQUEST", payload: "all", meta: { startedAt: number } }
```

#### RootAction

Collect every feature's action creators and derive a tagged union with `ActionType`. You can merge third-party actions the same way.

```ts
// store/root-action.ts
import { ActionType } from 'typesafe-actions';
import { routerActions } from 'react-router-redux';
import * as todos from '../features/todos/actions';

const actions = {
  router: routerActions,
  todos,
};

export default actions;
export type TodosAction = ActionType<typeof todos>;
```

`root-reducer.ts` is the reducer `StateType` reads. It imports the feature reducer from the next section:

```ts
// store/root-reducer.ts
import { combineReducers } from 'redux';
import { todosReducer } from '../features/todos/reducer';

const rootReducer = combineReducers({
  todos: todosReducer,
});

export default rootReducer;
```

```ts
// store/types.d.ts
import { ActionType, StateType } from 'typesafe-actions';

declare module 'typesafe-actions' {
  export type RootAction = ActionType<typeof import('./root-action').default>;
  export type RootState = StateType<typeof import('./root-reducer').default>;
  export type Services = typeof import('./services').default;

  interface Types {
    RootAction: RootAction;
  }
}
```

> **RECOMMENDATION**  
> Augmenting `Types.RootAction` enables the **type-free** `createReducer` syntax — you no longer pass `<State, Action>` at every call site.

#### Reducers

Use `handleAction` when the action creator is the source of truth:

```ts
// features/todos/reducer.ts
import { createReducer } from 'typesafe-actions';

import { initialState } from './types';
import { add, toggle, clearTodos, fetchTodosAsync } from './actions';

export const todosReducer = createReducer(initialState)
  .handleAction(fetchTodosAsync.request, state => ({
    ...state,
    isLoading: true,
    error: undefined,
  }))
  .handleAction(fetchTodosAsync.success, (state, action) => ({
    ...state,
    isLoading: false,
    todos: action.payload, // action: { type: "todos/FETCH_SUCCESS"; payload: Todo[] }
  }))
  .handleAction(fetchTodosAsync.failure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.payload.message,
  }))
  .handleAction(add, (state, action) => ({
    ...state,
    todos: [...state.todos, action.payload], // action: { type: "todos/ADD"; payload: Todo }
  }))
  .handleAction(toggle, (state, action) => ({
    ...state,
    todos: state.todos.map(todo =>
      todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
    ),
  }))
  .handleAction(clearTodos, state => ({
    ...state,
    todos: [],
  }));

// handle several creators with the same handler
createReducer(initialState).handleAction(
  [fetchTodosAsync.success, fetchTodosAsync.failure],
  (state, action) => ({ ...state, isLoading: false })
);
```

Object-map style uses `getType` as the key. TypeScript does not contextually type a handler that sits under a computed key, so annotate that handler:

```ts
// features/todos/reducer-map.ts
import { createReducer, getType } from 'typesafe-actions';
import { TodosState, initialState } from './types';
import { add, clearTodos } from './actions';

export const todosReducer = createReducer(initialState, {
  [getType(add)]: (
    state: TodosState,
    action: ReturnType<typeof add>
  ): TodosState => ({
    ...state,
    todos: [...state.todos, action.payload],
  }),
  [getType(clearTodos)]: (state: TodosState): TodosState => ({
    ...state,
    todos: [],
  }),
});
```

Regular `switch` reducers use `getType` so the union still narrows:

```ts
// features/todos/reducer-switch.ts
import { ActionType, getType } from 'typesafe-actions';

import { initialState, TodosState } from './types';
import * as actions from './actions';

export type TodosAction = ActionType<typeof actions>;

export const todosReducer = (
  state: TodosState = initialState,
  action: TodosAction
): TodosState => {
  switch (action.type) {
    case getType(actions.add):
      // action: { type: "todos/ADD"; payload: Todo }
      return { ...state, todos: [...state.todos, action.payload] };
    case getType(actions.toggle):
      // action: { type: "todos/TOGGLE"; payload: string }
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      };
    default:
      return state;
  }
};
```

#### Action helpers

`isActionOf` is a type guard. Use it with `filter`, `if`, or any predicate API. It is curried and accepts one creator or an array of creators.

```ts
// features/todos/guards.ts
import { ActionType, isActionOf } from 'typesafe-actions';
import { add, toggle } from './actions';
import * as actions from './actions';

type TodosAction = ActionType<typeof actions>;

export function readAddedTodo(action: TodosAction) {
  if (isActionOf(add, action)) {
    // action: { type: "todos/ADD"; payload: Todo }
    return action.payload.completed;
  }
  return undefined;
}

export function editsOnly(actions: TodosAction[]) {
  // narrowed to
  // | { type: "todos/ADD"; payload: Todo }
  // | { type: "todos/TOGGLE"; payload: string }
  return actions.filter(isActionOf([add, toggle]));
}
```

#### Async flows

**redux-observable** — filter with `isActionOf`:

```ts
// features/todos/epics.ts
import { Epic } from 'redux-observable';
import { from, of } from 'rxjs';
import { catchError, filter, map, switchMap, takeUntil } from 'rxjs/operators';
import { RootAction, RootState, Services, isActionOf } from 'typesafe-actions';

import { fetchTodosAsync } from './actions';

export const fetchTodosEpic: Epic<
  RootAction,
  RootAction,
  RootState,
  Services
> = (action$, _state$, { todosApi }) =>
  action$.pipe(
    filter(isActionOf(fetchTodosAsync.request)),
    switchMap(action =>
      from(todosApi.getAll(action.payload)).pipe(
        map(todos => fetchTodosAsync.success(todos)),
        catchError((err: Error) => of(fetchTodosAsync.failure(err))),
        takeUntil(action$.pipe(filter(isActionOf(fetchTodosAsync.cancel))))
      )
    )
  );
```

**redux-saga** — pass the action creator to `takeEvery` (it implements `toString()`). TypeScript still cannot infer `yield`, so assert the response type:

```ts
// features/todos/saga.ts
import { call, put, takeEvery } from 'redux-saga/effects';
import { fetchTodosAsync } from './actions';
import services from '../../store/services';
import { Todo } from './types';

export function* fetchTodosSaga(
  action: ReturnType<typeof fetchTodosAsync.request>
): Generator {
  try {
    // `yield` is `unknown` under strict generator types, so assert the result.
    const response = (yield call(
      services.todosApi.getAll,
      action.payload
    )) as Todo[];
    yield put(fetchTodosAsync.success(response));
  } catch (err) {
    yield put(fetchTodosAsync.failure(err));
  }
}

export function* todosSaga() {
  yield takeEvery(fetchTodosAsync.request, fetchTodosSaga);
}
```

[⇧ back to top](#table-of-contents)

### Path B: Type constants

On this path **exported string constants** are the source of truth. Use `handleType` and `isOfType` everywhere you would have used `handleAction` / `isActionOf` on Path A.

#### Constants

String constants must stay **string literal types**. Concatenation, template strings, and plain object maps widen to `string` and break narrowing in reducers.

```ts
// features/todos/constants.ts

// Correct — each constant is a string literal type
export const ADD = 'todos/ADD'; // => 'todos/ADD'
export const TOGGLE = 'todos/TOGGLE'; // => 'todos/TOGGLE'
export const CLEAR = 'todos/CLEAR'; // => 'todos/CLEAR'
export const FETCH_REQUEST = 'todos/FETCH_REQUEST';
export const FETCH_SUCCESS = 'todos/FETCH_SUCCESS';
export const FETCH_FAILURE = 'todos/FETCH_FAILURE';
export const FETCH_CANCEL = 'todos/FETCH_CANCEL';

// Correct grouped map in TS 3.4+
export const TodosActionTypes = {
  ADD: 'todos/ADD',
  TOGGLE: 'todos/TOGGLE',
} as const;
```

```ts
// features/todos/constants-widening.ts
// These forms type-check, but the type widens to `string` and reducer arms stop narrowing.
const prefix = 'todos/';
export const ADD_FROM_CONCAT = prefix + 'ADD'; // string
export const ADD_FROM_TEMPLATE = `${prefix}ADD`; // string
export default {
  ADD: 'todos/ADD', // string — add `as const` on the object to keep the literal
};
```

#### Actions

Pass the constants into the same v5 `createAction` API:

```ts
// features/todos/actions.ts
import { createAction } from 'typesafe-actions';

import { nextId, Todo } from './types';
import { ADD, TOGGLE, CLEAR } from './constants';

export const clearTodos = createAction(CLEAR)();
// clearTodos: () => { type: "todos/CLEAR" }

export const toggle = createAction(TOGGLE)<string>();
// toggle: (payload: string) => { type: "todos/TOGGLE"; payload: string }

export const add = createAction(
  ADD,
  (title: string) => ({ id: nextId(), title, completed: false })
)<Todo>();
// add: (title: string) => { type: "todos/ADD"; payload: Todo }
```

#### Async actions

```ts
// features/todos/actions.ts (continued)
import { createAsyncAction } from 'typesafe-actions';
import { FETCH_REQUEST, FETCH_SUCCESS, FETCH_FAILURE, FETCH_CANCEL } from './constants';

export const fetchTodosAsync = createAsyncAction(
  FETCH_REQUEST,
  FETCH_SUCCESS,
  FETCH_FAILURE,
  FETCH_CANCEL
)<string, Todo[], Error, string>();

fetchTodosAsync.request('all');
// { type: "todos/FETCH_REQUEST", payload: "all" }
```

#### RootAction

Still derive the union from the action-creator map with `ActionType`. Constants do not replace that helper. Augment `Types.RootAction` the same way as Path A so `createReducer` stays type-free. `Services` is the shared `store/services.ts` module.

```ts
// features/todos/action-types.ts
import { ActionType } from 'typesafe-actions';
import * as todos from './actions';

export type TodosAction = ActionType<typeof todos>;
```

```ts
// store/root-reducer.ts
import { combineReducers } from 'redux';
import { todosReducer } from '../features/todos/reducer';

const rootReducer = combineReducers({
  todos: todosReducer,
});

export default rootReducer;
```

```ts
// store/types.d.ts
import { ActionType, StateType } from 'typesafe-actions';

declare module 'typesafe-actions' {
  export type RootAction = ActionType<typeof import('../features/todos/actions')>;
  export type RootState = StateType<typeof import('./root-reducer').default>;
  export type Services = typeof import('./services').default;

  interface Types {
    RootAction: RootAction;
  }
}
```

#### Reducers

Use `handleType` when constants are the source of truth:

```ts
// features/todos/reducer.ts
import { createReducer } from 'typesafe-actions';

import { initialState } from './types';
import {
  ADD,
  TOGGLE,
  CLEAR,
  FETCH_REQUEST,
  FETCH_SUCCESS,
  FETCH_FAILURE,
} from './constants';

export const todosReducer = createReducer(initialState)
  .handleType(FETCH_REQUEST, state => ({
    ...state,
    isLoading: true,
    error: undefined,
  }))
  .handleType(FETCH_SUCCESS, (state, action) => ({
    ...state,
    isLoading: false,
    todos: action.payload, // action: { type: "todos/FETCH_SUCCESS"; payload: Todo[] }
  }))
  .handleType(FETCH_FAILURE, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.payload.message,
  }))
  .handleType(ADD, (state, action) => ({
    ...state,
    todos: [...state.todos, action.payload], // action: { type: "todos/ADD"; payload: Todo }
  }))
  .handleType(TOGGLE, (state, action) => ({
    ...state,
    todos: state.todos.map(todo =>
      todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
    ),
  }))
  .handleType(CLEAR, state => ({
    ...state,
    todos: [],
  }));
```

Object-map style uses the constants as keys. A string-literal key is contextually typed, unlike a computed `getType(...)` key:

```ts
// features/todos/reducer-map.ts
import { createReducer } from 'typesafe-actions';
import { initialState } from './types';
import { ADD, CLEAR } from './constants';

export const todosReducer = createReducer(initialState, {
  [ADD]: (state, action) => ({
    ...state,
    todos: [...state.todos, action.payload],
  }),
  [CLEAR]: state => ({ ...state, todos: [] }),
});
```

Regular `switch` reducers compare against the constants directly:

```ts
// features/todos/reducer-switch.ts
import { ActionType } from 'typesafe-actions';

import { initialState, TodosState } from './types';
import * as actions from './actions';
import { ADD, TOGGLE } from './constants';

export type TodosAction = ActionType<typeof actions>;

export const todosReducer = (
  state: TodosState = initialState,
  action: TodosAction
): TodosState => {
  switch (action.type) {
    case ADD:
      // action: { type: "todos/ADD"; payload: Todo }
      return { ...state, todos: [...state.todos, action.payload] };
    case TOGGLE:
      // action: { type: "todos/TOGGLE"; payload: string }
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      };
    default:
      return state;
  }
};
```

#### Action helpers

`isOfType` is the constant counterpart of `isActionOf`. Same currying and array support:

```ts
// features/todos/guards.ts
import { ActionType, isOfType } from 'typesafe-actions';
import { ADD, TOGGLE } from './constants';
import * as actions from './actions';

type TodosAction = ActionType<typeof actions>;

export function readAddedTodo(action: TodosAction) {
  if (isOfType(ADD, action)) {
    // action: { type: "todos/ADD"; payload: Todo }
    return action.payload.completed;
  }
  return undefined;
}

export function editsOnly(actions: TodosAction[]) {
  // narrowed to
  // | { type: "todos/ADD"; payload: Todo }
  // | { type: "todos/TOGGLE"; payload: string }
  return actions.filter(isOfType([ADD, TOGGLE]));
}
```

#### Async flows

**redux-observable** — filter with `isOfType`:

```ts
// features/todos/epics.ts
import { Epic } from 'redux-observable';
import { from, of } from 'rxjs';
import { catchError, filter, map, switchMap, takeUntil } from 'rxjs/operators';
import { RootAction, RootState, Services, isOfType } from 'typesafe-actions';

import { fetchTodosAsync } from './actions';
import { FETCH_REQUEST, FETCH_CANCEL } from './constants';

export const fetchTodosEpic: Epic<
  RootAction,
  RootAction,
  RootState,
  Services
> = (action$, _state$, { todosApi }) =>
  action$.pipe(
    filter(isOfType(FETCH_REQUEST)),
    switchMap(action =>
      from(todosApi.getAll(action.payload)).pipe(
        map(todos => fetchTodosAsync.success(todos)),
        catchError((err: Error) => of(fetchTodosAsync.failure(err))),
        takeUntil(action$.pipe(filter(isOfType(FETCH_CANCEL))))
      )
    )
  );
```

**redux-saga** — pass the type constant to `takeEvery`:

```ts
// features/todos/saga.ts
import { call, put, takeEvery } from 'redux-saga/effects';
import { fetchTodosAsync } from './actions';
import { FETCH_REQUEST } from './constants';
import services from '../../store/services';
import { Todo } from './types';

export function* fetchTodosSaga(
  action: ReturnType<typeof fetchTodosAsync.request>
): Generator {
  try {
    const response = (yield call(
      services.todosApi.getAll,
      action.payload
    )) as Todo[];
    yield put(fetchTodosAsync.success(response));
  } catch (err) {
    yield put(fetchTodosAsync.failure(err));
  }
}

export function* todosSaga() {
  yield takeEvery(FETCH_REQUEST, fetchTodosSaga);
}
```

[⇧ back to top](#table-of-contents)

### Using both paths together

You can mix the two styles in one app (for example while migrating), but keep a single style inside a feature.

- `handleAction` / `isActionOf` / `getType` always take **action creators**.
- `handleType` / `isOfType` always take **type constants** (or string literals).
- `ActionType<typeof actions>` works for both, because it reads the creators, not the constants file.

Calling `.handleAction(...)` returns a chain that only keeps `handleAction`. `.handleType(...)` only keeps `handleType`. The handler map is the place that accepts both key styles on one reducer:

```ts
// features/todos/mixed.ts
import {
  ActionType,
  createReducer,
  getType,
  isActionOf,
  isOfType,
} from 'typesafe-actions';
import { add } from './actions';
import * as actions from './actions';
import { ADD, TOGGLE } from './constants';
import { initialState, TodosState } from './types';

type TodosAction = ActionType<typeof actions>;

export const mixedReducer = createReducer<TodosState, TodosAction>(initialState, {
  [getType(add)]: (
    state: TodosState,
    handled: ReturnType<typeof add>
  ): TodosState => ({
    ...state,
    todos: [...state.todos, handled.payload],
  }),
  [TOGGLE]: (state, handled) => ({
    ...state,
    todos: state.todos.map(todo =>
      todo.id === handled.payload ? { ...todo, completed: !todo.completed } : todo
    ),
  }),
});

export function readAddedTodo(action: TodosAction) {
  if (isActionOf(add, action) || isOfType(ADD, action)) {
    // both narrow to { type: "todos/ADD"; payload: Todo }
    return action.payload.completed;
  }
  return undefined;
}
```

[⇧ back to top](#table-of-contents)

---

## API Docs v4 (v5 is WIP [#189](https://github.com/piotrwitek/typesafe-actions/issues/189))

### Action-Creators API

#### `action`

_Simple **action factory function** to simplify creation of type-safe actions._

> **WARNING**:  
> This approach will **NOT WORK** with **action-helpers** (such as `getType` and `isActionOf`) because it is creating **action objects** while all the other creator functions are returning **enhanced action-creators**.

```ts
action(type, payload?, meta?, error?)
```

Examples:
[> Advanced Usage Examples](src/action.spec.ts)

```ts
const increment = () => action('INCREMENT');
// { type: 'INCREMENT'; }

const createUser = (id: number, name: string) =>
  action('CREATE_USER', { id, name });
// { type: 'CREATE_USER'; payload: { id: number; name: string }; }

const getUsers = (params?: string) =>
  action('GET_USERS', undefined, params);
// { type: 'GET_USERS'; meta: string | undefined; }
```

> **TIP**: Starting from TypeScript v3.4 you can achieve similar results using new `as const` operator.

```ts
const increment = () => ({ type: 'INCREMENT' } as const);
```

#### `createAction`

_Create an enhanced action-creator with unlimited number of arguments._
- Resulting action-creator will preserve semantic names of their arguments  `(id, title, amount, etc...)`.
- Returned action object have predefined properties `({ type, payload, meta })`

```ts
createAction(type)
createAction(type, actionCallback => {
  return (namedArg1, namedArg2, ...namedArgN) => actionCallback(payload?, meta?)
})
```
> **TIP**: Injected `actionCallback` argument is similar to `action` API but doesn't need the "type" parameter

Examples:
[> Advanced Usage Examples](src/create-action.spec.ts)

```ts
import { createAction } from 'typesafe-actions';

// - with type only
const increment = createAction('INCREMENT');
dispatch(increment());
// { type: 'INCREMENT' };

// - with type and payload
const add = createAction('ADD', action => {
  return (amount: number) => action(amount);
});
dispatch(add(10));
// { type: 'ADD', payload: number }

// - with type and meta
const getTodos = createAction('GET_TODOS', action => {
  return (params: Params) => action(undefined, params);
});
dispatch(getTodos('some_meta'));
// { type: 'GET_TODOS', meta: Params }

// - and finally with type, payload and meta
const getTodo = createAction('GET_TODO', action => {
  return (id: string, meta: string) => action(id, meta);
});
dispatch(getTodo('some_id', 'some_meta'));
// { type: 'GET_TODO', payload: string, meta: string }
```

[⇧ back to top](#table-of-contents)

#### `createStandardAction`

_Create an enhanced action-creator compatible with [Flux Standard Action](https://github.com/redux-utilities/flux-standard-action) to reduce boilerplate and enforce convention._
- Resulting action-creator have predefined arguments `(payload, meta)`
- Returned action object have predefined properties `({ type, payload, meta, error })`
- But it also contains a `.map()` method that allow to map `(payload, meta)` arguments to a custom action object `({ customProp1, customProp2, ...customPropN })`

```ts
createStandardAction(type)()
createStandardAction(type)<TPayload, TMeta?>()
createStandardAction(type).map((payload, meta) => ({ customProp1, customProp2, ...customPropN }))
```

> **TIP**: Using `undefined` as generic type parameter you can make the action-creator function require NO parameters.

Examples:
[> Advanced Usage Examples](src/create-standard-action.spec.ts)

```ts
import { createStandardAction } from 'typesafe-actions';

// Very concise with use of generic type arguments
// - with type only
const increment = createStandardAction('INCREMENT')();
const increment = createStandardAction('INCREMENT')<undefined>();
increment(); // { type: 'INCREMENT' } (no parameters are required)


// - with type and payload
const add = createStandardAction('ADD')<number>();
add(10); // { type: 'ADD', payload: number }

// - with type and meta
const getData = createStandardAction('GET_DATA')<undefined, string>();
getData(undefined, 'meta'); // { type: 'GET_DATA', meta: string }

// - and finally with type, payload and meta
const getData = createStandardAction('GET_DATA')<number, string>();
getData(1, 'meta'); // { type: 'GET_DATA', payload: number, meta: string }

// Can map payload and meta arguments to a custom action object
const notify = createStandardAction('NOTIFY').map(
  (payload: string, meta: Meta) => ({
    from: meta.username,
    message: `${meta.username}: ${payload}`,
    messageType: meta.type,
    datetime: new Date(),
  })
);

dispatch(notify('Hello!', { username: 'Piotr', type: 'announcement' }));
// { type: 'NOTIFY', from: string, message: string, messageType: MessageType, datetime: Date }
```

[⇧ back to top](#table-of-contents)

#### `createCustomAction`

_Create an enhanced action-creator with unlimited number of arguments and custom properties on action object._
- Resulting action-creator will preserve semantic names of their arguments  `(id, title, amount, etc...)`.
- Returned action object have custom properties `({ type, customProp1, customProp2, ...customPropN })`

```ts
createCustomAction(type, type => {
  return (namedArg1, namedArg2, ...namedArgN) => ({ type, customProp1, customProp2, ...customPropN })
})
```

Examples:
[> Advanced Usage Examples](src/create-custom-action.spec.ts)

```ts
import { createCustomAction } from 'typesafe-actions';

const add = createCustomAction('CUSTOM', type => {
  return (first: number, second: number) => ({ type, customProp1: first, customProp2: second });
});

dispatch(add(1));
// { type: "CUSTOM"; customProp1: number; customProp2: number; }
```

[⇧ back to top](#table-of-contents)

#### `createAsyncAction`

_Create an object containing three enhanced action-creators to simplify handling of async flows (e.g. network request - request/success/failure)._

```ts
createAsyncAction(
  requestType, successType, failureType, cancelType?
)<TRequestPayload, TSuccessPayload, TFailurePayload, TCancelPayload?>()
```

##### `AsyncActionCreator`

```ts
type AsyncActionCreator<
  [TRequestType, TRequestPayload],
  [TSuccessType, TSuccessPayload],
  [TFailureType, TFailurePayload],
  [TCancelType, TCancelPayload]?
> = {
  request: StandardActionCreator<TRequestType, TRequestPayload>,
  success: StandardActionCreator<TSuccessType, TSuccessPayload>,
  failure: StandardActionCreator<TFailureType, TFailurePayload>,
  cancel?: StandardActionCreator<TCancelType, TCancelPayload>,
}
```

> **TIP**: Using `undefined` as generic type parameter you can make the action-creator function require NO parameters.

Examples:
[> Advanced Usage Examples](src/create-async-action.spec.ts)

```ts
import { createAsyncAction, AsyncActionCreator } from 'typesafe-actions';

const fetchUsersAsync = createAsyncAction(
  'FETCH_USERS_REQUEST',
  'FETCH_USERS_SUCCESS',
  'FETCH_USERS_FAILURE'
)<string, User[], Error>();

dispatch(fetchUsersAsync.request(params));

dispatch(fetchUsersAsync.success(response));

dispatch(fetchUsersAsync.failure(err));

const fn = (
  a: AsyncActionCreator<
    ['FETCH_USERS_REQUEST', string],
    ['FETCH_USERS_SUCCESS', User[]],
    ['FETCH_USERS_FAILURE', Error]
  >
) => a;
fn(fetchUsersAsync);

// There is 4th optional argument to declare cancel action
const fetchUsersAsync = createAsyncAction(
  'FETCH_USERS_REQUEST',
  'FETCH_USERS_SUCCESS',
  'FETCH_USERS_FAILURE'
  'FETCH_USERS_CANCEL'
)<string, User[], Error, string>();

dispatch(fetchUsersAsync.cancel('reason'));

const fn = (
  a: AsyncActionCreator<
    ['FETCH_USERS_REQUEST', string],
    ['FETCH_USERS_SUCCESS', User[]],
    ['FETCH_USERS_FAILURE', Error],
    ['FETCH_USERS_CANCEL', string]
  >
) => a;
fn(fetchUsersAsync);
```

[⇧ back to top](#table-of-contents)

---

### Reducer-Creators API

#### `createReducer`

_Create a typesafe reducer_

```ts
createReducer<TState, TRootAction>(initialState, handlersMap?)
// or
createReducer<TState, TRootAction>(initialState)
  .handleAction(actionCreator, reducer)
  .handleAction([actionCreator1, actionCreator2, ...actionCreatorN], reducer)
  .handleType(type, reducer)
  .handleType([type1, type2, ...typeN], reducer)
```

Examples:
[> Advanced Usage Examples](src/create-reducer.spec.ts)

> **TIP:** You can use reducer API with a **type-free** syntax by [Extending internal types](#extending-internal-types-to-enable-type-free-syntax-with-createreducer), otherwise you'll have to pass generic type arguments like in below examples
```ts
// type-free syntax doesn't require generic type arguments
const counterReducer = createReducer(0, { 
  ADD: (state, action) => state + action.payload,
  [getType(increment)]: (state, _) => state + 1,
})
```

**Object map style:**
```ts
import { createReducer, getType } from 'typesafe-actions'

type State = number;
type Action = { type: 'ADD', payload: number } | { type: 'INCREMENT' };

const counterReducer = createReducer<State, Action>(0, { 
  ADD: (state, action) => state + action.payload,
  [getType(increment)]: (state, _) => state + 1,
})
```

**Chain API style:**
```ts
// using action-creators
const counterReducer = createReducer<State, Action>(0)
  .handleAction(add, (state, action) => state + action.payload)
  .handleAction(increment, (state, _) => state + 1)

  // handle multiple actions by using array
  .handleAction([add, increment], (state, action) =>
    state + (action.type === 'ADD' ? action.payload : 1)
  );

// all the same scenarios are working when using type-constants
const counterReducer = createReducer<State, Action>(0)
  .handleType('ADD', (state, action) => state + action.payload)
  .handleType('INCREMENT', (state, _) => state + 1);
```

**Extend or compose reducers - every operation is completely typesafe:**
```ts
const newCounterReducer = createReducer<State, Action>(0)
  .handleAction('SUBTRACT', (state, action) => state - action.payload)
  .handleAction('DECREMENT', (state, _) => state - 1);

const bigReducer = createReducer<State, Action>(0, {
  ...counterReducer.handlers, // typesafe
  ...newCounterReducer.handlers, // typesafe
  SUBTRACT: decrementReducer.handlers.DECREMENT, // <= error, wrong type
})
```

[⇧ back to top](#table-of-contents)

---

### Action-Helpers API

#### `getType`

_Get the **type** property value (narrowed to literal type) of given enhanced action-creator._

```ts
getType(actionCreator)
```

[> Advanced Usage Examples](src/get-type.spec.ts)

Examples:
```ts
import { getType, createStandardAction } from 'typesafe-actions';

const add = createStandardAction('ADD')<number>();

// In switch reducer
switch (action.type) {
  case getType(add):
    // action type is { type: "ADD"; payload: number; }
    return state + action.payload;

  default:
    return state;
}

// or with conditional statements
if (action.type === getType(add)) {
  // action type is { type: "ADD"; payload: number; }
}
```

[⇧ back to top](#table-of-contents)

#### `isActionOf`

_Check if action is an instance of given enhanced action-creator(s)
(it will narrow action type to a type of given action-creator(s))_


> **WARNING**: Regular action creators and [action](#action) will not work with this helper

```ts
// can be used as a binary function
isActionOf(actionCreator, action)
// or as a curried function
isActionOf(actionCreator)(action)
// also accepts an array
isActionOf([actionCreator1, actionCreator2, ...actionCreatorN], action)
// with its curried equivalent
isActionOf([actionCreator1, actionCreator2, ...actionCreatorN])(action)
```

Examples:
[> Advanced Usage Examples](src/is-action-of.spec.ts)

```ts
import { addTodo, removeTodo } from './todos-actions';

// Works with any filter type function (`Array.prototype.filter`, lodash, ramda, rxjs, etc.)
// - single action
[action1, action2, ...actionN]
  .filter(isActionOf(addTodo)) // only actions with type `ADD` will pass
  .map((action) => {
    // action type is { type: "todos/ADD"; payload: Todo; }
    ...
    
// - multiple actions
[action1, action2, ...actionN]
  .filter(isActionOf([addTodo, removeTodo])) // only actions with type `ADD` or 'REMOVE' will pass
  .do((action) => {
    // action type is { type: "todos/ADD"; payload: Todo; } | { type: "todos/REMOVE"; payload: Todo; }
    ...
      
// With conditional statements
// - single action
if(isActionOf(addTodo, action)) {
  return iAcceptOnlyTodoType(action.payload);
  // action type is { type: "todos/ADD"; payload: Todo; }
}
// - multiple actions
if(isActionOf([addTodo, removeTodo], action)) {
  return iAcceptOnlyTodoType(action.payload);
  // action type is { type: "todos/ADD"; payload: Todo; } | { type: "todos/REMOVE"; payload: Todo; }
}
```

[⇧ back to top](#table-of-contents)

#### `isOfType`

_Check if action type property is equal given type-constant(s)
(it will narrow action type to a type of given action-creator(s))_

```ts
// can be used as a binary function
isOfType(type, action)
// or as curried function
isOfType(type)(action)
// also accepts an array
isOfType([type1, type2, ...typeN], action)
// with its curried equivalent
isOfType([type1, type2, ...typeN])(action)
```

Examples:
[> Advanced Usage Examples](src/is-of-type.spec.ts)

```ts
import { ADD, REMOVE } from './todos-types';

// Works with any filter type function (`Array.prototype.filter`, lodash, ramda, rxjs, etc.)
// - single action
[action1, action2, ...actionN]
  .filter(isOfType(ADD)) // only actions with type `ADD` will pass
  .map((action) => {
    // action type is { type: "todos/ADD"; payload: Todo; }
    ...
    
// - multiple actions
[action1, action2, ...actionN]
  .filter(isOfType([ADD, REMOVE])) // only actions with type `ADD` or 'REMOVE' will pass
  .do((action) => {
    // action type is { type: "todos/ADD"; payload: Todo; } | { type: "todos/REMOVE"; payload: Todo; }
    ...
      
// With conditional statements
// - single action
if(isOfType(ADD, action)) {
  return iAcceptOnlyTodoType(action.payload);
  // action type is { type: "todos/ADD"; payload: Todo; }
}
// - multiple actions
if(isOfType([ADD, REMOVE], action)) {
  return iAcceptOnlyTodoType(action.payload);
  // action type is { type: "todos/ADD"; payload: Todo; } | { type: "todos/REMOVE"; payload: Todo; }
}
```

[⇧ back to top](#table-of-contents)

---

### Type-Helpers API
Below helper functions are very flexible generalizations, works great with nested structures and will cover numerous different use-cases.

#### `ActionType`

_Powerful type-helper that will infer union type from **import * as ...** or **action-creator map** object._

```ts
import { ActionType } from 'typesafe-actions';

// with "import * as ..."
import * as todos from './actions';
export type TodosAction = ActionType<typeof todos>;
// TodosAction: { type: 'action1' } | { type: 'action2' } | { type: 'action3' }

// with nested action-creator map case
const actions = {
  action1: createAction('action1'),
  nested: {
    action2: createAction('action2'),
    moreNested: {
      action3: createAction('action3'),
    },
  },
};
export type RootAction = ActionType<typeof actions>;
// RootAction: { type: 'action1' } | { type: 'action2' } | { type: 'action3' }
```

[⇧ back to top](#table-of-contents)

#### `StateType`

_Powerful type helper that will infer state object type from **reducer function** and **nested/combined reducers**._

> **WARNING**: working with redux@4+ types

```ts
import { combineReducers } from 'redux';
import { StateType } from 'typesafe-actions';

// with reducer function
const todosReducer = (state: Todo[] = [], action: TodosAction) => {
  switch (action.type) {
    case getType(todos.add):
      return [...state, action.payload];
    ...
export type TodosState = StateType<typeof todosReducer>;

// with nested/combined reducers
const rootReducer = combineReducers({
  router: routerReducer,
  counters: countersReducer,
});
export type RootState = StateType<typeof rootReducer>;
```

[⇧ back to top](#table-of-contents)

---

## Migration Guides

### `v4.x.x` to `v5.x.x`

**Breaking changes:**

1. In `v5` all the deprecated `v4` creator functions are available under `deprecated` named import to help with incremental migration.
```ts
// before
import { createAction, createStandardAction, createCustomAction } from "typesafe-actions"

// after
import { deprecated } from "typesafe-actions"
const { createAction, createStandardAction, createCustomAction } = deprecated;
```

2. `createStandardAction` was renamed to `createAction` and `.map` method was removed in favor of simpler `redux-actions` style API.
```ts
// before
const withMappedPayloadAndMeta = createStandardAction(
  'CREATE_STANDARD_ACTION'
).map(({ username, message }: Notification) => ({
  payload: `${username}: ${message}`,
  meta: { username, message },
}));

// after
const withMappedPayloadAndMeta = createAction(
  'CREATE_STANDARD_ACTION',
  ({ username, message }: Notification) => `${username}: ${message}`, // payload creator
  ({ username, message }: Notification) => ({ username, message }) // meta creator
)();
```

3. `v4` version of `createAction` was removed. I suggest to refactor to use a new `createAction` as in point `2`, which was simplified and extended to support `redux-actions` style API.
```ts
// before
const withPayloadAndMeta = createAction('CREATE_ACTION', resolve => {
  return (id: number, token: string) => resolve(id, token);
});

// after
const withPayloadAndMeta = createAction(
  'CREATE_ACTION',
  (id: number, token: string) => id, // payload creator
  (id: number, token: string) => token // meta creator
})();
```

4. `createCustomAction` - API was greatly simplified, now it's used like this:
```ts
// before
const add = createCustomAction('CUSTOM', type => {
  return (first: number, second: number) => ({ type, customProp1: first, customProp2: second });
});

// after
const add = createCustomAction(
  'CUSTOM',
  (first: number, second: number) => ({ customProp1: first, customProp2: second })
);
```

5. `AsyncActionCreator` should be just renamed to `AsyncActionCreatorBuilder`.
```ts
// before
import { AsyncActionCreator } from "typesafe-actions"

//after
import { AsyncActionCreatorBuilder } from "typesafe-actions"
```

### `v3.x.x` to `v4.x.x`

**No breaking changes!**

### `v2.x.x` to `v3.x.x`

Minimal supported TypeScript `v3.1+`.

### `v1.x.x` to `v2.x.x`

**Breaking changes:**

1. `createAction`
- In `v2` we provide a `createActionDeprecated` function compatible with `v1` `createAction` to help with incremental migration.

```ts
// in v1 we created action-creator like this:
const getTodo = createAction('GET_TODO',
  (id: string, meta: string) => ({
    type: 'GET_TODO',
    payload: id,
    meta: meta,
  })
);

getTodo('some_id', 'some_meta'); // { type: 'GET_TODO', payload: 'some_id', meta: 'some_meta' }

// in v2 we offer few different options - please choose your preference
const getTodoNoHelpers = (id: string, meta: string) => action('GET_TODO', id, meta);

const getTodoWithHelpers = createAction('GET_TODO', action => {
  return (id: string, meta: string) => action(id, meta);
});

const getTodoFSA = createStandardAction('GET_TODO')<string, string>();

const getTodoCustom = createStandardAction('GET_TODO').map(
  ({ id, meta }: { id: string; meta: string; }) => ({
    payload: id,
    meta,
  })
);
```

[⇧ back to top](#table-of-contents)

### Migrating from `redux-actions` to `typesafe-actions`

- createAction(s)

```ts
createAction(type, payloadCreator, metaCreator) => createStandardAction(type)() || createStandardAction(type).map(payloadMetaCreator)

createActions() => // COMING SOON!
```

- handleAction(s)

```ts
handleAction(type, reducer, initialState) => createReducer(initialState).handleAction(type, reducer)

handleActions(reducerMap, initialState) => createReducer(initialState, reducerMap)
```

> TIP: If migrating from JS -> TS, you can swap out action-creators from `redux-actions` with action-creators from `typesafe-actions` in your `handleActions` handlers. This works because the action-creators from `typesafe-actions` provide the same `toString` method implementation used by `redux-actions` to match actions to the correct reducer.

- combineActions

Not needed because each function in the API accept single value or array of values for action types or action creators.

[⇧ back to top](#table-of-contents)

---

## Compatibility Notes

**TypeScript support**

- `5.X.X` - TypeScript v3.2+
- `4.X.X` - TypeScript v3.2+
- `3.X.X` - TypeScript v3.2+
- `2.X.X` - TypeScript v2.9+
- `1.X.X` - TypeScript v2.7+

**Browser support**

It's compatible with all modern browsers.

For older browsers support (e.g. IE <= 11) and some mobile devices you need to provide the following polyfills:
- [Object.assign](https://developer.mozilla.org/pl/docs/Web/JavaScript/Referencje/Obiekty/Object/assign#Polyfill)
- [Array.prototype.includes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes)

**Recommended polyfill for IE**

To provide the best compatibility please include a popular polyfill package in your application, such as `core-js` or `react-app-polyfill` for `create-react-app`.
Please check the `React` guidelines on how to do that: [LINK](https://reactjs.org/docs/javascript-environment-requirements.html)
A polyfill fo IE11 is included in our `/codesandbox` application.

[⇧ back to top](#table-of-contents)

---

## Recipes

### Restrict Meta type in `action` creator
Using this recipe you can create an action creator with restricted Meta type with exact object shape.

```tsx
export type MetaType = {
  analytics?: {
    eventName: string;
  };
};

export const actionWithRestrictedMeta = <T extends string, P>(
  type: T,
  payload: P,
  meta: MetaType
) => action(type, payload, meta);

export const validAction = (payload: string) =>
  actionWithRestrictedMeta('type', payload, { analytics: { eventName: 'success' } }); // OK!

export const invalidAction = (payload: string) =>
  actionWithRestrictedMeta('type', payload, { analytics: { excessProp: 'no way!' } }); // Error
// Object literal may only specify known properties, and 'excessProp' does not exist in type '{ eventName: string; }
```

[⇧ back to top](#table-of-contents)

---

## Compare to others

Here you can find out a detailed comparison of `typesafe-actions` to other solutions.

### `redux-actions`
Lets compare the 3 most common variants of action-creators (with type only, with payload and with payload + meta)

Note: tested with "@types/redux-actions": "2.2.3"

**- with type only (no payload)**

##### redux-actions
```ts
const notify1 = createAction('NOTIFY');
// resulting type:
// () => {
//   type: string;
//   payload: void | undefined;
//   error: boolean | undefined;
// }
```

> with `redux-actions` you can notice the redundant nullable `payload` property and literal type of `type` property is lost (discrimination of union type would not be possible)

##### typesafe-actions
```ts
const notify1 = () => action('NOTIFY');
// resulting type:
// () => {
//   type: "NOTIFY";
// }
```

> with `typesafe-actions` there is no excess nullable types and no excess properties and the action "type" property is containing a literal type

**- with payload**

##### redux-actions
```ts
const notify2 = createAction('NOTIFY',
  (username: string, message?: string) => ({
    message: `${username}: ${message || 'Empty!'}`,
  })
);
// resulting type:
// (t1: string) => {
//   type: string;
//   payload: { message: string; } | undefined;
//   error: boolean | undefined;
// }
```

> first the optional `message` parameter is lost, `username` semantic argument name is changed to some generic `t1`, `type` property is widened once again and `payload` is nullable because of broken inference

##### typesafe-actions
```ts
const notify2 = (username: string, message?: string) => action(
  'NOTIFY',
  { message: `${username}: ${message || 'Empty!'}` },
);
// resulting type:
// (username: string, message?: string | undefined) => {
//   type: "NOTIFY";
//   payload: { message: string; };
// }
```

> `typesafe-actions` infer very precise resulting type, notice working optional parameters and semantic argument names are preserved which is really important for great intellisense experience

**- with payload and meta**

##### redux-actions
```ts
const notify3 = createAction('NOTIFY',
  (username: string, message?: string) => (
    { message: `${username}: ${message || 'Empty!'}` }
  ),
  (username: string, message?: string) => (
    { username, message }
  )
);
// resulting type:
// (...args: any[]) => {
//   type: string;
//   payload: { message: string; } | undefined;
//   meta: { username: string; message: string | undefined; };
//   error: boolean | undefined;
// }
```

> this time we got a completely broken arguments arity with no type-safety because of `any` type with all the earlier issues

##### typesafe-actions
```ts
/**
 * typesafe-actions
 */
const notify3 = (username: string, message?: string) => action(
  'NOTIFY',
  { message: `${username}: ${message || 'Empty!'}` },
  { username, message },
);
// resulting type:
// (username: string, message?: string | undefined) => {
//   type: "NOTIFY";
//   payload: { message: string; };
//   meta: { username: string; message: string | undefined; };
// }
```

> `typesafe-actions` never fail to `any` type, even with this advanced scenario all types are correct and provide complete type-safety and excellent developer experience 

[⇧ back to top](#table-of-contents)

---

## Motivation

When I started to combine Redux with TypeScript, I was trying to use [redux-actions](https://redux-actions.js.org/) to reduce the maintainability cost and boilerplate of **action-creators**. Unfortunately, the results were intimidating: incorrect type signatures and broken type-inference cascading throughout the entire code-base [(click here for a detailed comparison)](#redux-actions).

Existing solutions in the wild have been either **too verbose because of redundant type annotations** (hard to maintain) or **used classes** (hinders readability and requires using the **new** keyword 😱)

**So I created `typesafe-actions` to address all of the above pain points.**

The core idea was to design an API that would mostly use the power of TypeScript **type-inference** 💪 to lift the "maintainability burden" of type annotations. In addition, I wanted to make it "look and feel" as close as possible to the idiomatic JavaScript ❤️ , so we don't have to write the redundant type annotations that will create additional noise in your code.

[⇧ back to top](#table-of-contents)

---

## Contributing

You can help make this project better by contributing. If you're planning to contribute please make sure to check our contributing guide: [CONTRIBUTING.md](/CONTRIBUTING.md)

[⇧ back to top](#table-of-contents)

---

## Funding Issues

You can also help by funding issues.
Issues like bug fixes or feature requests can be very quickly resolved when funded through the IssueHunt platform.

I highly recommend to add a bounty to the issue that you're waiting for to increase priority and attract contributors willing to work on it.

[![Let's fund issues in this repository](https://issuehunt.io/static/embed/issuehunt-button-v1.svg)](https://issuehunt.io/repos/110746954)

[⇧ back to top](#table-of-contents)

---

## License

[MIT License](/LICENSE)

Copyright (c) 2017 Piotr Witek <piotrek.witek@gmail.com> (http://piotrwitek.github.io)

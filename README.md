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

:warning: Library was recently updated to v5 :warning:
<br/>*The tutorial below uses the v5 API. Some detailed API docs are still being refreshed, so please also use this issue as [v5.x.x API Docs](https://github.com/piotrwitek/typesafe-actions/issues/143).*

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
  - [Choose a Style](#choose-a-style)
  - [Shared Todo Types](#shared-todo-types)
  - [Path A: Action Creators As Action Types](#path-a-action-creators-as-action-types)
    - [Actions](#actions)
    - [Root Action](#root-action)
    - [Reducers](#reducers)
    - [Epics](#epics)
  - [Path B: String Constants As Action Types](#path-b-string-constants-as-action-types)
    - [Constants](#constants)
    - [Actions](#actions-1)
    - [Root Action](#root-action-1)
    - [Reducers](#reducers-1)
    - [Epics](#epics-1)
  - [Async Actions](#async-actions)
  - [Custom Actions](#custom-actions)
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

This tutorial uses the `typesafe-actions` v5 API to build the common pieces of a Redux Todo feature.

> **WARNING**  
> Please make sure that you are familiar with the following TypeScript concepts before following along: [Type Inference](https://www.typescriptlang.org/docs/handbook/type-inference.html), [Control flow analysis](https://github.com/Microsoft/TypeScript/wiki/What%27s-new-in-TypeScript#control-flow-based-type-analysis), [String Literal Types](https://www.typescriptlang.org/docs/handbook/literal-types.html), [Discriminated Unions](https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions), [Type Guards](https://www.typescriptlang.org/docs/handbook/advanced-types.html#type-guards-and-differentiating-types), [Generics](https://www.typescriptlang.org/docs/handbook/generics.html) and [Advanced Types](https://www.typescriptlang.org/docs/handbook/advanced-types.html).

[⇧ back to top](#table-of-contents)

### Choose a Style

`typesafe-actions` supports two action type conventions. Pick one convention and use it consistently in a feature.

| Style | Prefer it when | Main helpers |
| --- | --- | --- |
| [Action creators as action types](#path-a-action-creators-as-action-types) | You are starting new code or can migrate away from exported type constants. This is the recommended v5 path because it removes duplicated constants. | `createAction`, `createAsyncAction`, `handleAction`, `getType`, `isActionOf` |
| [String constants as action types](#path-b-string-constants-as-action-types) | You are integrating with an existing codebase that already exports type constants. | `createAction`, `createAsyncAction`, `handleType`, `isOfType` |

Both paths produce the same discriminated union of Redux actions through `ActionType`. The difference is only how reducers, epics and other consumers refer to the action type.

[⇧ back to top](#table-of-contents)

### Shared Todo Types

The examples below use this simple model:

```ts
// types.ts
export type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

export type TodosState = {
  readonly isLoading: boolean;
  readonly todos: readonly Todo[];
  readonly error?: string;
};

export const initialState: TodosState = {
  isLoading: false,
  todos: [],
};

export const createTodo = (title: string): Todo => ({
  id: Math.random()
    .toString(36)
    .slice(2),
  title,
  completed: false,
});
```

[⇧ back to top](#table-of-contents)

### Path A: Action Creators As Action Types

This is the recommended path for new code. Action creators produced by `createAction` and `createAsyncAction` include action type metadata, so you can pass the action creators themselves to helpers instead of exporting duplicated constants.

#### Actions

```ts
// actions.ts
import { createAction, createAsyncAction } from 'typesafe-actions';

import { Todo, createTodo } from './types';

export const addTodo = createAction(
  'todos/ADD',
  (title: string) => createTodo(title)
)<Todo>();

export const toggleTodo = createAction('todos/TOGGLE')<string>();

export const loadTodosAsync = createAsyncAction(
  'todos/LOAD_REQUEST',
  'todos/LOAD_SUCCESS',
  'todos/LOAD_FAILURE'
)<undefined, Todo[], string>();
```

`addTodo` keeps the named argument `(title: string)` while returning a Flux Standard Action with a typed `payload`. `toggleTodo` demonstrates the shorter generic payload form.

#### Root Action

Collect action creators into one object and derive a discriminated union with `ActionType`.

```ts
// root-action.ts
import * as todos from './features/todos/actions';

export default {
  todos,
};
```

```ts
// types.d.ts
import { StateType, ActionType } from 'typesafe-actions';

declare module 'typesafe-actions' {
  export type RootAction = ActionType<typeof import('./root-action').default>;
  export type RootState = StateType<typeof import('./root-reducer').default>;
  export type Services = typeof import('./services').default;

  interface Types {
    RootAction: RootAction;
    RootState: RootState;
  }
}
```

The module augmentation lets `createReducer` know your application `RootAction`, so reducer handlers can infer the exact action payload without repeating a generic at every call site.

#### Reducers

Use `handleAction` when the action creator is the source of truth for the action type.

```ts
// reducer.ts
import { createReducer } from 'typesafe-actions';

import { initialState } from './types';
import { addTodo, toggleTodo, loadTodosAsync } from './actions';

export const todosReducer = createReducer(initialState)
  .handleAction(loadTodosAsync.request, state => ({
    ...state,
    isLoading: true,
    error: undefined,
  }))
  .handleAction(loadTodosAsync.success, (state, action) => ({
    ...state,
    isLoading: false,
    todos: action.payload,
  }))
  .handleAction(loadTodosAsync.failure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.payload,
  }))
  .handleAction(addTodo, (state, action) => ({
    ...state,
    todos: [...state.todos, action.payload],
  }))
  .handleAction(toggleTodo, (state, action) => ({
    ...state,
    todos: state.todos.map(todo =>
      todo.id === action.payload
        ? { ...todo, completed: !todo.completed }
        : todo
    ),
  }));
```

If you prefer a regular switch reducer, use `getType` to read the type from an action creator while preserving narrowing.

```ts
// reducer.ts
import { ActionType, getType } from 'typesafe-actions';

import { initialState, TodosState } from './types';
import * as actions from './actions';

type TodosAction = ActionType<typeof actions>;

export const todosReducer = (
  state: TodosState = initialState,
  action: TodosAction
): TodosState => {
  switch (action.type) {
    case getType(actions.addTodo):
      return { ...state, todos: [...state.todos, action.payload] };
    case getType(actions.toggleTodo):
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

#### Epics

Use `isActionOf` to narrow actions in `redux-observable` streams.

```ts
// epics.ts
import { Epic } from 'redux-observable';
import { from, of } from 'rxjs';
import { catchError, filter, map, switchMap } from 'rxjs/operators';
import { RootAction, RootState, Services, isActionOf } from 'typesafe-actions';

import { loadTodosAsync } from './actions';

export const loadTodosEpic: Epic<
  RootAction,
  RootAction,
  RootState,
  Services
> = (action$, _state$, { todosApi }) =>
  action$.pipe(
    filter(isActionOf(loadTodosAsync.request)),
    switchMap(() =>
      from(todosApi.loadTodos()).pipe(
        map(loadTodosAsync.success),
        catchError((message: string) => of(loadTodosAsync.failure(message)))
      )
    )
  );
```

`isActionOf` also accepts arrays, which is useful when multiple action creators should start the same flow:

```ts
filter(isActionOf([loadTodosAsync.request, addTodo]));
```

[⇧ back to top](#table-of-contents)

### Path B: String Constants As Action Types

Use this path when your application already exports action type constants. The important rule is that constants must keep string literal types. Avoid building action type constants with dynamic string concatenation because that widens the type to `string`.

#### Constants

```ts
// constants.ts

// Correct: each constant is a string literal type.
export const ADD = 'todos/ADD';
export const TOGGLE = 'todos/TOGGLE';
export const LOAD_REQUEST = 'todos/LOAD_REQUEST';
export const LOAD_SUCCESS = 'todos/LOAD_SUCCESS';
export const LOAD_FAILURE = 'todos/LOAD_FAILURE';

// Correct for grouped constants in TS 3.4 and newer.
export const TodosActionTypes = {
  ADD: 'todos/ADD',
  TOGGLE: 'todos/TOGGLE',
  LOAD_REQUEST: 'todos/LOAD_REQUEST',
  LOAD_SUCCESS: 'todos/LOAD_SUCCESS',
  LOAD_FAILURE: 'todos/LOAD_FAILURE',
} as const;
```

```ts
// Incorrect: the resulting type is string, not 'todos/ADD'.
const prefix = 'todos/';
export const ADD = prefix + 'ADD';
```

#### Actions

Pass the constants to the same v5 action creator API.

```ts
// actions.ts
import { createAction, createAsyncAction } from 'typesafe-actions';

import { Todo, createTodo } from './types';
import { ADD, TOGGLE, LOAD_REQUEST, LOAD_SUCCESS, LOAD_FAILURE } from './constants';

export const addTodo = createAction(
  ADD,
  (title: string) => createTodo(title)
)<Todo>();

export const toggleTodo = createAction(TOGGLE)<string>();

export const loadTodosAsync = createAsyncAction(
  LOAD_REQUEST,
  LOAD_SUCCESS,
  LOAD_FAILURE
)<undefined, Todo[], string>();
```

#### Root Action

Even when reducers use constants, the easiest way to model the final union is still `ActionType<typeof actions>`.

```ts
// root-action.ts
import * as todos from './features/todos/actions';

export default {
  todos,
};
```

```ts
// types.d.ts
import { StateType, ActionType } from 'typesafe-actions';

declare module 'typesafe-actions' {
  export type RootAction = ActionType<typeof import('./root-action').default>;
  export type RootState = StateType<typeof import('./root-reducer').default>;
  export type Services = typeof import('./services').default;

  interface Types {
    RootAction: RootAction;
    RootState: RootState;
  }
}
```

#### Reducers

Use `handleType` when constants are the source of truth for action types.

```ts
// reducer.ts
import { createReducer } from 'typesafe-actions';

import { initialState } from './types';
import { ADD, TOGGLE, LOAD_REQUEST, LOAD_SUCCESS, LOAD_FAILURE } from './constants';

export const todosReducer = createReducer(initialState)
  .handleType(LOAD_REQUEST, state => ({
    ...state,
    isLoading: true,
    error: undefined,
  }))
  .handleType(LOAD_SUCCESS, (state, action) => ({
    ...state,
    isLoading: false,
    todos: action.payload,
  }))
  .handleType(LOAD_FAILURE, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.payload,
  }))
  .handleType(ADD, (state, action) => ({
    ...state,
    todos: [...state.todos, action.payload],
  }))
  .handleType(TOGGLE, (state, action) => ({
    ...state,
    todos: state.todos.map(todo =>
      todo.id === action.payload
        ? { ...todo, completed: !todo.completed }
        : todo
    ),
  }));
```

Regular switch reducers can use constants directly.

```ts
// reducer.ts
import { ActionType } from 'typesafe-actions';

import { initialState, TodosState } from './types';
import * as actions from './actions';
import { ADD, TOGGLE } from './constants';

type TodosAction = ActionType<typeof actions>;

export const todosReducer = (
  state: TodosState = initialState,
  action: TodosAction
): TodosState => {
  switch (action.type) {
    case ADD:
      return { ...state, todos: [...state.todos, action.payload] };
    case TOGGLE:
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

#### Epics

Use `isOfType` when filtering by constants.

```ts
// epics.ts
import { Epic } from 'redux-observable';
import { from, of } from 'rxjs';
import { catchError, filter, map, switchMap } from 'rxjs/operators';
import { RootAction, RootState, Services, isOfType } from 'typesafe-actions';

import { loadTodosAsync } from './actions';
import { LOAD_REQUEST } from './constants';

export const loadTodosEpic: Epic<
  RootAction,
  RootAction,
  RootState,
  Services
> = (action$, _state$, { todosApi }) =>
  action$.pipe(
    filter(isOfType(LOAD_REQUEST)),
    switchMap(() =>
      from(todosApi.loadTodos()).pipe(
        map(loadTodosAsync.success),
        catchError((message: string) => of(loadTodosAsync.failure(message)))
      )
    )
  );
```

`isOfType` also accepts arrays:

```ts
filter(isOfType([LOAD_REQUEST, ADD]));
```

[⇧ back to top](#table-of-contents)

### Async Actions

`createAsyncAction` creates an object with `request`, `success`, `failure` and optional `cancel` action creators. It is useful for request lifecycles because the action creators stay grouped and the resulting action union remains precise.

```ts
import { createAsyncAction } from 'typesafe-actions';

export const fetchUserAsync = createAsyncAction(
  'users/FETCH_REQUEST',
  'users/FETCH_SUCCESS',
  'users/FETCH_FAILURE',
  'users/FETCH_CANCEL'
)<string, User, Error, string>();

fetchUserAsync.request('user-1');
// { type: 'users/FETCH_REQUEST', payload: 'user-1' }

fetchUserAsync.success({ id: 'user-1', name: 'Piotr' });
// { type: 'users/FETCH_SUCCESS', payload: User }

fetchUserAsync.failure(new Error('Request failed'));
// { type: 'users/FETCH_FAILURE', payload: Error }

fetchUserAsync.cancel('user-1');
// { type: 'users/FETCH_CANCEL', payload: 'user-1' }
```

Use `[Payload, Meta]` tuples when an async action also needs `meta`.

```ts
export const fetchUserWithMetaAsync = createAsyncAction(
  'users/FETCH_REQUEST',
  'users/FETCH_SUCCESS',
  'users/FETCH_FAILURE'
)<[string, { startedAt: number }], User, Error>();

fetchUserWithMetaAsync.request('user-1', { startedAt: Date.now() });
// { type: 'users/FETCH_REQUEST', payload: 'user-1', meta: { startedAt: number } }
```

[⇧ back to top](#table-of-contents)

### Custom Actions

Prefer `createAction` for regular Flux Standard Actions. Use `createCustomAction` only when you must integrate with a custom action shape.

```ts
import { createCustomAction } from 'typesafe-actions';

import { createTodo } from './types';

export const addTodo = createCustomAction(
  'todos/ADD_CUSTOM',
  (title: string) => ({
    payload: createTodo(title),
    receivedAt: Date.now(),
  })
);

addTodo('Write docs');
// { type: 'todos/ADD_CUSTOM', payload: Todo, receivedAt: number }
```

Custom action creators still work with `ActionType`, `getType`, `isActionOf` and `handleAction` because they include the same action type metadata.

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

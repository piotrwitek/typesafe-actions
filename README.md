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
<br/>*Current API Docs and Tutorial are outdated (from v4), so temporarily please use this issue as [v5.x.x API Docs](https://github.com/piotrwitek/typesafe-actions/issues/143).*

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
- [Tutorial v4 (v5 is WIP #188)](#tutorial-v4-v5-is-wip-188)
  - [Constants](#constants)
  - [Actions](#actions)
    - [1. Basic actions](#1-basic-actions)
    - [2. FSA compliant actions](#2-fsa-compliant-actions)
    - [3. Custom actions (non-standard use-cases)](#3-custom-actions-non-standard-use-cases)
  - [Action Helpers](#action-helpers)
    - [Using action-creators instances instead of type-constants](#using-action-creators-instances-instead-of-type-constants)
    - [Using regular type-constants](#using-regular-type-constants)
  - [Reducers](#reducers)
    - [Extending internal types to enable type-free syntax with `createReducer`](#extending-internal-types-to-enable-type-free-syntax-with-createreducer)
    - [Using createReducer API with type-free syntax](#using-createreducer-api-with-type-free-syntax)
    - [Alternative usage with regular switch reducer](#alternative-usage-with-regular-switch-reducer)
  - [Async-Flows](#async-flows)
    - [With `redux-observable` epics](#with-redux-observable-epics)
    - [With `redux-saga` sagas](#with-redux-saga-sagas)
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

To showcase the power of the **type-safety** provided by this library, we're going to show how to build the most common parts of a typical Todo App using a Redux architecture:

> **WARNING**  
> Please make sure that you are familiar with the following concepts of statically-typed programming languages to be able to follow along with ease: [Type Inference][type-inference], [Control flow analysis][control-flow-analysis], [String Literal Types][string-literal-types], [Discriminated Unions][discriminated-unions], [Type Guards][type-guards], [Generics][generics].

[⇧ back to top](#table-of-contents)

###   Action Type - common pitfalls

When creating an _action type_ make sure to use a [string literal type][string-literal-types] to avoid type widening, which break contextual typing of [Discriminated Unions][discriminated-unions].  

- use `const` variable declaration.
```ts
const ADD = 'todos/ADD'; // => 'todos/ADD'
```

- don't use **string concatenation**, use **template literals** instead (TS > v4.1).
```ts
const prefix = 'todos/';

// INCORRECT: widening to string type
export const ADD = prefix + 'ADD'; // => string

// CORRECT: preserving string literal type (TS > v4.1)
export const ADD = `${prefix}ADD`; // => 'todos/ADD'
```
- when using object maps use `as const`(TS > v3.4)
```ts
// INCORRECT: widening to string type
export default {
   ADD: 'todos/ADD', // => string
}

// CORRECT: preserving string literal type (TS > v3.4)
export default ({
  ADD: '@prefix/ADD', // => '@prefix/ADD'
} as const)
```

[⇧ back to top](#table-of-contents)

### Introduction

`typesafe-actions` was designed with flexibility in mind to cover two most common conventions when using actions in your project:
- Using old-school **string constant** as an _action type_ (useful for easy integration of legacy code).
- Using recommended **action-creator** as an _action type_, which results in much less boilerplate.

Below you can find comparison of both approaches and choose the one that fit your needs best.

#### Using recommended action-creator instances as an action type

Instead of **type-constant** we can use **action-creator** instance to match specific actions in reducers and epics cases.

1. Create an action creator:
```ts
// actions.ts
import { createAction } from 'typesafe-actions';
// Basic action
export const add = createAction('todos/ADD')<number>();
// redux-actions style
export const add2 = createAction(
  'todos/ADD',
  (value: number) => value, // payload creator
)();
```
2. Import the action and use the `getType` method to get the _action type_ to use in a switch case.
```ts
//reducer.ts
import { add } from "./actions";
...
  switch (action.type) {
    case add.getType(): // <= getType is a type-guard
      // so below type of action is narrowed to: { type: "todos/ADD"; payload: Todo; }
      return [...state, action.payload];
    ...
```

#### Using old-school string constant as an action type
Alternatively if you have a legacy application and want to start using `typesafe-actions` you can easily do that by using old-school **type-constants**.

1. Create an action creator:
```ts
// types.ts
export const ADD = 'todos/ADD';
```
2. Import the type and use it  in a switch case.
```ts
  import { ADD } from "./types";
  ...
  switch (action.type) {
    case ADD: // ADD is a string literal "todos/ADD"
      // so below type of action is narrowed to: { type: "todos/ADD"; payload: Todo; }
      return [...state, action.payload];
    ...
```

[⇧ back to top](#table-of-contents)

####  actions
`action` are creators that can create **actions** with predefined properties ({ type, payload, meta }). This make them concise but also opinionated.
 
Important property is that resulting **action-creator** will have a variadic number of arguments and preserve their semantic names `(id, title, amount, etc...)`.

This two creators are very similar and the only real difference is that `action` **WILL NOT WORK** with **action-helpers**.

```ts
import { action } from 'typesafe-actions';

export const add = (title: string) => action('todos/ADD', { id: cuid(), title, completed: false });
// add: (title: string) => { type: "todos/ADD"; payload: { id: string, title: string, completed: boolean; }; }
```

// USING ACTION CREATORS

This style is aligned with [Flux Standard Action](https://github.com/redux-utilities/flux-standard-action), so your **action** object shape is constrained to `({ type, payload, meta, error })`. It is using **generic type arguments** for `meta` and `payload` to simplify creation of type-safe action-creators.

It is important to notice that in the resulting **action-creator** arguments are also constrained to the predefined: `(payload, meta)`, making it the most opinionated creator.

> **TIP**: This creator is the most compatible with `redux-actions` in case you are migrating.

```ts
import { createStandardAction } from 'typesafe-actions';

export const toggle = createStandardAction('todos/TOGGLE')<string>();
// toggle: (payload: string) => { type: "todos/TOGGLE"; payload: string; }

export const add = createStandardAction('todos/ADD').map(
  (title: string) => ({
    payload: { id: cuid(), title, completed: false },
  })
);
// add: (payload: string) => { type: "todos/ADD"; payload: { id: string, title: string, completed: boolean; }; }
```

> **RECOMMENDATION**  
> Common approach is to create a `RootAction` in the central point of your redux store - it will represent all possible action types in your application. You can also merge it with third-party action types (as shown below) to make a complete action model.

```ts
// types.d.ts
// example of including `react-router` actions in `RootAction`
import { RouterAction, LocationChangeAction } from 'react-router-redux';
import { TodosAction } from '../features/todos';

type ReactRouterAction = RouterAction | LocationChangeAction;

export type RootAction =
  | ReactRouterAction
  | TodosAction;
```

> **Custom actions (non-standard use-cases)**<br/>
> `createCustomAction` is an additional action creator provided as an escape hatch for non-standard use-cases. In regular project we recommend to always use`createAction`. Custom actions could be useful in cases of integration with other libraries that you want to enhance with superpowers  of `typesafe-actions` static typing.

```ts
import { createCustomAction } from 'typesafe-actions';

const add = createCustomAction(
  'todos/ADD',
  (title: string) => ({ id: cuid(), title, completed: false })
});
// add: (title: string) => { type: "todos/ADD"; id: string; title: string; completed: boolean; }
```

[⇧ back to top](#table-of-contents)

### Reducers

#### Extending internal types to enable type-free syntax with `createReducer`

We can extend internal types of `typesafe-actions` module with `RootAction` definition of our application so that you don't need to pass generic type arguments with `createReducer` API:

```ts
// types.d.ts
import { StateType, ActionType } from 'typesafe-actions';

export type RootAction = ActionType<typeof import('./actions').default>;

declare module 'typesafe-actions' {
  interface Types {
    RootAction: RootAction;
  }
}

// now you can use
createReducer(...)
// instead of
createReducer<State, Action>(...)
```

#### Using createReducer API with type-free syntax

We can prevent a lot of boilerplate code and type errors using this powerfull and completely typesafe API.

Using handleAction chain API:
```ts
// using action-creators
const counterReducer = createReducer(0)
  // state and action type is automatically inferred and return type is validated to be exact type
  .handleAction(add, (state, action) => state + action.payload)
  .handleAction(add, ... // <= error is shown on duplicated or invalid actions
  .handleAction(increment, (state, _) => state + 1)
  .handleAction(... // <= error is shown when all actions are handled
  
  // or handle multiple actions using array
  .handleAction([add, increment], (state, action) =>
    state + (action.type === 'ADD' ? action.payload : 1)
  );

// all the same scenarios are working when using type-constants
const counterReducer = createReducer(0)
  .handleAction('ADD', (state, action) => state + action.payload)
  .handleAction('INCREMENT', (state, _) => state + 1);
  
counterReducer(0, add(4)); // => 4
counterReducer(0, increment()); // => 1
```

#### Alternative usage with regular switch reducer

First we need to start by generating a **discriminated union type** of actions (`TodosAction`). It's very easy to do by using `ActionType` **type-helper**.

```ts
import { ActionType } from 'typesafe-actions';

import * as todos from './actions';
export type TodosAction = ActionType<typeof todos>;
```

Now we define a regular reducer function by annotating `state` and `action` arguments with their respective types (`TodosAction` for action type).

```ts
export default (state: Todo[] = [], action: TodosAction) => {
```

Now in the switch cases we can use the `type` property of action to narrowing the union type of `TodosAction` to an action that is corresponding to that type.

```ts
  switch (action.type) {
    case getType(add):
      // below action type is narrowed to: { type: "todos/ADD"; payload: Todo; }
      return [...state, action.payload];
    ...
```

[⇧ back to top](#table-of-contents)

### Async-Flows

#### With `redux-observable` epics

To handle an async-flow of http request lets implement an `epic`. The `epic` will call a remote API using an injected `todosApi` client, which will return a Promise that we'll need to handle by using three different actions that correspond to triggering, success and failure.

To help us simplify the creation process of necessary action-creators, we'll use `createAsyncAction` function providing us with a nice common interface object `{ request: ... , success: ... , failure: ... }` that will nicely fit with the functional API of `RxJS`.
This will mitigate **redux verbosity** and greatly reduce the maintenance cost of type annotations for **actions** and **action-creators** that would otherwise be written explicitly.

```ts
// actions.ts
import { createAsyncAction } from 'typesafe-actions';

const fetchTodosAsync = createAsyncAction(
  'FETCH_TODOS_REQUEST',
  'FETCH_TODOS_SUCCESS',
  'FETCH_TODOS_FAILURE',
  'FETCH_TODOS_CANCEL'
)<string, Todo[], Error, string>();

// epics.ts
import { fetchTodosAsync } from './actions';

const fetchTodosFlow: Epic<RootAction, RootAction, RootState, Services> = (action$, state$, { todosApi }) =>
  action$.pipe(
    filter(isActionOf(fetchTodosAsync.request)),
    switchMap(action =>
      from(todosApi.getAll(action.payload)).pipe(
        map(fetchTodosAsync.success),
        catchError((message: string) => of(fetchTodosAsync.failure(message))),
        takeUntil(action$.pipe(filter(isActionOf(fetchTodosAsync.cancel)))),
      )
    );
```

#### With `redux-saga` sagas
With sagas it's not possible to achieve the same degree of type-safety as with epics because of limitations coming from `redux-saga` API design.

Typescript issues:
- [Typescript does not currently infer types resulting from a `yield` statement](https://github.com/Microsoft/TypeScript/issues/2983) so you have to manually assert the type  e.g. `const response: Todo[] = yield call(...`

*Here is the latest recommendation although it's not fully optimal. If you managed to cook something better, please open an issue to share your finding with us.*

```ts
import { createAsyncAction, createReducer } from 'typesafe-actions';
import { put, call, takeEvery } from 'redux-saga/effetcs';

// Create the set of async actions
const fetchTodosAsync = createAsyncAction(
  'FETCH_TODOS_REQUEST',
  'FETCH_TODOS_SUCCESS',
  'FETCH_TODOS_FAILURE'
)<string, Todo[], Error>();

// Handle request saga
function* addTodoSaga(action: ReturnType<typeof fetchTodosAsync.request>): Generator {
  try {
    const response: Todo[] = yield call(todosApi.getAll, action.payload);

    yield put(fetchTodosAsync.success(response));
  } catch (err) {
    yield put(fetchTodosAsync.failure(err));
  }
}

// Main saga
function* mainSaga() {
    yield all([
        takeEvery(fetchTodosAsync.request, addTodoSaga),
    ]);
}

// Handle success reducer
export const todoReducer = createReducer({})
    .handleAction(fetchTodosAsync.success, (state, action) => ({ ...state, todos: action.payload }));
```

[⇧ back to top](#table-of-contents)

---

## API Docs

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

_Create an enhanced action-creator compatible with [Flux Standard Action](https://github.com/redux-utilities/flux-standard-action) to reduce boilerplate and enforce common convention._
- Resulting action-creator have predefined arguments `(payload, meta)`
- Actions have predefined properties `({ type, payload, meta, error })`
- Alternatively accepts payload and meta creator functions similarly to `redux-actions`

```ts
createStandardAction(type)()
createStandardAction(type)<TPayload, TMeta?>()
createStandardAction(type, payloadCreator, metaCreator)<TPayload, TMeta>()
```

> **TIP**: Use `undefined` or `void` as generic type parameter to make the action-creator function require NO parameters.

Examples:
[> Advanced Usage Examples](src/create-standard-action.spec.ts)

```ts
import { createAction } from 'typesafe-actions';

// Very concise with use of generic type arguments
// - with type only
const increment = createAction('INCREMENT')(); // or
const increment = createAction('INCREMENT')<undefined>();
increment(); // { type: 'INCREMENT' } (no parameters are required)

// - with type and payload
const add = createAction('ADD')<number>();
add(10); // { type: 'ADD', payload: number }

// - with type and meta
const getData = createAction('GET_DATA')<undefined, string>();
getData(undefined, 'meta'); // { type: 'GET_DATA', meta: string }

// - with type, payload and meta
const getData = createAction('GET_DATA')<number, string>();
getData(1, 'meta'); // { type: 'GET_DATA', payload: number, meta: string }

// - with payload & meta creators 
const notify = createAction(
  'NOTIFY',
  (payload: string, meta: Meta) => payload,
  (payload: string, meta: Meta) => ({
    from: meta.username,
    messageType: meta.type,
    datetime: new Date(),
  })
);

dispatch(notify('Hello!', { username: 'Piotr', type: 'announcement' }));
// { type: 'NOTIFY', payload: string, meta: { from: string, messageType: MessageType, datetime: Date } }
```

[⇧ back to top](#table-of-contents)

#### `createCustomAction`

_Create an enhanced action-creator with custom arguments and custom properties on actions._
- Resulting action-creator will preserve semantic names of their arguments  `(id, title, amount, ...)`.
- Actions can have custom properties `({ customProp1, customProp2, ...customPropN })`

```ts
createCustomAction(
  type,
  (namedArg1, namedArg2, ...namedArgN) => ({ customProp1, customProp2, ...customPropN })
)
```

Examples:
[> Advanced Usage Examples](src/create-action-with-type.spec.ts)

```ts
import { createCustomAction } from 'typesafe-actions';

const add = createCustomAction(
  'CUSTOM',
  (first: number, second: number) => ({ customProp1: first, customProp2: second });
});

dispatch(add(1));
// { type: "CUSTOM"; customProp1: number; customProp2: number; }
```

[⇧ back to top](#table-of-contents)

#### `createAsyncAction`

_Create an instance of object with action-creators methods to simplify handling of async flows (e.g. network request - request/success/failure)._

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

1) Handling Async Request, Success and Failure
```ts
import { createAsyncAction, AsyncActionCreator } from 'typesafe-actions';

const fetchUsersAsync = createAsyncAction(
  'FETCH_USERS_REQUEST',
  'FETCH_USERS_SUCCESS',
  'FETCH_USERS_FAILURE'
)<string, User[], Error>();

dispatch(
  fetchUsersAsync.request(params)
);

dispatch(
  fetchUsersAsync.success(response)
);

dispatch(
  fetchUsersAsync.failure(err)
);

// This is how you can declare argument type in a function
const fn = (
  a: AsyncActionCreator<
    ['FETCH_USERS_REQUEST', string],
    ['FETCH_USERS_SUCCESS', User[]],
    ['FETCH_USERS_FAILURE', Error]
  >
) => { ... };

fn(fetchUsersAsync);
```

2) With optional Cancel
```ts
import { createAsyncAction, AsyncActionCreator } from 'typesafe-actions';

const fetchUsersAsync = createAsyncAction(
  'FETCH_USERS_REQUEST',
  'FETCH_USERS_SUCCESS',
  'FETCH_USERS_FAILURE'
  'FETCH_USERS_CANCEL'
)<string, User[], Error, string>();

dispatch(
  fetchUsersAsync.cancel('reason')
);

// This is how you can declare argument type in a function
const fn = (
  a: AsyncActionCreator<
    ['FETCH_USERS_REQUEST', string],
    ['FETCH_USERS_SUCCESS', User[]],
    ['FETCH_USERS_FAILURE', Error],
    ['FETCH_USERS_CANCEL', string]
  >
) => { ... };

fn(fetchUsersAsync);
```

3) With Meta
```ts
const fetchUsersAsync = createAsyncAction(
  'FETCH_USERS_REQUEST',
  'FETCH_USERS_SUCCESS',
  'FETCH_USERS_FAILURE'
)<[undefined, number], User[], [Error, number]>();

dispatch(
  fetchUsersAsync.request(undefined, 111)
);

dispatch(
  fetchUsersAsync.success([{ firstName: 'Piotr', lastName: 'Witek' }])
);

dispatch(
  fetchUsersAsync.failure(Error('reason') ,111)
);

// This is how you can declare argument type in a function
const fn = (
  a: AsyncActionCreatorBuilder<
    ['FETCH_USERS_REQUEST', [undefined, number]],
    ['FETCH_USERS_SUCCESS', User[]],
    ['FETCH_USERS_FAILURE', [Error, number]]
  >
) => { ... };

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
import { getType, createAction } from 'typesafe-actions';

const add = createAction('ADD')<number>();

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

// With RxJS filter or any other filter function (lodash, ramda, etc.)
// - single action
actions$
  .filter(isActionOf(addTodo)) // only actions with type `ADD` will pass
  .map((action) => {
    // action type is { type: "todos/ADD"; payload: Todo; }
    ...
    
// - multiple actions
actions$
  .filter(isActionOf([addTodo, removeTodo])) // only actions with type `ADD` or 'REMOVE' will pass
  .do((action) => {
    // action type is { type: "todos/ADD"; payload: Todo; } | { type: "todos/REMOVE"; payload: Todo; }
    ...
      
// With conditional statements
// - single action
if(isActionOf(addTodo, action)) {
  return action.payload;
  // action type is { type: "todos/ADD"; payload: Todo; }
}
// - multiple actions
if(isActionOf([addTodo, removeTodo], action)) {
  return action.payload;
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

// With RxJS filter or any other filter function (lodash, ramda, etc.)
// - single action
actions$
  .filter(isOfType(ADD)) // only actions with type `ADD` will pass
  .map((action) => {
    // action type is { type: "todos/ADD"; payload: Todo; }
    ...
    
// - multiple actions
actions$
  .filter(isOfType([ADD, REMOVE])) // only actions with type `ADD` or 'REMOVE' will pass
  .do((action) => {
    // action type is { type: "todos/ADD"; payload: Todo; } | { type: "todos/REMOVE"; payload: Todo; }
    ...
      
// With conditional statements
// - single action
if(isOfType(ADD, action)) {
  return action.payload;
  // action type is { type: "todos/ADD"; payload: Todo; }
}
// - multiple actions
if(isOfType([ADD, REMOVE], action)) {
  return action.payload;
  // action type is { type: "todos/ADD"; payload: Todo; } | { type: "todos/REMOVE"; payload: Todo; }
}
```

[⇧ back to top](#table-of-contents)

---

### Type-Helpers API
Below helpers are utility-types for common cases, that will help greatly simplify your type declarations needed by Redux.

#### `ActionType`

_Type-helper to infer `Action` type from **action-creators implementation**._

```ts
// actions.ts
export const action1 = createAction('action1');
export const action2 = createAction('action2');
export const action3 = createAction('action3');

// root-action.ts
import { ActionType } from 'typesafe-actions';
import * as actions from './actions';

export type RootAction = ActionType<typeof todos>;
// { type: 'action1' } | { type: 'action2' } | { type: 'action3' }
```

It also work with nested actions map object
```ts
import { ActionType, createAction } from 'typesafe-actions';

const actions = {
  action1: createAction('action1'),
  nested: {
    action2: createAction('action2'),
    deeplyNested: {
      action3: createAction('action3'),
    },
  },
};

export type RootAction = ActionType<typeof actions>;
// { type: 'action1' } | { type: 'action2' } | { type: 'action3' }
```

[⇧ back to top](#table-of-contents)

#### `StateType`

_Type helper to infer `State` type from **reducer implementation**._

> **WARNING**: require redux@4.x.x+ types

1) Get State from reducer function
```ts
import { StateType } from 'typesafe-actions';

const todosReducer = (state: Todo[] = [], action: TodosAction) => {
  switch (action.type) {
    case getType(todos.add):
      return [...state, action.payload];
    
    default:
      return state;
  }
}

export type TodosState = StateType<typeof todosReducer>;
```

2) Get State from combined reducers
```ts
import { StateType } from 'typesafe-actions';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  router: routerReducer,
  counters: countersReducer,
});

export type RootState = StateType<typeof rootReducer>;
```

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

The core idea was to design an API that would mostly use the power of TypeScript **type-inference** 💪 to lift the "maintainability burden" of type annotations. In addition, I wanted to make it "look and feel" as close as possible to the idiomatic JavaScript ❤️ , so we don't have to write the redundant type annotations that which will create additional noise in your code.

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

[type-inference]: https://www.typescriptlang.org/docs/handbook/type-inference.html
[control-flow-analysis]: https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-0.html#control-flow-based-type-analysis
[string-literal-types]: https://www.typescriptlang.org/docs/handbook/advanced-types.html#string-literal-types
[discriminated-unions]: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
[type-guards]: http://www.typescriptlang.org/docs/handbook/advanced-types.html#type-guards-and-differentiating-types
[generics]: https://www.typescriptlang.org/docs/handbook/generics.html

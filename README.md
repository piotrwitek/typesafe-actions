# typesafe-actions

[![Build Status](https://semaphoreci.com/api/v1/piotrekwitek/typesafe-actions/branches/big-project-update-v3/shields_badge.svg)](https://semaphoreci.com/piotrekwitek/typesafe-actions)
[![Latest Stable Version](https://img.shields.io/npm/v/typesafe-actions.svg)](https://www.npmjs.com/package/typesafe-actions)
[![Bundlephobia Size](https://img.shields.io/bundlephobia/minzip/typesafe-actions.svg)](https://www.npmjs.com/package/typesafe-actions)
[![License](https://img.shields.io/npm/l/typesafe-actions.svg?style=flat)](https://david-dm.org/piotrwitek/typesafe-actions?type=peer)

[![NPM Downloads](https://img.shields.io/npm/dm/typesafe-actions.svg)](https://www.npmjs.com/package/typesafe-actions)
[![dependencies Status](https://david-dm.org/piotrwitek/typesafe-actions/status.svg)](https://david-dm.org/piotrwitek/typesafe-actions)
[![peerDependencies Status](https://david-dm.org/piotrwitek/typesafe-actions/peer-status.svg)](https://david-dm.org/piotrwitek/typesafe-actions?type=peer)

## Typesafe "Action Creators" for Redux / Flux Architectures (in TypeScript)
Flexible functional API that's specifically designed to reduce types **verbosity** (maintainability concerns)
and **complexity** (thanks to powerful helpers).

> #### :star: _Found it useful? Want more updates?_ [**Show your support by giving a :star:**](https://github.com/piotrwitek/typesafe-actions/stargazers)  

> :book: _This lib is an integral part of [React & Redux TypeScript Guide](https://github.com/piotrwitek/react-redux-typescript-guide)_ :book:  

> :computer: _Reference implementation of Todo-App with `typesafe-actions` on [CodeSandbox](https://codesandbox.io/s/github/piotrwitek/typesafe-actions/tree/master/examples/starter)_ :computer:  

> :tada: _Now updated to be compatible with **TypeScript v3.2.2**_ :tada:  

### Features

* __minimalistic__ - according to `rollup-plugin-filesize` (Bundle size: 2.6 KB, Gzipped size: 808 B) check also on [bundlephobia](https://bundlephobia.com/result?p=typesafe-actions)
* __secure and optimized__ - no external dependencies with 3 different bundle types (`cjs`, `esm` and `umd` for browser)
* __focus on quality__ - complete test-suite for an entire API surface with regular runtime tests and extra tests to guarantee **type soundness**

## Contributing Guide
If you're planning to contribute please make sure to read the contributing guide: [CONTRIBUTING.md](/CONTRIBUTING.md)

## Bug Report CodeSandbox
You can use this CodeSandbox to reproduce bug reports: https://codesandbox.io/s/github/piotrwitek/typesafe-actions/tree/master/examples/starter

## Sponsor
If you like what we're doing here, you can help us by funding the work on specific issues that you choose by using IssueHunt.io!

This gives you the power to prioritize our work and support project contributors. Moreover it'll guarantee the project will be updated and maintained in the long run.

> I keep sponsor anonymity by default but if you'd like your brand to be featured in this repo, please contact me at: piotrek.witek@gmail.com

[![issuehunt-image](https://github.com/BoostIO/issuehunt-materials/blob/master/issuehunt-badge@1x.png?raw=true)](https://issuehunt.io/repos/110746954)

---

## Table of Contents

* [Installation](#installation)
* [Compatibility Notes](#compatibility-notes)
* [Motivation](#motivation)
* [Behold the Mighty "Tutorial"](#behold-the-mighty-"tutorial")
* [API Docs](#api-docs)
  * utility-types
    * [`ActionType`](#actiontype) (RootAction type-helper)
    * [`StateType`](#statetype) (RootState type-helper)
  * action-creators
    * [`action`](#action)
    * [`createAction`](#createaction)
    * [`createStandardAction`](#createstandardaction)
    * [`createAsyncAction`](#createasyncaction)
    * [`createActionWithType`](#withtype)
  * action-helpers
    * [`getType`](#gettype)
    * [`isActionOf`](#isactionof)
    * [`isOfType`](#isoftype)
* [Migration Guides](#migration-guides)
  * [v1.x.x to v2.x.x](#v1xx-to-v2xx)
  * [Migrating from redux-actions](#migrating-from-redux-actions)
* [Compare to others](#compare-to-others)
  * [redux-actions](#redux-actions)

---

## Installation

```bash
// NPM
npm install typesafe-actions

// YARN
yarn add typesafe-actions
```

[⇧ back to top](#table-of-contents)

---

## Compatibility Notes

### TypeScript support
* `typesafe-actions@1.X.X` - minimal TS v2.7
* `typesafe-actions@2.X.X` - minimal TS v2.9
* `typesafe-actions@3.X.X` - minimal TS v3.0

### Browser Polyfills
If you support older browsers (e.g. IE < 11) and mobile devices please provide this polyfill:
- [Object.assign](https://developer.mozilla.org/pl/docs/Web/JavaScript/Referencje/Obiekty/Object/assign#Polyfill)

You could also consider including a global polyfill in your bundled application, such as core-js or babel-polyfill.
You can check `React` guidelines on how to do that specifically: https://reactjs.org/docs/javascript-environment-requirements.html

[⇧ back to top](#table-of-contents)

---

## Motivation

When I was starting to use type-safe Redux with TypeScript I was trying to use [redux-actions](https://redux-actions.js.org/) to simplify maintainability of **action-creators**. Unfortunately the results were intimidating: incorrect type signatures and broken type-inference cascading throughout the entire code-base [(read more detailed comparison)](#redux-actions).

Existing alternative solutions in the wild have been either **too verbose because of redundant type annotations** (maintainability concern) or **used classes** (hinders readability and enforce to use a **new** keyword 😱)

**I created `typesafe-actions` to solve all of the above pain points.**

The core idea was to design an API that would harness the power of TypeScript incredible **type-inference** 💪 to lift the "maintainability burden" of type annotations. In addition I wanted to make it "look and feel" as close as possible to idiomatic JavaScript we all know and love ❤️

[⇧ back to top](#table-of-contents)

---

## Behold the Mighty "Tutorial"

To showcase flexibility and the power of **type-safety** provided by this library, let's build together the common parts of a typical todo-app following Redux architecture:

> **WARNING:** Please make sure that you understand the following concepts of programming languages to be able to follow along with me: [Type Inference](https://www.typescriptlang.org/docs/handbook/type-inference.html), [Control flow analysis](https://github.com/Microsoft/TypeScript/wiki/What%27s-new-in-TypeScript#control-flow-based-type-analysis), [Tagged union types](https://github.com/Microsoft/TypeScript/wiki/What%27s-new-in-TypeScript#tagged-union-types), [Generics](https://www.typescriptlang.org/docs/handbook/generics.html) and some [Advanced Types](https://www.typescriptlang.org/docs/handbook/advanced-types.html).

[⇧ back to top](#table-of-contents)

### - The Actions

Different projects have different needs and conventions vary across teams this is why `typesafe-actions` was designed and built with flexibility in mind. It provides 3 different factory functions so you can choose what would be the best fit for your project.

> **PRO-TIP: string constants limitation in TypeScript** - when using *string constants* as action `type` property, please make sure to only use **const string literals** because **dynamic string operations** (like string concatenation, template strings, object used as dictionary etc.) will widen literal type to it's supertype `string`. This will break contextual typing in reducer cases.

```ts
// Example file: './constants.ts'

// WARNING: Incorrect usage
export const ADD = prefix + 'ADD'; // => string
export const ADD = `${prefix}/ADD`; // => string
export default {
   ADD: '@prefix/ADD', // => string
}

// Correct usage
export const ADD = '@prefix/ADD'; // => '@prefix/ADD'
export const TOGGLE = '@prefix/TOGGLE'; // => '@prefix/TOGGLE'
```

#### 1. Classic JS style with constants FTW!
Using this simple function we'll have complete type-safety with minimal type declaration effort, but we're constrained to use constants (as in regular JS applications) because some of advanced **action-helpers** (`getType`, `isActionOf`) will not work with such action-creator. This is still a very compelling option, especially for refactoring existing projects.

```ts
import { action } from 'typesafe-actions';

import { ADD, TOGGLE } from './constants';

export const toggle = (id: string) => action(TOGGLE, id);
// (id: string) => { type: 'todos/TOGGLE'; payload: string; }

export const add = (title: string) => action(ADD, { title, id: cuid(), completed: false } as Todo);
// (title: string) => { type: 'todos/ADD'; payload: Todo; }
```

#### 2. Opinionated without need for constants
This approach will give us access for all the **action-helpers** and eliminate the use of constants, but it's opinionated and will always accept 2 arguments (1st is payload, and 2nd is meta). It also has a very useful `map` chain method for extra flexibility.
```ts
import { createStandardAction } from 'typesafe-actions';

export const toggle = createStandardAction('todos/TOGGLE')<string>();
// (payload: string) => { type: 'todos/TOGGLE'; payload: string; }

export const add = createStandardAction(ADD).map(
  ({ title }: { title: string }) => ({
    payload: { title, id: cuid(), completed: false } as Todo,
  })
);
// ({ title: string }) => { type: 'todos/ADD'; payload: Todo; }
```
#### 3. Most flexible with all helpers
This approach will gives us the best of both worlds: all the **action-helpers** will work and we have the flexibility of providing variadic amount of named parameters like with regular functions.
```ts
import { createAction } from 'typesafe-actions';

export const toggle = createAction('todos/TOGGLE', resolve => {
  return (id: string) => resolve(id);
});
// (id: string) => { type: 'todos/TOGGLE'; payload: string; }

export const add = createAction('todos/ADD', resolve => {
  return (title: string) => resolve({ title, id: cuid(), completed: false } as Todo);
});
// (title: string) => { type: 'todos/ADD'; payload: Todo; }
```

> For more examples check the [API Docs](#table-of-contents), there are plenty!

[⇧ back to top](#table-of-contents)

### - The Reducer

Here we'll start by generating a **tagged union type** of actions (TodosAction). It's very easy to do using TS type-inference and `ActionType` utility-type provided by `typesafe-actions`.
```ts
import { ActionType, getType } from 'typesafe-actions';

import * as todos from './actions';
export type TodosAction = ActionType<typeof todos>;
```
Now we define a regular reducer function by annotating `state` and `action` arguments with their respective types (use `TodosAction` for action type)
```ts
export default (state: Todo[] = [], action: TodosAction) => {
```
With static types in place we can finally leverage **tagged union types**. Using switch-cases on the common `type` property of action, we can distinguish and narrow the type of `TodosAction` to a single specific action type valid for the corresponding code block.
```ts
  switch (action.type) {
    case getType(todos.add): 
      // below action type is narrowed to: { type: "todos/ADD"; payload: Todo; }
      return [...state, action.payload];
    ...
```
Notice we are using `getType` action-helper with the respective action-creator as an argument for the corresponding switch case. This will help to reduce boilerplate and completely remove the need to use **type-constants** in our application.
> Note: If your team prefers to use regular "type constants", no problem. You can still use them with `typesafe-actions`.

> **PRO-TIP:** I recommend to create a `RootAction` in the central point of your redux store - it will model a complete representation of all possible action types in your application. You can even merge it with existing third-party declarations as shown below.
```ts
// types.d.ts
// example of including `react-router` actions in `RootAction`
import { RouterAction, LocationChangeAction } from 'react-router-redux';
type ReactRouterAction = RouterAction | LocationChangeAction;
import { TodosAction } from '../features/todos';

export type RootAction =
  | ReactRouterAction
  | TodosAction;
```

[⇧ back to top](#table-of-contents)

### - The Async-Flow
> Starring `redux-observable` epics

To handle async-flow of request to a remote resources, we'll implement an `epic`. The `epic` will call a remote API using an injected `todosApi` client and then return a Promise.
To help us simplify the creation process of necessary action-creators, we'll use `createAsyncAction` function providing us with a nice common interface `{ request: ... , success: ... , failure: ... }` that will nicely fit with the functional API of `RxJS`.
This will mitigate **redux verbosity** and greatly reduce the maintenance cost of type annotations for actions objects and action-creators that would otherwise be written by hand.

```ts
// actions.ts
import { createAsyncAction } from 'typesafe-actions';

const fetchTodos = createAsyncAction(
  'FETCH_TODOS_REQUEST',
  'FETCH_TODOS_SUCCESS',
  'FETCH_TODOS_FAILURE'
)<void, Todo[], Error>();

// epics.ts
import { fetchTodos } from './actions';

const fetchTodosFlow: Epic<RootAction, RootAction, RootState, Services> = (action$, store, { todosApi }) =>
  action$.pipe(
    filter(isActionOf(fetchTodos.request)),
    switchMap(action =>
      from(todosApi.getAll(...)).pipe(
        map(fetchTodos.success),
        catchError(pipe(fetchTodos.failure, of))
      )
    );
```

[⇧ back to top](#table-of-contents)

### - The Side-Effects
> Starring `redux-observable` epics

To showcase handling of various side-effects in our application we'll implement an `epic` responsible of showing a notification when the user adds a new todo.
In the **async-flow** section above we have already seen the usage of the `isActionOf` function. We used it to help us filter actions coming from the source stream using **action-creators** as an argument. It's also a **type-guard** so it'll narrow **tagged union type** of all actions (here we're using `RootAction`) to a specific action down the pipe in epics.
```ts
// epics.ts
import { isActionOf } from 'typesafe-actions';

import { add, toggle } from './actions';

const addTodoToast: Epic<RootAction, RootAction, RootState, Services> = (action$, store, { toastService }) =>
  action$.pipe(
    filter(isActionOf(add)),
    tap(action => { // here action type is narrowed to: { type: "todos/ADD"; payload: Todo; }
      toastService.success(...);
    })
    ...
```

> **PRO-TIP:** It also works with multiple actions as an array argument
```ts
  action$.pipe(
    filter(isActionOf([add, toggle])) // here action type is narrowed to a smaller union:
    // { type: "todos/ADD"; payload: Todo; } | { type: "todos/TOGGLE"; payload: string; }
```

**ALTERNATIVE:** If your team prefers to use **type-constants**, I still got you covered! We have an equivalent `isOfType` function that will work with **type-constants** instead of action-creators.
```ts
// epics.ts
import { isOfType } from 'typesafe-actions';

import { ADD } from './constants';

const addTodoToast: Epic<RootAction, RootAction, RootState, Services> = (action$, store, { toastService }) =>
  action$.pipe(
    filter(isTypeOf(ADD)),
    tap(action => { // here action type is narrowed to: { type: "todos/ADD"; payload: Todo; }
    ...
```

> **PRO-TIP:** Both helpers above prove useful in all conditional statements
```ts
import { isActionOf, isOfType } from 'typesafe-actions';

if (isActionOf(actions.add, action)) {
  // here action is narrowed to: { type: "todos/ADD"; payload: Todo; }
}
// or with type constants
if (isOfType(types.ADD, action)) {
  // here action is narrowed to: { type: "todos/ADD"; payload: Todo; }
}
```

> _PS: If you're wondering what the `Services` type is in the epics signature and how to declare it in your application to easily inject statically typed API clients to your epics also ensuring for easy mocking while testing resulting in clean architecture, please create an issue for it and perhaps I'll find some time in the future to write an article about it._

[⇧ back to top](#table-of-contents)

---

## API Docs

### ActionType

> powerful type helper that will infer union type from "action-creator map" object or "module import"

_NB: This helper works similar to `ReturnType` but instead of function type paramerer it will accept "typeof action-creators" (it can be "import *" from module or "action-creators map")_

```ts
import { ActionType } from 'typesafe-actions';

import * as todos from './actions';
export type TodosAction = ActionType<typeof todos>;


const actions = {
  action1: createAction('action1'),
  nested: {
    action2: createAction('action2'),
    moreNested: {
      action3: createAction('action3'),
    }
  }
};
export type RootAction = ActionType<typeof actions>;
// RootAction: { type: 'action1' } | { type: 'action2' } | { type: 'action3' }
```

[⇧ back to top](#table-of-contents)

---

### StateType

> powerful type helper that will infer state object type from "reducer function" or "nested/combined reducers"


_NB: This helper works similar to `ReturnType` but instead of function type paramerer it will accept "typeof reducer" or "nested/combined reducers map" (result of `combineReducers`)_

> _Redux Combatibility: working with redux@4+ types_

```ts
import { combineReducers } from 'redux';
import { StateType } from 'typesafe-actions';

// 
const todosReducer = (state: Todo[] = [], action: TodosAction) => {
  switch (action.type) {
    case getType(todos.add):
      return [...state, action.payload];
    ...
export type TodosState = StateType<typeof todosReducer>;

const rootReducer = combineReducers({
  router: routerReducer,
  counters: countersReducer,
});
export type RootState = StateType<typeof rootReducer>;
```

[⇧ back to top](#table-of-contents)

---

### action

> simple action factory function, to create typed action

**Warning**: this action creator does not let you use action helpers such as `getType` and `isActionOf`

```ts
function action(type: T, payload?: P, meta?: M): { type: T, payload?: P, meta?: M }
```

Examples:
[> Advanced Usage Examples](src/action.spec.ts)

```ts
// type with payload
const createUser = (id: number, name: string) =>
  action('CREATE_USER', { id, name });
// { type: 'CREATE_USER'; payload: { id: number; name: string }; }

// type with meta
const getUsers = (meta: string) =>
  action('GET_USERS', undefined, meta);
// { type: 'GET_USERS'; meta: string; }
```

[⇧ back to top](#table-of-contents)

---

### createAction

> create custom action-creator using constructor function with injected resolver callback

```ts
// type only
function createAction(type: T): () => { type: T };
// createAction('INCREMENT');

// type with payload
function createAction(type: T, executor): (...args) => { type: T, payload: P };
const executor = (resolve) => (...args) => resolve(payload: P)
// createAction('ADD', resolve => {
//   return (amount: number) => resolve(amount);
// });

// type with meta
function createAction(type: T, executor): (...args) => { type: T, meta: M };
const executor = (resolve) => (...args) => resolve(payload: undefined, meta: M)
// createAction('ADD', resolve => {
//   return (meta: string) => resolve(undefined, meta);
// });

// type with payload and meta
function createAction(type: T, executor): (...args) => { type: T, payload: P, meta: M };
const executor = (resolve) => (...args) => resolve(payload: P, meta: M)
// createAction('GET_TODO', resolve => {
//   return (id: string, meta: string) => resolve(id, meta);
// });
```

Examples:
[> Advanced Usage Examples](src/create-action.spec.ts)

```ts
import { createAction } from 'typesafe-actions';

// type only
const increment = createAction('INCREMENT');
expect(increment())
  .toEqual({ type: 'INCREMENT' });

// type with payload
const add = createAction('ADD', resolve => {
  return (amount: number) => resolve(amount);
});
expect(add(10))
  .toEqual({ type: 'ADD', payload: 10 });

// type with meta
const getTodos = createAction('GET_TODOS', resolve => {
  return (meta: string) => resolve(undefined, meta);
});
expect(getTodos('some_meta'))
  .toEqual({ type: 'GET_TODOS', meta: 'some_meta' });

// type with payload and meta
const getTodo = createAction('GET_TODO', resolve => {
  return (id: string, meta: string) => resolve(id, meta);
});
expect(getTodo('some_id', 'some_meta'))
  .toEqual({ type: 'GET_TODO', payload: 'some_id', meta: 'some_meta' });
```

[⇧ back to top](#table-of-contents)

---

### createStandardAction

> create action-creator that will create "Flux Standard Action" compatible actions to reduce boilerplate and enforce convention

```ts
function createStandardAction(type: T): <P, M>() => (payload: P, meta: M) => { type: T, payload: P, meta: M };
function createStandardAction(type: T): { map: (payload: P, meta: M): { ...anything } => (...args) => { type: T, ...anything } };
```

Examples:
[> Advanced Usage Examples](src/create-standard-action.spec.ts)

```ts
import { createStandardAction } from 'typesafe-actions';

// type only
const increment = createStandardAction('INCREMENT')<void>();
expect(increment()).toEqual({ type: 'INCREMENT' });

// type with payload
const add = createStandardAction('ADD')<number>();
expect(add(10)).toEqual({ type: 'ADD', payload: 10 });

// type with meta
const getData = createStandardAction('GET_DATA')<void, string>();
expect(getData(undefined, 'meta')).toEqual({ type: 'GET_DATA', meta: 'meta' });

// type with payload and meta
const notify = createStandardAction('NOTIFY').map(
  ({ username, message }}: Notification) => ({
    payload: `${username}: ${message || ''}`,
    meta: { username, message }, 
  })
);
expect(notify({ username: 'Piotr', message: 'Hello!' })).toEqual({
  type: 'NOTIFY',
  payload: 'Piotr: Hello!',
  meta: { username: 'Piotr', message: 'Hello!' },
});
```

[⇧ back to top](#table-of-contents)

---

### createAsyncAction

> create a composite action-creator containing three action handlers for async flow (e.g. network request - request/success/failure)

```ts
function createAsyncAction(requestType: T1, successType: T2, failureType: T3): <P1, P2, P3>() => {
  request: AC<T1, P1>,
  success: AC<T2, P2>,
  failure: AC<T3, P3>,
};
```

Examples:
[> Advanced Usage Examples](src/create-async-action.spec.ts)

```ts
import { createAsyncAction } from 'typesafe-actions';

const fetchUsers = createAsyncAction(
  'FETCH_USERS_REQUEST',
  'FETCH_USERS_SUCCESS',
  'FETCH_USERS_FAILURE'
)<void, User[], Error>();

const requestResult = fetchUsers.request();
expect(requestResult).toEqual({
  type: 'FETCH_USERS_REQUEST',
});

const successResult = fetchUsers.success([{ firstName: 'Piotr', lastName: 'Witek' }]);
expect(successResult).toEqual({
  type: 'FETCH_USERS_SUCCESS',
  payload: [{ firstName: 'Piotr', lastName: 'Witek' }],
});

const failureResult = fetchUsers.failure(Error('Failure reason'));
expect(failureResult).toEqual({
  type: 'FETCH_USERS_FAILURE',
  payload: Error('Failure reason'),
});
```

[⇧ back to top](#table-of-contents)

### createActionWithType

> create custom action-creator using constructor function with injected type

```ts
createActionWithType(type, constructorFunction): 
```

Examples:
[> Advanced Usage Examples](src/create-action-with-type.spec.ts)

```ts
import { createActionWithType } from 'typesafe-actions';

it('with payload', () => {
    const add = createActionWithType('WITH_MAPPED_PAYLOAD', type => {
      return (amount: number) => ({ type, payload: amount });
    });
    const actual: {
      type: 'WITH_MAPPED_PAYLOAD';
      payload: number;
    } = add(1);
    expect(actual).toEqual({ type: 'WITH_MAPPED_PAYLOAD', payload: 1 });
  });

it('with optional payload', () => {
  const create = createActionWithType('WITH_OPTIONAL_PAYLOAD', type => {
    return (id?: number) => ({ type, payload: id });
  });
  const actual1: {
    type: 'WITH_OPTIONAL_PAYLOAD';
    payload: number | undefined;
  } = create();
  expect(actual1).toEqual({
    type: 'WITH_OPTIONAL_PAYLOAD',
    payload: undefined,
  });
  const actual2: {
    type: 'WITH_OPTIONAL_PAYLOAD';
    payload: number | undefined;
  } = create(1);
  expect(actual2).toEqual({ type: 'WITH_OPTIONAL_PAYLOAD', payload: 1 });
});
```

[⇧ back to top](#table-of-contents)

---

### getType

> get the "type" property of a given action-creator  
> contains properly narrowed literal type


**NOTE**: ActionCreator type is generated from the `createAction` API. Simple [action](#action) creators throw a `RuntimeError`


```ts
function getType(actionCreator: ActionCreator<T>): T
```

[> Advanced Usage Examples](src/get-type.spec.ts)

Examples:
```ts
const increment = createAction('INCREMENT');
const type: 'INCREMENT' = getType(increment);
expect(type).toBe('INCREMENT');

// in reducer
switch (action.type) {
  case getType(increment):
    return state + 1;

  default:
    return state;
}
```

[⇧ back to top](#table-of-contents)

---

### isActionOf

> (curried assert function) check if action is an instance of given action-creator(s)
> it will narrow actions union to a specific action


**NOTE**: ActionCreator type is generated from the `createAction` API. Simple [action](#action) creators throw a `RuntimeError`

```ts
// can be used as a binary function
isActionOf(actionCreator: ActionCreator<T>, action: any): action is T
isActionOf([actionCreator]: Array<ActionCreator<T>>, action: any): action is T
// or curried function
isActionOf(actionCreator: ActionCreator<T>): (action: any) => action is T
isActionOf([actionCreator]: Array<ActionCreator<T>>): (action: any) => action is T
```

Examples:
[> Advanced Usage Examples](src/is-action-of.spec.ts)

```ts
import { addTodo } from './todos-actions';

const addTodoToast: Epic<RootAction, RootAction, RootState> =
  (action$, store) => action$
    .filter(isActionOf(addTodo))
    .concatMap((action) => { // action is asserted as: { type: "ADD_TODO"; payload: string; }
      const toast = `Added new todo: ${action.payload}`;

// epics with multiple actions
import { addTodo, toggleTodo } from './todos-actions';

const logTodoAction: Epic<RootAction, RootAction, RootState> =
  (action$, store) => action$
    .filter(isActionOf([addTodo, toggleTodo]))
    .concatMap((action) => { // action is asserted as: { type: "ADD_TODO"; payload: string; } | { type: "TOGGLE_TODO"; payload: string; }
      const log = `Dispatched action: ${action.type}`;

// conditionals where you need a type guard
import { addTodo } from './actions';

if(isActionOf(addTodo, action)) {
  operationThatNeedsPayload(action.payload) // action is asserted as: { type: "ADD_TODO"; payload: string; }
}
```

[⇧ back to top](#table-of-contents)

---

### isOfType

> (curried assert function) check if action type is equal given type-constant
> it will narrow actions union to a specific action

```ts
// can be used as a binary function
isOfType(type: T, action: any): action is Action<T>
// or curried function
isOfType(type: T): (action: any) => action is T
// it also accepts an array of types to check against
isOfType(type: T[], action: any): action is Action<T>
// and also works as curried function
isOfType(type: T[]): (action: any) => action is T
```

Examples:
[> Advanced Usage Examples](src/is-of-type.spec.ts)

```ts
import { ADD } from './todos-types';

const addTodoToast: Epic<RootAction, RootAction, RootState, Services> =
  (action$, store, { toastService }) => action$
    .filter(isOfType(ADD))
    .do((action) => {
      // action is narrowed as: { type: "todos/ADD"; payload: Todo; }
      toastService.success(`Added new todo: ${action.payload}`);
    })
    .ignoreElements();
// Filter against array of actions
import { ADD, REMOVE } from './todos-types';

const addOrRemove: Epic<RootAction, RootState, Services> =
  (action$, store, { toastService }) => action$
    .filter(isOfType([ADD, REMOVE]))
    .do((action) => {
      // action is narrowed as: { type: "todos/ADD"; payload: Todo; } | { type: "todos/REMOVE"; payload: Todo; }
      toastService.update(action.payload);
    })
    .ignoreElements();

// conditionals where you need a type guard
import { ADD } from './todos-types';

if(isOfType(ADD, action)) {
  return functionThatAcceptsTodo(action.payload) // action: { type: "todos/ADD"; payload: Todo; }
}
// or

if(isOfType([ADD, REMOVE], action)) {
  return functionThatAcceptsTodo(action.payload) // action:  { type: "todos/ADD"; payload: Todo; } | { type: "todos/REMOVE"; payload: Todo; }
}

```

[⇧ back to top](#table-of-contents)

---

## Migration Guides

### v1.x.x to v2.x.x
> NOTE: `typesafe-actions@1.x.x` should be used with `utility-types@1.x.x` which contains `$call` utility (removed in `utility-types@2.x.x`)

In v2 we provide `createActionDeprecated` from v1 API to help with incremental migration.

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

// in v2 API we offer 4 different styles - please choose your preference
const getTodoSimple = (id: string, meta: string) => action('GET_TODO', id, meta);

const getTodoVariadic = createAction('GET_TODO', resolve => {
  return (id: string, meta: string) => resolve(id, meta);
});

const getTodoStandard = createStandardAction('GET_TODO')<string, string>();

const getTodoStandardWithMap = createStandardAction('GET_TODO').map(
  ({ id, meta }: { id: string; meta: string; }) => ({
    payload: id,
    meta,
  })
);
```

### Migrating from `redux-actions`

If you're using `redux-actions`, its `createAction` can be replaced with any of the above styles. Usage of its `createActions` function will need to be replaced with individual usages of `createAction`. The resulting hash of actions does not provide inference for the individual values.

Additionally, if you're migrating from JS -> TS, you can swap out action creators with `typesafe-actions` and use them with `handleActions` from `redux-actions` in JS. This is because the action creators exposed by `typesafe-actions` provide the `toString` method used by `redux-actions` to route actions to the correct reducer.

[⇧ back to top](#table-of-contents)

---

## Compare to others

Here you can find out a detailed comparison of `typesafe-actions` to other solutions.

### `redux-actions`
Lets compare the 3 most common action-creator variants (type only, with payload, with payload and meta)

> tested with "@types/redux-actions": "2.2.3"

#### - type only (no payload)

```ts
/**
 * redux-actions
 */
const notify1 = createAction('NOTIFY');
// resulting type:
// () => {
//   type: string;
//   payload: void | undefined;
//   error: boolean | undefined;
// }
```

> with `redux-actions` you can notice the redundant nullable `payload` property and literal type of `type` property is lost (discrimination of union type would not be possible) (🐼 is really sad!)

```ts
/**
 * typesafe-actions
 */
const notify1 = () => action('NOTIFY');
// resulting type:
// () => {
//   type: "NOTIFY";
// }
```

> with `typesafe-actions` there is no excess nullable types, only the data that is really there, also the action "type" property is containing precise literal type

#### - with payload

```ts
/**
 * redux-actions
 */
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

> first the optional `message` parameter is lost, `username` param name is changed to some generic `t1`, literal type of `type` property is lost again and `payload` is nullable because of broken inference

```ts
/**
 * typesafe-actions
 */
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

> `typesafe-actions` still retain very precise resulting type

#### - with payload and meta

```ts
/**
 * redux-actions
 */
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

> this time we got a complete loss of arguments arity with falling back to `any` type with all the remaining issues as before

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

> `typesafe-actions` never fail to `any` type (🐼 is impressed by completely type-safe results)

[⇧ back to top](#table-of-contents)

---

MIT License

Copyright (c) 2017 Piotr Witek <piotrek.witek@gmail.com> (http://piotrwitek.github.io)

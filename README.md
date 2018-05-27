# typesafe-actions

[![Latest Stable Version](https://img.shields.io/npm/v/typesafe-actions.svg)](https://www.npmjs.com/package/typesafe-actions)
[![Bundlephobia Size](https://img.shields.io/bundlephobia/minzip/typesafe-actions.svg)](https://www.npmjs.com/package/typesafe-actions)
[![NPM Downloads](https://img.shields.io/npm/dm/typesafe-actions.svg)](https://www.npmjs.com/package/typesafe-actions)

[![dependencies Status](https://david-dm.org/piotrwitek/typesafe-actions/status.svg)](https://david-dm.org/piotrwitek/typesafe-actions)
[![peerDependencies Status](https://david-dm.org/piotrwitek/typesafe-actions/peer-status.svg)](https://david-dm.org/piotrwitek/typesafe-actions?type=peer)
[![License](https://img.shields.io/npm/l/typesafe-actions.svg?style=flat)](https://david-dm.org/piotrwitek/typesafe-actions?type=peer)

[![Build Status](https://app.codeship.com/projects/d8776810-3b42-0136-36f6-4aa2219ea767/status?branch=master)](https://app.codeship.com/projects/290301)


## Typesafe "Action Creators" for Redux / Flux Architectures (in TypeScript)
Flexible functional API that's specifically designed to reduce types **verbosity** (especially maintainability concerns)
and **complexity** (thanks to powerful helpers).

> #### _Found it usefull? Want more updates?_ [**Show your support by giving a :star:**](https://github.com/piotrwitek/typesafe-actions/stargazers)  

> _This lib is an integral part of [React & Redux TypeScript Guide](https://github.com/piotrwitek/react-redux-typescript-guide)_ :book:  

> _Reference implementation of Todo-App with `typesafe-actions`: https://codesandbox.io/s/github/piotrwitek/typesafe-actions-todo-app_ :computer:  

> _Now compatible with **TypeScript v2.8.3** (rewritten using conditional types)_ :tada:  

### Features

* __small and focused__ - according to `rollup-plugin-filesize` (Bundle size: 2.6 KB, Gzipped size: 808 B) check also on [bundlephobia](https://bundlephobia.com/result?p=typesafe-actions)
* __secure and optimized__ - no external dependencies with 3 different bundle types (`cjs`, `esm` and `umd` for browser)
* __solid as a rock__ - complete test-suite for entire API surface with extra tests for static-types

## Motivation

When I was first starting with Redux and TypeScript I was trying to use [redux-actions](https://redux-actions.js.org/) to simplify maintainability of **action-creators**. I was struggling and results were intimidating: incorrect type signatures and broken type-inference cascading throughout the entire code-base [(read more detailed comparison)](#redux-actions).

Moreover alternative solutions in the wild have been either **too verbose because of excess type annotations** (primary maintainability concern) or **used classes** (hinders readability and enforce to use a **new** keyword 😱).

The solution for all the above pain points is finally here, the `typesafe-actions`.
The core idea was to design and API that would harness the power of incredible **type-inference** 💪 to lift the "maintainability burden" of type annotations. In addition I wanted to make it "look and feel" as close as possible to idiomatic JavaScript we all know and love ❤️, maybe sometimes we even hate but anyway...

## Behold the Mighty "Tutorial"

To showcase flexibility and the power of **type-safety** provided by this library, lets build together the common parts of a typical todo-app following Redux architecture:

> WARNING: Please make sure that you understand the following concepts of programming languages to be able to follow along with me: [Type Inference](https://www.typescriptlang.org/docs/handbook/type-inference.html), [Control flow analysis](https://github.com/Microsoft/TypeScript/wiki/What%27s-new-in-TypeScript#control-flow-based-type-analysis), [Tagged union types](https://github.com/Microsoft/TypeScript/wiki/What%27s-new-in-TypeScript#tagged-union-types), [Generics](https://www.typescriptlang.org/docs/handbook/generics.html) and some [Advanced Types](https://www.typescriptlang.org/docs/handbook/advanced-types.html).

### - The Actions
> Different projects have different needs and conventions vary across teams this is why `typesafe-actions` was designed and build with flexibility in mind and it provides 3 different factory functions, so you can choose what would be the best fit for your project. 

#### 1. classic JS style with constants FTW!
Using this simple function we'll have complete type-safety with minimal type declaration effort, but we're constrained to use constants (as in regular JS applications) because some of advanced **action-helpers** (`getType`, `isActionOf`) will not work with such action-creator. This is still very compelling option especially for refactoring existing projects.
```ts
import { action } from 'typesafe-actions';
import { ADD, TOGGLE } from './constants';

export const toggle = (id: string) => action(TOGGLE, id);
// (id: string) => { type: 'todos/TOGGLE'; payload: string; }

export const add = (title: string) => action(ADD, { title, id: cuid(), completed: false } as Todo);
// (title: string) => { type: 'todos/ADD'; payload: Todo }
```
#### 2. opinionated without need for constants
This approach will give us access for all the **action-helpers** and eliminate to use constants in the application, but it's opinionated and will always accept 2 arguments (1st is payload, and 2nd is meta). It also have very usefull `map` chain method for an extra flexibility.
```ts
import { createStandardAction } from 'typesafe-actions';

export const toggle = createStandardAction('todos/TOGGLE')<string>();
// (payload: string) => { type: 'todos/TOGGLE'; payload: string; }

export const add = createStandardAction(ADD).map(
  ({ title }: { title: string }) => ({
    payload: { title, id: cuid(), completed: false } as Todo,
  })
);
// ({ title: string }) => { type: 'todos/ADD'; payload: Todo }
```
#### 3. most flexible with all helpers
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
// (title: string) => { type: 'todos/ADD'; payload: Todo }
```

> For more examples check the [API Docs](#table-of-contents), there are plenty!

### - The Reducer

Here we'll start by generating an **tagged union type** of actions (TodosAction). It's very easy to do using TS type-inference and `ActionType` utility-type provided by `typesafe-actions`.
```ts
import { ActionType, getType } from 'typesafe-actions';

import * as todos from './actions';
export type TodosAction = ActionType<typeof todos>;
```
Now we define a regular reducer function by annotating `state` and `action` arguments with their respective types (use `TodosAction` for action type)
```ts
export default (state: Todo[] = [], action: TodosAction) => {
```
With static types in place we can finally leverage **tagged union types**. Using switch-cases on common `type` property of action we can distinguish and narrow union type of `TodosAction` to a single specific action type valid for the corresponding code block.
```ts
  switch (action.type) {
    case getType(todos.add): 
      // below action type is narrowed to: { type: "todos/ADD", payload: Todo }
      return [...state, action.payload];
    ...
```
Notice we are using `getType` action-helper with respective action-creator as an argument to handle corresponding switch case. This will help to reduce boilerplate and completely remove the need of using **type-constants** in our application.
> Note: If your team prefer to use regular "type constants", no problem. You can still use them with `typesafe-actions`.

> **PRO-TIP:** I can recommend to create a `RootAction` in the cenral point of your redux store - it will model a complete representation of all possible action types in your application, you can even merge it with existing third-party declarations like it's shown below.
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

### - The Async-Flow
> Starring `redux-observable` epics

To handle async-flow of request to a remote resource in our application, we'll implement an `epic` that'll call a remote API using injected `todosApi` client returning a Promise.
To help us simplify the creation process of necessary action-creators we'll use `createAsyncAction` function providing us with a nice common interface `{ request: ... , success: ... , failure: ... }` that will nicely fit with the functional API of `RxJS`.
This will mitigate **redux verbosity** and greatly reduce the maintenance cost of type annotations for actions objects and action-creators, that otherwise we would have to write by hand.

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

const fetchTodosFlow: Epic<RootAction, RootState, Services> = (action$, store, { todosApi }) =>
  action$.pipe(
    filter(isActionOf(fetchTodos.request)),
    switchMap(action =>
      from(todosApi.getAll(...)).pipe(
        map(fetchTodos.success),
        catchError(pipe(fetchTodos.failure, of))
      )
    );
```

### - The Side-Effects
> Starring `redux-observable` epics

To showcase handling of various side-effects in our application we'll implement an `epic` responsible of showing a notification when the user adds a new todo.
In the **async-flow** section above we have already seen the usage of `isActionOf` function. We used it to help us filter actions coming from the source stream using **action-creators** as an argument. It's also a **type-guard** so it'll narrow **tagged union type** of all actions (here we're using `RootAction`) to a specific action down the pipe in epics.
```ts
// epics.ts
import { isActionOf } from 'typesafe-actions';

import { add, toggle } from './actions';

const addTodoToast: Epic<RootAction, RootState, Services> = (action$, store, { toastService }) =>
  action$.pipe(
    filter(isActionOf(add)),
    tap(action => { // here action type is narrowed to: { type: "todos/ADD", payload: Todo }
      toastService.success(...);
    })
    ...
```

> **PRO-TIP:** It also works with multiple actions as an array argument
```ts
  action$.pipe(
    filter(isActionOf([add, toggle])) // here action type is narrowed to a smaller union:
    // { type: "todos/ADD", payload: Todo } | { type: "todos/TOGGLE", payload: string }
```

**ALTERNATIVE:** But if your team prefer to use **type-constants** what then? I still got you covered! We have equivalent `isOfType` function that will work with **type-constants** instead of action-creators.
```ts
// epics.ts
import { isOfType } from 'typesafe-actions';

import { ADD } from './constants';

const addTodoToast: Epic<RootAction, RootState, Services> = (action$, store, { toastService }) =>
  action$.pipe(
    filter(isTypeOf(ADD)),
    tap(action => { // here action type is narrowed to: { type: "todos/ADD", payload: Todo }
    ...
```

> **PRO-TIP:** Both helper above prove usefull in all conditional statements
```ts
import { isActionOf, isOfType } from 'typesafe-actions';

if (isActionOf(actions.add, action)) {
  // here action is narrowed to: { type: "todos/ADD", payload: Todo }
}
// or with type constants
if (isOfType(types.ADD, action)) {
  // here action is narrowed to: { type: "todos/ADD", payload: Todo }
}
```

> _PS: If you're wondering what the `Services` type is in the epics signature and how to declare it in your application to easily inject statically typed API clients to your epics also ensuring for easy mocking while testing resulting in clean architecture, please create an issue for it and perhaps I'll find some time in the future to write an article about it._

---

## Table of Contents

* [Installation](#installation)
* [API Docs](#api-docs)
  * utility-types
    * [`ActionType`](#actiontype) (RootAction type-helper)
    * [`StateType`](#statetype) (RootState type-helper)
  * action-creators
    * [`action`](#action)
    * [`createAction`](#createaction)
    * [`createStandardAction`](#createstandardaction)
    * [`createAsyncAction`](#createasyncaction)
  * action-helpers
    * [`getType`](#gettype)
    * [`isActionOf`](#isactionof)
    * [`isOfType`](#isoftype)
* [Migration Guide](#migration-guide)
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

```ts
function action(type: T, payload?: P, meta?: M): { type: T, payload?: P, meta?: M }
```

Examples:

[> Advanced Usage Examples](src/action.spec.ts)

```ts
const createUser = (id: number, name: string) =>
  action('CREATE_USER', { id, name });
// { type: 'CREATE_USER'; payload: { id: number; name: string } }
```

[⇧ back to top](#table-of-contents)

---

### createAction

> create the action-creator of a typesafe compatible action

```ts
// type only
function createAction(type: T): () => { type: T };
// createAction('INCREMENT');

// with payload
function createAction(type: T, executor): (...args) => { type: T, payload: P };
const executor = (resolve) => (...args) => resolve(payload: P)
// createAction('ADD', resolve => {
//   return (amount: number) => resolve(amount);
// });

// with payload and meta
function createAction(type: T, executor): (...args) => { type: T, payload: P, meta: M };
const executor = (resolve) => (...args) => resolve(payload: P, meta: M)
// createAction('GET_TODO', resolve => {
//   return (id: string, token: string) => resolve(id, token);
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

// with payload
const add = createAction('ADD', resolve => {
  return (amount: number) => resolve(amount);
});
expect(add(10))
  .toEqual({ type: 'ADD', payload: 10 });

// with payload and meta
const getTodo = createAction('GET_TODO', resolve => {
  return (id: string, token: string) => resolve(id, token);
});
expect(getTodo('fake_id', 'fake_token'))
  .toEqual({ type: 'ADD', payload: 'fake_id', meta: 'fake_token' });
```

[⇧ back to top](#table-of-contents)

---

### createStandardAction

> simple creator compatible with "Flux Standard Action" to reduce boilerplate and enforce convention

```ts
function createStandardAction(type: T): <P, M>() => ({ payload: P, meta: M }) => { type: T, payload: P, meta: M };
function createStandardAction(type: T): { map: ({ payload: P, meta: M }) => { type: T, payload: P, meta: M } };
```

Examples:

[> Advanced Usage Examples](src/create-standard-action.spec.ts)

```ts
import { createAction } from 'typesafe-actions';

// type only
const increment = createStandardAction('INCREMENT')<void>();
expect(increment()).toEqual({ type: 'INCREMENT' });

// with payload
const add = createStandardAction('ADD')<number>();
expect(add(10)).toEqual({ type: 'ADD', payload: 10 });

// with payload and meta
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

---

### getType

> get the "type" property of a given action-creator  
> contains properly narrowed literal type

```ts
function getType(actionCreator: (...args) => T): T
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

const addTodoToast: Epic<RootAction, RootState> =
  (action$, store) => action$
    .filter(isActionOf(addTodo))
    .concatMap((action) => { // action is asserted as: { type: "ADD_TODO", payload: string }
      const toast = `Added new todo: ${action.payload}`;

// epics with multiple actions
import { addTodo, toggleTodo } from './todos-actions';

const logTodoAction: Epic<RootAction, RootState> =
  (action$, store) => action$
    .filter(isActionOf([addTodo, toggleTodo]))
    .concatMap((action) => { // action is asserted as: { type: "ADD_TODO", payload: string } | { type: "TOGGLE_TODO", payload: string }
      const log = `Dispatched action: ${action.type}`;

// conditionals where you need a type guard
import { addTodo } from './actions';

if(isActionOf(addTodo, action)) {
  operationThatNeedsPayload(action.payload) // action is asserted as: { type: "ADD_TODO", payload: string }
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
```

Examples:

[> Advanced Usage Examples](src/is-of-type.spec.ts)

```ts
import { ADD } from './todos-types';

const addTodoToast: Epic<RootAction, RootState, Services> =
  (action$, store, { toastService }) => action$
    .filter(isOfType(ADD))
    .do((action) => {
      // action is narrowed as: { type: "todos/ADD", payload: Todo }
      toastService.success(`Added new todo: ${action.payload}`);
    })
    .ignoreElements();

// conditionals where you need a type guard
import { ADD } from './todos-types';

if(isOfType(ADD, action)) {
  return functionThatAcceptsTodo(action.payload) // action: { type: "todos/ADD", payload: Todo }
}
```

[⇧ back to top](#table-of-contents)

---

## Migration Guide

> NOTE: `typesafe-actions@1.x.x` are best used with `utility-types@1.x.x` which contains `$call` utility that was removed in `v2.x.x`

### v1.x.x to v2.x.x

```ts
const deprecatedApi = createActionDeprecated('GET_TODO',
  (token: string, id: string) => ({
    type: 'GET_TODO',
    payload: id,
    meta: token,
  })
);

const getTodoSimple = (token: string, id: string) => action('GET_TODO', id, token);

const getTodoVariadic = createAction('GET_TODO', resolve => {
  return (id: string, token: string) => resolve(id, token);
});

const getTodoStandard = createStandardAction('GET_TODO')<{ id: string; token: string; }>();

const getTodoStandardMap = createStandardAction('GET_TODO').map(
  ({ id, token }: { id: string; token: string; }) => ({
    payload: id,
    meta: token,
  })
);
```

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

Copyright (c) 2017 Piotr Witek <mailto:piotrek.witek@gmail.com> (http://piotrwitek.github.io)

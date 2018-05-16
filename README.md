# typesafe-actions

### Typesafe "Action Creators" for Redux / Flux Architectures (in TypeScript)

> #### This lib is a part of [React & Redux TypeScript Guide](https://github.com/piotrwitek/react-redux-typescript-guide)

> #### Reference implementation of Todo-App with `typesafe-actions`: https://codesandbox.io/s/github/piotrwitek/typesafe-actions-todo-app

Simple functional API that's specifically designed to reduce types **verbosity** (especially maintainability concerns)
and **complexity** (thanks to powerful helpers).

### Goals

* complete type-safety for payload operations in reducer with switch cases and conditional statements ([docs](#--reducer-switch-cases))
* simplify handling async flow of network requests with multistep composite actions ([docs](#--handling-async-flow-of-network-requests))
* simplify discrimination of union types for `redux-observable` epics but works as well for any other libraries thanks to wide set of helpers ([docs](#--side-effects-with-redux-observable))
* strictly check arguments of given payload when invoking action-creator in view layer (TODO: [link])

### Features

* __small and focused__ - (Bundle size: 2.72 KB, Gzipped size: 879 B)
* __secure__ - no external dependencies for browser (`tslib` in case of cjs/esm modules)
* __tested__ - complete test-suite with tests for type soundness

## Motivation

When I was first trying to use [redux-actions](https://redux-actions.js.org/) with TypeScript I was intimidated by incorrect type signatures and broken type-inference cascading throughout the entire code-base [(read more detailed comparison)](#redux-actions).

Moreover alternative solutions in the wild have been either **too verbose because of excess type annotations** (primary maintainability concern) or **used classes** (hinders readability and enforce to use a **new** keyword 😱).

That's why I created `typesafe-actions` with the core idea to lean on incredible **type-inference** 💪. to reduce the maintainability costs of type signatures and also to make it feel like simple idiomatic JavaScript because of reduced explicit types annotations to minimum.\*\*

**From v2.0 we added a complementary API leveraging generic type arguments to provide a very concise and expressive way to use a "bag object" as payload argument and cut the boilerplate to one-liner**

---

## Table of Contents

* [Installation](#installation)
* [Tutorial](#tutorial)
* [API](#api)
  * [`InferAction`](#inferaction) (RootAction type-helper)
  * [`InferState`](#inferstate) (RootState type-helper)
  * [`action`](#action)
  * [`createAction`](#createaction)
  * [`createStandardAction`](#createstandardaction)
  * [`createAsyncAction`](#createasyncaction)
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

## Tutorial

To showcase the power of **type-safety** provided by this library, let me show you how to build a typical todo app in a type-safe Redux Architecture:

### - the actions

```ts
// actions.ts
import { createStandardAction, InferAction } from 'typesafe-actions';

export const add = createStandardAction('todos/ADD')<Todo>();
export const toggle = createStandardAction('todos/TOGGLE')<string>();
```

[⇧ back to top](#table-of-contents)

### - reducer switch cases

Use `getType` function to reduce boilerplate and mitigate the trouble of importing **type-constants** across the application layers (recommended approach is use action-creators instead).
Moreover **it's a type-guard** so it will discriminate union type of `RootAction` to a specific action inside a corresponding code block.

```ts
// reducer.ts
import { getType } from 'typesafe-actions';

import * as todos from './actions';
export type TodosAction = InferAction<typeof todos>;

const reducer = (state: Todo[] = [], action: TodosAction) => {
  switch (action.type) {
    case getType(todos.add): // TIP: if you prefer you could still use a regular "type constants" here
      // action is narrowed as: { type: "todos/ADD", payload: Todo }
      return [...state, action.payload];
    ...
```

> **PRO-TIP:** I recommend to create a `RootAction` - it will model a complete representation of all possible action types in your application, you can even merge it with third-party declarations (you'll see it's usage in the following sections)

```ts
// types.d.ts
// example of including `react-router` actions in `RootAction`
import { RouterAction, LocationChangeAction } from 'react-router-redux';
import { TodosAction } from '../features/todos';

type ReactRouterAction = RouterAction | LocationChangeAction;
export type RootAction = ReactRouterAction | TodosAction;
```

[⇧ back to top](#table-of-contents)

### - handling async flow of network requests

```ts
// actions.ts
import { createAsyncAction } from 'typesafe-actions';

const fetchUsers = createAsyncAction(
  'FETCH_USERS_REQUEST',
  'FETCH_USERS_SUCCESS',
  'FETCH_USERS_FAILURE'
)<void, User[], Error>();

// epics.ts
import { fetchUsers } from './actions';

const fetchUsers: Epic<RootAction, RootState, Services> = (action$, store, { toastService }) =>
  action$.pipe(
    filter(isActionOf(fetchUsers.request)),
    switchMap(action =>
      of(fetch(...)).pipe(
        map(fetchUsers.success),
        catchError(err => of(fetchUsers.failure(err)))
      )
    );
```

[⇧ back to top](#table-of-contents)

### - side-effects with `redux-observable`

With `isActionOf` function you can use **action-creators** instead of type-constants to filter actions and to narrow (discriminate) union type of all actions (`RootAction`) to a specific action(s) down the pipe in epic.

```ts
// epics.ts
import { isActionOf } from 'typesafe-actions';

import { add, toggle } from './actions';

const addTodoToast: Epic<RootAction, RootState, Services> = (action$, store, { toastService }) =>
  action$.pipe(
    filter(isActionOf(add)),
    tap(action => { // action is narrowed as: { type: "todos/ADD", payload: Todo }
    ...
```

> **PRO-TIP:** it works with multiple actions in array
```ts
filter(isActionOf([add, toggle]))
// action will be narrowed as:
// { type: "todos/ADD", payload: Todo } | { type: "todos/TOGGLE", payload: string }
```

**ALTERNATIVE:** But if you prefer to use **type-constants** there is a `isOfType` function that you can use with constants instead of action-creators.

```ts
// epics.ts
import { isOfType } from 'typesafe-actions';

import { ADD } from './constants';

const addTodoToast: Epic<RootAction, RootState, Services> = (action$, store, { toastService }) =>
  action$.pipe(
    filter(isTypeOf(ADD)),
    tap(action => { // action is narrowed as: { type: "todos/ADD", payload: Todo }
    ...
```

> **PRO-TIP:** they both prove usefull in regular conditional statements as well
```ts
import { isActionOf, isOfType } from 'typesafe-actions';

if (isActionOf(actions.add, action)) {
  // action is narrowed as: { type: "todos/ADD", payload: Todo }
}
// or with type constants
if (isOfType(types.ADD, action)) {
  // action is narrowed as: { type: "todos/ADD", payload: Todo }
}
```

[⇧ back to top](#table-of-contents)

---

## API

### InferAction

> powerful type helper that will infer union type from various nested map objects or arrays with action-creators

```ts
import { InferAction } from 'typesafe-actions';

const actions = {
  action1: createAction('action1'),
  nested: {
    action2: createAction('action2'),
    moreNested: {
      action3: createAction('action3'),
    }
  }
};

export type RootAction = InferAction<typeof actions>;
// RootAction: { type: 'action1' } | { type: 'action2' } | { type: 'action3' }
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
function createStandardAction(type: T): <P, M>() => { type: T, payload?: P, meta?: M };
function createStandardAction(type: T): { map: (arg: object) => { type: T, payload?: P, meta?: M };
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

> with `redux-actions` you can notice the redundant nullable `payload` property and literal type of `type` property is lost (discrimination would not be possible) (🐼 is really sad!)

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

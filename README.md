# typesafe-actions

### Typesafe "Action Creators" for Redux / Flux Architectures (in TypeScript)

> #### This lib is a part of [React & Redux TypeScript Guide](https://github.com/piotrwitek/react-redux-typescript-guide)

### _New API ([link to API docs](../../issues/22)) thanks to a new language feature ([conditional types](https://github.com/Microsoft/TypeScript/pull/21847)) coming to TypesScript in v2.8)_

Simple functional API that's specifically designed to reduce **verbosity** (no explicit generic type arguments in the API, type inference FTW!)
and **complexity** (retain "type soundness" and easily discriminate union types)
of type annotations.

### Goals

* have complete type-safety for payload operations in reducer with switch cases and conditional statements (TODO: link)
* have complete type-safety for payload operations in `redux-observable` epics and any other functional api with `filter` method (TODO: link)
* strictly check arguments of given payload when invoking action creators in view layer (TODO: link)

### Features

* super small and focused - (min + gzip < 1kb)
* secure - no external dependencies
* thoroughly tested for runtime and type safety

---

## Table of Contents

* [Installation](#installation)
* [Motivation](#motivation)
* [Tutorial](#tutorial)
* [API](#api)
  * [`ActionsUnion`](#actionsunion) (static-type)
  * [`buildAction`](#buildaction)
  * [`createAction`](#createaction)
  * [`getType`](#gettype)
  * [`isActionOf`](#isactionof)
* [Compare to others](#compare-to-others)
  * [redux-actions](#redux-actions)

---

## Installation

For NPM users

```bash
npm install --save typesafe-actions
```

For Yarn users

```bash
yarn add typesafe-actions
```

[⇧ back to top](#table-of-contents)

---

## Motivation

First I was trying to use [redux-actions](https://redux-actions.js.org/) with TypeScript but I really couldn't accept the incorrect type signatures and broken type-inference cascading throughout the entire code-base [(click here to read more detailed comparison)](#redux-actions).

Moreover alternative solutions in the wild have been either **too verbose enforcing redundant type annotations** or **used classes** (which hinders readability and enforce you to use **new** keyword 😱) instead of leveraging incredible **type-inference** 💪.

That's why `typesafe-actions` was created specifically designed to only use "type-inference" and provide a clean functional interface without a need to provide redundant type arguments, so that it feels like idiomatic JavaScript.\*\*

**From v2.0 added a complementary API leveraging generic type arguments to provide a very concise and expressive way to use bag objects as payload/meta and cut the boilerplate to basically one-liners**

[⇧ back to top](#table-of-contents)

---

## Tutorial

To showcase the power of **type-safety** provided by this library, let me show you how to build a typical todo app in a type-safe Redux Architecture:

Here is a link to completed todo-app in codesandbox:

### start with creating actions (a.k.a. `RootAction`)

```ts
import { buildAction, ActionsUnion } from 'typesafe-actions';

export const counterActions = {
  increment: buildAction('INCREMENT').empty(),
  add: buildAction('ADD').payload<number>(),
};

export const todosActions = { ... };

// all actions merged for convenience
export type RootAction = ActionsUnion<typeof counterActions>;
```

> **PRO-TIP:** merge with third-party action types to model a complete representation of all possible actions at runtime

```ts
// example of including `react-router` action types
import { RouterAction, LocationChangeAction } from 'react-router';
type ReactRouterAction = RouterAction | LocationChangeAction;

export type AppAction = RootAction | ReactRouterAction;
```

[⇧ back to top](#table-of-contents)

### reducer switch cases

Use `getType` function to reduce boilerplate and mitigate the trouble of tossing "type constants" across the application layers (use only action creators everywhere).
Moreover it will discriminate union type of `RootAction` to a specific action (like a type-guard).

```ts
import { getType } from 'typesafe-actions';

import { RootAction } from '@src/redux';
import { add } from './actions';

const reducer = (state: number = 0, action: RootAction) => {
  switch (action.type) {
    case getType(add):
      return state + action.payload; // action is narrowed to a type of "add" action (payload: number)
  ...
```

* alternative for conditional statements

```ts
import { isActionOf } from 'typesafe-actions';
...
const reducer = (state: number = 0, action: RootAction) => {
  if (isActionOf(add, action)) {
      return state + action.payload; // action is narrowed to a type of "add" action (payload: number)
  }
// can accept array for multiple actions
const fetchReducer = (state: boolean = false, action: RootAction) => {
  if (isActionOf([fetchArticles, fetchComment, fetchRating], action)) {
      return true; // action is narrowed to a type of "add" action (payload: number)
  }
```

[⇧ back to top](#table-of-contents)

### epics from `redux-observable`

Use `isActionOf` function to filter actions and discriminate union type of `RootAction` to a specific action(s) down the stream.

```ts
import { isActionOf } from 'typesafe-actions';

import { RootState, RootAction } from '@src/redux';
import { addTodo, toggleTodo } from './actions';

// with single action
const addTodoToast: Epic<RootAction, RootState> =
  (action$, store) => action$
    .filter(isActionOf(addTodo))
    .concatMap((action) => { // action is asserted as: { type: "ADD_TODO", payload: string }
      const toast = `Added new todo: ${action.payload}`;
...

// with multiple actions
const logTodoAction: Epic<RootAction, RootState> =
  (action$, store) => action$
    .filter(isActionOf([addTodo, toggleTodo]))
    .switchMap((action) => { // action is asserted as: { type: "ADD_TODO", payload: string } | { type: "TOGGLE_TODO", payload: string }
      const log = `Dispatched action (${action.type}: ${action.payload})`;
...
```

[⇧ back to top](#table-of-contents)

---

## API

### ActionsUnion

WIP v2.0.0

[⇧ back to top](#table-of-contents)

### buildAction

WIP v2.0.0

[⇧ back to top](#table-of-contents)

### createAction

> create the action creator of a given function that contains private "type" metadata

[> Advanced Usage](src/create-action.spec.ts)

```ts
function createAction(typeString: T, creatorFunction?: CF): CF;

// CF extends (...args: any[]) => { type: T, payload?: P, meta?: M, error?: boolean }
```

Examples:

```ts
// no payload
const increment = createAction('INCREMENT');
// same as:
// const increment = createAction('INCREMENT', () => ({ type: 'INCREMENT' }));

expect(increment()).toEqual({ type: 'INCREMENT' });

// with payload
const add = createAction('ADD', (amount: number) => ({
  type: 'ADD',
  payload: amount,
}));

expect(add(10)).toEqual({ type: 'ADD', payload: 10 });

// with payload and meta
const notify = createAction('NOTIFY', (username: string, message: string) => ({
  type: 'NOTIFY',
  payload: { message: `${username}: ${message}` },
  meta: { username, message },
}));

expect(notify('Piotr', 'Hello!')).toEqual({
  type: 'NOTIFY',
  payload: { message: 'Piotr: Hello!' },
  meta: { username: 'Piotr', message: 'Hello!' },
});
```

[⇧ back to top](#table-of-contents)

---

### getType

> get the "type" property of a given action creator  
> (It will infer literal type of action)

[> Advanced Usage](src/get-type.spec.ts)

```ts
function getType(actionCreator: AC<T>): T;

// AC<T> extends (...args: any[]) => { type: T }
```

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

> create the assert function for specified action creator(s) - resulting function will then assert (true/false) maching actions  
> (it will discriminate union type to specified action creator(s))

[> Advanced Usage](src/is-action-of.spec.ts)

```ts
function isActionOf(actionCreator: AC<T>): (action: any) => action is T;
function isActionOf(actionCreators: Array<AC<T>>): (action: any) => action is T;

// AC<T> extends (...args: any[]) => T
```

Examples:

```ts
// in epics, with single action
import { addTodo } from './actions';
const addTodoToast: Epic<RootAction, RootState> =
  (action$, store) => action$
    .filter(isActionOf(addTodo))
    .concatMap((action) => { // action is asserted as: { type: "ADD_TODO", payload: string }
      const toast = `Added new todo: ${action.payload}`;
...

// with multiple actions
import { addTodo, toggleTodo } from './actions';
const logTodoAction: Epic<RootAction, RootState> =
  (action$, store) => action$
    .filter(isActionOf([addTodo, toggleTodo]))
    .concatMap((action) => { // action is asserted as: { type: "ADD_TODO", payload: string } | { type: "TOGGLE_TODO", payload: string }
      const log = `Dispatched action: ${action.type}`;
...
```

[⇧ back to top](#table-of-contents)

---

## Compare to others

Here you can find out a detailed comparison of `typesafe-actions` to other solutions.

### `redux-actions`

> tested with "@types/redux-actions": "2.2.3"

#### no payload

* redux-actions

```ts
const notify1 = createAction('NOTIFY');
// resulting type:
// const notify1: () => {
//   type: string;
//   payload: void | undefined;
//   error: boolean | undefined;
// }
```

> with `redux-actions` notice excess "nullable" properties `payload` and `error`, also the action `type` property is widened to string (🐼 is really sad!)

* typesafe-actions

```ts
const notify1 = createAction('NOTIFY');
// resulting type:
// const notify1: () => {
//   type: "NOTIFY";
// }
```

> with `typesafe-actions` there is no nullable types, only the data that is really there, also the action "type" property is correct narrowed to literal type (great success!)

#### with payload

* redux-actions

```ts
const notify2 = createAction('NOTIFY',
  (username: string, message?: string) => ({
    message: `${username}: ${message || 'Empty!'}`,
  })
);
// resulting type:
// const notify2: (t1: string) => {
//   type: string;
//   payload: { message: string; } | undefined;
//   error: boolean | undefined;
// }
```

> notice the missing optional `message` parameter in resulting function also `username` param name is changed to `t1`, action `type` property is widened to string and incorrect nullable properties

* typesafe-actions

```ts
const notify2 = createAction('NOTIFY', type =>
  (username: string, message?: string) => action(
    type,
    { message: `${username}: ${message || 'Empty!'}` },
  )
);
// resulting type:
// const notify2: (username: string, message?: string | undefined) => {
//   type: "NOTIFY";
//   payload: { message: string; };
// }
```

> `typesafe-actions` retain very precise resulting type

#### with payload and meta

* redux-actions

```ts
const notify3 = createAction('NOTIFY',
  (username: string, message?: string) => ({
    message: `${username}: ${message || 'Empty!'}`,
  }),
  (username: string, message?: string) => ({ username, message })
);
// resulting type:
// const notify3: (...args: any[]) => {
//   type: string;
//   payload: { message: string; } | undefined;
//   meta: { username: string; message: string | undefined; };
//   error: boolean | undefined;
// }
```

> notice complete loss of arguments arity and types in resulting function, moreover action `type` property type is again widened to string with and `payload` and `error` is nullable (but why?)

* typesafe-actions

```ts
const notify3 = createAction('NOTIFY', type =>
  (username: string, message?: string) => action(
    type,
    { message: `${username}: ${message || 'Empty!'}` },
    { username, message },
  )
);
// resulting type:
// const notify3: (username: string, message?: string | undefined) => {
//   type: "NOTIFY";
//   payload: { message: string; };
//   meta: { username: string; message: string | undefined; };
// }
```

> `typesafe-actions` makes 🐼 very happy with type-safe result

[⇧ back to top](#table-of-contents)

---

MIT License

Copyright (c) 2017 Piotr Witek <mailto:piotrek.witek@gmail.com> (http://piotrwitek.github.io)

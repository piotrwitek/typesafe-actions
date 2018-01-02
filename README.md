# typesafe-actions
### Typesafe "Action Creators" for Redux / Flux Architectures (in TypeScript)

> #### This lib is a part of [React & Redux TypeScript Guide](https://github.com/piotrwitek/react-redux-typescript-guide)

Simple functional API that's specifically designed to reduce **verbosity** (no explicit type annotations!)
and **complexity** (retain "type soundness" and easily discriminate union types of Actions) 
of type annotations for "Redux".  

- Thoroughly tested both logic and type correctness
- No third-party dependencies
- Semantic Versioning
- Output separate bundles for different workflow needs (es5-commonjs, es5-module, jsnext)

---

## Table of Contents

- [Installation](#installation)
- [Motivation](#motivation)
- [Tutorial](#tutorial)
- [API](#api)
  - [`createAction`](#createaction)
  - [`getType`](#gettype)
  - [`isActionOf`](#isactionof)
- [Compare to others](#compare-to-others)
  - [redux-actions](#redux-actions)

---

## Installation

For NPM users

```bash
$ npm install --save typesafe-actions
```

For Yarn users

```bash
$ yarn add typesafe-actions
```

[⇧ back to top](#table-of-contents)

---

## Motivation

While trying to use [redux-actions](https://redux-actions.js.org/) with TypeScript I was dissapointed by it's "unsoundness" with static-typing [(more info here)](#redux-actions).

Moreover **alternative solutions** in the wild have been either too verbose, used classes or was too "explicitly typed" instead leveraging type-inference, which just feels wrong when paired with Redux.

**That's why in `typesafe-actions` I created an API specifically designed to retain "type soundness" and provide a clean functional interface without any explicit type annotations, so that it looks the same in JavaScript as in TypeScript.**

[⇧ back to top](#table-of-contents)

---

## Tutorial

To highlight the benefits of type inference leveraged in this solution, let me show you how to handle the most common use-cases found in Redux Architecture:

### create union type of actions (a.k.a. `RootAction`)
```ts
import { getReturnOfExpression } from 'react-redux-typescript';
import { createAction } from 'typesafe-actions';

export const actions = {
  increment: createAction('INCREMENT'),
  add: createAction('ADD', (amount: number) => ({
    type: 'ADD',
    payload: amount,
  })),
};

const returnOfActions =
  Object.values(actions).map(getReturnOfExpression);
type AppAction = typeof returnOfActions[number];

// third-party actions
type ReactRouterAction = RouterAction | LocationChangeAction;

export type RootAction =
  | AppAction
  | ReactRouterAction;
```  

[⇧ back to top](#table-of-contents)

### reducer switch cases
Use `getType` function to reduce common boilerplate and discriminate union type of `RootAction` to a specific action.
```ts
import { getType } from 'typesafe-actions';

import { RootState, RootAction } from '@src/redux';
import { add } from './actions';

const reducer = (state: RootState, action: RootAction) => {
  switch (action.type) {
    case getType(add):
      return state + action.payload; // action is narrowed to a type of "add" action (payload: number)
  ...
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
      const log = `Dispatched action: ${action.type}`;
...
```

[⇧ back to top](#table-of-contents)

---

## API

### createAction
> create the action creator of a given function that contains private "type" metadata

[> Advanced Usage](src/create-action.spec.ts)

```ts
function createAction(typeString: T, creatorFunction?: CF): CF

// CF extends (...args: any[]) => { type: T, payload?: P, meta?: M, error?: boolean }
```
> NOTE: I know the `typeString` argument looks kinda redundand to use with `creatorFunction` and I would like to infer the type from `type` property of returning action,
but at the moment (TS v.2.6.2) it's impossible because the type inference is widening it to `string` and other API's (`getType` and `isActionOf`)
will not work when trying to discriminate union types  
This is something I should be able to address with the future TS versions and then simplify the API with backward compatibility in mind.

Examples:
```ts
// no payload
const increment = createAction('INCREMENT');
// same as:
// const increment = createAction('INCREMENT', () => ({ type: 'INCREMENT' }));

expect(increment()).toEqual({ type: 'INCREMENT' });

// with payload
const add = createAction('ADD',
  (amount: number) => ({ type: 'ADD', payload: amount }),
);

expect(add(10)).toEqual({ type: 'ADD', payload: 10 });

// with payload and meta
const notify = createAction('NOTIFY',
  (username: string, message: string) => ({
    type: 'NOTIFY',
    payload: { message: `${username}: ${message}` },
    meta: { username, message },
  }),
);

expect(notify('Piotr', 'Hello!'))
  .toEqual({
    type: 'NOTIFY',
    payload: { message: 'Piotr: Hello!' },
    meta: { username: 'Piotr', message: 'Hello!' },
  });
```

[⇧ back to top](#table-of-contents)

---

### getType
> get the "type" property of a given action creator  
(It will infer literal type of action)

[> Advanced Usage](src/get-type.spec.ts)

```ts
function getType(actionCreator: AC<T>): T

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

  default: return state;
}
```

[⇧ back to top](#table-of-contents)

---

### isActionOf
> create the assert function for specified action creator(s) - resulting function will then assert (true/false) maching actions  
(it will discriminate union type to specified action creator(s))

[> Advanced Usage](src/is-action-of.spec.ts)

```ts
function isActionOf(actionCreator: AC<T>): (action: any) => action is T
function isActionOf(actionCreators: Array<AC<T>>): (action: any) => action is T

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
Here you can find out the differences compared to other solutions.

### `redux-actions`
> tested with "@types/redux-actions": "2.2.3"

#### no payload

- redux-actions
```ts
const notify1 = createAction('NOTIFY')
// resulting type:
// const notify1: () => {
//   type: string;
//   payload: void | undefined;
//   error: boolean | undefined;
// }
```
> with `redux-actions` notice excess "nullable" properties `payload` and `error`, also the action `type` property is widened to string (🐼 is really sad!)

- typesafe-actions
```ts
const notify1 = createAction('NOTIFY')
// resulting type:
// const notify1: () => {
//   type: "NOTIFY";
// }
```
> with `typesafe-actions` there is no nullable types, only the data that is really there, also the action "type" property is correct narrowed to literal type (great success!)

#### with payload

- redux-actions
```ts
const notify2 = createAction('NOTIFY',
  (username: string, message?: string) => ({
    message: `${username}: ${message || ''}`
  })
)
// resulting type:
// const notify2: (t1: string) => {
//   type: string;
//   payload: { message: string; } | undefined;
//   error: boolean | undefined;
// }
```
> notice the missing optional `message` parameter in resulting function also `username` param name is changed to `t1`, action `type` property is widened to string and incorrect nullable properties

- typesafe-actions
```ts
const notify2 = createAction('NOTIFY',
  (username: string, message?: string) => ({
    type: 'NOTIFY'
    payload: { message: `${username}: ${message || ''}` },
  })
)
// resulting type:
// const notify2: (username: string, message?: string | undefined) => {
//   type: "NOTIFY";
//   payload: { message: string; };
// }
```
> `typesafe-actions` retain complete type soundness

#### with payload and meta

- redux-actions
```ts
const notify3 = createAction('NOTIFY',
  (username: string, message?: string) => ({ message: `${username}: ${message || ''}` }),
  (username: string, message?: string) => ({ username, message })
)
// resulting type:
// const notify3: (...args: any[]) => {
//   type: string;
//   payload: { message: string; } | undefined;
//   meta: { username: string; message: string | undefined; };
//   error: boolean | undefined;
// }
```
> notice complete loss of arguments arity and types in resulting function, moreover action `type` property is again widened to string with nullable `payload` and `error`

- typesafe-actions
```ts
const notify3 = createAction('NOTIFY',
    (username: string, message?: string) => ({
      type: 'NOTIFY',
      payload: { message: `${username}: ${message || ''}` },
      meta: { username, message },
    }),
  )
// resulting type:
// const notify3: (username: string, message?: string | undefined) => {
//   type: "NOTIFY";
//   payload: { message: string; };
//   meta: { username: string; message: string | undefined; };
// }
```
> `typesafe-actions` makes 🐼 happy once again

[⇧ back to top](#table-of-contents)

---

MIT License

Copyright (c) 2017 Piotr Witek <piotrek.witek@gmail.com> (http://piotrwitek.github.io)

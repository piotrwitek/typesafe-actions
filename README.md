# typesafe-actions
> Typesafe Action Creators for Redux / Flux Architectures (in TypeScript)  

This lib is a part of [React & Redux TypeScript Guide](https://github.com/piotrwitek/react-redux-typescript-guide). 

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
  - [createAction](#createaction)
  - [getType](#gettype)
  - [isActionOf](#isactionof)
- [Compare to others](#compare-to-others)

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

While trying to use [redux-actions](https://redux-actions.js.org/) with TypeScript I wasn't really satisfied because of it's API (separate payload & meta mapping functions) which makes it non-idiomatic with static typing.  
What I mean specifically is that named arguments in returned "action creators" will be renamed to some generic "non-descriptive" arguments like a1, a2, etc..., moreover function arity with optional parameters will break "type soundness" of your function signature.  
In the end it will force you to do an extra effort for explicit type annotations and probably result in even more boilerplate when trying to work around it.

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
Use `getType` pure function to reduce common boilerplate and narrow `RootAction` union type to a specific action
```ts
import { getType } from 'typesafe-actions';

import { RootState, RootAction } from '@src/redux';
import { add } from './actions';

const reducer = (state: RootState, action: RootAction) => {
  switch (action.type) {
    case getType(add):
      return state + action.payload; // action is narrowed to a type of "add" action (payload is number)
  ...
```

[⇧ back to top](#table-of-contents)

### epics from `redux-observable`
Use `isActionOf` pure function to narrow `RootAction` union type to a specific action down the stream
```ts
import { isActionOf } from 'typesafe-actions';

import { RootState, RootAction } from '@src/redux';
import { addTodo } from './actions';

// in epics
const addTodoToast: Epic<RootAction, RootState> =
  (action$, store) => action$
    .filter(isActionOf(addTodo))
    .concatMap((action) => { // action is asserted as addTodo Action Type
      const toast = { text: action.payload };
```

[⇧ back to top](#table-of-contents)

---

## API

### createAction
> creates action creator function with type helper

[> Advanced Usage](src/create-action.spec.ts)

```ts
function createAction(typeString: T, creatorFunction?: CF): CF & { getType?(): T }

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
> get type literal from action creator

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
> assert specific action from union type

[> Advanced Usage](src/is-action-of.spec.ts)

```ts
function isActionOf(actionCreator: AC<T>): (action: A<T>) => action is T

// AC<T> extends (...args: any[]) => A<T>
```

Examples:
```ts
import { addTodo } from './actions';

// in epics
const addTodoToast: Epic<RootAction, RootState> =
  (action$, store) => action$
    .filter(isActionOf(addTodo))
    .concatMap((action) => { // action is asserted as addTodo Action Type
      const toast = { text: action.payload };
```

[⇧ back to top](#table-of-contents)

---

## Compare to others
Here you can find out the differences and the advantages you'll get compared to other solutions (using `redux-actions` as example here)

- no payload
```ts
// with redux-actions
const notify1 = createAction('NOTIFY')
// notice excess nullable properties "payload" and "error", "type" property widened to string
// const notify1: () => {
//   type: string;
//   payload: void | undefined;
//   error: boolean | undefined;
// }

// with typesafe-actions
const notify1 = createAction('NOTIFY')
// only what is expected, no nullables, with inferred literal type in type property!
// const notify1: () => {
//   type: "NOTIFY";
// }
```

- with payload
```ts
// with redux-actions
const notify2 = createAction('NOTIFY',
  (username: string, message?: string) => ({
    message: `${username}: ${message}`
  })
)
// notice missing optional "message" argument, arg name changed to "t1", "type" property widened to string, and excess nullable properties
// const notify2: (t1: string) => {
//   type: string;
//   payload: { message: string; } | undefined;
//   error: boolean | undefined;
// }

// with typesafe-actions
const notify2 = createAction('NOTIFY',
  (username: string, message?: string) => ({
    type: 'NOTIFY',
    payload: { message: `${username}: ${message}` },
  })
)
// still all good!
// const notify2: (username: string, message?: string | undefined) => {
//   type: "NOTIFY";
//   payload: { message: string; };
// }

```

- with payload and meta
```ts
// with redux-actions
const notify3 = createAction('NOTIFY',
  (username: string, message?: string) => ({ message: `${username}: ${message}` }),
  (username: string, message?: string) => ({ username, message })
)
// notice missing arguments arity and types, "type" property widened to string
// const notify3: (...args: any[]) => {
//   type: string;
//   payload: { message: string; } | undefined;
//   meta: { username: string; message: string | undefined; };
//   error: boolean | undefined;
// }

// with typesafe-actions
const notify3 = createAction('NOTIFY',
    (username: string, message?: string) => ({
      type: 'NOTIFY',
      payload: { message: `${username}: ${message}` },
      meta: { username, message },
    }),
  )

// inference working as expected and compiler will catch all those nasty bugs:
// const notify3: (username: string, message?: string | undefined) => {
//   type: "NOTIFY";
//   payload: { message: string; };
//   meta: { username: string; message: string | undefined; };
// }
```

[⇧ back to top](#table-of-contents)

---

MIT License

Copyright (c) 2017 Piotr Witek <piotrek.witek@gmail.com> (http://piotrwitek.github.io)

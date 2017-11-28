# TS Redux Actions
> Typesafe Redux Action Creators for TypeScript  

This lib is a part of [`react-redux-typescript`](https://github.com/piotrwitek/react-redux-typescript) library, which is a collection of valuable utilities commonly used across many TypeScript Projects. 

- Thoroughly tested both logic and type correctness
- No third-party dependencies
- Semantic Versioning
- Output separate bundles for your specific workflow needs:
  - ES5 + CommonJS - `main`
  - ES5 + ES-Modules - `module` 
  - ES2015 + CommonJS - `jsnext:main`

# Table of Contents (v1.0)

- [Installation](#installation)
- [Motivation](#motivation)
- [Get Started](#get-started)
- [Features](#features)
- [API](#api)
  - [getType](#gettype)
  - [createAction](#createaction)
  - [~~createActions~~](#createactions) (WIP)

---

## Installation

For NPM users

```bash
$ npm install --save ts-redux-actions
```

For Yarn users

```bash
$ yarn add ts-redux-actions
```

---

## Motivation

I wasn't satisfied with [redux-actions](https://redux-actions.js.org/) with TypeScript because of separate payload & meta map functions which makes it not idiomatic when using with static typing.  
What I mean here is it will break your function definition type inference and intellisense in returned "action creator" function (e.g. named arguments will be renamed to generic names like a1, a2, etc... and function arity with optional parameters will break your function signature entirely).  
It will force you to do an extra effort for explicit type annotations and probably result in more boilerplate when trying to work around it.

---

## Get Started

> Important note: Every function created by `createAction` has a convenient `getType` method for a reducer switch case scenarios like below to reduce common boilerplate (works to narrow "Discriminated Union" types, remember to add trailing `!` to remove optional undefined type):
```ts
import { createAction, getType } from 'ts-redux-actions';

const increment = createAction('INCREMENT');
// const increment: (() => { type: "INCREMENT"; }) & { getType?(): "INCREMENT"; } << HERE

switch (action.type) {
  // getter on every action creator function:
  case increment.getType!():
    return state + 1;
  // alternative helper function for more "FP" style:
  case getType(increment):
    return state + 1;

  default: return state;
}
```

To highlight the difference in API design and the benefits of "action creator" type inference found in this solution let me show you some usage examples:

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

// with ts-redux-actions
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

// with ts-redux-actions
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
// const notify2: (...args: any[]) => {
//   type: string;
//   payload: { message: string; } | undefined;
//   meta: { username: string; message: string | undefined; };
//   error: boolean | undefined;
// }

// with ts-redux-actions
const notify3 = createAction('NOTIFY',
    (username: string, message?: string) => ({
      type: 'NOTIFY',
      payload: { message: `${username}: ${message}` },
      meta: { username, message },
    }),
  )

// inference working as expected and compiler will catch all those nasty bugs:
// const: notify: (username: string, message?: string | undefined) => {
//   type: "NOTIFY";
//   payload: { message: string; };
//   meta: { username: string; message: string | undefined; };
// }
```

---

## API
> For more advanced usage scenarios please check use cases described in test specifications  

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
---

### createAction
> creates action creator function with type helper

[> Advanced Usage](src/create-action.spec.ts)

```ts
function createAction(typeString: T, creatorFunction?: CF): CF & { getType?(): T }

// CF extends (...args: any[]) => { type: T, payload?: P, meta?: M, error?: boolean }
```

Examples:

```ts
it('no payload', () => {
  const increment = createAction('INCREMENT');
  // same as:
  // const increment = createAction('INCREMENT', () => ({ type: 'INCREMENT' }));

  expect(increment()).toEqual({ type: 'INCREMENT' });
  expect(increment.getType!()).toBe('INCREMENT');
});

it('with payload', () => {
  const add = createAction('ADD',
    (amount: number) => ({ type: 'ADD', payload: amount }),
  );

  expect(add(10)).toEqual({ type: 'ADD', payload: 10 });
  expect(add.getType!()).toBe('ADD');
});

it('with payload and meta', () => {
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
  expect(notify.getType!()).toBe('NOTIFY');
});
```

### createActions
(WIP)

```ts
```

---
MIT License

Copyright (c) 2017 Piotr Witek <piotrek.witek@gmail.com> (http://piotrwitek.github.io)

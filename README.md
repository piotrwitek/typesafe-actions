# TS Redux Actions
> Typesafe Redux Action Creators for TypeScript  

This lib is a part of [`react-redux-typescript`](https://github.com/piotrwitek/react-redux-typescript) library, which is a collection of valuable utilities commonly used across many TypeScript Projects. 

- Semantic Versioning
- No third-party dependencies
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

> Important note: On every created "action creator" function there is a convenient `getType` static method for common reducer switch case scenarios like below (can be used to narrow "Discriminated Union" type just remember to add trailing `!` to strip undefined):
```ts
const increment = createAction('INCREMENT');
// const increment: (() => {
//     type: "INCREMENT";
// }) & { readonly type: "INCREMENT"; } << HERE

switch (action.type) {
  case increment.getType()!:
    return state + 1;
  ...
  ...
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
// const notify1: (() => {
//   type: "NOTIFY";
// }) & { readonly type: "NOTIFY"; }
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
// const notify2: ((username: string, message?: string | undefined) => {
//   type: "NOTIFY";
//   payload: { message: string; };
// }) & { readonly type: "NOTIFY"; }

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
// const: notify: ((username: string, message?: string | undefined) => {
//   type: "NOTIFY";
//   payload: { message: string; };
//   meta: { username: string; message: string | undefined; };
// }) & { readonly type: "NOTIFY"; }
```

---

## API

> For more advanced usage scenarios please check use cases described in test specification  

### createAction
> [> Advanced Usage](src/create-action.spec.ts)

```ts
createAction(typeString, creatorFunction?)
typeString: TS extends string,
creatorFunction: (...args: any[]) => { type: TS, payload?: P, meta?: M, error?: boolean }
return: (
  (...args: any[]) => { type: TS, payload?: P, meta?: M, error?: boolean }
) & { readonly type: TS }
```

Examples:

```ts
it('no payload', () => {
  const increment = createAction('INCREMENT');

  expect(increment()).toEqual({ type: 'INCREMENT' });
  expect(increment.type).toBe('INCREMENT');
});

it('with payload', () => {
  const add = createAction('ADD',
    (amount: number) => ({ type: 'ADD', payload: amount }),
  );

  expect(add(10)).toEqual({ type: 'ADD', payload: 10 });
  expect(add.type).toBe('ADD');
});

it('with payload and meta', () => {
  const notify = createAction('NOTIFY',
    (username: string, message: string) => ({
      type: 'NOTIFY',
      payload: { message: `${username}: ${message}` },
      meta: { username, message },
    }),
  );

  expect(notify('Piotr', 'Hello!')).toEqual({
    type: 'NOTIFY',
    payload: { message: 'Piotr: Hello!' },
    meta: { username: 'Piotr', message: 'Hello!' },
  });
  expect(notify.type).toBe('NOTIFY');
});
```

### createActions
(WIP)

```ts
```

---
MIT License

Copyright (c) 2017 Piotr Witek <piotrek.witek@gmail.com> (http://piotrwitek.github.io)

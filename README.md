# TS Redux Actions
> Typed Redux Action Creators for TypeScript

From now on no type errors will sneak in unnoticed through your action creators!

- Semantic Versioning
- No external dependencies
- Output separate bundles for your specific workflow needs:
  - ES5 + CommonJS - `main`
  - ES5 + ES-Modules - `module` 
  - ES2015 + CommonJS - `jsnext:main`

# Table of Contents (v1.0)

- [Installation](#installation)
- [Motivation](#motivation)
- [Usage](#usage)
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

I wasn't satisfied with the API design in [redux-actions](https://redux-actions.js.org/) because of separate payload & meta map callback functions. 
It doesn't allow for correct type inference when using TypeScript and it will force you to do an extra effort for explicit type annotations and probably result in more boilerplate when trying to work around it.

The other common issue with `redux-actions` types and similar solutions are related to losing your function definition type inference and intellisense (named arguments and arity) in resulting "action creator" function which for me is unacceptable.

As a bonus there is a convenient `type` static property on every action creator for common reducer switch case scenarios (can be used to narrow "Discriminated Union" type):
```ts
const increment = createAction('INCREMENT');
// const increment: (() => {
//     type: "INCREMENT";
// }) & { readonly type: "INCREMENT"; } << HERE

switch (action.type) {
  case increment.type:
    return state + 1;
  ...
  ...
  default: return state;
}
```

---

## Usage

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
  const add = createAction('ADD', (type: 'ADD') => (amount: number) =>
    ({ type, payload: amount }),
  );

  expect(add(10)).toEqual({ type: 'ADD', payload: 10 });
  expect(add.type).toBe('ADD');
});

it('with payload and meta', () => {
  const notify = createAction('NOTIFY', (type: 'NOTIFY') =>
    (username: string, message: string) => ({
      type,
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

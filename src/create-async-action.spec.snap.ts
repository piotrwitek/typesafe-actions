import * as TH from './type-helpers';
import { AsyncActionCreatorBuilder } from './type-helpers';
import { createAsyncAction } from './create-async-action';

type User = { firstName: string; lastName: string };

// @dts-jest:group async action without cancel
{
  const fetchUsersAsync = createAsyncAction(
    'FETCH_USERS_REQUEST',
    'FETCH_USERS_SUCCESS',
    'FETCH_USERS_FAILURE'
  )<undefined, User[], Error>();

  // @dts-jest:pass:snap -> TH.EmptyAction<"FETCH_USERS_REQUEST">
  fetchUsersAsync.request(); /* => {
    type: 'FETCH_USERS_REQUEST'
  } */

  // @dts-jest:pass:snap -> TH.PayloadAction<"FETCH_USERS_SUCCESS", User[]>
  fetchUsersAsync.success([
    { firstName: 'Piotr', lastName: 'Witek' },
  ]); /* => {
    type: 'FETCH_USERS_SUCCESS', payload: [{ firstName: 'Piotr', lastName: 'Witek' }]
  } */

  // @dts-jest:pass:snap -> TH.PayloadAction<"FETCH_USERS_FAILURE", Error>
  fetchUsersAsync.failure(
    Error('reason')
  ); /* => {
    type: 'FETCH_USERS_FAILURE', payload: Error('reason')
  } */

  const action = {
    type: 'FETCH_USERS_SUCCESS',
    payload: [{ firstName: 'Piotr', lastName: 'Witek' }],
  } as TH.Action;
  // @dts-jest:pass:snap -> "FETCH_USERS_SUCCESS"
  fetchUsersAsync.success.type; // => 'FETCH_USERS_SUCCESS'
  // @dts-jest:pass:snap -> boolean
  fetchUsersAsync.success.match(action); // => true
  if (fetchUsersAsync.success.match(action)) {
    // @dts-jest:pass:snap -> User[]
    action.payload; // => [{ firstName: 'Piotr', lastName: 'Witek' }]
  }

  // @dts-jest:fail:snap -> Property 'cancel' does not exist on type '{ request: ActionCreatorBuilder<"FETCH_USERS_REQUEST", undefined, undefined>; success: ActionCreatorBuilder<"FETCH_USERS_SUCCESS", User[], undefined>; failure: ActionCreatorBuilder<...>; }'.
  fetchUsersAsync.cancel;

  const fn = (
    a: AsyncActionCreatorBuilder<
      ['FETCH_USERS_REQUEST', undefined],
      ['FETCH_USERS_SUCCESS', User[]],
      ['FETCH_USERS_FAILURE', Error]
    >
  ) => {
    a.request;
    a.success;
    a.failure;
    // @ts-ignore
    a.cancel;
    return a;
  };
  // @dts-jest:pass:snap -> { request: TH.ActionCreatorBuilder<"FETCH_USERS_REQUEST", undefined, never>; success: TH.ActionCreatorBuilder<"FETCH_USERS_SUCCESS", User[], never>; failure: TH.ActionCreatorBuilder<"FETCH_USERS_FAILURE", Error, never>; }
  fn(fetchUsersAsync);
}

// @dts-jest:group async action with any type
{
  const fetchUsersAsync = createAsyncAction(
    'FETCH_USERS_REQUEST',
    'FETCH_USERS_SUCCESS',
    'FETCH_USERS_FAILURE'
  )<any, any[], any>();

  // @dts-jest:pass:snap -> TH.PayloadAction<"FETCH_USERS_REQUEST", any>
  fetchUsersAsync.request(
    1
  ); /* => {
    type: 'FETCH_USERS_REQUEST', payload: 1,
  } */

  // @dts-jest:pass:snap -> TH.PayloadAction<"FETCH_USERS_SUCCESS", any[]>
  fetchUsersAsync.success([
    1,
  ]); /* => {
    type: 'FETCH_USERS_SUCCESS', payload: [1],
  } */

  // @dts-jest:pass:snap -> TH.PayloadAction<"FETCH_USERS_FAILURE", any>
  fetchUsersAsync.failure(
    1
  ); /* => {
    type: 'FETCH_USERS_FAILURE', payload: 1,
  } */

  // @dts-jest:fail:snap -> Property 'cancel' does not exist on type '{ request: ActionCreatorBuilder<"FETCH_USERS_REQUEST", any, undefined>; success: ActionCreatorBuilder<"FETCH_USERS_SUCCESS", any[], undefined>; failure: ActionCreatorBuilder<...>; }'.
  fetchUsersAsync.cancel;

  const fn = (
    a: AsyncActionCreatorBuilder<
      ['FETCH_USERS_REQUEST', any],
      ['FETCH_USERS_SUCCESS', any[]],
      ['FETCH_USERS_FAILURE', any]
    >
  ) => {
    a.request;
    a.success;
    a.failure;
    // @ts-ignore
    a.cancel;
    return a;
  };
  // @dts-jest:pass:snap -> { request: TH.ActionCreatorBuilder<"FETCH_USERS_REQUEST", any, any>; success: TH.ActionCreatorBuilder<"FETCH_USERS_SUCCESS", any[], never>; failure: TH.ActionCreatorBuilder<"FETCH_USERS_FAILURE", any, any>; }
  fn(fetchUsersAsync);
}

// @dts-jest:group async action with cancel
{
  const fetchUsersAsync = createAsyncAction(
    'FETCH_USERS_REQUEST',
    'FETCH_USERS_SUCCESS',
    'FETCH_USERS_FAILURE',
    'FETCH_USERS_CANCEL'
  )<undefined, User[], Error, string>();

  // @dts-jest:pass:snap -> TH.EmptyAction<"FETCH_USERS_REQUEST">
  fetchUsersAsync.request(); /* => {
    type: 'FETCH_USERS_REQUEST'
  } */

  // @dts-jest:pass:snap -> TH.PayloadAction<"FETCH_USERS_SUCCESS", User[]>
  fetchUsersAsync.success([
    { firstName: 'Piotr', lastName: 'Witek' },
  ]); /* => {
    type: 'FETCH_USERS_SUCCESS', payload: [{ firstName: 'Piotr', lastName: 'Witek' }]
  } */

  // @dts-jest:pass:snap -> TH.PayloadAction<"FETCH_USERS_FAILURE", Error>
  fetchUsersAsync.failure(
    Error('reason')
  ); /* => {
    type: 'FETCH_USERS_FAILURE', payload: Error('reason')
  } */

  // @dts-jest:pass:snap -> TH.PayloadAction<"FETCH_USERS_CANCEL", string>
  fetchUsersAsync.cancel(
    'reason'
  ); /* => {
    type: 'FETCH_USERS_CANCEL', payload: 'reason'
  } */

  const fn = (
    a: AsyncActionCreatorBuilder<
      ['FETCH_USERS_REQUEST', undefined],
      ['FETCH_USERS_SUCCESS', User[]],
      ['FETCH_USERS_FAILURE', Error],
      ['FETCH_USERS_CANCEL', string]
    >
  ) => {
    {
      a.request;
      a.success;
      a.failure;
      a.cancel;
      return a;
    }
  };
  // @dts-jest:pass:snap -> { request: TH.ActionCreatorBuilder<"FETCH_USERS_REQUEST", undefined, never>; success: TH.ActionCreatorBuilder<"FETCH_USERS_SUCCESS", User[], never>; failure: TH.ActionCreatorBuilder<"FETCH_USERS_FAILURE", Error, never>; cancel: TH.ActionCreatorBuilder<"FETCH_USERS_CANCEL", string, never>; }
  fn(fetchUsersAsync);
}

// @dts-jest:group async action with meta
{
  const fetchUsersAsync = createAsyncAction(
    'FETCH_USERS_REQUEST',
    'FETCH_USERS_SUCCESS',
    'FETCH_USERS_FAILURE'
  )<[undefined, number], User[], [Error, number]>();

  // @dts-jest:pass:snap -> TH.PayloadMetaAction<"FETCH_USERS_REQUEST", undefined, number>
  fetchUsersAsync.request(
    undefined,
    111
  ); /* => {
    type: 'FETCH_USERS_REQUEST', meta: 111
  } */

  // @dts-jest:pass:snap -> TH.PayloadAction<"FETCH_USERS_SUCCESS", User[]>
  fetchUsersAsync.success([
    { firstName: 'Piotr', lastName: 'Witek' },
  ]); /* => {
    type: 'FETCH_USERS_SUCCESS', payload: [{ firstName: 'Piotr', lastName: 'Witek' }]
  } */

  // @dts-jest:pass:snap -> TH.PayloadMetaAction<"FETCH_USERS_FAILURE", Error, number>
  fetchUsersAsync.failure(
    Error('reason'),
    111
  ); /* => {
    type: 'FETCH_USERS_FAILURE', payload: Error('reason'), meta: 111
  } */

  // @dts-jest:fail:snap -> Property 'cancel' does not exist on type '{ request: ActionCreatorBuilder<"FETCH_USERS_REQUEST", undefined, number>; success: ActionCreatorBuilder<"FETCH_USERS_SUCCESS", User[], undefined>; failure: ActionCreatorBuilder<...>; }'.
  fetchUsersAsync.cancel;

  const fn = (
    a: AsyncActionCreatorBuilder<
      ['FETCH_USERS_REQUEST', [undefined, number]],
      ['FETCH_USERS_SUCCESS', User[]],
      ['FETCH_USERS_FAILURE', [Error, number]]
    >
  ) => {
    a.request;
    a.success;
    a.failure;
    // @ts-ignore
    a.cancel;
    return a;
  };
  // @dts-jest:pass:snap -> { request: TH.ActionCreatorBuilder<"FETCH_USERS_REQUEST", undefined, number>; success: TH.ActionCreatorBuilder<"FETCH_USERS_SUCCESS", User[], never>; failure: TH.ActionCreatorBuilder<"FETCH_USERS_FAILURE", Error, number>; }
  fn(fetchUsersAsync);
}

// @dts-jest:group async action with meta with cancel
{
  const fetchUsersAsync = createAsyncAction(
    'FETCH_USERS_REQUEST',
    'FETCH_USERS_SUCCESS',
    'FETCH_USERS_FAILURE',
    'FETCH_USERS_CANCEL'
  )<[undefined, number], User[], [Error, number], string>();

  // @dts-jest:pass:snap -> TH.PayloadMetaAction<"FETCH_USERS_REQUEST", undefined, number>
  fetchUsersAsync.request(
    undefined,
    111
  ); /* => {
    type: 'FETCH_USERS_REQUEST', meta: 111
  } */

  // @dts-jest:pass:snap -> TH.PayloadAction<"FETCH_USERS_SUCCESS", User[]>
  fetchUsersAsync.success([
    { firstName: 'Piotr', lastName: 'Witek' },
  ]); /* => {
    type: 'FETCH_USERS_SUCCESS', payload: [{ firstName: 'Piotr', lastName: 'Witek' }]
  } */

  // @dts-jest:pass:snap -> TH.PayloadMetaAction<"FETCH_USERS_FAILURE", Error, number>
  fetchUsersAsync.failure(
    Error('reason'),
    111
  ); /* => {
    type: 'FETCH_USERS_FAILURE', payload: Error('reason'), meta: 111
  } */

  // @dts-jest:pass:snap -> TH.PayloadAction<"FETCH_USERS_CANCEL", string>
  fetchUsersAsync.cancel(
    'reason'
  ); /* => {
    type: 'FETCH_USERS_CANCEL', payload: 'reason'
  } */

  const fn = (
    a: AsyncActionCreatorBuilder<
      ['FETCH_USERS_REQUEST', [undefined, number]],
      ['FETCH_USERS_SUCCESS', User[]],
      ['FETCH_USERS_FAILURE', [Error, number]],
      ['FETCH_USERS_CANCEL', string]
    >
  ) => {
    a.request;
    a.success;
    a.failure;
    a.cancel;
    return a;
  };
  // @dts-jest:pass:snap -> { request: TH.ActionCreatorBuilder<"FETCH_USERS_REQUEST", undefined, number>; success: TH.ActionCreatorBuilder<"FETCH_USERS_SUCCESS", User[], never>; failure: TH.ActionCreatorBuilder<"FETCH_USERS_FAILURE", Error, number>; cancel: TH.ActionCreatorBuilder<"FETCH_USERS_CANCEL", string, never>; }
  fn(fetchUsersAsync);
}

// @dts-jest:group async action with mappers
{
  const fetchUserMappers = createAsyncAction(
    'FETCH_USER_REQUEST',
    [
      'FETCH_USER_SUCCESS',
      ({ firstName, lastName }: User) => `${firstName} ${lastName}`,
    ],
    [
      'FETCH_USER_FAILURE',
      (error: Error, meta: number) => error,
      (error: Error, meta: number) => meta,
    ]
  )();

  // @dts-jest:pass:snap -> TH.EmptyAction<"FETCH_USER_REQUEST">
  fetchUserMappers.request(); /* => {
    type: 'FETCH_USER_REQUEST'
  } */

  // @dts-jest:pass:snap -> TH.PayloadAction<"FETCH_USER_SUCCESS", string>
  fetchUserMappers.success({
    firstName: 'Piotr',
    lastName: 'Witek',
  }); /* => {
    type: 'FETCH_USER_SUCCESS',
    payload: 'Piotr Witek',
  } */

  // @dts-jest:pass:snap -> TH.PayloadMetaAction<"FETCH_USER_FAILURE", Error, number>
  fetchUserMappers.failure(
    Error('reason'),
    111
  ); /* => {
    type: 'FETCH_USER_FAILURE', payload: Error('reason'), meta: 111
  } */

  // @dts-jest:fail:snap -> Property 'cancel' does not exist on type '{ request: ActionCreatorBuilder<"FETCH_USER_REQUEST", undefined, undefined>; success: ((__0: User) => PayloadAction<"FETCH_USER_SUCCESS", string>) & ActionCreatorTypeMetadata<...>; failure: ((error: Error, meta: number) => PayloadMetaAction<...>) & ActionCreatorTypeMetadata<...>; }'.
  fetchUserMappers.cancel;

  const fn = (
    a: AsyncActionCreatorBuilder<
      ['FETCH_USER_REQUEST', undefined],
      ['FETCH_USER_SUCCESS', [User], string],
      ['FETCH_USER_FAILURE', [Error, number], [Error, number]]
    >
  ) => {
    a.request;
    a.success;
    a.failure;
    // @ts-ignore
    a.cancel;
    return a;
  };
  // @dts-jest:pass:snap -> { request: TH.ActionCreatorBuilder<"FETCH_USER_REQUEST", undefined, never>; success: ((args_0: User) => TH.PayloadAction<"FETCH_USER_SUCCESS", string>) & TH.ActionCreatorTypeMetadata<"FETCH_USER_SUCCESS", TH.PayloadAction<"FETCH_USER_SUCCESS", string>>; failure: ((args_0: Error, args_1: number) => TH.PayloadMetaAction<"FETCH_USER_FAILURE", Error, number>) & TH.ActionCreatorTypeMetadata<"FETCH_USER_FAILURE", TH.PayloadMetaAction<"FETCH_USER_FAILURE", Error, number>>; }
  fn(fetchUserMappers);
}

// @dts-jest:group async action with mappers with cancel
{
  const fetchUserMappers = createAsyncAction(
    'FETCH_USER_REQUEST',
    [
      'FETCH_USER_SUCCESS',
      ({ firstName, lastName }: User) => `${firstName} ${lastName}`,
    ],
    [
      'FETCH_USER_FAILURE',
      (error: Error, meta: number) => error,
      (error: Error, meta: number) => meta,
    ],
    ['FETCH_USER_CANCEL', undefined, (meta: number) => meta]
  )();

  // @dts-jest:pass:snap -> TH.EmptyAction<"FETCH_USER_REQUEST">
  fetchUserMappers.request(); /* => {
    type: 'FETCH_USER_REQUEST'
  } */

  // @dts-jest:pass:snap -> TH.PayloadAction<"FETCH_USER_SUCCESS", string>
  fetchUserMappers.success({
    firstName: 'Piotr',
    lastName: 'Witek',
  }); /* => {
    type: 'FETCH_USER_SUCCESS',
    payload: 'Piotr Witek',
  } */

  // @dts-jest:pass:snap -> TH.PayloadMetaAction<"FETCH_USER_FAILURE", Error, number>
  fetchUserMappers.failure(
    Error('reason'),
    111
  ); /* => {
    type: 'FETCH_USER_FAILURE', payload: Error('reason'), meta: 111
  } */

  // @dts-jest:pass:snap -> TH.PayloadMetaAction<"FETCH_USER_CANCEL", undefined, number>
  fetchUserMappers.cancel(
    111
  ); /* => {
    type: 'FETCH_USER_CANCEL', meta: 111
  } */

  const fn = (
    a: AsyncActionCreatorBuilder<
      ['FETCH_USER_REQUEST', undefined],
      ['FETCH_USER_SUCCESS', [User], string],
      ['FETCH_USER_FAILURE', [Error, number], [Error, number]],
      ['FETCH_USER_CANCEL', [number], [undefined, number]]
    >
  ) => {
    a.request;
    a.success;
    a.failure;
    a.cancel;
    return a;
  };
  // @dts-jest:pass:snap -> { request: TH.ActionCreatorBuilder<"FETCH_USER_REQUEST", undefined, never>; success: ((args_0: User) => TH.PayloadAction<"FETCH_USER_SUCCESS", string>) & TH.ActionCreatorTypeMetadata<"FETCH_USER_SUCCESS", TH.PayloadAction<"FETCH_USER_SUCCESS", string>>; failure: ((args_0: Error, args_1: number) => TH.PayloadMetaAction<"FETCH_USER_FAILURE", Error, number>) & TH.ActionCreatorTypeMetadata<"FETCH_USER_FAILURE", TH.PayloadMetaAction<"FETCH_USER_FAILURE", Error, number>>; cancel: ((args_0: number) => TH.PayloadMetaAction<"FETCH_USER_CANCEL", undefined, number>) & TH.ActionCreatorTypeMetadata<"FETCH_USER_CANCEL", TH.PayloadMetaAction<"FETCH_USER_CANCEL", undefined, number>>; }
  fn(fetchUserMappers);
}

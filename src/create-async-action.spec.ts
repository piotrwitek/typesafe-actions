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

  // @dts-jest:pass:snap
  fetchUsersAsync.request(); /* => {
    type: 'FETCH_USERS_REQUEST'
  } */

  // @dts-jest:pass:snap
  fetchUsersAsync.success([
    { firstName: 'Piotr', lastName: 'Witek' },
  ]); /* => {
    type: 'FETCH_USERS_SUCCESS', payload: [{ firstName: 'Piotr', lastName: 'Witek' }]
  } */

  // @dts-jest:pass:snap
  fetchUsersAsync.failure(
    Error('reason')
  ); /* => {
    type: 'FETCH_USERS_FAILURE', payload: Error('reason')
  } */

  // @dts-jest:pass:snap
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
    a.cancel;
    return a;
  };
  // @dts-jest:pass:snap
  fn(fetchUsersAsync);
}

// @dts-jest:group async action with any type
{
  const fetchUsersAsync = createAsyncAction(
    'FETCH_USERS_REQUEST',
    'FETCH_USERS_SUCCESS',
    'FETCH_USERS_FAILURE'
  )<any, any[], any>();

  // @dts-jest:pass:snap
  fetchUsersAsync.request(
    1
  ); /* => {
    type: 'FETCH_USERS_REQUEST', payload: 1,
  } */

  // @dts-jest:pass:snap
  fetchUsersAsync.success([
    1,
  ]); /* => {
    type: 'FETCH_USERS_SUCCESS', payload: [1],
  } */

  // @dts-jest:pass:snap
  fetchUsersAsync.failure(
    1
  ); /* => {
    type: 'FETCH_USERS_FAILURE', payload: 1,
  } */

  // @dts-jest:pass:snap
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
    a.cancel;
    return a;
  };
  // @dts-jest:pass:snap
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

  // @dts-jest:pass:snap
  fetchUsersAsync.request(); /* => {
    type: 'FETCH_USERS_REQUEST'
  } */

  // @dts-jest:pass:snap
  fetchUsersAsync.success([
    { firstName: 'Piotr', lastName: 'Witek' },
  ]); /* => {
    type: 'FETCH_USERS_SUCCESS', payload: [{ firstName: 'Piotr', lastName: 'Witek' }]
  } */

  // @dts-jest:pass:snap
  fetchUsersAsync.failure(
    Error('reason')
  ); /* => {
    type: 'FETCH_USERS_FAILURE', payload: Error('reason')
  } */

  // @dts-jest:pass:snap
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
  // @dts-jest:pass:snap
  fn(fetchUsersAsync);
}

// @dts-jest:group async action with meta
{
  const fetchUsersAsync = createAsyncAction(
    'FETCH_USERS_REQUEST',
    'FETCH_USERS_SUCCESS',
    'FETCH_USERS_FAILURE'
  )<[undefined, number], User[], [Error, number]>();

  // @dts-jest:pass:snap
  fetchUsersAsync.request(
    undefined,
    111
  ); /* => {
    type: 'FETCH_USERS_REQUEST', meta: 111
  } */

  // @dts-jest:pass:snap
  fetchUsersAsync.success([
    { firstName: 'Piotr', lastName: 'Witek' },
  ]); /* => {
    type: 'FETCH_USERS_SUCCESS', payload: [{ firstName: 'Piotr', lastName: 'Witek' }]
  } */

  // @dts-jest:pass:snap
  fetchUsersAsync.failure(
    Error('reason'),
    111
  ); /* => {
    type: 'FETCH_USERS_FAILURE', payload: Error('reason'), meta: 111
  } */

  // @dts-jest:pass:snap
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
    a.cancel;
    return a;
  };
  // @dts-jest:pass:snap
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

  // @dts-jest:pass:snap
  fetchUsersAsync.request(
    undefined,
    111
  ); /* => {
    type: 'FETCH_USERS_REQUEST', meta: 111
  } */

  // @dts-jest:pass:snap
  fetchUsersAsync.success([
    { firstName: 'Piotr', lastName: 'Witek' },
  ]); /* => {
    type: 'FETCH_USERS_SUCCESS', payload: [{ firstName: 'Piotr', lastName: 'Witek' }]
  } */

  // @dts-jest:pass:snap
  fetchUsersAsync.failure(
    Error('reason'),
    111
  ); /* => {
    type: 'FETCH_USERS_FAILURE', payload: Error('reason'), meta: 111
  } */

  // @dts-jest:pass:snap
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
  // @dts-jest:pass:snap
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

  // @dts-jest:pass:snap
  fetchUserMappers.request(); /* => {
    type: 'FETCH_USER_REQUEST'
  } */

  // @dts-jest:pass:snap
  fetchUserMappers.success({
    firstName: 'Piotr',
    lastName: 'Witek',
  }); /* => {
    type: 'FETCH_USER_SUCCESS',
    payload: 'Piotr Witek',
  } */

  // @dts-jest:pass:snap
  fetchUserMappers.failure(
    Error('reason'),
    111
  ); /* => {
    type: 'FETCH_USER_FAILURE', payload: Error('reason'), meta: 111
  } */

  // @dts-jest:pass:snap
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
    a.cancel;
    return a;
  };
  // @dts-jest:pass:snap
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

  // @dts-jest:pass:snap
  fetchUserMappers.request(); /* => {
    type: 'FETCH_USER_REQUEST'
  } */

  // @dts-jest:pass:snap
  fetchUserMappers.success({
    firstName: 'Piotr',
    lastName: 'Witek',
  }); /* => {
    type: 'FETCH_USER_SUCCESS',
    payload: 'Piotr Witek',
  } */

  // @dts-jest:pass:snap
  fetchUserMappers.failure(
    Error('reason'),
    111
  ); /* => {
    type: 'FETCH_USER_FAILURE', payload: Error('reason'), meta: 111
  } */

  // @dts-jest:pass:snap
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
  // @dts-jest:pass:snap
  fn(fetchUserMappers);
}

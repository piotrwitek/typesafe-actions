import * as T from './type-helpers';
import { createAsyncAction, AsyncActionCreator } from './create-async-action';

type User = { firstName: string; lastName: string };

// @dts-jest:group async action with undefined type
{
  const fetchUsersAsync = createAsyncAction(
    'FETCH_USERS_REQUEST',
    'FETCH_USERS_SUCCESS',
    'FETCH_USERS_FAILURE'
  )<undefined, User[], Error>();

  const fn = (
    a: AsyncActionCreator<
      ['FETCH_USERS_REQUEST', undefined],
      ['FETCH_USERS_SUCCESS', User[]],
      ['FETCH_USERS_FAILURE', Error]
    >
  ) => a;
  // @dts-jest:pass:snap
  fn(fetchUsersAsync);

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

  // @dts-jest:fail:snap
  fetchUsersAsync.cancel;
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
}

// @dts-jest:group async action with cancel
{
  const fetchUsersAsync = createAsyncAction(
    'FETCH_USERS_REQUEST',
    'FETCH_USERS_SUCCESS',
    'FETCH_USERS_FAILURE',
    'FETCH_USERS_CANCEL'
  )<undefined, User[], Error, string>();

  const fn = (
    a: AsyncActionCreator<
      ['FETCH_USERS_REQUEST', undefined],
      ['FETCH_USERS_SUCCESS', User[]],
      ['FETCH_USERS_FAILURE', Error],
      ['FETCH_USERS_CANCEL', string]
    >
  ) => a;
  // @dts-jest:pass:snap
  fn(fetchUsersAsync);

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
}

// @dts-jest:group async action with meta
{
  const fetchUsersAsync = createAsyncAction(
    'FETCH_USERS_REQUEST',
    'FETCH_USERS_SUCCESS',
    'FETCH_USERS_FAILURE',
    'FETCH_USERS_CANCEL'
  )<undefined, User[], Error, string, 1, 2, undefined, 4>();

  const fn = (
    a: AsyncActionCreator<
      ['FETCH_USERS_REQUEST', undefined, 1],
      ['FETCH_USERS_SUCCESS', User[], 2],
      ['FETCH_USERS_FAILURE', Error],
      ['FETCH_USERS_CANCEL', string, 4]
    >
  ) => a;
  // @dts-jest:pass:snap
  fn(fetchUsersAsync);

  // @dts-jest:pass:snap
  fetchUsersAsync.request(
    undefined,
    1
  ); /* => {
    type: 'FETCH_USERS_REQUEST', meta: 1
  } */

  // @dts-jest:pass:snap
  fetchUsersAsync.success(
    [{ firstName: 'Piotr', lastName: 'Witek' }],
    2
  ); /* => {
    type: 'FETCH_USERS_SUCCESS', meta: 2, payload: [{ firstName: 'Piotr', lastName: 'Witek' }]
  } */

  // @dts-jest:pass:snap
  fetchUsersAsync.failure(
    Error('reason')
  ); /* => {
    type: 'FETCH_USERS_FAILURE', payload: Error('reason')
  } */

  // @dts-jest:pass:snap
  fetchUsersAsync.cancel(
    'reason',
    4
  ); /* => {
    type: 'FETCH_USERS_CANCEL', meta: 4, payload: 'reason'
  } */
}

// @dts-jest:group async action with meta without cancel
{
  const fetchUsersAsync = createAsyncAction(
    'FETCH_USERS_REQUEST',
    'FETCH_USERS_SUCCESS',
    'FETCH_USERS_FAILURE'
  )<undefined, User[], Error, undefined, 1, 2, undefined>();

  const fn = (
    a: AsyncActionCreator<
      ['FETCH_USERS_REQUEST', undefined, 1],
      ['FETCH_USERS_SUCCESS', User[], 2],
      ['FETCH_USERS_FAILURE', Error]
    >
  ) => a;
  // @dts-jest:pass:snap
  fn(fetchUsersAsync);

  // @dts-jest:pass:snap
  fetchUsersAsync.request(
    undefined,
    1
  ); /* => {
    type: 'FETCH_USERS_REQUEST', meta: 1
  } */

  // @dts-jest:pass:snap
  fetchUsersAsync.success(
    [{ firstName: 'Piotr', lastName: 'Witek' }],
    2
  ); /* => {
    type: 'FETCH_USERS_SUCCESS', meta: 2, payload: [{ firstName: 'Piotr', lastName: 'Witek' }]
  } */

  // @dts-jest:pass:snap
  fetchUsersAsync.failure(
    Error('reason')
  ); /* => {
    type: 'FETCH_USERS_FAILURE', payload: Error('reason')
  } */

  // @dts-jest:fail:snap
  fetchUsersAsync.cancel;
}
// @dts-jest:group async action with mappers
// {
//   const fetchUserMappers = createAsyncAction(
//     'FETCH_USER_REQUEST',
//     'FETCH_USER_SUCCESS',
//     'FETCH_USER_FAILURE'
//   ).withMappers(
//     (id: string) => ({ id }), // request mapper
//     ({ firstName, lastName }: User) => `${firstName} ${lastName}`, // success mapper
//     () => 'hardcoded error' // error mapper
//   );

//   const requestResult: {
//     type: 'FETCH_USER_REQUEST';
//     payload: { id: string };
//   } = fetchUserMappers.request('fake_id');
//   expect(requestResult).toEqual({ type: 'FETCH_USER_REQUEST', payload: { id: 'fake_id' } });
//   const successResult: {
//     type: 'FETCH_USER_SUCCESS';
//     payload: string;
//   } = fetchUserMappers.success({
//     firstName: 'Piotr',
//     lastName: 'Witek',
//   });
//   expect(successResult).toEqual({
//     type: 'FETCH_USER_SUCCESS',
//     payload: 'Piotr Witek',
//   });
//   const failureResult: {
//     type: 'FETCH_USER_FAILURE';
//     payload: string;
//   } = fetchUserMappers.failure();
//   expect(failureResult).toEqual({
//     type: 'FETCH_USER_FAILURE',
//     payload: 'hardcoded error',
//   });
// }

// @dts-jest:group async action with unions
// {
//   const fetchUserMappers = createAsyncAction(
//     'FETCH_USER_REQUEST',
//     'FETCH_USER_SUCCESS',
//     'FETCH_USER_FAILURE'
//   ).withMappers(
//     (id: string | number) => ({ id }), // request mapper
//     ({ firstName, lastName }: User | undefined) => `${firstName} ${lastName}`, // success mapper
//     (error: boolean | string) => error // error mapper
//   );

//   const requestResult: {
//     type: 'FETCH_USER_REQUEST';
//     payload: { id: string | number };
//   } = fetchUserMappers.request(2);
//   expect(requestResult).toEqual({ type: 'FETCH_USER_REQUEST', payload: { id: 2 } });
//   const successResult: {
//     type: 'FETCH_USER_SUCCESS';
//     payload: string | undefined;
//   } = fetchUserMappers.success(undefined);
//   expect(successResult).toEqual({
//     type: 'FETCH_USER_SUCCESS',
//     payload: undefined,
//   });
//   const failureResult: {
//     type: 'FETCH_USER_FAILURE';
//     payload: boolean | string;
//   } = fetchUserMappers.failure(true);
//   expect(failureResult).toEqual({
//     type: 'FETCH_USER_FAILURE',
//     payload: true,
//   });
// }

// NEW API PROPOSAL:
// - WITH MAP
// const getTodoAsyncMap = createAsyncAction(
//   'GET_TODO_REQUEST',
//   'GET_TODO_SUCCESS',
//   'GET_TODO_FAILURE'
// ).map(...);

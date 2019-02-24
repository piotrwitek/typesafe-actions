import * as T from './type-helpers';
import { createAsyncAction } from './create-async-action';

it.skip('skip', () => undefined);

type User = { firstName: string; lastName: string };

describe('async action with undefined type', () => {
  const fetchUsers = createAsyncAction(
    'FETCH_USERS_REQUEST',
    'FETCH_USERS_SUCCESS',
    'FETCH_USERS_FAILURE'
  )<undefined, User[], Error>();

  // @dts-jest:pass:snap -> T.EmptyAction<"FETCH_USERS_REQUEST">
  fetchUsers.request(); /* => {
    type: 'FETCH_USERS_REQUEST'
  } */

  // @dts-jest:pass:snap -> T.PayloadAction<"FETCH_USERS_SUCCESS", User[]>
  fetchUsers.success([
    { firstName: 'Piotr', lastName: 'Witek' },
  ]); /* => {
    type: 'FETCH_USERS_SUCCESS', payload: [{ firstName: 'Piotr', lastName: 'Witek' }]
  } */

  // @dts-jest:pass:snap -> T.PayloadAction<"FETCH_USERS_FAILURE", Error>
  fetchUsers.failure(
    Error('reason')
  ); /* => {
    type: 'FETCH_USERS_FAILURE', payload: Error('reason')
  } */
});

describe('async action with any type', () => {
  const fetchUsers = createAsyncAction(
    'FETCH_USERS_REQUEST',
    'FETCH_USERS_SUCCESS',
    'FETCH_USERS_FAILURE'
  )<any, any[], any>();

  // @dts-jest:pass:snap -> T.PayloadAction<"FETCH_USERS_REQUEST", any>
  fetchUsers.request(
    1
  ); /* => {
    type: 'FETCH_USERS_REQUEST', payload: 1,
  } */

  // @dts-jest:pass:snap -> T.PayloadAction<"FETCH_USERS_SUCCESS", any[]>
  fetchUsers.success([
    1,
  ]); /* => {
    type: 'FETCH_USERS_SUCCESS', payload: [1],
  } */

  // @dts-jest:pass:snap -> T.PayloadAction<"FETCH_USERS_FAILURE", any>
  fetchUsers.failure(
    1
  ); /* => {
    type: 'FETCH_USERS_FAILURE', payload: 1,
  } */
});

// describe('should create an async action with mappers', () => {
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
// });

// describe('should create an async action with unions', () => {
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
// });

// NEW API PROPOSAL:
// - WITH MAP
// const getTodoAsyncMap = createAsyncAction(
//   'GET_TODO_REQUEST',
//   'GET_TODO_SUCCESS',
//   'GET_TODO_FAILURE'
// ).map(...);

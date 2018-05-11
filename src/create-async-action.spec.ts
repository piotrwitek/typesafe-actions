import { createAsyncAction } from './create-async-action';

type User = { firstName: string; lastName: string };
describe('createAsyncAction', () => {
  it('should create an async action with types', () => {
    // NOTE: with `void` type you can make explicit no arguments needed for this action creator
    const fetchUserTypes = createAsyncAction(
      'FETCH_USER_REQUEST',
      'FETCH_USER_SUCCESS',
      'FETCH_USER_FAILURE'
    )<void, User, Error>();

    const requestResult: {
      type: 'FETCH_USER_REQUEST';
    } = fetchUserTypes.request();
    expect(requestResult).toEqual({ type: 'FETCH_USER_REQUEST' });
    const successResult: {
      type: 'FETCH_USER_SUCCESS';
      payload: User;
    } = fetchUserTypes.success({
      firstName: 'Piotr',
      lastName: 'Witek',
    });
    expect(successResult).toEqual({
      type: 'FETCH_USER_SUCCESS',
      payload: {
        firstName: 'Piotr',
        lastName: 'Witek',
      },
    });
    const failureResult: {
      type: 'FETCH_USER_FAILURE';
      payload: Error;
    } = fetchUserTypes.failure(Error('reason'));
    expect(failureResult).toEqual({
      type: 'FETCH_USER_FAILURE',
      payload: Error('reason'),
    });
  });

  // it('should create an async action with mappers', () => {
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

  // it('should create an async action with unions', () => {
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
});

// NEW API
// const getTodoAsync = createAsyncAction(
//   'GET_TODO_REQUEST',
//   'GET_TODO_SUCCESS',
//   'GET_TODO_FAILURE'
// )<{ token: string; id: string }, Todo, Error>();

// WITH MAP (PROPOSAL):
// const getTodoAsyncMap = createAsyncAction(
//   'GET_TODO_REQUEST',
//   'GET_TODO_SUCCESS',
//   'GET_TODO_FAILURE'
// ).map(...);

import { buildAsyncAction } from './build-async-action';

type User = { id: string; name: string };
describe('buildAsyncAction', () => {
  it('should create an async action', () => {
    const fetchUser = buildAsyncAction(
      'FETCH_USER_REQUEST',
      'FETCH_USER_SUCCESS',
      'FETCH_USER_FAILURE'
    ).withTypes<string, User, Error>();
  });

  it('should create an async action with mappers', () => {
    const fetchUser = buildAsyncAction(
      'FETCH_USER_REQUEST',
      'FETCH_USER_SUCCESS',
      'FETCH_USER_FAILURE'
    ).withMappers<string, User, Error>(
      id => ({ id }), // request mapper
      ({ firstName, lastName }) => `${firstName} ${lastName}`, // success mapper
      ({ message }) => message // error mapper
    );

    const requestResult: { type: 'FETCH_USER_REQUEST' } = fetchUser.request();
    expect(requestResult).toEqual({ type: 'FETCH_USER_REQUEST' });
    const successResult: {
      type: 'FETCH_USER_SUCCESS';
      payload: { id: number; name: string };
    } = fetchUser.success({
      id: 1,
      name: 'Piotr',
    });
    expect(successResult).toEqual({
      type: 'FETCH_USER_SUCCESS',
      payload: { id: 1, name: 'Piotr' },
    });
    const failureResult: {
      type: 'FETCH_USER_FAILURE';
      payload: string;
      meta: string;
    } = fetchUser.failure('not found', 'fake_trace_id');
    expect(failureResult).toEqual({
      type: 'FETCH_USER_FAILURE',
      payload: 'not found',
      meta: 'fake_trace_id',
    });
  });
});

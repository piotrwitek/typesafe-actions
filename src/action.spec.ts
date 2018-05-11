import { action } from './';

describe('action', () => {
  it('should create a simple payload action', () => {
    const createUser = (id: number, name: string) =>
      action('CREATE_USER', { id, name });

    const actionResult: {
      type: 'CREATE_USER';
      payload: { id: number; name: string };
    } = createUser(1, 'Piotr');
    expect(actionResult).toEqual({
      type: 'CREATE_USER',
      payload: { id: 1, name: 'Piotr' },
    });
  });

  it('should create an object with nested actions', () => {
    const fetchUser = {
      request: () => action('FETCH_USER_REQUEST'),
      success: (user: { id: number; name: string }) =>
        action('FETCH_USER_SUCCESS', user),
      failure: (reason: string, traceId: string) =>
        action('FETCH_USER_FAILURE', reason, traceId),
    };

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

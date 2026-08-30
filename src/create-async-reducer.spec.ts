import { createAsyncAction } from './create-async-action';
import {
  createAsyncReducer,
  createErrorReducer,
  createLoadingReducer,
} from './create-async-reducer';

const fetchUser = createAsyncAction(
  'FETCH_USER_REQUEST',
  'FETCH_USER_SUCCESS',
  'FETCH_USER_FAILURE'
)<void, { id: string }, Error>();

describe('createLoadingReducer', () => {
  const reducer = createLoadingReducer(fetchUser);

  it('starts false', () => {
    expect(reducer(undefined, { type: '@@INIT' })).toBe(false);
  });

  it('turns true on request', () => {
    expect(reducer(false, fetchUser.request())).toBe(true);
  });

  it('turns false on success and failure', () => {
    expect(reducer(true, fetchUser.success({ id: '1' }))).toBe(false);
    expect(reducer(true, fetchUser.failure(new Error('nope')))).toBe(false);
  });
});

describe('createErrorReducer', () => {
  const reducer = createErrorReducer(fetchUser);
  const err = new Error('boom');

  it('stores failure payload', () => {
    expect(reducer(null, fetchUser.failure(err))).toBe(err);
  });

  it('clears on request and success', () => {
    expect(reducer(err, fetchUser.request())).toBe(null);
    expect(reducer(err, fetchUser.success({ id: '1' }))).toBe(null);
  });
});

describe('createAsyncReducer', () => {
  const reducer = createAsyncReducer<{ id: string }>(fetchUser);

  it('handles the async lifecycle', () => {
    const afterRequest = reducer(undefined, fetchUser.request());
    expect(afterRequest).toEqual({ loading: true, error: null, data: null });

    const afterSuccess = reducer(afterRequest, fetchUser.success({ id: '9' }));
    expect(afterSuccess).toEqual({
      loading: false,
      error: null,
      data: { id: '9' },
    });

    const afterFail = reducer(afterRequest, fetchUser.failure(new Error('x')));
    expect(afterFail.loading).toBe(false);
    expect(afterFail.error).toBeInstanceOf(Error);
  });
});

import { createAction } from './create-action';
import { createAsyncAction } from './create-async-action';
import { createReducer } from './create-reducer';
import {
  createAsyncReducer,
  createLoadingReducer,
  createErrorReducer,
} from './create-async-reducer';

// Test fixtures
type User = {
  id: number;
  name: string;
};

type UserState = {
  data: User | null;
  loading: boolean;
  error: Error | null;
};

const initialUserState: UserState = {
  data: null,
  loading: false,
  error: null,
};

// Async action creators for testing
const fetchUserActions = createAsyncAction(
  'FETCH_USER_REQUEST',
  'FETCH_USER_SUCCESS',
  'FETCH_USER_FAILURE'
)<void, User, Error>();

const fetchUserWithCancelActions = createAsyncAction(
  'FETCH_USER_CANCEL_REQUEST',
  'FETCH_USER_CANCEL_SUCCESS',
  'FETCH_USER_CANCEL_FAILURE',
  'FETCH_USER_CANCEL_CANCEL'
)<void, User, Error, string>();

// @dts-jest:group createAsyncReducer
{
  // @dts-jest:pass:snap
  createAsyncReducer;

  // Test basic usage with all handlers
  {
    const reducer = createAsyncReducer(initialUserState, fetchUserActions, {
      request: (state) => ({ ...state, loading: true, error: null }),
      success: (state, action) => ({
        ...state,
        loading: false,
        data: action.payload,
      }),
      failure: (state, action) => ({
        ...state,
        loading: false,
        error: action.payload,
      }),
    });

    // @dts-jest:pass:snap
    reducer;

    // Test initial state
    // @dts-jest:pass
    reducer(undefined, { type: 'UNKNOWN' } as any);

    // Test request action
    // @dts-jest:pass
    reducer(initialUserState, fetchUserActions.request());

    // Test success action
    // @dts-jest:pass
    reducer(
      { ...initialUserState, loading: true },
      fetchUserActions.success({ id: 1, name: 'John' })
    );

    // Test failure action
    // @dts-jest:pass
    reducer(
      { ...initialUserState, loading: true },
      fetchUserActions.failure(new Error('Network error'))
    );
  }

  // Test with cancel action
  {
    const reducer = createAsyncReducer(
      { loading: false, cancelled: false },
      fetchUserWithCancelActions,
      {
        request: (state) => ({ ...state, loading: true }),
        success: (state) => ({ ...state, loading: false }),
        failure: (state) => ({ ...state, loading: false }),
        cancel: (state) => ({ ...state, loading: false, cancelled: true }),
      }
    );

    // @dts-jest:pass
    reducer({ loading: true, cancelled: false }, fetchUserWithCancelActions.cancel('user clicked cancel'));
  }

  // Test with partial handlers (only success)
  {
    const reducer = createAsyncReducer(initialUserState, fetchUserActions, {
      success: (state, action) => ({
        ...state,
        data: action.payload,
      }),
    });

    // @dts-jest:pass
    reducer(initialUserState, fetchUserActions.request()); // should return unchanged state
    // @dts-jest:pass
    reducer(initialUserState, fetchUserActions.success({ id: 1, name: 'John' }));
  }
}

// @dts-jest:group createLoadingReducer
{
  // @dts-jest:pass:snap
  createLoadingReducer;

  {
    const loadingReducer = createLoadingReducer(fetchUserActions);

    // @dts-jest:pass:snap
    loadingReducer;

    // Test initial state
    // @dts-jest:pass
    loadingReducer(undefined, { type: 'UNKNOWN' } as any);

    // Test request action sets loading to true
    // @dts-jest:pass
    loadingReducer(false, fetchUserActions.request());

    // Test success action sets loading to false
    // @dts-jest:pass
    loadingReducer(true, fetchUserActions.success({ id: 1, name: 'John' }));

    // Test failure action sets loading to false
    // @dts-jest:pass
    loadingReducer(true, fetchUserActions.failure(new Error('fail')));

    // Test unknown action returns current state
    // @dts-jest:pass
    loadingReducer(true, { type: 'UNKNOWN' } as any);
  }
}

// @dts-jest:group createErrorReducer
{
  // @dts-jest:pass:snap
  createErrorReducer;

  {
    const errorReducer = createErrorReducer(fetchUserActions);

    // @dts-jest:pass:snap
    errorReducer;

    // Test initial state
    // @dts-jest:pass
    errorReducer(undefined, { type: 'UNKNOWN' } as any);

    // Test failure action sets error
    const testError = new Error('test error');
    // @dts-jest:pass
    errorReducer(null, fetchUserActions.failure(testError));

    // Test success action clears error
    // @dts-jest:pass
    errorReducer(testError, fetchUserActions.success({ id: 1, name: 'John' }));

    // Test unknown action returns current state
    // @dts-jest:pass
    errorReducer(testError, { type: 'UNKNOWN' } as any);
  }
}

// @dts-jest:group createAsyncReducer integration with createReducer
{
  // Test combining async reducer with existing reducer
  {
    const baseReducer = createReducer(initialUserState)
      .handleAction(
        createAction('RESET')(),
        () => initialUserState
      );

    const asyncEnhancedReducer = createAsyncReducer(
      initialUserState,
      fetchUserActions,
      {
        request: (state) => ({ ...state, loading: true, error: null }),
        success: (state, action) => ({
          ...state,
          loading: false,
          data: action.payload,
        }),
        failure: (state, action) => ({
          ...state,
          loading: false,
          error: action.payload,
        }),
      }
    );

    // @dts-jest:pass
    asyncEnhancedReducer(initialUserState, fetchUserActions.request());
    // @dts-jest:pass
    asyncEnhancedReducer(
      { ...initialUserState, loading: true },
      fetchUserActions.success({ id: 1, name: 'John' })
    );
  }
}

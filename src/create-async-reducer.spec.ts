import * as TH from './type-helpers';
import { testType } from './utils/testing';
import { createAction } from './create-action';
import { createAsyncAction } from './create-async-action';
import { createReducer } from './create-reducer';
import { getType } from './get-type';
import {
  ActionFromCreator,
  AsyncActionCreatorMap,
  AsyncFailurePayload,
  AsyncSuccessPayload,
  createAsyncReducer,
  createErrorReducer,
  createLoadingReducer,
} from './create-async-reducer';

type User = { firstName: string; lastName: string };

type AsyncState<TData, TError> = {
  loading: boolean;
  data: TData | null;
  error: TError | null;
};

const initialState: AsyncState<User, Error> = {
  loading: false,
  data: null,
  error: null,
};

const fetchUserAsync = createAsyncAction(
  'FETCH_USER_REQUEST',
  'FETCH_USER_SUCCESS',
  'FETCH_USER_FAILURE',
  'FETCH_USER_CANCEL'
)<undefined, User, Error, string>();

const fetchUserWithoutCancel = createAsyncAction(
  'FETCH_USER_NC_REQUEST',
  'FETCH_USER_NC_SUCCESS',
  'FETCH_USER_NC_FAILURE'
)<undefined, User, Error>();

const reset = createAction('RESET_USER')();

// @dts-jest:group createAsyncReducer
{
  const reducer = createAsyncReducer(initialState, fetchUserAsync, {
    request: (state, action) => {
      testType<TH.EmptyAction<'FETCH_USER_REQUEST'>>(action);
      return {
        ...state,
        loading: true,
        error: null,
      };
    },
    success: (state, action) => {
      testType<TH.PayloadAction<'FETCH_USER_SUCCESS', User>>(action);
      return {
        loading: false,
        data: action.payload,
        error: null,
      };
    },
    failure: (state, action) => {
      testType<TH.PayloadAction<'FETCH_USER_FAILURE', Error>>(action);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    cancel: (state, action) => {
      testType<TH.PayloadAction<'FETCH_USER_CANCEL', string>>(action);
      return {
        ...state,
        loading: false,
      };
    },
  });

  // @dts-jest:pass:snap
  reducer(
    undefined,
    fetchUserAsync.request()
  ); /* => {
    loading: true,
    data: null,
    error: null,
  } */

  // @dts-jest:pass:snap
  reducer(
    undefined,
    fetchUserAsync.success({
      firstName: 'Piotr',
      lastName: 'Witek',
    })
  ); /* => {
    loading: false,
    data: { firstName: 'Piotr', lastName: 'Witek' },
    error: null,
  } */

  // @dts-jest:pass:snap
  reducer(
    undefined,
    fetchUserAsync.failure(Error('reason'))
  ); /* => {
    loading: false,
    data: null,
    error: Error('reason'),
  } */

  // @dts-jest:pass:snap
  reducer(
    {
      loading: true,
      data: null,
      error: null,
    },
    fetchUserAsync.cancel('route-change')
  ); /* => {
    loading: false,
    data: null,
    error: null,
  } */

  // @dts-jest:pass
  reducer(initialState, { type: 'UNKNOWN' }); // => {"data": null, "error": null, "loading": false}

  // @dts-jest:pass
  Object.keys({ ...reducer.handlers }); // => ["FETCH_USER_REQUEST", "FETCH_USER_SUCCESS", "FETCH_USER_FAILURE", "FETCH_USER_CANCEL"]
}

// @dts-jest:group createAsyncReducer partial handlers
{
  const reducer = createAsyncReducer(initialState, fetchUserWithoutCancel, {
    success: (state, action) => ({
      ...state,
      data: action.payload,
    }),
  });

  // @dts-jest:pass
  reducer(initialState, fetchUserWithoutCancel.request()); // => {"data": null, "error": null, "loading": false}

  // @dts-jest:pass
  reducer(
    initialState,
    fetchUserWithoutCancel.success({
      firstName: 'Piotr',
      lastName: 'Witek',
    })
  ); /* => {
    loading: false,
    data: { firstName: 'Piotr', lastName: 'Witek' },
    error: null,
  } */

  // @dts-jest:pass
  Object.keys({ ...reducer.handlers }); // => ["FETCH_USER_NC_SUCCESS"]
}

// @dts-jest:group createAsyncReducer chain API
{
  const reducer = createAsyncReducer(initialState, fetchUserWithoutCancel, {
    request: state => ({ ...state, loading: true, error: null }),
    success: (state, action) => ({
      loading: false,
      data: action.payload,
      error: null,
    }),
    failure: (state, action) => ({
      ...state,
      loading: false,
      error: action.payload,
    }),
  }).handleAction(reset, () => initialState);

  // @dts-jest:pass
  reducer(
    {
      loading: true,
      data: { firstName: 'Piotr', lastName: 'Witek' },
      error: null,
    },
    reset()
  ); // => {"data": null, "error": null, "loading": false}

  // @dts-jest:pass
  Object.keys({ ...reducer.handlers }); // => ["FETCH_USER_NC_REQUEST", "FETCH_USER_NC_SUCCESS", "FETCH_USER_NC_FAILURE", "RESET_USER"]
}

// @dts-jest:group createAsyncReducer handlers composition
{
  const asyncReducer = createAsyncReducer(
    initialState,
    fetchUserWithoutCancel,
    {
      request: state => ({ ...state, loading: true }),
      success: (state, action) => ({
        loading: false,
        data: action.payload,
        error: null,
      }),
    }
  );

  const composed = createReducer(initialState, {
    ...asyncReducer.handlers,
    [getType(reset)]: () => initialState,
  });

  // @dts-jest:pass
  composed(
    {
      loading: false,
      data: { firstName: 'Piotr', lastName: 'Witek' },
      error: null,
    },
    reset()
  ); // => {"data": null, "error": null, "loading": false}
}

// @dts-jest:group createAsyncReducer in generic factories
{
  const fetchCurrentUserActions = createAsyncAction(
    'FETCH_CURRENT_USER_REQUEST',
    'FETCH_CURRENT_USER_SUCCESS',
    'FETCH_CURRENT_USER_FAILURE'
  )<undefined, User, Error>();

  const createDataReducer = <
    TAsyncAction extends AsyncActionCreatorMap<
      TH.EmptyAction<string>,
      TH.PayloadAction<string, any>,
      TH.PayloadAction<string, any>
    >
  >(
    asyncAction: TAsyncAction
  ) =>
    createAsyncReducer<
      AsyncState<
        AsyncSuccessPayload<TAsyncAction>,
        AsyncFailurePayload<TAsyncAction>
      >,
      TAsyncAction
    >(
      {
        loading: false,
        data: null,
        error: null,
      },
      asyncAction,
      {
        request: state => ({
          ...state,
          loading: true,
        }),
        success: (state, action) => {
          testType<AsyncSuccessPayload<TAsyncAction>>(action.payload);
          return {
            loading: false,
            data: action.payload,
            error: null,
          };
        },
        failure: (state, action) => {
          testType<AsyncFailurePayload<TAsyncAction>>(action.payload);
          return {
            ...state,
            loading: false,
            error: action.payload,
          };
        },
      }
    );

  const currentUserReducer = createDataReducer(fetchCurrentUserActions);

  // @dts-jest:pass:snap
  currentUserReducer(
    undefined,
    fetchCurrentUserActions.success({
      firstName: 'Piotr',
      lastName: 'Witek',
    })
  ); /* => {
    loading: false,
    data: { firstName: 'Piotr', lastName: 'Witek' },
    error: null,
  } */
}

// @dts-jest:group createLoadingReducer
{
  const loadingReducer = createLoadingReducer(fetchUserAsync);

  // @dts-jest:pass:snap
  loadingReducer(undefined, fetchUserAsync.request()); // => true

  // @dts-jest:pass:snap
  loadingReducer(
    true,
    fetchUserAsync.success({
      firstName: 'Piotr',
      lastName: 'Witek',
    })
  ); // => false

  // @dts-jest:pass
  loadingReducer(true, fetchUserAsync.failure(Error('reason'))); // => false

  // @dts-jest:pass
  loadingReducer(true, fetchUserAsync.cancel('route-change')); // => false

  // @dts-jest:pass
  loadingReducer(true, { type: 'UNKNOWN' }); // => true

  const customInitial = createLoadingReducer(fetchUserWithoutCancel, true);
  // @dts-jest:pass
  customInitial(undefined, { type: 'UNKNOWN' }); // => true
}

// @dts-jest:group createErrorReducer
{
  const errorReducer = createErrorReducer(fetchUserAsync);

  // @dts-jest:pass:snap
  errorReducer(undefined, fetchUserAsync.failure(Error('reason'))); // => Error('reason')

  // @dts-jest:pass:snap
  errorReducer(
    Error('stale'),
    fetchUserAsync.success({
      firstName: 'Piotr',
      lastName: 'Witek',
    })
  ); // => null

  // @dts-jest:pass
  errorReducer(Error('stale'), fetchUserAsync.request()); // => null

  // @dts-jest:pass
  errorReducer(Error('stale'), { type: 'UNKNOWN' }); // => Error('stale')

  const customError = createErrorReducer(fetchUserWithoutCancel, null);
  // @dts-jest:pass
  customError(undefined, { type: 'UNKNOWN' }); // => null
}

// @dts-jest:group createAsyncReducer validation
{
  // @dts-jest:pass
  (() => {
    try {
      createAsyncReducer(0, {} as AsyncActionCreatorMap, {});
      return 'no-throw';
    } catch (e) {
      return (e as Error).message;
    }
  })(); // => "asyncAction argument is invalid, it should be an object created with createAsyncAction()"
}

// @dts-jest:group ActionFromCreator helper
{
  type SuccessAction = ActionFromCreator<typeof fetchUserAsync.success>;
  const successAction = fetchUserAsync.success({
    firstName: 'Piotr',
    lastName: 'Witek',
  });
  // @dts-jest:pass:snap
  testType<SuccessAction>(successAction);
}

// @dts-jest:group request action has no payload
{
  const action = fetchUserAsync.request();
  // @dts-jest:fail:snap
  action.payload;
}

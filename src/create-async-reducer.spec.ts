import * as TH from './type-helpers';
import { testType } from './utils/testing';
import { createAsyncAction } from './create-async-action';
import {
  AsyncActionCreatorMap,
  createAsyncReducer,
} from './create-async-reducer';

type User = { firstName: string; lastName: string };

type AsyncState<TData, TError> = {
  loading: boolean;
  data: TData | null;
  error: TError | null;
};

type PayloadOf<TAction> = TAction extends TH.PayloadAction<string, infer T>
  ? T
  : never;

type SuccessPayload<TAsyncAction extends AsyncActionCreatorMap> = PayloadOf<
  ReturnType<TAsyncAction['success']>
>;

type FailurePayload<TAsyncAction extends AsyncActionCreatorMap> = PayloadOf<
  ReturnType<TAsyncAction['failure']>
>;

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

// @dts-jest:group createAsyncReducer
{
  const reducer = createAsyncReducer(fetchUserAsync, initialState, {
    request: (state, action) => {
      testType<TH.EmptyAction<'FETCH_USER_REQUEST'>>(action);
      return {
        ...state,
        loading: true,
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
      AsyncState<SuccessPayload<TAsyncAction>, FailurePayload<TAsyncAction>>,
      TAsyncAction
    >(
      asyncAction,
      {
        loading: false,
        data: null,
        error: null,
      },
      {
        request: state => ({
          ...state,
          loading: true,
        }),
        success: (state, action) => {
          testType<SuccessPayload<TAsyncAction>>(action.payload);
          return {
            loading: false,
            data: action.payload,
            error: null,
          };
        },
        failure: (state, action) => {
          testType<FailurePayload<TAsyncAction>>(action.payload);
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

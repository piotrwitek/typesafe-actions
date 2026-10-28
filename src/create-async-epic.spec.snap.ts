// tslint:disable:import-blacklist
import { Observable, of, Subject, throwError } from 'rxjs';

import { createAsyncAction } from './create-async-action';
import {
  catchErrorAndHandleWithAction,
  createAsyncEpic,
  handleAsyncAction,
} from './create-async-epic';
import * as T from './type-helpers';
import { testType } from './utils/testing';

type User = {
  id: string;
  name: string;
};

type HttpError = {
  status: number;
  message: string;
};

type State$ = {
  value: {
    token: string;
  };
};

type Services = {
  getUser: (id: string, token: string) => Observable<User>;
};

const user: User = {
  id: '42',
  name: 'Piotr',
};

const httpError: HttpError = {
  status: 500,
  message: 'Server error',
};

const fetchUserAsync = createAsyncAction(
  'FETCH_USER_REQUEST',
  'FETCH_USER_SUCCESS',
  'FETCH_USER_FAILURE',
  'FETCH_USER_CANCEL'
)<string, User, HttpError, string>();

const pingAsync = createAsyncAction(
  'PING_REQUEST',
  'PING_SUCCESS',
  'PING_FAILURE'
)<undefined, string, Error>();

const otherAction = {
  type: 'OTHER_ACTION',
};

type FetchUserAction = T.ActionType<typeof fetchUserAsync>;
type PingAction = T.ActionType<typeof pingAsync>;
type RootAction = FetchUserAction | PingAction | typeof otherAction;

// @dts-jest:group createAsyncEpic types
{
  const epic = createAsyncEpic<
    typeof fetchUserAsync,
    RootAction,
    State$,
    Services
  >(fetchUserAsync, (action, state, services) => {
    // @dts-jest:pass:snap -> string
    testType<string>(action.payload);
    // @dts-jest:pass:snap -> string
    testType<string>(state.value.token);
    // @dts-jest:pass:snap -> Services
    testType<Services>(services);
    return services.getUser(action.payload, state.value.token);
  });

  // @dts-jest:pass:snap -> (action$: Observable<RootAction>, state$: State$, services: Services) => Observable<T.PayloadAction<"FETCH_USER_SUCCESS", User> | T.PayloadAction<"FETCH_USER_FAILURE", HttpError>>
  testType<
    (
      action$: Observable<RootAction>,
      state$: State$,
      services: Services
    ) => Observable<
      | T.PayloadAction<'FETCH_USER_SUCCESS', User>
      | T.PayloadAction<'FETCH_USER_FAILURE', HttpError>
    >
  >(epic);
}

// @dts-jest:group createAsyncEpic without cancel
{
  const epic = createAsyncEpic(pingAsync, () => of('pong'));

  // @dts-jest:pass:snap -> (action$: Observable<T.Action<string>>, state$: unknown, services: unknown) => Observable<T.PayloadAction<"PING_SUCCESS", string> | T.PayloadAction<"PING_FAILURE", Error>>
  testType<
    (
      action$: Observable<T.Action>,
      state$: unknown,
      services: unknown
    ) => Observable<
      | T.PayloadAction<'PING_SUCCESS', string>
      | T.PayloadAction<'PING_FAILURE', Error>
    >
  >(epic);
}

// @dts-jest:group createAsyncEpic mapError
{
  const epic = createAsyncEpic(fetchUserAsync, () => throwError(httpError), {
    mapError: (error, action) => {
      // @dts-jest:pass:snap -> string
      testType<string>(action.payload);
      return {
        status: 500,
        message: String(error),
      };
    },
  });

  // @dts-jest:pass:snap -> (action$: Observable<T.Action<string>>, state$: unknown, services: unknown) => Observable<T.PayloadAction<"FETCH_USER_SUCCESS", User> | T.PayloadAction<"FETCH_USER_FAILURE", HttpError>>
  testType<
    (
      action$: Observable<T.Action>,
      state$: unknown,
      services: unknown
    ) => Observable<
      | T.PayloadAction<'FETCH_USER_SUCCESS', User>
      | T.PayloadAction<'FETCH_USER_FAILURE', HttpError>
    >
  >(epic);
}

// @dts-jest:group createAsyncEpic rejects invalid handler result
{
  // @dts-jest:fail:snap -> Type 'Observable<string>' is not assignable to type 'ObservableInput<User>'.
  createAsyncEpic(fetchUserAsync, () => of('not-a-user'));
}

// @dts-jest:group handleAsyncAction types
{
  const source$ = of(user);
  const action$ = new Subject<RootAction>();
  const result$ = source$.pipe(handleAsyncAction(action$, fetchUserAsync));

  // @dts-jest:pass:snap -> Observable<T.PayloadAction<"FETCH_USER_SUCCESS", User> | T.PayloadAction<"FETCH_USER_FAILURE", HttpError>>
  testType<
    Observable<
      | T.PayloadAction<'FETCH_USER_SUCCESS', User>
      | T.PayloadAction<'FETCH_USER_FAILURE', HttpError>
    >
  >(result$);
}

// @dts-jest:group catchErrorAndHandleWithAction types
{
  const result$ = of(user).pipe(
    catchErrorAndHandleWithAction(fetchUserAsync.failure)
  );

  // @dts-jest:pass:snap -> Observable<User | T.PayloadAction<"FETCH_USER_FAILURE", HttpError>>
  testType<Observable<User | T.PayloadAction<'FETCH_USER_FAILURE', HttpError>>>(
    result$
  );
}

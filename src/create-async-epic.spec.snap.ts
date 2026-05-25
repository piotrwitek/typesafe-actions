// tslint:disable:import-blacklist
import { Observable, of, Subject, throwError } from 'rxjs';

import { createAsyncAction } from './create-async-action';
import { createAsyncEpic } from './create-async-epic';
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

const state$: State$ = {
  value: {
    token: 'token',
  },
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

function collect<TValue>(
  observable: Observable<TValue>,
  onNext: (value: TValue) => void = () => undefined
) {
  return observable.subscribe(onNext);
}

describe('createAsyncEpic', () => {
  it('maps request values to success actions', () => {
    const services: Services = {
      getUser: (id, token) => of({ ...user, id: `${id}:${token}` }),
    };
    const action$ = new Subject<RootAction>();
    const actual: RootAction[] = [];

    const epic = createAsyncEpic<
      typeof fetchUserAsync,
      RootAction,
      State$,
      Services
    >(fetchUserAsync, (action, state, deps: Services) =>
      deps.getUser(action.payload, state.value.token)
    );
    const subscription = collect(epic(action$, state$, services), action =>
      actual.push(action)
    );

    action$.next(otherAction);
    action$.next(fetchUserAsync.request('42'));

    expect(actual).toEqual([
      fetchUserAsync.success({
        id: '42:token',
        name: 'Piotr',
      }),
    ]);

    subscription.unsubscribe();
  });

  it('maps thrown and emitted errors to failure actions', () => {
    const services: Services = {
      getUser: () => throwError(httpError),
    };
    const action$ = new Subject<RootAction>();
    const actual: RootAction[] = [];

    const epic = createAsyncEpic<
      typeof fetchUserAsync,
      RootAction,
      State$,
      Services
    >(fetchUserAsync, (_action, _state, deps) => deps.getUser('42', 'token'));
    const subscription = collect(epic(action$, state$, services), action =>
      actual.push(action)
    );

    action$.next(fetchUserAsync.request('42'));

    expect(actual).toEqual([fetchUserAsync.failure(httpError)]);

    subscription.unsubscribe();
  });

  it('supports custom error mapping with the original request action', () => {
    const services = {};
    const action$ = new Subject<RootAction>();
    const actual: RootAction[] = [];

    const epic = createAsyncEpic(
      fetchUserAsync,
      action => {
        throw new Error(action.payload);
      },
      {
        mapError: (error, action) => ({
          status: 400,
          message: `${action.payload}:${(error as Error).message}`,
        }),
      }
    );
    const subscription = collect(epic(action$, state$, services), action =>
      actual.push(action)
    );

    action$.next(fetchUserAsync.request('42'));

    expect(actual).toEqual([
      fetchUserAsync.failure({
        status: 400,
        message: '42:42',
      }),
    ]);

    subscription.unsubscribe();
  });

  it('cancels the active request when cancel action is emitted', () => {
    const response$ = new Subject<User>();
    const services: Services = {
      getUser: () => response$,
    };
    const action$ = new Subject<RootAction>();
    const actual: RootAction[] = [];

    const epic = createAsyncEpic<
      typeof fetchUserAsync,
      RootAction,
      State$,
      Services
    >(fetchUserAsync, (_action, _state, deps) => deps.getUser('42', 'token'));
    const subscription = collect(epic(action$, state$, services), action =>
      actual.push(action)
    );

    action$.next(fetchUserAsync.request('42'));
    action$.next(fetchUserAsync.cancel('route-change'));
    response$.next(user);

    expect(actual).toEqual([]);

    subscription.unsubscribe();
  });

  it('uses switch-style request handling', () => {
    const firstResponse$ = new Subject<User>();
    const secondResponse$ = new Subject<User>();
    const services = {
      getUser: jest
        .fn()
        .mockReturnValueOnce(firstResponse$)
        .mockReturnValueOnce(secondResponse$),
    };
    const action$ = new Subject<RootAction>();
    const actual: RootAction[] = [];

    const epic = createAsyncEpic<
      typeof fetchUserAsync,
      RootAction,
      State$,
      typeof services
    >(fetchUserAsync, (_action, _state, deps) => deps.getUser());
    const subscription = collect(epic(action$, state$, services), action =>
      actual.push(action)
    );

    action$.next(fetchUserAsync.request('first'));
    action$.next(fetchUserAsync.request('second'));
    firstResponse$.next({ id: 'first', name: 'Ignored' });
    secondResponse$.next({ id: 'second', name: 'Used' });

    expect(actual).toEqual([
      fetchUserAsync.success({ id: 'second', name: 'Used' }),
    ]);

    subscription.unsubscribe();
  });

  it('handles async action objects without cancel', () => {
    const action$ = new Subject<RootAction>();
    const actual: RootAction[] = [];

    const epic = createAsyncEpic<typeof pingAsync, RootAction, State$, {}>(
      pingAsync,
      () => of('pong')
    );
    const subscription = collect(epic(action$, state$, {}), action =>
      actual.push(action)
    );

    action$.next(pingAsync.request());

    expect(actual).toEqual([pingAsync.success('pong')]);

    subscription.unsubscribe();
  });
});

// @dts-jest:group createAsyncEpic
{
  const services: Services = {
    getUser: (id, token) => of({ ...user, id: `${id}:${token}` }),
  };
  const action$ = new Subject<RootAction>();

  const epic = createAsyncEpic<
    typeof fetchUserAsync,
    RootAction,
    State$,
    Services
  >(
    fetchUserAsync,
    (action, state, deps: Services) => {
      // @dts-jest:pass:snap -> string
      testType<string>(action.payload);

      // @dts-jest:pass:snap -> string
      testType<string>(state.value.token);

      // @dts-jest:pass:snap -> Services
      testType<Services>(deps);

      return deps.getUser(action.payload, state.value.token);
    },
    {
      mapError: (error, action) => ({
        status: 500,
        message: `${action.payload}:${String(error)}`,
      }),
    }
  );

  // @dts-jest:pass:snap -> Observable<T.PayloadAction<"FETCH_USER_SUCCESS", User> | T.PayloadAction<"FETCH_USER_FAILURE", HttpError>>
  testType<
    Observable<
      | T.PayloadAction<'FETCH_USER_SUCCESS', User>
      | T.PayloadAction<'FETCH_USER_FAILURE', HttpError>
    >
  >(epic(action$, state$, services));
}

// @dts-jest:group createAsyncEpic without cancel
{
  const action$ = new Subject<RootAction>();

  const epic = createAsyncEpic<typeof pingAsync, RootAction, State$, {}>(
    pingAsync,
    () => of('pong')
  );

  // @dts-jest:pass:snap -> Observable<T.PayloadAction<"PING_SUCCESS", string> | T.PayloadAction<"PING_FAILURE", Error>>
  testType<
    Observable<
      | T.PayloadAction<'PING_SUCCESS', string>
      | T.PayloadAction<'PING_FAILURE', Error>
    >
  >(epic(action$, state$, {}));
}

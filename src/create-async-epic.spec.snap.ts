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

const state$: State$ = {
  value: {
    token: 'secret',
  },
};

const fetchUserAsync = createAsyncAction(
  'FETCH_USER_REQUEST',
  'FETCH_USER_SUCCESS',
  'FETCH_USER_FAILURE',
  'FETCH_USER_CANCEL'
)<string, User, Error, string>();

const actions = {
  fetchUserAsync,
};

type RootAction = T.ActionType<typeof actions>;
type FetchUserOutputAction =
  | ReturnType<typeof fetchUserAsync.success>
  | ReturnType<typeof fetchUserAsync.failure>;

const services: Services = {
  getUser: () => of(user),
};

// @dts-jest:group createAsyncEpic
{
  const epic = createAsyncEpic<
    typeof fetchUserAsync,
    RootAction,
    State$,
    Services
  >(fetchUserAsync, (action, state, service) => {
    // @dts-jest:pass:snap -> string
    testType<string>(action.payload);
    // @dts-jest:pass:snap -> string
    testType<string>(state.value.token);
    // @dts-jest:pass:snap -> Services
    testType<Services>(service);

    return service.getUser(action.payload, state.value.token);
  });

  // @dts-jest:pass
  const epicCheck: (
    action$: Observable<RootAction>,
    state$: State$,
    services: Services
  ) => Observable<FetchUserOutputAction> = epic;

  // @dts-jest:pass:snap -> Observable<FetchUserOutputAction>
  testType<Observable<FetchUserOutputAction>>(
    epicCheck(of(fetchUserAsync.request('42')), state$, services)
  );
}

describe('createAsyncEpic', () => {
  it('maps request handler results to success actions', () => {
    const epic = createAsyncEpic<
      typeof fetchUserAsync,
      RootAction,
      State$,
      Services
    >(fetchUserAsync, (action, state, service) =>
      service.getUser(action.payload, state.value.token)
    );

    const emitted: RootAction[] = [];

    epic(of(fetchUserAsync.request('42')), state$, services).subscribe(action =>
      emitted.push(action)
    );

    expect(emitted).toEqual([fetchUserAsync.success(user)]);
  });

  it('maps array handler results without requiring Symbol.iterator', () => {
    const originalSymbol = (global as any).Symbol;
    (global as any).Symbol = undefined;

    try {
      const epic = createAsyncEpic<
        typeof fetchUserAsync,
        RootAction,
        State$,
        Services
      >(fetchUserAsync, () => [user]);
      const emitted: RootAction[] = [];

      epic(of(fetchUserAsync.request('42')), state$, services).subscribe(
        action => emitted.push(action)
      );

      expect(emitted).toEqual([fetchUserAsync.success(user)]);
    } finally {
      (global as any).Symbol = originalSymbol;
    }
  });

  it('waits for active promise handlers after the action stream completes', async () => {
    const epic = createAsyncEpic<
      typeof fetchUserAsync,
      RootAction,
      State$,
      Services
    >(fetchUserAsync, () => Promise.resolve(user));

    const emitted: RootAction[] = [];

    await new Promise(resolve => {
      epic(of(fetchUserAsync.request('42')), state$, services).subscribe({
        next: action => emitted.push(action),
        complete: resolve,
      });
    });

    expect(emitted).toEqual([fetchUserAsync.success(user)]);
  });

  it('maps request handler errors to failure actions', () => {
    const error = new Error('not found');
    const epic = createAsyncEpic<
      typeof fetchUserAsync,
      RootAction,
      State$,
      Services
    >(fetchUserAsync, () => throwError(error));

    const emitted: RootAction[] = [];

    epic(of(fetchUserAsync.request('42')), state$, services).subscribe(action =>
      emitted.push(action)
    );

    expect(emitted).toEqual([fetchUserAsync.failure(error)]);
  });

  it('supports mapping thrown errors before creating failure actions', () => {
    const fetchUserWithMessageAsync = createAsyncAction(
      'FETCH_USER_WITH_MESSAGE_REQUEST',
      'FETCH_USER_WITH_MESSAGE_SUCCESS',
      'FETCH_USER_WITH_MESSAGE_FAILURE'
    )<string, User, string>();

    const error = new Error('not found');
    const epic = createAsyncEpic(
      fetchUserWithMessageAsync,
      () => throwError(error),
      {
        mapError: value => (value as Error).message,
      }
    );

    const emitted: Array<T.ActionType<typeof fetchUserWithMessageAsync>> = [];

    epic(
      of(fetchUserWithMessageAsync.request('42')),
      state$,
      services
    ).subscribe(action => emitted.push(action));

    expect(emitted).toEqual([fetchUserWithMessageAsync.failure(error.message)]);
  });

  it('cancels pending request handlers when the cancel action is emitted', () => {
    const action$ = new Subject<RootAction>();
    const response$ = new Subject<User>();
    const epic = createAsyncEpic<
      typeof fetchUserAsync,
      RootAction,
      State$,
      Services
    >(fetchUserAsync, () => response$);
    const emitted: RootAction[] = [];
    const subscription = epic(action$, state$, services).subscribe(action =>
      emitted.push(action)
    );

    action$.next(fetchUserAsync.request('42'));
    action$.next(fetchUserAsync.cancel('user cancelled'));
    response$.next(user);

    expect(emitted).toEqual([]);

    subscription.unsubscribe();
  });
});

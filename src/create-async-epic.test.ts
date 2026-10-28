// tslint:disable:import-blacklist
import { Observable, of, Subject, throwError } from 'rxjs';

import { createAsyncAction } from './create-async-action';
import {
  catchErrorAndHandleWithAction,
  createAsyncEpic,
  handleAsyncAction,
  takeUntilAction,
} from './create-async-epic';
import { ActionType } from './type-helpers';

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

type FetchUserAction = ActionType<typeof fetchUserAsync>;
type PingAction = ActionType<typeof pingAsync>;
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

  it('maps promise results to success actions', async () => {
    const action$ = new Subject<RootAction>();
    const actual: RootAction[] = [];

    const epic = createAsyncEpic(pingAsync, () => Promise.resolve('pong'));
    const subscription = collect(epic(action$, state$, {}), action =>
      actual.push(action)
    );

    action$.next(pingAsync.request());
    await Promise.resolve();

    expect(actual).toEqual([pingAsync.success('pong')]);

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

  it('maps synchronous handler throws to failure actions', () => {
    const action$ = new Subject<RootAction>();
    const actual: RootAction[] = [];

    const epic = createAsyncEpic(fetchUserAsync, () => {
      throw httpError;
    });
    const subscription = collect(epic(action$, state$, {}), action =>
      actual.push(action)
    );

    action$.next(fetchUserAsync.request('42'));

    expect(actual).toEqual([fetchUserAsync.failure(httpError)]);

    subscription.unsubscribe();
  });

  it('supports custom error mapping with the original request action', () => {
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
    const subscription = collect(epic(action$, state$, {}), action =>
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

  it('uses switch-style request handling by default', () => {
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
      Services
    >(fetchUserAsync, (_action, _state, deps) => deps.getUser('42', 'token'));
    const subscription = collect(epic(action$, state$, services), action =>
      actual.push(action)
    );

    action$.next(fetchUserAsync.request('1'));
    action$.next(fetchUserAsync.request('2'));
    firstResponse$.next({ id: '1', name: 'first' });
    secondResponse$.next({ id: '2', name: 'second' });

    expect(actual).toEqual([
      fetchUserAsync.success({ id: '2', name: 'second' }),
    ]);

    subscription.unsubscribe();
  });

  it('can run overlapping requests with merge concurrency', () => {
    const firstResponse$ = new Subject<User>();
    const secondResponse$ = new Subject<User>();
    const responses = [firstResponse$, secondResponse$];
    const action$ = new Subject<RootAction>();
    const actual: RootAction[] = [];

    const epic = createAsyncEpic(
      fetchUserAsync,
      () => responses.shift() as Subject<User>,
      { concurrency: 'merge' }
    );
    const subscription = collect(epic(action$, state$, {}), action =>
      actual.push(action)
    );

    action$.next(fetchUserAsync.request('1'));
    action$.next(fetchUserAsync.request('2'));
    secondResponse$.next({ id: '2', name: 'second' });
    firstResponse$.next({ id: '1', name: 'first' });

    expect(actual).toEqual([
      fetchUserAsync.success({ id: '2', name: 'second' }),
      fetchUserAsync.success({ id: '1', name: 'first' }),
    ]);

    subscription.unsubscribe();
  });

  it('queues overlapping requests with concat concurrency', () => {
    const firstResponse$ = new Subject<User>();
    const secondResponse$ = new Subject<User>();
    const responses = [firstResponse$, secondResponse$];
    const action$ = new Subject<RootAction>();
    const actual: RootAction[] = [];

    const epic = createAsyncEpic(
      fetchUserAsync,
      () => responses.shift() as Subject<User>,
      { concurrency: 'concat' }
    );
    const subscription = collect(epic(action$, state$, {}), action =>
      actual.push(action)
    );

    action$.next(fetchUserAsync.request('1'));
    action$.next(fetchUserAsync.request('2'));
    secondResponse$.next({ id: '2', name: 'second' });
    firstResponse$.next({ id: '1', name: 'first' });
    firstResponse$.complete();
    secondResponse$.next({ id: '2', name: 'second' });

    expect(actual).toEqual([
      fetchUserAsync.success({ id: '1', name: 'first' }),
      fetchUserAsync.success({ id: '2', name: 'second' }),
    ]);

    subscription.unsubscribe();
  });

  it('ignores later requests while one is in-flight with exhaust concurrency', () => {
    const firstResponse$ = new Subject<User>();
    const secondResponse$ = new Subject<User>();
    const responses = [firstResponse$, secondResponse$];
    const action$ = new Subject<RootAction>();
    const actual: RootAction[] = [];

    const epic = createAsyncEpic(
      fetchUserAsync,
      () => responses.shift() as Subject<User>,
      { concurrency: 'exhaust' }
    );
    const subscription = collect(epic(action$, state$, {}), action =>
      actual.push(action)
    );

    action$.next(fetchUserAsync.request('1'));
    action$.next(fetchUserAsync.request('2'));
    secondResponse$.next({ id: '2', name: 'second' });
    firstResponse$.next({ id: '1', name: 'first' });

    expect(actual).toEqual([
      fetchUserAsync.success({ id: '1', name: 'first' }),
    ]);

    subscription.unsubscribe();
  });

  it('works without a cancel action', () => {
    const action$ = new Subject<RootAction>();
    const actual: RootAction[] = [];

    const epic = createAsyncEpic(pingAsync, () => of('pong'));
    const subscription = collect(epic(action$, state$, {}), action =>
      actual.push(action)
    );

    action$.next(pingAsync.request());

    expect(actual).toEqual([pingAsync.success('pong')]);

    subscription.unsubscribe();
  });

  it('rejects invalid async action objects', () => {
    expect(() =>
      createAsyncEpic({} as typeof fetchUserAsync, () => of(user))
    ).toThrow(
      'Argument 1 is invalid, it should be an async action-creator object from "createAsyncAction"'
    );
  });

  it('rejects a missing handler', () => {
    expect(() => createAsyncEpic(fetchUserAsync, undefined as any)).toThrow(
      'Argument 2 is invalid, it should be a function'
    );
  });

  it('rejects an invalid concurrency strategy', () => {
    expect(() =>
      createAsyncEpic(fetchUserAsync, () => of(user), {
        concurrency: 'parallel' as any,
      })
    ).toThrow(
      'Argument 3 "concurrency" is invalid, it should be "switch" | "merge" | "concat" | "exhaust"'
    );
  });
});

describe('handleAsyncAction', () => {
  it('maps values to success and errors to failure', () => {
    const action$ = new Subject<RootAction>();
    const source$ = new Subject<User>();
    const actual: RootAction[] = [];

    const subscription = collect(
      source$.pipe(handleAsyncAction(action$, fetchUserAsync)),
      action => actual.push(action)
    );

    source$.next(user);
    source$.error(httpError);

    expect(actual).toEqual([
      fetchUserAsync.success(user),
      fetchUserAsync.failure(httpError),
    ]);

    subscription.unsubscribe();
  });

  it('cancels an in-flight source when cancel is dispatched', () => {
    const action$ = new Subject<RootAction>();
    const source$ = new Subject<User>();
    const actual: RootAction[] = [];

    const subscription = collect(
      source$.pipe(handleAsyncAction(action$, fetchUserAsync)),
      action => actual.push(action)
    );

    action$.next(fetchUserAsync.cancel('leave'));
    source$.next(user);

    expect(actual).toEqual([]);

    subscription.unsubscribe();
  });
});

describe('catchErrorAndHandleWithAction', () => {
  it('maps source errors to failure actions', () => {
    const actual: RootAction[] = [];

    const subscription = collect(
      throwError(httpError).pipe(
        catchErrorAndHandleWithAction(fetchUserAsync.failure)
      ),
      action => actual.push(action)
    );

    expect(actual).toEqual([fetchUserAsync.failure(httpError)]);

    subscription.unsubscribe();
  });
});

describe('takeUntilAction', () => {
  it('completes the source when the action is dispatched', () => {
    const action$ = new Subject<RootAction>();
    const source$ = new Subject<User>();
    const actual: User[] = [];

    const subscription = collect(
      source$.pipe(takeUntilAction(action$, fetchUserAsync.cancel)),
      value => actual.push(value)
    );

    source$.next(user);
    action$.next(fetchUserAsync.cancel('leave'));
    source$.next({ id: '99', name: 'late' });

    expect(actual).toEqual([user]);

    subscription.unsubscribe();
  });
});

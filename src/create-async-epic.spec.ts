/* tslint:disable:import-blacklist no-submodule-imports */
import { Observable } from 'rxjs';
import { createAsyncAction } from './create-async-action';
import { createAsyncEpic, catchErrorOperator, takeUntilAction, Epic } from './create-async-epic';
import { isActionOf } from './is-action-of';
import { filter, switchMap, map } from 'rxjs/operators';

type User = { firstName: string; lastName: string };

// @dts-jest:group createAsyncEpic without cancel
{
  const fetchUsers = createAsyncAction(
    '@users/FETCH_REQUEST',
    '@users/FETCH_SUCCESS',
    '@users/FETCH_FAILURE'
  )<undefined, User[], Error>();

  // @dts-jest:pass:snap
  const fetchUsersEpic = createAsyncEpic(
    fetchUsers,
    (requestAction, state$, services: { api: { getUsers: () => Observable<User[]> } }) =>
      services.api.getUsers()
  );
}

// @dts-jest:group createAsyncEpic with cancel
{
  const fetchUsers = createAsyncAction(
    '@users/FETCH_REQUEST',
    '@users/FETCH_SUCCESS',
    '@users/FETCH_FAILURE',
    '@users/FETCH_CANCEL'
  )<undefined, User[], Error, string>();

  // @dts-jest:pass:snap
  const fetchUsersEpic = createAsyncEpic(
    fetchUsers,
    (requestAction, state$, services: { api: { getUsers: () => Observable<User[]> } }) =>
      services.api.getUsers()
  );
}

// @dts-jest:group createAsyncEpic with request payload
{
  const fetchUser = createAsyncAction(
    '@user/FETCH_REQUEST',
    '@user/FETCH_SUCCESS',
    '@user/FETCH_FAILURE'
  )<string, User, Error>();

  // @dts-jest:pass:snap
  const fetchUserEpic = createAsyncEpic(
    fetchUser,
    (requestAction, state$, services: { api: { getUser: (id: string) => Observable<User> } }) =>
      services.api.getUser(requestAction.payload)
  );
}

// @dts-jest:group catchErrorOperator
{
  const fetchUsers = createAsyncAction(
    '@users/FETCH_REQUEST',
    '@users/FETCH_SUCCESS',
    '@users/FETCH_FAILURE'
  )<undefined, User[], Error>();

  // @dts-jest:pass:snap
  const epic = (action$: Observable<any>, state$: Observable<any>, services: any) =>
    action$.pipe(
      filter(isActionOf(fetchUsers.request)),
      switchMap(() =>
        services.api.getUsers().pipe(
          map(fetchUsers.success),
          catchErrorOperator(fetchUsers.failure)
        )
      )
    );
}

// @dts-jest:group takeUntilAction
{
  const fetchUsers = createAsyncAction(
    '@users/FETCH_REQUEST',
    '@users/FETCH_SUCCESS',
    '@users/FETCH_FAILURE',
    '@users/FETCH_CANCEL'
  )<undefined, User[], Error, string>();

  // @dts-jest:pass:snap
  const epic = (action$: Observable<any>, state$: Observable<any>, services: any) =>
    action$.pipe(
      filter(isActionOf(fetchUsers.request)),
      switchMap(() =>
        services.api.getUsers().pipe(
          map(fetchUsers.success),
          takeUntilAction(action$, fetchUsers.cancel)
        )
      )
    );
}

// @dts-jest:group Epic type export
{
  // @dts-jest:pass:snap
  type MyEpic = Epic<any, any, any, any>;
}

// tslint:disable:import-blacklist
import { from, Observable, ObservableInput, of } from 'rxjs';
import { catchError, filter, map, switchMap, takeUntil } from 'rxjs/operators';

import {
  ActionCreator as ActionCreatorWithMetadata,
  isActionOf,
} from './is-action-of';
import { Action } from './type-helpers';

type ActionCreator = ActionCreatorWithMetadata<Action>;

type ActionFromCreator<TActionCreator extends ActionCreator> = ReturnType<
  TActionCreator
>;

type FirstArgument<TActionCreator extends ActionCreator> = Parameters<
  TActionCreator
> extends []
  ? undefined
  : Parameters<TActionCreator>[0];

export type AsyncActionCreatorMap<
  TRequest extends ActionCreator = ActionCreator,
  TSuccess extends ActionCreator = ActionCreator,
  TFailure extends ActionCreator = ActionCreator,
  TCancel extends ActionCreator | undefined = ActionCreator | undefined
> = {
  request: TRequest;
  success: TSuccess;
  failure: TFailure;
  cancel?: TCancel;
};

export type AsyncEpicOutputAction<TAsyncAction extends AsyncActionCreatorMap> =
  | ActionFromCreator<TAsyncAction['success']>
  | ActionFromCreator<TAsyncAction['failure']>;

export type CreateAsyncEpicOptions<
  TAsyncAction extends AsyncActionCreatorMap
> = {
  mapError?: (
    error: unknown,
    action: ActionFromCreator<TAsyncAction['request']>
  ) => FirstArgument<TAsyncAction['failure']>;
};

function callActionCreator<TActionCreator extends ActionCreator>(
  actionCreator: TActionCreator,
  payload: FirstArgument<TActionCreator>
): ActionFromCreator<TActionCreator> {
  return actionCreator(payload) as ActionFromCreator<TActionCreator>;
}

export function createAsyncEpic<
  TAsyncAction extends AsyncActionCreatorMap,
  TRootAction extends Action = Action,
  TState = unknown,
  TServices = unknown
>(
  asyncAction: TAsyncAction,
  handler: (
    action: ActionFromCreator<TAsyncAction['request']>,
    state$: TState,
    services: TServices
  ) => ObservableInput<FirstArgument<TAsyncAction['success']>>,
  options: CreateAsyncEpicOptions<TAsyncAction> = {}
): (
  action$: Observable<TRootAction>,
  state$: TState,
  services: TServices
) => Observable<AsyncEpicOutputAction<TAsyncAction>> {
  return (action$, state$, services) => {
    const cancelAction = asyncAction.cancel;
    const cancel$ =
      cancelAction == null
        ? undefined
        : action$.pipe(filter(action => isActionOf(cancelAction, action)));

    const toFailureAction = (
      error: unknown,
      requestAction: ActionFromCreator<TAsyncAction['request']>
    ) =>
      callActionCreator(
        asyncAction.failure,
        options.mapError
          ? options.mapError(error, requestAction)
          : (error as FirstArgument<TAsyncAction['failure']>)
      ) as AsyncEpicOutputAction<TAsyncAction>;

    return action$.pipe(
      filter(action => isActionOf(asyncAction.request, action)),
      switchMap(action => {
        const requestAction = action as ActionFromCreator<
          TAsyncAction['request']
        >;
        let input: ObservableInput<FirstArgument<TAsyncAction['success']>>;

        try {
          input = handler(requestAction, state$, services);
        } catch (error) {
          return of(toFailureAction(error, requestAction));
        }

        const response$ = from(input).pipe(
          map(
            payload =>
              callActionCreator(
                asyncAction.success,
                payload
              ) as AsyncEpicOutputAction<TAsyncAction>
          ),
          catchError(error => of(toFailureAction(error, requestAction)))
        );

        return cancel$ == null ? response$ : response$.pipe(takeUntil(cancel$));
      })
    );
  };
}

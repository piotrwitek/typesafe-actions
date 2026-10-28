// tslint:disable:import-blacklist
import { from, Observable, ObservableInput, of, OperatorFunction } from 'rxjs';
import {
  catchError,
  concatMap,
  exhaustMap,
  filter,
  map,
  mergeMap,
  switchMap,
  takeUntil,
} from 'rxjs/operators';

import {
  ActionCreator as ActionCreatorWithMetadata,
  isActionOf,
} from './is-action-of';
import { Action } from './type-helpers';
import {
  checkInvalidActionCreator,
  checkIsEmpty,
  throwIsEmpty,
} from './utils/validation';

type ActionCreator = ActionCreatorWithMetadata<Action>;

type ActionFromCreator<TActionCreator extends ActionCreator> = ReturnType<
  TActionCreator
>;

type FirstArgument<TActionCreator extends ActionCreator> = Parameters<
  TActionCreator
> extends []
  ? undefined
  : Parameters<TActionCreator>[0];

/**
 * @desc Object shape produced by `createAsyncAction`
 */
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

/**
 * @desc Success or failure actions emitted by an async epic
 */
export type AsyncEpicOutputAction<TAsyncAction extends AsyncActionCreatorMap> =
  | ActionFromCreator<TAsyncAction['success']>
  | ActionFromCreator<TAsyncAction['failure']>;

/**
 * @desc In-flight request strategy used by `createAsyncEpic`
 */
export type AsyncConcurrency = 'switch' | 'merge' | 'concat' | 'exhaust';

/**
 * @desc Optional behaviour for `createAsyncEpic`
 */
export type CreateAsyncEpicOptions<
  TAsyncAction extends AsyncActionCreatorMap
> = {
  mapError?: (
    error: unknown,
    action: ActionFromCreator<TAsyncAction['request']>
  ) => FirstArgument<TAsyncAction['failure']>;
  concurrency?: AsyncConcurrency;
};

/**
 * @desc Optional behaviour for `handleAsyncAction`
 */
export type HandleAsyncActionOptions<
  TAsyncAction extends AsyncActionCreatorMap
> = {
  mapError?: (error: unknown) => FirstArgument<TAsyncAction['failure']>;
};

const CONCURRENCY_OPERATORS: {
  [K in AsyncConcurrency]: typeof switchMap;
} = {
  switch: switchMap,
  merge: mergeMap,
  concat: concatMap,
  exhaust: exhaustMap,
};

function throwInvalidAsyncAction(): never {
  throw new Error(
    'Argument 1 is invalid, it should be an async action-creator object from "createAsyncAction"'
  );
}

function throwInvalidHandler(): never {
  throw new Error('Argument 2 is invalid, it should be a function');
}

function throwInvalidConcurrency(): never {
  throw new Error(
    'Argument 3 "concurrency" is invalid, it should be "switch" | "merge" | "concat" | "exhaust"'
  );
}

function assertAsyncAction(asyncAction: AsyncActionCreatorMap): void {
  if (checkIsEmpty(asyncAction)) {
    throwIsEmpty(1);
  }

  if (
    checkInvalidActionCreator(asyncAction.request) ||
    checkInvalidActionCreator(asyncAction.success) ||
    checkInvalidActionCreator(asyncAction.failure)
  ) {
    throwInvalidAsyncAction();
  }

  if (
    asyncAction.cancel != null &&
    checkInvalidActionCreator(asyncAction.cancel)
  ) {
    throwInvalidAsyncAction();
  }
}

function getConcurrencyOperator(
  concurrency: AsyncConcurrency = 'switch'
): typeof switchMap {
  const flatten = CONCURRENCY_OPERATORS[concurrency];
  if (flatten == null) {
    throwInvalidConcurrency();
  }
  return flatten;
}

function callActionCreator<TActionCreator extends ActionCreator>(
  actionCreator: TActionCreator,
  payload: FirstArgument<TActionCreator>
): ActionFromCreator<TActionCreator> {
  return actionCreator(payload) as ActionFromCreator<TActionCreator>;
}

function toFailureAction<TAsyncAction extends AsyncActionCreatorMap>(
  asyncAction: TAsyncAction,
  error: unknown,
  mapError?: (error: unknown) => FirstArgument<TAsyncAction['failure']>
): ActionFromCreator<TAsyncAction['failure']> {
  return callActionCreator(
    asyncAction.failure,
    mapError != null
      ? mapError(error)
      : (error as FirstArgument<TAsyncAction['failure']>)
  );
}

/**
 * @description cancel the source when a matching action is dispatched
 */
export function takeUntilAction<T>(
  action$: Observable<Action>,
  actionCreator: ActionCreator | ActionCreator[]
): OperatorFunction<T, T> {
  return takeUntil(action$.pipe(filter(isActionOf(actionCreator))));
}

/**
 * @description catch errors and map them to a failure action
 */
export function catchErrorAndHandleWithAction<
  T,
  TFailure extends ActionCreator
>(
  failureActionCreator: TFailure,
  mapError?: (error: unknown) => FirstArgument<TFailure>
): OperatorFunction<T, T | ActionFromCreator<TFailure>> {
  return catchError((error: unknown) =>
    of(
      callActionCreator(
        failureActionCreator,
        mapError != null ? mapError(error) : (error as FirstArgument<TFailure>)
      )
    )
  );
}

/**
 * @description map values to `success`, errors to `failure`, and optionally cancel on `cancel`
 */
export function handleAsyncAction<TAsyncAction extends AsyncActionCreatorMap>(
  action$: Observable<Action>,
  asyncAction: TAsyncAction,
  options: HandleAsyncActionOptions<TAsyncAction> = {}
): OperatorFunction<
  FirstArgument<TAsyncAction['success']>,
  AsyncEpicOutputAction<TAsyncAction>
> {
  assertAsyncAction(asyncAction);

  const mapToResult = (
    source$: Observable<FirstArgument<TAsyncAction['success']>>
  ) =>
    source$.pipe(
      map((payload: FirstArgument<TAsyncAction['success']>) =>
        callActionCreator(asyncAction.success, payload)
      ),
      catchErrorAndHandleWithAction(asyncAction.failure, options.mapError)
    ) as Observable<AsyncEpicOutputAction<TAsyncAction>>;

  const cancel = asyncAction.cancel;
  if (cancel == null) {
    return mapToResult;
  }

  return (source$: Observable<FirstArgument<TAsyncAction['success']>>) =>
    mapToResult(source$).pipe(takeUntilAction(action$, cancel));
}

/**
 * @description create a redux-observable epic from an async action-creator object
 */
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
  assertAsyncAction(asyncAction);

  if (typeof handler !== 'function') {
    throwInvalidHandler();
  }

  const flatten = getConcurrencyOperator(options.concurrency);
  const mapErrorOption = options.mapError;
  const cancel = asyncAction.cancel;

  return (
    action$: Observable<TRootAction>,
    state$: TState,
    services: TServices
  ) =>
    action$.pipe(
      filter((action: TRootAction) => isActionOf(asyncAction.request, action)),
      flatten((action: TRootAction) => {
        const requestAction = action as ActionFromCreator<
          TAsyncAction['request']
        >;
        const mapError =
          mapErrorOption != null
            ? (error: unknown) => mapErrorOption(error, requestAction)
            : undefined;

        let input: ObservableInput<FirstArgument<TAsyncAction['success']>>;

        try {
          input = handler(requestAction, state$, services);
        } catch (error) {
          return of(toFailureAction(asyncAction, error, mapError));
        }

        const response$ = from(input).pipe(
          map((payload: FirstArgument<TAsyncAction['success']>) =>
            callActionCreator(asyncAction.success, payload)
          ),
          catchErrorAndHandleWithAction(asyncAction.failure, mapError)
        ) as Observable<AsyncEpicOutputAction<TAsyncAction>>;

        return cancel == null
          ? response$
          : response$.pipe(takeUntilAction(action$, cancel));
      })
    );
}

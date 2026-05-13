// tslint:disable:import-blacklist
import { Observable, ObservableInput } from 'rxjs';

import {
  ActionCreator as ActionCreatorWithMetadata,
  isActionOf,
} from './is-action-of';
import { Action } from './type-helpers';

type ActionCreator = ActionCreatorWithMetadata<Action>;

type FirstArgument<TActionCreator extends (...args: any[]) => any> = Parameters<
  TActionCreator
> extends []
  ? undefined
  : Parameters<TActionCreator>[0];

type ActionFromCreator<
  TActionCreator extends (...args: any[]) => any
> = ReturnType<TActionCreator>;

type Observer<T> = {
  closed?: boolean;
  next: (value: T) => void;
  error: (error: unknown) => void;
  complete: () => void;
};

type Subscription = {
  closed?: boolean;
  unsubscribe: () => void;
};

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

function noop(): void {
  return undefined;
}

function toSubscription(subscription: unknown): Subscription {
  return subscription != null &&
    typeof (subscription as any).unsubscribe === 'function'
    ? (subscription as Subscription)
    : {
        closed: true,
        unsubscribe: noop,
      };
}

function subscribeToInput<T>(
  input: ObservableInput<T>,
  observer: Observer<T>
): Subscription {
  const source = input as any;

  if (source != null && typeof source.subscribe === 'function') {
    return toSubscription(
      source.subscribe(
        (value: T) => observer.next(value),
        (error: unknown) => observer.error(error),
        () => observer.complete()
      )
    );
  }

  let closed = false;
  const iterableSymbol =
    typeof Symbol === 'undefined' ? undefined : Symbol.iterator;

  if (source != null && typeof source.then === 'function') {
    source.then(
      (value: T) => {
        if (!closed) {
          observer.next(value);
          observer.complete();
        }
      },
      (error: unknown) => {
        if (!closed) {
          observer.error(error);
        }
      }
    );

    return {
      get closed() {
        return closed;
      },
      unsubscribe: () => {
        closed = true;
      },
    };
  }

  if (Array.isArray(source)) {
    for (let i = 0; i < source.length && !closed; i++) {
      observer.next(source[i]);
    }

    if (!closed) {
      observer.complete();
    }

    return {
      get closed() {
        return closed;
      },
      unsubscribe: () => {
        closed = true;
      },
    };
  }

  const iterator =
    source != null && iterableSymbol != null
      ? source[iterableSymbol]
      : undefined;

  if (typeof iterator === 'function') {
    const values = iterator.call(source);
    let result = values.next();

    while (!closed && !result.done) {
      observer.next(result.value);
      result = values.next();
    }

    if (!closed) {
      observer.complete();
    }

    return {
      get closed() {
        return closed;
      },
      unsubscribe: () => {
        closed = true;
      },
    };
  }

  observer.error(
    new TypeError('Handler should return an ObservableInput value')
  );

  return {
    closed: true,
    unsubscribe: noop,
  };
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
  return (action$, state$, services) =>
    (action$ as any).lift({
      call(
        subscriber: Observer<AsyncEpicOutputAction<TAsyncAction>>,
        source: Observable<TRootAction>
      ) {
        let innerSubscription: Subscription | undefined;
        let outerCompleted = false;

        const completeIfDone = () => {
          if (outerCompleted && innerSubscription == null) {
            subscriber.complete();
          }
        };

        const cancelInnerSubscription = () => {
          if (innerSubscription != null) {
            innerSubscription.unsubscribe();
            innerSubscription = undefined;
          }
          completeIfDone();
        };

        const dispatchFailure = (
          error: unknown,
          requestAction: ActionFromCreator<TAsyncAction['request']>
        ) => {
          subscriber.next(callActionCreator(
            asyncAction.failure,
            options.mapError
              ? options.mapError(error, requestAction)
              : (error as any)
          ) as AsyncEpicOutputAction<TAsyncAction>);
        };

        const outerSubscription = source.subscribe({
          next: (action: TRootAction) => {
            if (subscriber.closed) {
              return;
            }

            const cancel = asyncAction.cancel;
            if (cancel != null && isActionOf(cancel, action)) {
              cancelInnerSubscription();
              return;
            }

            if (!isActionOf(asyncAction.request, action)) {
              return;
            }

            cancelInnerSubscription();

            const requestAction = action as ActionFromCreator<
              TAsyncAction['request']
            >;

            let input: ObservableInput<FirstArgument<TAsyncAction['success']>>;

            try {
              input = handler(requestAction, state$, services);
            } catch (error) {
              dispatchFailure(error, requestAction);
              return;
            }

            let innerCompleted = false;
            const nextInnerSubscription = subscribeToInput(input, {
              get closed() {
                return subscriber.closed === true;
              },
              next: payload =>
                subscriber.next(callActionCreator(
                  asyncAction.success,
                  payload
                ) as AsyncEpicOutputAction<TAsyncAction>),
              error: error => {
                dispatchFailure(error, requestAction);
                innerCompleted = true;
                innerSubscription = undefined;
                completeIfDone();
              },
              complete: () => {
                innerCompleted = true;
                innerSubscription = undefined;
                completeIfDone();
              },
            });

            innerSubscription = innerCompleted
              ? undefined
              : nextInnerSubscription;
          },
          error: (error: unknown) => {
            cancelInnerSubscription();
            subscriber.error(error);
          },
          complete: () => {
            outerCompleted = true;
            completeIfDone();
          },
        });

        return () => {
          cancelInnerSubscription();
          outerSubscription.unsubscribe();
        };
      },
    }) as Observable<AsyncEpicOutputAction<TAsyncAction>>;
}

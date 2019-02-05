import { StringType, ActionCreator } from './types';
import { validateActionType } from './utils/utils';
import { action } from './action';

type ActionWithType<T> = { type: T };
type ActionWithPayload<T, P> = { type: T; payload: P };
type ActionWithMeta<T, M> = { type: T; meta: M };
type ActionWithPayloadAndMeta<T, P, M> = { type: T; payload: P; meta: M };
type ActionWithError<T, E> = { type: T; error: E };
type ActionWithPayloadAndError<T, P, E> = { type: T; payload: P; error: E };
type ActionWithMetaAndError<T, M, E> = { type: T; meta: M; error: E };
type ActionWithPayloadAndMetaAndError<T, P, M, E> = { type: T; payload: P; meta: M; error: E};

export type PayloadMetaAction<T extends StringType, P, M, E> =
  P extends undefined
    ? M extends undefined
      ? E extends undefined
        ? ActionWithType<T>
        : ActionWithError<T, E>
      : E extends undefined
        ? ActionWithMeta<T, M>
        : ActionWithMetaAndError<T, M, E>
    : M extends undefined
      ? E extends undefined
        ? ActionWithPayload<T, P>
        : ActionWithPayloadAndError<T, P, E>
      : E extends undefined
        ? ActionWithPayloadAndMeta<T, P, M>
        : ActionWithPayloadAndMetaAndError<T, P, M, E>;

/**
 * @description typesafe action-creator factory
 */
export function createAction<
  T extends StringType,
  AC extends ActionCreator<T> = () => { type: T }
>(
  actionType: T,
  actionResolverHandler?: (
    resolve: <P = undefined, M = undefined, E = undefined>(
      payload?: P,
      meta?: M,
      error?: E
    ) => PayloadMetaAction<T, P, M, E>
  ) => AC
): AC {
  validateActionType(actionType);

  const actionCreator: AC =
    actionResolverHandler == null
      ? ((() => action(actionType)) as AC)
      : actionResolverHandler(action.bind(null, actionType) as Parameters<
          typeof actionResolverHandler
        >[0]);

  return Object.assign(actionCreator, {
    getType: () => actionType,
    // redux-actions compatibility
    toString: () => actionType,
  });
}

import { StringType, ActionCreator } from './type-helpers';
import { action } from './action';

export type PayloadMetaAction<T extends StringType, P, M> = P extends undefined
  ? M extends undefined
    ? { type: T }
    : { type: T; meta: M }
  : M extends undefined
  ? { type: T; payload: P }
  : { type: T; payload: P; meta: M };

/**
 * @description typesafe action-creator factory
 */
export function createAction<
  T extends StringType,
  AC extends ActionCreator<T> = () => { type: T }
>(
  type: T,
  createHandler?: (
    actionCallback: <P = undefined, M = undefined>(
      payload?: P,
      meta?: M
    ) => PayloadMetaAction<T, P, M>
  ) => AC
): AC {
  // validation is already done in action function

  const actionCreator: AC =
    createHandler == null
      ? ((() => action(type)) as AC)
      : createHandler(action.bind(null, type) as Parameters<
          typeof createHandler
        >[0]);

  return Object.assign(actionCreator, {
    getType: () => type,
    // redux-actions compatibility
    toString: () => type,
  });
}

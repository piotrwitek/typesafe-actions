import { ActionCreatorTypeMetadata } from './type-helpers';
import {
  checkInvalidActionCreatorInArray,
  checkIsEmpty,
  throwIsEmpty,
} from './utils/validation';

export type ActionCreator<T extends { type: string }> = ((
  ...args: any[]
) => T) &
  ActionCreatorTypeMetadata<T['type']>;

export type ActionCreatorOrAsyncAction =
  | ActionCreator<{ type: string }>
  | AsyncActionCreators;

export interface AsyncActionCreators {
  request: ActionCreator<{ type: string }>;
  success: ActionCreator<{ type: string }>;
  failure: ActionCreator<{ type: string }>;
  cancel?: ActionCreator<{ type: string }>;
}

type ActionFromActionCreator<AC> = AC extends ActionCreator<infer TAction>
  ? TAction
  : never;

type ActionFromAsyncActionCreators<AC extends AsyncActionCreators> =
  | ActionFromActionCreator<AC['request']>
  | ActionFromActionCreator<AC['success']>
  | ActionFromActionCreator<AC['failure']>
  | ActionFromActionCreator<AC['cancel']>;

export type ActionFromActionCreatorOrAsyncAction<
  AC extends ActionCreatorOrAsyncAction
> = AC extends ActionCreator<infer TAction>
  ? TAction
  : AC extends AsyncActionCreators
  ? ActionFromAsyncActionCreators<AC>
  : never;

function flattenActionCreators(
  actionCreatorOrAsyncAction: ActionCreatorOrAsyncAction
): Array<ActionCreator<{ type: string }>> {
  if (
    actionCreatorOrAsyncAction == null ||
    typeof actionCreatorOrAsyncAction !== 'object' ||
    typeof actionCreatorOrAsyncAction === 'function'
  ) {
    return [actionCreatorOrAsyncAction as ActionCreator<{ type: string }>];
  }

  const {
    request,
    success,
    failure,
    cancel,
  } = actionCreatorOrAsyncAction as AsyncActionCreators;
  const actionCreators = [request, success, failure];

  if (cancel != null) {
    actionCreators.push(cancel);
  }

  return actionCreators;
}

/**
 * @description (curried assert function) check if an action is the instance of given action-creator(s)
 * @description it works with discriminated union types
 */
export function isActionOf<AC extends ActionCreatorOrAsyncAction>(
  actionCreator: AC | AC[],
  action: { type: string }
): action is ActionFromActionCreatorOrAsyncAction<AC>;

/**
 * @description (curried assert function) check if an action is the instance of given action-creator(s)
 * @description it works with discriminated union types
 */
export function isActionOf<AC extends ActionCreatorOrAsyncAction>(
  actionCreator: AC | AC[]
): (action: {
  type: string;
}) => action is ActionFromActionCreatorOrAsyncAction<AC>;

/**
 * implementation
 */
export function isActionOf<AC extends ActionCreatorOrAsyncAction>(
  actionCreatorOrCreators: AC | AC[],
  action?: { type: string }
) {
  if (checkIsEmpty(actionCreatorOrCreators)) {
    throwIsEmpty(1);
  }

  const actionCreators = (Array.isArray(actionCreatorOrCreators)
    ? actionCreatorOrCreators
    : [actionCreatorOrCreators]
  ).reduce(
    (flattenedActionCreators, actionCreatorOrAsyncAction) =>
      flattenedActionCreators.concat(
        flattenActionCreators(actionCreatorOrAsyncAction)
      ),
    [] as Array<ActionCreator<{ type: string }>>
  );

  actionCreators.forEach(checkInvalidActionCreatorInArray);

  const assertFn = (_action: { type: string }) =>
    actionCreators.some(
      actionCreator => _action.type === actionCreator.getType!()
    );

  // 1 arg case => return curried version
  if (action === undefined) {
    return assertFn;
  }
  // 2 args case => invoke assertFn and return the result
  return assertFn(action);
}

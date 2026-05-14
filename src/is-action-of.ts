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

export interface AsyncActionCreators {
  request: ActionCreator<{ type: string }>;
  success: ActionCreator<{ type: string }>;
  failure: ActionCreator<{ type: string }>;
  cancel?: ActionCreator<{ type: string }>;
}

export type ActionCreatorOrAsyncAction =
  | ActionCreator<{ type: string }>
  | AsyncActionCreators;

type ActionFromActionCreator<AC> = AC extends ActionCreator<infer TAction>
  ? TAction
  : never;

type ActionFromActionCreatorOrAsyncAction<
  AC extends ActionCreatorOrAsyncAction
> = AC extends ActionCreator<{ type: string }>
  ? ActionFromActionCreator<AC>
  : AC extends AsyncActionCreators
  ? | ActionFromActionCreator<AC['request']>
    | ActionFromActionCreator<AC['success']>
    | ActionFromActionCreator<AC['failure']>
    | ActionFromActionCreator<AC['cancel']>
  : never;

function flattenActionCreators(
  actionCreatorOrAsyncAction: ActionCreatorOrAsyncAction
): Array<ActionCreator<{ type: string }>> {
  if (typeof actionCreatorOrAsyncAction === 'function') {
    return [actionCreatorOrAsyncAction];
  }

  const {
    request,
    success,
    failure,
    cancel,
  } = actionCreatorOrAsyncAction as AsyncActionCreators;

  return cancel != null
    ? [request, success, failure, cancel]
    : [request, success, failure];
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

  const actionCreators: Array<ActionCreator<{ type: string }>> = [];
  const creatorsOrAsyncActions = Array.isArray(actionCreatorOrCreators)
    ? actionCreatorOrCreators
    : [actionCreatorOrCreators];
  creatorsOrAsyncActions.forEach(actionCreatorOrAsyncAction => {
    actionCreators.push(...flattenActionCreators(actionCreatorOrAsyncAction));
  });

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

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

/**
 * Object returned by `createAsyncAction(...)()` — a map of request/success/failure
 * (and optional cancel) action-creators.
 */
export interface AsyncActionCreators {
  request: ActionCreator<{ type: string }>;
  success: ActionCreator<{ type: string }>;
  failure: ActionCreator<{ type: string }>;
  cancel?: ActionCreator<{ type: string }>;
}

export type ActionCreatorOrAsyncAction =
  | ActionCreator<{ type: string }>
  | AsyncActionCreators;

/**
 * Infer the action union for an action-creator or async-action object.
 * `ActionType` cannot be used as a type-predicate here: optional `cancel`
 * makes the mapped union include `undefined`.
 */
export type ActionFromActionCreatorOrAsyncAction<
  AC extends ActionCreatorOrAsyncAction
> = AC extends ActionCreator<{ type: string }>
  ? ReturnType<AC>
  : AC extends AsyncActionCreators
  ? ActionFromAsyncActionCreators<AC>
  : never;

type ActionFromAsyncActionCreators<
  AC extends AsyncActionCreators
> = AC['cancel'] extends ActionCreator<{ type: string }>
  ?
      | ReturnType<AC['request']>
      | ReturnType<AC['success']>
      | ReturnType<AC['failure']>
      | ReturnType<AC['cancel']>
  :
      | ReturnType<AC['request']>
      | ReturnType<AC['success']>
      | ReturnType<AC['failure']>;

function isEnhancedActionCreator(
  value: unknown
): value is ActionCreator<{ type: string }> {
  return (
    typeof value === 'function' &&
    typeof (value as ActionCreator<{ type: string }>).getType === 'function'
  );
}

function isAsyncActionCreators(value: unknown): value is AsyncActionCreators {
  if (value == null || typeof value !== 'object' || Array.isArray(value)) {
    return false;
  }

  const maybeAsyncAction = value as AsyncActionCreators;
  return (
    isEnhancedActionCreator(maybeAsyncAction.request) &&
    isEnhancedActionCreator(maybeAsyncAction.success) &&
    isEnhancedActionCreator(maybeAsyncAction.failure)
  );
}

function flattenActionCreators(
  actionCreatorOrAsyncAction: ActionCreatorOrAsyncAction
): Array<ActionCreator<{ type: string }>> {
  if (isEnhancedActionCreator(actionCreatorOrAsyncAction)) {
    return [actionCreatorOrAsyncAction];
  }

  if (isAsyncActionCreators(actionCreatorOrAsyncAction)) {
    const { request, success, failure, cancel } = actionCreatorOrAsyncAction;
    if (cancel != null && isEnhancedActionCreator(cancel)) {
      return [request, success, failure, cancel];
    }
    return [request, success, failure];
  }

  // Let existing validation produce the standard error for unknown values.
  return [actionCreatorOrAsyncAction as ActionCreator<{ type: string }>];
}

function toActionCreatorList(
  actionCreatorOrCreators:
    | ActionCreatorOrAsyncAction
    | ActionCreatorOrAsyncAction[]
): Array<ActionCreator<{ type: string }>> {
  const creatorsOrAsyncActions = Array.isArray(actionCreatorOrCreators)
    ? actionCreatorOrCreators
    : [actionCreatorOrCreators];

  const actionCreators: Array<ActionCreator<{ type: string }>> = [];
  creatorsOrAsyncActions.forEach(
    (actionCreatorOrAsyncAction: ActionCreatorOrAsyncAction) => {
      actionCreators.push(...flattenActionCreators(actionCreatorOrAsyncAction));
    }
  );
  return actionCreators;
}

/**
 * @description (curried assert function) check if an action is the instance of given action-creator(s)
 * @description it works with discriminated union types
 * @description also accepts async-action objects from `createAsyncAction`
 */
export function isActionOf<AC extends ActionCreatorOrAsyncAction>(
  actionCreator: AC | AC[],
  action: { type: string }
): action is ActionFromActionCreatorOrAsyncAction<AC>;

/**
 * @description (curried assert function) check if an action is the instance of given action-creator(s)
 * @description it works with discriminated union types
 * @description also accepts async-action objects from `createAsyncAction`
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

  const actionCreators = toActionCreatorList(actionCreatorOrCreators);

  actionCreators.forEach(checkInvalidActionCreatorInArray);

  const assertFn = (_action: { type: string }) =>
    actionCreators.some(
      (actionCreator: ActionCreator<{ type: string }>) =>
        _action.type === actionCreator.getType!()
    );

  // 1 arg case => return curried version
  if (action === undefined) {
    return assertFn;
  }
  // 2 args case => invoke assertFn and return the result
  return assertFn(action);
}

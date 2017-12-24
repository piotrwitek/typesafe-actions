import {
  EmptyAction,
  FluxStandardAction,
  TypeGetter,
} from './';

export function actionOf<T extends A, A extends { type: string }>(
  actionCreator: ((...args: any[]) => T) & TypeGetter<T['type']>,
) {
  return (action: A): action is T => {
    if (actionCreator == null || actionCreator.getType == null) {
      throw new Error('first argument is not a "ts-action-creator" instance');
    }

    return actionCreator.getType() === action.type;
  };
}

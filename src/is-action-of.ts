import {
  EmptyAction,
  FluxStandardAction,
  TypeGetter,
} from './';

export function isActionOf<T extends A, A extends { type: string }>(
  actionCreators: ((...args: any[]) => T) & TypeGetter<T['type']>
    | Array<((...args: any[]) => T) & TypeGetter<T['type']>>,
) {
  return (action: A): action is T => {
    if (actionCreators == null) {
      throw new Error('first argument is missing');
    }

    // check if array
    if (Array.isArray(actionCreators)) {
      return actionCreators.some((actionCreator, index) => {
        if (actionCreator.getType == null) {
          throw new Error(`element of the first argument with index [${index}]
          is not an instance of "typesafe-actions"`);
        }

        return actionCreator.getType() === action.type;
      });
    } else {
      if (actionCreators.getType == null) {
        throw new Error('first argument is not an instance of "typesafe-actions"');
      }

      return actionCreators.getType() === action.type;
    }
  };
}

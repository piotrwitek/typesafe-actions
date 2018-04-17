import { ActionCreator, ActionType, StringType } from '.';

export interface TypeMeta<T extends ActionType> {
  getType?: () => T;
}

/**
 * @description get the "type literal" of a given action creator
 */
export function getType<T extends StringType>(
  creator: ActionCreator<T> & TypeMeta<T>
): T {
  if (creator == null) {
    throw new Error('first argument is missing');
  }

  if (creator.getType == null) {
    throw new Error('first argument is not an instance of "typesafe-actions"');
  }

  return creator.getType();
}

/**
 * @description create a type-safe action creator
 */
export function actionCreator<
  T extends StringType,
  AC extends ActionCreator<T>
>(type: T, callback?: (type: T) => AC): AC {
  const creator: AC =
    callback != null ? callback(type) : ((() => ({ type })) as AC);
  return Object.assign(creator, { getType: () => type });
}

import { EmptyAction, FluxStandardAction, TypeGetter } from '.';

export function createAction<T extends string,
  AC extends (...args: any[]) => FluxStandardAction<T>
  >(
  typeString: T,
  creatorFunction: AC,
): AC & TypeGetter<T>;

export function createAction<T extends string,
  AC extends () => { type: T }
  >(
  typeString: T,
): AC & TypeGetter<T>;

export function createAction<T extends string,
  AC extends (...args: any[]) => FluxStandardAction<T>
  >(
  typeString: T | AC,
  creatorFunction?: AC,
): AC & TypeGetter<T> {
  if (creatorFunction) {
    if (typeof creatorFunction !== 'function') {
      throw new Error('second argument is not a function');
    }

    const actionCreator: any = creatorFunction;
    actionCreator.getType = () => typeString;

    return actionCreator;
  } else {
    const actionCreator: any =
      () => ({ type: typeString });
    actionCreator.getType = () => typeString;

    return actionCreator;
  }
}

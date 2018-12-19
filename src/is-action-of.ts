import { TypeMeta } from './types';

export type AC<T extends { type: string }> = ((...args: any[]) => T) &
  TypeMeta<T['type']>;

/**
 * @description (curried assert function) check if an action is the instance of given action-creator(s)
 * @description it works with discriminated union types
 * @inner If you need more than 5 arguments -> use switch
 */
export function isActionOf<A extends { type: string }, T1 extends A>(
  actionCreators: [AC<T1>],
  action: { type: string }
): action is [T1][number];
export function isActionOf<
  A extends { type: string },
  T1 extends A,
  T2 extends A
>(
  actionCreators: [AC<T1>, AC<T2>],
  action: { type: string }
): action is [T1, T2][number];
export function isActionOf<
  A extends { type: string },
  T1 extends A,
  T2 extends A,
  T3 extends A
>(
  actionCreators: [AC<T1>, AC<T2>, AC<T3>],
  action: { type: string }
): action is [T1, T2, T3][number];
export function isActionOf<
  A extends { type: string },
  T1 extends A,
  T2 extends A,
  T3 extends A,
  T4 extends A
>(
  actionCreators: [AC<T1>, AC<T2>, AC<T3>, AC<T4>],
  action: { type: string }
): action is [T1, T2, T3, T4][number];
export function isActionOf<
  A extends { type: string },
  T1 extends A,
  T2 extends A,
  T3 extends A,
  T4 extends A,
  T5 extends A
>(
  actionCreators: [AC<T1>, AC<T2>, AC<T3>, AC<T4>, AC<T5>],
  action: { type: string }
): action is [T1, T2, T3, T4, T5][number];

/**
 * @description (curried assert function) check if an action is the instance of given action-creator(s)
 * @description it works with discriminated union types
 */
export function isActionOf<A extends { type: string }, T1 extends A>(
  actionCreator: AC<T1>,
  action: { type: string }
): action is T1;

/**
 * @description (curried assert function) check if an action is the instance of given action-creator(s)
 * @description it works with discriminated union types
 * @inner If you need more than 5 arguments -> use switch
 */
export function isActionOf<A extends { type: string }, T1 extends A>(
  actionCreators: [AC<T1>]
): (action: A) => action is [T1][number];
export function isActionOf<
  A extends { type: string },
  T1 extends A,
  T2 extends A
>(actionCreators: [AC<T1>, AC<T2>]): (action: A) => action is [T1, T2][number];
export function isActionOf<
  A extends { type: string },
  T1 extends A,
  T2 extends A,
  T3 extends A
>(
  actionCreators: [AC<T1>, AC<T2>, AC<T3>]
): (action: A) => action is [T1, T2, T3][number];
export function isActionOf<
  A extends { type: string },
  T1 extends A,
  T2 extends A,
  T3 extends A,
  T4 extends A
>(
  actionCreators: [AC<T1>, AC<T2>, AC<T3>, AC<T4>]
): (action: A) => action is [T1, T2, T3, T4][number];
export function isActionOf<
  A extends { type: string },
  T1 extends A,
  T2 extends A,
  T3 extends A,
  T4 extends A,
  T5 extends A
>(
  actionCreators: [AC<T1>, AC<T2>, AC<T3>, AC<T4>, AC<T5>]
): (action: A) => action is [T1, T2, T3, T4, T5][number];

/**
 * @description (curried assert function) check if an action is the instance of given action-creator(s)
 * @description it works with discriminated union types
 */
export function isActionOf<A extends { type: string }, T1 extends A>(
  actionCreator: AC<T1>
): (action: A) => action is T1;

/** implementation */
export function isActionOf<
  A extends { type: string },
  T1 extends A,
  T2 extends A,
  T3 extends A,
  T4 extends A,
  T5 extends A
>(
  creatorOrCreators:
    | AC<T1>
    | [AC<T1>]
    | [AC<T1>, AC<T2>]
    | [AC<T1>, AC<T2>, AC<T3>]
    | [AC<T1>, AC<T2>, AC<T3>, AC<T4>]
    | [AC<T1>, AC<T2>, AC<T3>, AC<T4>, AC<T5>],
  actionOrNil?: A
) {
  if (creatorOrCreators == null) {
    throw new Error('first argument is missing');
  }

  if (Array.isArray(creatorOrCreators)) {
    (creatorOrCreators as any[]).forEach((actionCreator, index) => {
      if (actionCreator.getType == null) {
        throw new Error(`first argument contains element
        that is not created with "typesafe-actions" at index [${index}]`);
      }
    });
  } else {
    if (creatorOrCreators.getType == null) {
      throw new Error('first argument is not created with "typesafe-actions"');
    }
  }

  const assertFn = (action: A): action is [T1, T2, T3, T4, T5][number] => {
    const actionCreators: any[] = Array.isArray(creatorOrCreators)
      ? creatorOrCreators
      : [creatorOrCreators];

    return actionCreators.some((actionCreator, index) => {
      return actionCreator.getType() === action.type;
    });
  };

  // with 1 arg return assertFn
  if (actionOrNil == null) {
    return assertFn;
  }
  // with 2 args invoke assertFn and return the result
  return assertFn(actionOrNil);
}

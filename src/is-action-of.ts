// tslint:disable:max-line-length
import {
  TypeMeta,
} from './';

export type AC<T extends { type: string }> = ((...args: any[]) => T) & TypeMeta<T['type']>;
export type ACs<
  T1 extends { type: string },
  T2 extends { type: string } = any,
  T3 extends { type: string } = any,
  T4 extends { type: string } = any,
  T5 extends { type: string } = any,
  > = (
    |[AC<T1>]
    | [AC<T1>, AC<T2>]
    | [AC<T1>, AC<T2>, AC<T3>]
    | [AC<T1>, AC<T2>, AC<T3>, AC<T4>]
    | [AC<T1>, AC<T2>, AC<T3>, AC<T4>, AC<T5>]
  );

/**
 * @description create the assert function that will assert a given action of `any` type to the specific "action type" if matching the specified action creator(s)
 */
export function isActionOf<A extends { type: string }, T1 extends A>(
  actionOrActions: AC<T1>
): (action: A) => action is T1;

/**
 * @description create the assert function that will assert a given action of `any` type to the specific "action type" if matching the specified action creator(s)
 */
export function isActionOf<A extends { type: string }, T1 extends A, T2 extends A, T3 extends A, T4 extends A, T5 extends A>(
  actionOrActions: ACs<T1> | ACs<T1, T2> | ACs<T1, T2, T3> | ACs<T1, T2, T3, T4> | ACs<T1, T2, T3, T4, T5>
): (action: A) => action is [T1, T2, T3, T4, T5][number];

export function isActionOf<A extends { type: string }, T1 extends A, T2 extends A, T3 extends A, T4 extends A, T5 extends A>(
  actionOrActions: AC<T1> | (ACs<T1> | ACs<T1, T2> | ACs<T1, T2, T3> | ACs<T1, T2, T3, T4> | ACs<T1, T2, T3, T4, T5>)
) {
  return (action: A): action is [T1, T2, T3, T4, T5][number] => {
    if (actionOrActions == null) {
      throw new Error('first argument is missing');
    }

    if (!Array.isArray(actionOrActions)) {
      if (actionOrActions.getType == null) {
        throw new Error('first argument is not an instance of "typesafe-actions"');
      }
    }

    const actionCreators: any[] = Array.isArray(actionOrActions)
      ? actionOrActions : [actionOrActions];

    return actionCreators.some((actionCreator, index) => {
      if (actionCreator.getType == null) {
        throw new Error(`element of the first argument with index [${index}]
          is not an instance of "typesafe-actions"`);
      }
      return actionCreator.getType() === action.type;
    });
  };
}

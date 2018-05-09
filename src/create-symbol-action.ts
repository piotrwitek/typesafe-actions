import { SymbolType, TypeMeta } from './types';

// TODO: mandatory to fill in generic symbol type arg
// because symbol loses uniqueness when inferred
// check in repo issues why

/**
 * @description create an action creator of a given function that contains hidden "type" metadata
 */
export declare function createSymbolAction<T extends SymbolType>(
  actionType: T
): (() => { type: T }) & TypeMeta<T>;

export declare function createSymbolAction<T extends SymbolType, P>(
  actionType: T
): ((payload: P) => { type: T; payload: P }) & TypeMeta<T>;

/**
 * @description create an action creator of a given function that contains hidden "type" metadata
 */
// export function createSymbolAction<T extends SymbolType, P>(
//   actionType: T,
// ): {type: T} & TypeMeta<T>;

/**
 *  implementation
 */
// export function createSymbolAction<T extends SymbolType,
//   AC extends (...args: any[]) => FluxStandardAction<T>
//   >(
//     actionType: T | symbol,
//     creatorFunction?: AC,
// ): AC & TypeMeta<T> {
//   let actionCreator: AC & TypeMeta<T>;

//   if (creatorFunction != null) {
//     if (typeof creatorFunction !== 'function') {
//       throw new Error('second argument is not a function');
//     }

//     actionCreator = creatorFunction as (AC & TypeMeta<T>);
//   } else {
//     actionCreator = (() => ({ type: actionType })) as (AC & TypeMeta<T>);
//   }

//   if (actionType != null) {
//     if (typeof actionType !== 'string'
//       && typeof actionType !== 'symbol') {
//       throw new Error('first argument should be type of: string | symbol');
//     }

//     actionCreator.getType = () => actionType as T;
//   } else {
//     throw new Error('first argument is missing');
//   }

//   return actionCreator;
// }

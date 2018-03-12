import { combineReducers as reduxCombineReducers } from 'redux';

/**
 * A *reducer* function.
 *
 * Same as *Reducer<S>* from 'redux', except with typed action.
 */
export type Reducer<S, A> = (state: S, action: A) => S;

/**
 * Object whose values correspond to different reducer functions.
 *
 * Same as *ReducersMapObject<S>* from 'redux', except with typed action.
 */
export type ReducersMapObject<S, A> = { [P in keyof S]?: Reducer<S[P], A> };

/**
 * @description turns an object whose values are different reducer functions, into a single
 * reducer function.
 *
 * Same as *combineReducers<S>* from 'redux', except with typed action.
 */
export function combineReducers<S, A>(reducers: ReducersMapObject<S, A>): Reducer<S, A> {
  return reduxCombineReducers(reducers as any) as any;
}

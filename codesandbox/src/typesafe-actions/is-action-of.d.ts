import { TypeMeta } from './type-helpers';
export declare type ActionCreator<T extends {
    type: string;
}> = ((...args: any[]) => T) & TypeMeta<T['type']>;
/**
 * @description (curried assert function) check if an action is the instance of given action-creator(s)
 * @description it works with discriminated union types
 */
export declare function isActionOf<AC extends ActionCreator<{
    type: string;
}>>(actionCreator: AC | AC[], action: {
    type: string;
}): action is ReturnType<AC>;
/**
 * @description (curried assert function) check if an action is the instance of given action-creator(s)
 * @description it works with discriminated union types
 */
export declare function isActionOf<AC extends ActionCreator<{
    type: string;
}>>(actionCreator: AC | AC[]): (action: {
    type: string;
}) => action is ReturnType<AC>;

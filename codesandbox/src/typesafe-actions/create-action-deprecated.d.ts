/**
 * DEPRECATED
 */
import { TypeConstant } from './type-helpers';
interface FSA<T extends TypeConstant, P = {}, M = {}, E = boolean> {
    type: T;
    payload?: P;
    meta?: M;
    error?: E;
}
/**
 * @deprecated
 * @description create an action-creator of a given function that contains hidden "type" metadata
 */
export declare function createActionDeprecated<T extends TypeConstant, AC extends (...args: any[]) => FSA<T>>(actionType: T, creatorFunction: AC): AC;
/**
 * @deprecated
 * @description create an action-creator of a given function that contains hidden "type" metadata
 */
export declare function createActionDeprecated<T extends TypeConstant, AC extends () => {
    type: T;
}>(actionType: T): AC;
export {};

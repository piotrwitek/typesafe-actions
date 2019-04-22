import { ActionCreator, TypeConstant } from './type-helpers';
/**
 * @description create custom action-creator using constructor function with injected type argument
 */
export declare function createCustomAction<T extends TypeConstant, AC extends ActionCreator<T> = () => {
    type: T;
}>(type: T, createHandler?: (type: T) => AC): AC;

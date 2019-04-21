import { ActionCreator, TypeConstant } from './type-helpers';
export declare function createCustomAction<T extends TypeConstant, AC extends ActionCreator<T> = () => {
    type: T;
}>(type: T, createHandler?: (type: T) => AC): AC;

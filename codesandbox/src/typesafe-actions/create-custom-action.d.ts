import { ActionCreator, StringType } from './type-helpers';
export declare function createCustomAction<T extends StringType, AC extends ActionCreator<T> = () => {
    type: T;
}>(type: T, createHandler?: (type: T) => AC): AC;

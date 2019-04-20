import { StringType } from './type-helpers';
interface FSA<T extends StringType, P = {}, M = {}, E = boolean> {
    type: T;
    payload?: P;
    meta?: M;
    error?: E;
}
export declare function createActionDeprecated<T extends StringType, AC extends (...args: any[]) => FSA<T>>(actionType: T, creatorFunction: AC): AC;
export declare function createActionDeprecated<T extends StringType, AC extends () => {
    type: T;
}>(actionType: T): AC;
export {};

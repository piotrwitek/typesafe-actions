import { TypeConstant } from './type-helpers';
interface FSA<T extends TypeConstant, P = {}, M = {}, E = boolean> {
    type: T;
    payload?: P;
    meta?: M;
    error?: E;
}
export declare function createActionDeprecated<T extends TypeConstant, AC extends (...args: any[]) => FSA<T>>(actionType: T, creatorFunction: AC): AC;
export declare function createActionDeprecated<T extends TypeConstant, AC extends () => {
    type: T;
}>(actionType: T): AC;
export {};

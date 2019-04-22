import { TypeConstant, ActionCreator } from './type-helpers';
export declare type PayloadMetaAction<T extends TypeConstant, P, M> = P extends undefined ? M extends undefined ? {
    type: T;
} : {
    type: T;
    meta: M;
} : M extends undefined ? {
    type: T;
    payload: P;
} : {
    type: T;
    payload: P;
    meta: M;
};
/**
 * @description typesafe action-creator factory
 */
export declare function createAction<T extends TypeConstant, AC extends ActionCreator<T> = () => {
    type: T;
}>(type: T, createHandler?: (actionCallback: <P = undefined, M = undefined>(payload?: P, meta?: M) => PayloadMetaAction<T, P, M>) => AC): AC;

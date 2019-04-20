import { StringType, ActionCreator } from './type-helpers';
export declare type PayloadMetaAction<T extends StringType, P, M> = P extends undefined ? M extends undefined ? {
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
export declare function createAction<T extends StringType, AC extends ActionCreator<T> = () => {
    type: T;
}>(type: T, createHandler?: (actionCallback: <P = undefined, M = undefined>(payload?: P, meta?: M) => PayloadMetaAction<T, P, M>) => AC): AC;

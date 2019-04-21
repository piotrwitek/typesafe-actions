import { TypeConstant } from './type-helpers';
export declare function action<T extends TypeConstant, E>(type: T, payload: undefined, meta: undefined, error: E): {
    type: T;
    error: E;
};
export declare function action<T extends TypeConstant, M, E>(type: T, payload: undefined, meta: M, error: E): {
    type: T;
    meta: M;
    error: E;
};
export declare function action<T extends TypeConstant, P, E>(type: T, payload: P, meta: undefined, error: E): {
    type: T;
    payload: P;
    error: E;
};
export declare function action<T extends TypeConstant, P, M, E>(type: T, payload: P, meta: M, error: E): {
    type: T;
    payload: P;
    meta: M;
    error: E;
};
export declare function action<T extends TypeConstant, M>(type: T, payload: undefined, meta: M): {
    type: T;
    meta: M;
};
export declare function action<T extends TypeConstant, P, M>(type: T, payload: P, meta: M): {
    type: T;
    payload: P;
    meta: M;
};
export declare function action<T extends TypeConstant, P>(type: T, payload: P): {
    type: T;
    payload: P;
};
export declare function action<T extends TypeConstant>(type: T): {
    type: T;
};

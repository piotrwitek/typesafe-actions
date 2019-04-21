import { TypeConstant, ActionBuilderConstructor } from './type-helpers';
export interface AsyncActionBuilder<T1 extends TypeConstant, T2 extends TypeConstant, T3 extends TypeConstant> {
    <P1, P2, P3>(): AsyncActionBuilderConstructor<T1, T2, T3, P1, P2, P3>;
}
export declare type AsyncActionBuilderConstructor<T1 extends TypeConstant, T2 extends TypeConstant, T3 extends TypeConstant, P1, P2, P3> = {
    request: ActionBuilderConstructor<T1, P1>;
    success: ActionBuilderConstructor<T2, P2>;
    failure: ActionBuilderConstructor<T3, P3>;
};
export declare function createAsyncAction<T1 extends TypeConstant, T2 extends TypeConstant, T3 extends TypeConstant>(requestType: T1, successType: T2, failureType: T3): AsyncActionBuilder<T1, T2, T3>;

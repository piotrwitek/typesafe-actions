import { StringType, ActionBuilderConstructor } from './type-helpers';
export interface AsyncActionBuilder<T1 extends StringType, T2 extends StringType, T3 extends StringType> {
    <P1, P2, P3>(): AsyncActionBuilderConstructor<T1, T2, T3, P1, P2, P3>;
}
export declare type AsyncActionBuilderConstructor<T1 extends StringType, T2 extends StringType, T3 extends StringType, P1, P2, P3> = {
    request: ActionBuilderConstructor<T1, P1>;
    success: ActionBuilderConstructor<T2, P2>;
    failure: ActionBuilderConstructor<T3, P3>;
};
export declare function createAsyncAction<T1 extends StringType, T2 extends StringType, T3 extends StringType>(requestType: T1, successType: T2, failureType: T3): AsyncActionBuilder<T1, T2, T3>;

import { TypeConstant, ActionBuilderConstructor, ActionBuilderMap } from './type-helpers';
export interface ActionBuilder<T extends TypeConstant> {
    <P = undefined, M = undefined>(): ActionBuilderConstructor<T, P, M>;
    map<R, P = undefined, M = undefined>(fn: (payload: P, meta: M) => R): ActionBuilderMap<T, R, P, M>;
}
export declare function createStandardAction<T extends TypeConstant>(type: T): ActionBuilder<T>;

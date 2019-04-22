import { TypeConstant, ActionCreator, TypeMeta } from './type-helpers';
/**
 * @description get the "type literal" of a given action-creator
 */
export declare function getType<T extends TypeConstant>(actionCreator: ActionCreator<T> & TypeMeta<T>): T;

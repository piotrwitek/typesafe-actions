import { TypeConstant, ActionCreator, TypeMeta } from './type-helpers';
export declare function getType<T extends TypeConstant>(actionCreator: ActionCreator<T> & TypeMeta<T>): T;

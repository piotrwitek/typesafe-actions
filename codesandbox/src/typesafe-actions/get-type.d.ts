import { StringType, ActionCreator, TypeMeta } from './type-helpers';
export declare function getType<T extends StringType>(actionCreator: ActionCreator<T> & TypeMeta<T>): T;

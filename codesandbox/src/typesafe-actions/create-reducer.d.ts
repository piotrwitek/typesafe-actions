import { RootAction } from './';
import { Reducer, Action } from './type-helpers';
declare type AddHandler<S, TAllActions extends Action> = <TType extends TAllActions['type'], TTypeAction extends TAllActions extends {
    type: TType;
} ? TAllActions : never, TCreator extends (...args: any[]) => TAllActions, TCreatorAction extends TAllActions extends ReturnType<TCreator> ? TAllActions : never, TActionIntersection extends TTypeAction extends TCreatorAction ? TTypeAction : never>(actionsTypes: TType | TCreator | TType[] | TCreator[], actionsHandler: (state: S, action: TActionIntersection) => S) => Exclude<TAllActions, TTypeAction & TCreatorAction> extends never ? Reducer<S, TAllActions> : Reducer<S, TAllActions> & {
    addHandler: AddHandler<S, Exclude<TAllActions, TTypeAction & TCreatorAction>>;
};
export declare function createReducer<S, A extends Action = RootAction>(initialState: S): Reducer<S, A> & {
    addHandler: AddHandler<S, A>;
};
export {};

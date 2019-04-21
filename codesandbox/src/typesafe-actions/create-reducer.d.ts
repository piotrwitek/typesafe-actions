import { RootAction } from './';
import { Reducer, Action } from './type-helpers';
declare type AddHandler<S, TAllActions extends Action, TNotHandledActions extends Action> = <TType extends TNotHandledActions['type'], TTypeAction extends TNotHandledActions extends {
    type: TType;
} ? TNotHandledActions : never, TCreator extends (...args: any[]) => TNotHandledActions, TCreatorAction extends TNotHandledActions extends ReturnType<TCreator> ? TNotHandledActions : never, TActionIntersection extends TTypeAction extends TCreatorAction ? TTypeAction : never>(actionsTypes: TType | TCreator | TType[] | TCreator[], actionsHandler: (state: S, action: TActionIntersection) => S) => Exclude<TNotHandledActions, TTypeAction & TCreatorAction> extends never ? Reducer<S, TAllActions> : Reducer<S, TAllActions> & {
    addHandler: AddHandler<S, TAllActions, Exclude<TNotHandledActions, TTypeAction & TCreatorAction>>;
};
export declare function createReducer<S, A extends Action = RootAction>(initialState: S): Reducer<S, A> & {
    addHandler: AddHandler<S, A, A>;
};
export {};

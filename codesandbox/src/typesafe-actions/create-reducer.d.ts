import { RootAction } from './';
import { Reducer, Action } from './type-helpers';
declare type HandleActionChainApi<TState, TNotHandledAction extends Action, TRootAction extends Action> = <TType extends TNotHandledAction['type'], TTypeAction extends TNotHandledAction extends {
    type: TType;
} ? TNotHandledAction : never, TCreator extends (...args: any[]) => TNotHandledAction, TCreatorAction extends TNotHandledAction extends ReturnType<TCreator> ? TNotHandledAction : never, TActionIntersection extends TTypeAction extends TCreatorAction ? TTypeAction : never>(singleOrMultipleCreatorsAndTypes: TType | TType[] | TCreator | TCreator[], reducer: (state: TState, action: TActionIntersection) => TState) => [Exclude<TNotHandledAction, TTypeAction & TCreatorAction>] extends [never] ? Reducer<TState, TRootAction> & {
    reducers: Record<TActionIntersection['type'], (state: TState, action: TRootAction) => TState>;
} : Reducer<TState, TRootAction> & {
    reducers: Record<TActionIntersection['type'], (state: TState, action: TRootAction) => TState>;
    handleAction: HandleActionChainApi<TState, Exclude<TNotHandledAction, TTypeAction & TCreatorAction>, TNotHandledAction>;
};
export declare function createReducer<TState, TAllActions extends Action = RootAction>(initialState: TState, initialReducers?: Record<RootAction['type'], (state: TState, action: RootAction) => TState>): Reducer<TState, TAllActions> & {
    reducers: {
        readonly [x: string]: (state: TState, action: any) => TState;
    };
    readonly handleAction: HandleActionChainApi<TState, TAllActions, TAllActions>;
};
export {};

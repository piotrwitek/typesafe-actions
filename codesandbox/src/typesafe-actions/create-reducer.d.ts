import { RootAction } from './';
import { Reducer, Action } from './type-helpers';
declare type HandleActionChainApi<TState, TNotHandledAction extends Action, TRootAction extends Action> = <TType extends TNotHandledAction['type'], TTypeAction extends TNotHandledAction extends {
    type: TType;
} ? TNotHandledAction : never, TCreator extends (...args: any[]) => TNotHandledAction, TCreatorAction extends TNotHandledAction extends ReturnType<TCreator> ? TNotHandledAction : never, TActionIntersection extends TTypeAction extends TCreatorAction ? TTypeAction : never>(singleOrMultipleCreatorsAndTypes: TType | TType[] | TCreator | TCreator[], reducer: (state: TState, action: TActionIntersection) => TState) => [Exclude<TNotHandledAction, TTypeAction & TCreatorAction>] extends [never] ? Reducer<TState, TRootAction> & {
    handlers: Record<TActionIntersection['type'], (state: TState, action: TRootAction) => TState>;
} : Reducer<TState, TRootAction> & {
    handlers: Record<TActionIntersection['type'], (state: TState, action: TRootAction) => TState>;
    handleAction: HandleActionChainApi<TState, Exclude<TNotHandledAction, TTypeAction & TCreatorAction>, TNotHandledAction>;
};
export declare function createReducer<TState, TRootAction extends Action = RootAction>(initialState: TState, initialHandlers?: {
    [TType in TRootAction['type']]?: TRootAction extends {
        type: TType;
    } ? ((state: TState, action: TRootAction) => TState) : never;
}): Reducer<TState, TRootAction> & {
    handlers: {
        readonly [x: string]: ((state: TState, action: any) => TState) | undefined;
    };
    readonly handleAction: HandleActionChainApi<TState, TRootAction, TRootAction>;
};
export {};

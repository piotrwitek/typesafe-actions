export interface TypeMeta<T extends StringType> {
    getType?: () => T;
}
export declare type ActionCreator<T extends StringType> = (...args: any[]) => {
    type: T;
};
export declare type ActionType<ActionCreatorOrMap extends any> = ActionCreatorOrMap extends ActionCreator<string> ? ReturnType<ActionCreatorOrMap> : ActionCreatorOrMap extends Record<any, any> ? {
    [K in keyof ActionCreatorOrMap]: ActionType<ActionCreatorOrMap[K]>;
}[keyof ActionCreatorOrMap] : ActionCreatorOrMap extends infer R ? never : never;
export declare type StateType<ReducerOrMap> = ReducerOrMap extends (...args: any[]) => any ? ReturnType<ReducerOrMap> : ReducerOrMap extends object ? {
    [K in keyof ReducerOrMap]: StateType<ReducerOrMap[K]>;
} : never;
export declare type StringType = string;
export declare type EmptyAction<T extends StringType> = {
    type: T;
};
export declare type PayloadAction<T extends StringType, P> = {
    type: T;
    payload: P;
};
export declare type MetaAction<T extends StringType, M> = {
    type: T;
    meta: M;
};
export declare type PayloadMetaAction<T extends StringType, P, M> = {
    type: T;
    payload: P;
    meta: M;
};
export interface FluxStandardAction<T extends StringType, P = undefined, M = undefined> {
    type: T;
    payload: P;
    meta: M;
    error?: true;
}
export declare type EmptyAC<T extends StringType> = () => EmptyAction<T>;
export declare type PayloadAC<T extends StringType, P> = (payload: P) => PayloadAction<T, P>;
export declare type PayloadMetaAC<T extends StringType, P, M> = (payload: P, meta: M) => PayloadMetaAction<T, P, M>;
export declare type ActionBuilderConstructor<T extends StringType, TPayload extends any = undefined, TMeta extends any = undefined> = [TMeta] extends [undefined] ? [TPayload] extends [undefined] ? unknown extends TPayload ? PayloadAC<T, TPayload> : unknown extends TMeta ? PayloadMetaAC<T, TPayload, TMeta> : EmptyAC<T> : PayloadAC<T, TPayload> : PayloadMetaAC<T, TPayload, TMeta>;
export declare type ActionBuilderMap<T extends StringType, TCustomAction extends any, TPayloadArg extends any = undefined, TMetaArg extends any = undefined> = [TMetaArg] extends [undefined] ? [TPayloadArg] extends [undefined] ? () => {
    type: T;
} & TCustomAction : (payload: TPayloadArg) => {
    type: T;
} & TCustomAction : (payload: TPayloadArg, meta: TMetaArg) => {
    type: T;
} & TCustomAction;

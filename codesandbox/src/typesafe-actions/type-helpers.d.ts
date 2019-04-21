export declare type TypeConstant = string;
export declare type Action<TType extends TypeConstant = TypeConstant> = {
    type: TType;
};
export declare type ActionCreator<TType extends TypeConstant> = (...args: any[]) => Action<TType>;
export declare type Reducer<TState, TAction extends Action> = (state: TState | undefined, action: TAction) => TState;
export declare type EmptyAction<TType extends TypeConstant> = {
    type: TType;
};
export declare type PayloadAction<TType extends TypeConstant, TPayload> = {
    type: TType;
    payload: TPayload;
};
export declare type MetaAction<TType extends TypeConstant, TMeta> = {
    type: TType;
    meta: TMeta;
};
export declare type PayloadMetaAction<TType extends TypeConstant, TPayload, TMeta> = {
    type: TType;
    payload: TPayload;
    meta: TMeta;
};
export declare type EmptyAC<TType extends TypeConstant> = () => EmptyAction<TType>;
export declare type PayloadAC<TType extends TypeConstant, TPayload> = (payload: TPayload) => PayloadAction<TType, TPayload>;
export declare type PayloadMetaAC<TType extends TypeConstant, TPayload, TMeta> = (payload: TPayload, meta: TMeta) => PayloadMetaAction<TType, TPayload, TMeta>;
export interface TypeMeta<TType extends TypeConstant> {
    getType?: () => TType;
}
export declare type ActionType<TActionCreatorOrMap extends any> = TActionCreatorOrMap extends ActionCreator<TypeConstant> ? ReturnType<TActionCreatorOrMap> : TActionCreatorOrMap extends Record<any, any> ? {
    [K in keyof TActionCreatorOrMap]: ActionType<TActionCreatorOrMap[K]>;
}[keyof TActionCreatorOrMap] : TActionCreatorOrMap extends infer R ? never : never;
export declare type StateType<TReducerOrMap extends any> = TReducerOrMap extends Reducer<any, any> ? ReturnType<TReducerOrMap> : TReducerOrMap extends Record<any, any> ? {
    [K in keyof TReducerOrMap]: StateType<TReducerOrMap[K]>;
} : never;
export declare type ActionBuilderConstructor<TType extends TypeConstant, TPayload extends any = undefined, TMeta extends any = undefined> = [TMeta] extends [undefined] ? [TPayload] extends [undefined] ? unknown extends TPayload ? PayloadAC<TType, TPayload> : unknown extends TMeta ? PayloadMetaAC<TType, TPayload, TMeta> : EmptyAC<TType> : PayloadAC<TType, TPayload> : PayloadMetaAC<TType, TPayload, TMeta>;
export declare type ActionBuilderMap<TType extends TypeConstant, TActionProps extends any, TPayloadArg extends any = undefined, TMetaArg extends any = undefined> = [TMetaArg] extends [undefined] ? [TPayloadArg] extends [undefined] ? () => {
    type: TType;
} & TActionProps : (payload: TPayloadArg) => {
    type: TType;
} & TActionProps : (payload: TPayloadArg, meta: TMetaArg) => {
    type: TType;
} & TActionProps;

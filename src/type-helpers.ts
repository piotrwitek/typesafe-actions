/**
 * PUBLIC API
 */

/**
 * @desc Interface for internal types augmentation
 * @example ```
 * declare module 'typesafe-actions' {
 *   export type RootAction = ActionType<typeof import('./root-action').default>;
 *   export interface Types {
 *     RootAction: RootAction;
 *   }
 * } ```
 */
export interface Types {}

/**
 * @desc Type representing Type Constant
 */
export type TypeConstant = string;

/**
 * @desc Type representing Generic Action
 */
export type Action<TType extends TypeConstant = TypeConstant> = {
  type: TType;
};

/**
 * @desc Type representing Generic ActionCreator
 */
export type ActionCreator<TType extends TypeConstant> = (
  ...args: any[]
) => Action<TType>;

/**
 * @desc Type representing Generic Reducer
 */
export type Reducer<TState, TAction extends Action> = (
  state: TState | undefined,
  action: TAction
) => TState;

/**
 * @desc Action without Payload
 */
export type EmptyAction<TType extends TypeConstant> = {
  type: TType;
};

/**
 * @desc Action with only Payload
 */
export type PayloadAction<TType extends TypeConstant, TPayload> = {
  type: TType;
  payload: TPayload;
};

/**
 * @desc Action with only Meta
 */
export type MetaAction<TType extends TypeConstant, TMeta> = {
  type: TType;
  meta: TMeta;
};

/**
 * @desc Action with both Payload and Meta
 */
export type PayloadMetaAction<TType extends TypeConstant, TPayload, TMeta> = {
  type: TType;
  payload: TPayload;
  meta: TMeta;
};

/**
 * @desc Action Creator producing EmptyAction
 */
export type EmptyAC<TType extends TypeConstant> = () => EmptyAction<TType>;

/**
 * @desc Action Creator producing PayloadAction
 */
export type PayloadAC<TType extends TypeConstant, TPayload> = (
  payload: TPayload
) => PayloadAction<TType, TPayload>;

/**
 * @desc Action Creator producing PayloadMetaAction
 */
export type PayloadMetaAC<TType extends TypeConstant, TPayload, TMeta> = (
  payload: TPayload,
  meta: TMeta
) => PayloadMetaAction<TType, TPayload, TMeta>;

/**
 * @desc Type representing type getter on Action Creator instance
 */
export interface TypeMeta<TType extends TypeConstant> {
  getType?: () => TType;
}

/**
 * @desc Infers Action union-type from action-creator map object
 */
export type ActionType<
  TActionCreatorOrMap extends any
> = TActionCreatorOrMap extends ActionCreator<TypeConstant>
  ? ReturnType<TActionCreatorOrMap>
  : TActionCreatorOrMap extends Record<any, any>
  ? {
      [K in keyof TActionCreatorOrMap]: ActionType<TActionCreatorOrMap[K]>
    }[keyof TActionCreatorOrMap]
  : TActionCreatorOrMap extends infer R // TODO: should be just never but compiler yell with circularly references itself error
  ? never
  : never;

/**
 * @desc Infers State object from reducer map object
 */
export type StateType<
  TReducerOrMap extends any
> = TReducerOrMap extends Reducer<any, any>
  ? ReturnType<TReducerOrMap>
  : TReducerOrMap extends Record<any, any>
  ? { [K in keyof TReducerOrMap]: StateType<TReducerOrMap[K]> }
  : never;

/**
 * INTERNAL API
 */

/** @private */
export type ActionBuilderConstructor<
  TType extends TypeConstant,
  TPayload extends any = undefined,
  TMeta extends any = undefined
> = [TMeta] extends [undefined]
  ? [TPayload] extends [undefined]
    ? unknown extends TPayload
      ? PayloadAC<TType, TPayload>
      : unknown extends TMeta
      ? PayloadMetaAC<TType, TPayload, TMeta>
      : EmptyAC<TType>
    : PayloadAC<TType, TPayload>
  : PayloadMetaAC<TType, TPayload, TMeta>;

/** @private */
export type ActionBuilderMap<
  TType extends TypeConstant,
  TActionProps extends any,
  TPayloadArg extends any = undefined,
  TMetaArg extends any = undefined
> = [TMetaArg] extends [undefined]
  ? [TPayloadArg] extends [undefined]
    ? () => { type: TType } & TActionProps
    : (payload: TPayloadArg) => { type: TType } & TActionProps
  : (payload: TPayloadArg, meta: TMetaArg) => { type: TType } & TActionProps;

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
export type ActionCreator<TType extends TypeConstant = TypeConstant> = (
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

// /**
//  * @desc Action with only Meta
//  */
// export type MetaAction<TType extends TypeConstant, TMeta> = {
//   type: TType;
//   meta: TMeta;
// };

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
export type EmptyActionCreator<TType extends TypeConstant> = () => EmptyAction<
  TType
>;

/**
 * @desc Action Creator producing PayloadAction
 */
export type PayloadActionCreator<TType extends TypeConstant, TPayload> = (
  payload: TPayload
) => PayloadAction<TType, TPayload>;

// /**
//  * @desc Action Creator producing MetaAction
//  */
// export type MetaActionCreator<TType extends TypeConstant, TMeta> = (
//   payload: undefined,
//   meta: TMeta
// ) => MetaAction<TType, TMeta>;

/**
 * @desc Action Creator producing PayloadMetaAction
 */
export type PayloadMetaActionCreator<
  TType extends TypeConstant,
  TPayload,
  TMeta
> = (
  payload: TPayload,
  meta: TMeta
) => PayloadMetaAction<TType, TPayload, TMeta>;

/**
 * @desc Type representing type getter on Action Creator instance
 */
export interface ActionCreatorTypeMetadata<TType extends TypeConstant> {
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
      [K in keyof TActionCreatorOrMap]: ActionType<TActionCreatorOrMap[K]>;
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
export type ActionCreatorBuilder<
  TType extends TypeConstant,
  TPayload extends any = undefined,
  TMeta extends any = undefined
> = [TMeta] extends [undefined]
  ? [TPayload] extends [undefined]
    ? unknown extends TPayload
      ? PayloadActionCreator<TType, TPayload>
      : unknown extends TMeta
      ? PayloadMetaActionCreator<TType, TPayload, TMeta>
      : EmptyActionCreator<TType>
    : PayloadActionCreator<TType, TPayload>
  : PayloadMetaActionCreator<TType, TPayload, TMeta>;

/** @private */
export type ActionBuilder<
  TType extends TypeConstant,
  TPayload extends any = undefined,
  TMeta extends any = undefined
> = [TMeta] extends [undefined]
  ? [TPayload] extends [undefined]
    ? unknown extends TPayload
      ? PayloadAction<TType, TPayload>
      : unknown extends TMeta
      ? PayloadMetaAction<TType, TPayload, TMeta>
      : EmptyAction<TType>
    : PayloadAction<TType, TPayload>
  : PayloadMetaAction<TType, TPayload, TMeta>;

/** @private */
export type ResolveType<T extends any> = T extends Function
  ? T
  : { [K in keyof T]: T[K] };

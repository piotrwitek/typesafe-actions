import { TypeConstant, ActionCreator, ResolveType } from './type-helpers';

/**
 * @description typesafe action-creator factory
 */
declare function createReduxAction<
  TType extends TypeConstant,
  TPayload extends any = never,
  TMeta extends any = never,
  TArgs extends any[] = any[]
>(
  type: TType,
  payloadCreator?: (...args: TArgs) => TPayload,
  metaCreator?: (...args: TArgs) => TMeta
): (
  ...args: TArgs
) => ResolveType<{ type: TType } & { payload: TPayload } & { meta: TMeta }>;

{
  const emptyAction = createReduxAction('TYPE');

  const payloadAction = createReduxAction(
    'TYPE',
    (name: string, id: number) => name // payload creator
  );

  const metaAction = createReduxAction(
    'TYPE',
    (name: string, id: number) => name, // payload creator
    (name: string, id: number) => id // optional meta creator
  );
}

/**
 * @description typesafe action-creator record factory
 */
declare function createActions<
  TMap extends { [P in keyof TMap]: ActionCreator<TType> },
  TType extends TypeConstant
>(actionMap?: { [P in keyof TMap]: TMap[P] }): TMap;

{
  const actions = createActions({
    action1: ['TYPE1', (name: string, id: string) => name],
    action2: [
      'TYPE1',
      (name: string, id: string) => ({
        payload: name,
        meta: id,
      }),
    ],
  });
}

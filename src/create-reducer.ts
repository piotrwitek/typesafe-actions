import { RootAction } from '.';

export function createReducer<S, A extends { type: string } = RootAction>(
  initialState: S
) {
  type AddHandler<TAllActions extends A> = <TAction extends TAllActions>(
    actionsCreators: Array<(...args: any[]) => TAction>,
    actionsHandler: (state: S, action: A extends TAction ? A : never) => S
  ) => Exclude<TAllActions, TAction> extends never
    ? ReducerInstance
    : ReducerInstance & {
        addHandler: AddHandler<Exclude<TAllActions, TAction>>;
      };

  type ReducerInstance = (state: S, action: A) => S;
  type Chain = { addHandler: AddHandler<A> };

  const addHandler: AddHandler<A> = (types, handler) => {
    return Object.assign({}, { addHandler });
  };

  return Object.assign({}, { addHandler }) as ReducerInstance & Chain;

  // return (state: S = initialState, action: A): S => {
  //   if (handlers.hasOwnProperty(action.type)) {
  //     return (handlers as any)[action.type](state, action);
  //   } else {
  //     return state;
  //   }
  // };
}

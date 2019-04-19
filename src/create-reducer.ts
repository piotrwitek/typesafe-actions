// @ts-ignore
import { RootAction } from '.';
import { getType } from './get-type';

export function createReducer<S, A extends { type: string } = RootAction>(
  initialState: S
) {
  type AddHandler<TAllActions extends A> = <TAction extends TAllActions>(
    actionsCreators: Array<(...args: any[]) => TAction>,
    actionsHandler: (state: S, action: A extends TAction ? A : never) => S
  ) => Exclude<TAllActions, TAction> extends never
    ? Reducer
    : Reducer & {
        addHandler: AddHandler<Exclude<TAllActions, TAction>>;
      };
  type AddHandlerChain = { addHandler: AddHandler<A> };

  const handlers: Record<string, Reducer> = {};

  type Reducer = (state: S, action: A) => S;
  const reducer: Reducer = (state = initialState, action) => {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    } else {
      return state;
    }
  };

  const addHandler = ((actionsCreators, actionsHandler: Reducer) => {
    actionsCreators.forEach(ac => (handlers[getType(ac)] = actionsHandler));
    return chain;
  }) as AddHandler<A>;

  const chain: Reducer & AddHandlerChain = Object.assign(reducer, {
    addHandler,
  });

  return chain;
}

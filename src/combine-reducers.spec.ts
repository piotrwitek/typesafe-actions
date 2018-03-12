import { combineReducers, createAction, getType } from '.';

type State = { a: number; b: string };

type Actions = { type: 'A'; payload: number } | { type: 'B'; payload: string };

const actions = {
  actionA: createAction('A', (val: number) => ({ type: 'A', payload: val })),
  actionB: createAction('B', (val: string) => ({ type: 'B', payload: val })),
};

const handleA = (state = 0, action: Actions) => {
  switch (action.type) {
    case getType(actions.actionA):
      return state + action.payload;
    default:
      return state;
  }
};

const handleB = (state = '', action: Actions) => {
  switch (action.type) {
    case getType(actions.actionB):
      return state + action.payload;
    default:
      return state;
  }
};

describe('combineReducers', () => {
  it('it works ;o)', () => {
    const handle = combineReducers<State, Actions>({
      a: handleA,
      b: handleB,
    });

    let s: State = { a: 1, b: '' };

    s = handle(s, actions.actionA(4));

    expect(s.a).toBe(5);
    expect(s.b).toBe('');

    s = handle(s, actions.actionB('fred'));

    expect(s.a).toBe(5);
    expect(s.b).toBe('fred');
  });
});

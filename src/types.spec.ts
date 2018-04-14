import { buildAction, getType, ActionsUnion } from '.';

describe('ActionsUnion', () => {
  it('with buildAction', () => {
    const actions = {
      very: { deep: { onlyType: buildAction('INCREMENT')<void>() } },
      payload: buildAction('ADD')<number>(),
      payloadMeta: buildAction('NOTIFY')<string, string>(),
    };
    type RootAction = ActionsUnion<typeof actions>;

    function reducer(action: RootAction): RootAction {
      switch (action.type) {
        case getType(actions.very.deep.onlyType): {
          const a: { type: 'INCREMENT' } = action;
          return a;
        }
        case getType(actions.payload): {
          const a: { type: 'ADD'; payload: number } = action;
          return a;
        }
        case getType(actions.payloadMeta): {
          const a: { type: 'NOTIFY'; payload: string; meta: string } = action;
          return a;
        }
      }
    }
    expect(reducer(actions.very.deep.onlyType())).toEqual({
      type: 'INCREMENT',
    });
    expect(reducer(actions.payload(2))).toEqual({ type: 'ADD', payload: 2 });
    expect(reducer(actions.payloadMeta('payloadValue', 'metaValue'))).toEqual({
      type: 'NOTIFY',
      payload: 'payloadValue',
      meta: 'metaValue',
    });
  });
});

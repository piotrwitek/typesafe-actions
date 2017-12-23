import { createAction, actionOf } from '.';

describe('actionOf', () => {

  it('should succeed with same action', () => {
    const increment = createAction('INCREMENT');

    const actionOfIncrement = actionOf(increment);
    expect(actionOfIncrement(increment())).toBeTruthy();
  });

  it('should fail with different action', () => {
    const increment = createAction('INCREMENT');
    const add = createAction('ADD');

    const actionOfAdd = actionOf(increment);
    expect(actionOfAdd(add())).toBeFalsy();
  });

  it('should correctly assert type for EmptyAction', () => {
    const increment = createAction('INCREMENT');
    const actionOfIncrement = actionOf(increment);

    const action = { type: 'ERROR' };
    if (actionOfIncrement(action)) {
      const a: { type: 'INCREMENT' } = action;
    }
  });

  it('should correctly assert type for FluxStandardAction', () => {
    const add = createAction('ADD',
      (amount: number) => ({ type: 'ADD', payload: amount }),
    );
    const isAdd = actionOf(add);

    const action = { type: 'ERROR' };
    if (isAdd(action)) {
      const a: { type: 'ADD', payload: number } = action;
    }
  });

});

import { createAction, isActionOf } from '.';

describe('isActionOf', () => {

  it('should succeed with same action', () => {
    const increment = createAction('INCREMENT');

    const isActionOfIncrement = isActionOf(increment);
    expect(isActionOfIncrement(increment())).toBeTruthy();
  });

  it('should fail with different action', () => {
    const increment = createAction('INCREMENT');
    const add = createAction('ADD');

    const isActionOfAdd = isActionOf(increment);
    expect(isActionOfAdd(add())).toBeFalsy();
  });

  it('should correctly assert type for EmptyAction', () => {
    const increment = createAction('INCREMENT');
    const isActionOfIncrement = isActionOf(increment);

    const action = { type: 'ERROR' };
    if (isActionOfIncrement(action)) {
      const a: { type: 'INCREMENT' } = action;
    }
  });

  it('should correctly assert type for FluxStandardAction', () => {
    const add = createAction('ADD',
      (amount: number) => ({ type: 'ADD', payload: amount }),
    );
    const isActionOfAdd = isActionOf(add);

    const action = { type: 'ERROR' };
    if (isActionOfAdd(action)) {
      const a: { type: 'ADD', payload: number } = action;
    }
  });

});

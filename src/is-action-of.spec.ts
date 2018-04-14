import { buildAction, isActionOf } from '.';

describe('isActionOf', () => {
  // fixtures
  const increment = buildAction('INCREMENT')();
  const decrement = buildAction('DECREMENT')();
  const add = buildAction('ADD').map((payload: number) => ({ payload }));
  const multiply = buildAction('MULTIPLY').map((payload: number) => ({
    payload,
  }));
  const divide = buildAction('DIVIDE').map((payload: number, meta: string) => ({
    payload,
    meta,
  }));

  it('should succeed on action with correct type', () => {
    const isActionOfIncrement = isActionOf(increment);
    expect(isActionOfIncrement(increment())).toBeTruthy();
    const isActionOfIncrementOrAdd = isActionOf([increment, add]);
    expect(isActionOfIncrementOrAdd(increment())).toBeTruthy();
    expect(isActionOfIncrementOrAdd(add(2))).toBeTruthy();
  });

  it('should fail on action with incorrect type', () => {
    const isActionOfIncrement = isActionOf(increment);
    expect(isActionOfIncrement(add(2))).toBeFalsy();
    const isActionOfIncrement2 = isActionOf([increment]);
    expect(isActionOfIncrement2(add(2))).toBeFalsy();
  });

  it('should correctly assert type for EmptyAction', done => {
    const isActionOfIncrement = isActionOf(increment);
    const isActionOfIncrement2 = isActionOf([increment]);

    const action = { type: 'FALSE' };
    if (isActionOfIncrement(action)) {
      const a: { type: 'INCREMENT' } = action;
    } else if (isActionOfIncrement2(action)) {
      const a: { type: 'INCREMENT' } = action;
    } else {
      done();
    }
  });

  it('should correctly assert type for FluxStandardAction', done => {
    const isActionOfAdd = isActionOf(add);
    const isActionOfAdd2 = isActionOf([add]);

    const action = { type: 'FALSE' };
    if (isActionOfAdd(action)) {
      const a: { type: 'ADD'; payload: number } = action;
    } else if (isActionOfAdd2(action)) {
      const a: { type: 'ADD'; payload: number } = action;
    } else {
      done();
    }
  });

  it('should correctly assert array with one action', done => {
    const isActionOfOne = isActionOf([increment]);

    const action = { type: 'FALSE' };
    if (isActionOfOne(action)) {
      switch (action.type) {
        case 'INCREMENT': {
          const a: { type: 'INCREMENT' } = action;
          break;
        }
      }
    } else {
      done();
    }
  });

  it('should correctly assert array with two actions', done => {
    const isActionOfTwo = isActionOf([increment, decrement]);

    const action = { type: 'FALSE' };
    if (isActionOfTwo(action)) {
      switch (action.type) {
        case 'INCREMENT': {
          const a: { type: 'INCREMENT' } = action;
          break;
        }
        case 'DECREMENT': {
          const a: { type: 'DECREMENT' } = action;
          break;
        }
      }
    } else {
      done();
    }
  });

  it('should correctly assert array with three actions', done => {
    const isActionOfThree = isActionOf([increment, decrement, add]);

    const action = { type: 'FALSE' };
    if (isActionOfThree(action)) {
      switch (action.type) {
        case 'INCREMENT': {
          const a: { type: 'INCREMENT' } = action;
          break;
        }
        case 'DECREMENT': {
          const a: { type: 'DECREMENT' } = action;
          break;
        }
        case 'ADD': {
          const a: { type: 'ADD'; payload: number } = action;
          break;
        }
      }
    } else {
      done();
    }
  });

  it('should correctly assert array with four actions', done => {
    const isActionOfFour = isActionOf([increment, decrement, add, multiply]);

    const action = { type: 'FALSE' };
    if (isActionOfFour(action)) {
      switch (action.type) {
        case 'INCREMENT': {
          const a: { type: 'INCREMENT' } = action;
          break;
        }
        case 'DECREMENT': {
          const a: { type: 'DECREMENT' } = action;
          break;
        }
        case 'ADD': {
          const a: { type: 'ADD'; payload: number } = action;
          break;
        }
        case 'MULTIPLY': {
          const a: { type: 'MULTIPLY'; payload: number } = action;
          break;
        }
      }
    } else {
      done();
    }
  });

  it('should correctly assert array with five actions', done => {
    const isActionOfFive = isActionOf([
      increment,
      decrement,
      add,
      multiply,
      divide,
    ]);

    const action = { type: 'FALSE' };
    if (isActionOfFive(action)) {
      switch (action.type) {
        case 'INCREMENT': {
          const a: { type: 'INCREMENT' } = action;
          break;
        }
        case 'DECREMENT': {
          const a: { type: 'DECREMENT' } = action;
          break;
        }
        case 'ADD': {
          const a: { type: 'ADD'; payload: number } = action;
          break;
        }
        case 'MULTIPLY': {
          const a: { type: 'MULTIPLY'; payload: number } = action;
          break;
        }
        case 'DIVIDE': {
          const a: { type: 'DIVIDE'; payload: number } = action;
          break;
        }
      }
    } else {
      done();
    }
  });

  // TODO: #3
  // should error when missing argument
  // should error when passed invalid arguments
  // check object, empty array, primitives
});

import { buildAction, isActionOf, ActionsUnion } from '.';

describe('isActionOf', () => {
  // fixtures
  const increment = buildAction('INCREMENT')();
  const decrement = buildAction('DECREMENT')<void>();
  const add = buildAction('ADD').map((payload: number) => ({ payload }));
  const multiply = buildAction('MULTIPLY').map((payload: number) => ({
    payload,
  }));
  const divide = buildAction('DIVIDE').map((payload: number, meta: string) => ({
    payload,
    meta,
  }));
  const actions = { increment, decrement, add, multiply, divide };
  type RootAction = ActionsUnion<typeof actions>;

  it('should work with actions from buildAction with type only', () => {
    expect(isActionOf(increment)(increment())).toBeTruthy();
    expect(isActionOf(increment, increment())).toBeTruthy();
    expect(isActionOf([increment])(increment())).toBeTruthy();
    expect(isActionOf([increment], increment())).toBeTruthy();
    expect(isActionOf(increment)(add(2))).toBeFalsy();
    expect(isActionOf(increment, add(2))).toBeFalsy();
    expect(isActionOf([increment])(add(2))).toBeFalsy();
    expect(isActionOf([increment], add(2))).toBeFalsy();
    // alternative
    expect(isActionOf(decrement)(decrement())).toBeTruthy();
    expect(isActionOf(decrement, decrement())).toBeTruthy();
    expect(isActionOf([decrement])(decrement())).toBeTruthy();
    expect(isActionOf([decrement], decrement())).toBeTruthy();
    expect(isActionOf(decrement)(add(2))).toBeFalsy();
    expect(isActionOf(decrement, add(2))).toBeFalsy();
    expect(isActionOf([decrement])(add(2))).toBeFalsy();
    expect(isActionOf([decrement], add(2))).toBeFalsy();
  });

  it('should work with actions from buildAction with map', () => {
    expect(isActionOf(add)(add(2))).toBeTruthy();
    expect(isActionOf(add, add(2))).toBeTruthy();
    expect(isActionOf([add])(add(2))).toBeTruthy();
    expect(isActionOf([add], add(2))).toBeTruthy();
    expect(isActionOf(add)(increment())).toBeFalsy();
    expect(isActionOf(add, increment())).toBeFalsy();
    expect(isActionOf([add])(increment())).toBeFalsy();
    expect(isActionOf([add], increment())).toBeFalsy();
  });

  it('should work with actions from buildAction mixed', () => {
    expect(isActionOf([increment, add])(increment())).toBeTruthy();
    expect(isActionOf([increment, add], increment())).toBeTruthy();
    expect(isActionOf([increment, add])(add(2))).toBeTruthy();
    expect(isActionOf([increment, add], add(2))).toBeTruthy();
    expect(isActionOf([increment, add])(decrement())).toBeFalsy();
    expect(isActionOf([increment, add], decrement())).toBeFalsy();
  });

  // todo: refactor to use reducer function
  it('should correctly assert type for buildAction', done => {
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

  it('should correctly assert type for buildAction with map', done => {
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

  it('should correctly assert for conditional statements', done => {
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

  it('should correctly assert for array with one actionCreators', done => {
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

  it('should correctly assert for array with two actionCreators', done => {
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

  it('should correctly assert for array with three actionCreators', done => {
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

  it('should correctly assert for array with four actionCreators', done => {
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

  it('should correctly assert for array with five actionCreators', done => {
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

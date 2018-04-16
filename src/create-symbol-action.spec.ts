import { createSymbolAction, getType } from '.';
import { ActionsUnion } from '.';

describe('createSymbolAction', () => {
  // fixtures
  const INCREMENT = Symbol(1);
  const ADD = Symbol(2);

  // const increment = createSymbolAction<typeof INCREMENT>(INCREMENT);
  // const add = createSymbolAction<typeof ADD, number>(ADD);

  // TODO: #3
  // should error when missing argument
  // should error when passed invalid arguments
  // check object, empty array, primitives

  it('no payload', () => {
    // const action: { type: typeof INCREMENT } = increment();
    // expect(action).toEqual({ type: INCREMENT });
    // expect(action).not.toEqual({ type: 'INCREMENT' });
    // const type: typeof INCREMENT = increment.getType!();
    // expect(type).toBe(INCREMENT);
    // expect(type).not.toBe('INCREMENT');
  });

  //   it('with payload', () => {
  //     const action: { type: typeof ADD, payload: number } = add(10);
  //     expect(action).toEqual({ type: ADD, payload: 10 });
  //     expect(action).not.toEqual({ type: 'ADD' });
  //     const type: typeof ADD = add.getType!();
  //     expect(type).toBe(ADD);
  //     expect(type).not.toBe('ADD');
  //   });

  //   it('should correctly discriminate union type', () => {
  //     const actions = {
  //       increment: increment,
  //       add: add,
  //     };

  //     type RootAction = ActionsUnion<typeof actions>;

  //     const reducer = (state = 0, action: RootAction) => {
  //       switch (action.type) {
  //         case INCREMENT: {
  //           const a: { type: typeof INCREMENT } = action;
  //           return state + 1;
  //         }
  //         case ADD: {
  //           const a: { type: typeof ADD, payload: number } = action;
  //           return state + a.payload;
  //         }
  //       }
  //     };

  //     expect(reducer(undefined, actions.increment())).toBe(1);
  //   });
});

import { typesafeAction } from './create-action';
import { getType } from '.';

// docs example
// const deprecatedApi = createActionDeprecated('GET_TODO',
//   (token: string, id: string) => ({
//     type: 'GET_TODO',
//     payload: id,
//     meta: token,
//   })
// );

// const newApi = (token: string, id: string) => action('GET_TODO', id, token);

// const getTodoVariadic = createAction('GET_TODO', withPayloadMeta => {
//   return (id: string, token: string) => withPayloadMeta(id, token);
// });

// const getTodoUnary = createUnaryAction('GET_TODO')<{ id: string, token: string }>();
// const getTodoUnaryMap = createUnaryAction('GET_TODO').map(
//   ({ token, id }: { token: string; id: string }) => ({
//     payload: id,
//     meta: token,
//   })
// );

// const getTodoAsync = createAsyncAction(
//   'GET_TODO_REQUEST',
//   'GET_TODO_SUCCESS',
//   'GET_TODO_FAILURE'
// )<{ token: string; id: string }, Todo, Error>();
// const getTodoAsyncMap = createAsyncAction(
//   'GET_TODO_REQUEST',
//   'GET_TODO_SUCCESS',
//   'GET_TODO_FAILURE'
// ).map(({ token, id }: { token: string; id: string }) => ({
//   payload: id,
//   meta: token,
// }));

describe('typesafeAction', () => {
  it('only type', () => {
    const increment = typesafeAction('WITH_TYPE_ONLY', action => {
      return () => action();
    });
    const typeLiteral: 'WITH_TYPE_ONLY' = getType(increment);
    expect(typeLiteral).toBe('WITH_TYPE_ONLY');
  });

  it('only type as symbol', () => {
    enum Increment {}
    const INCREMENT = (Symbol(1) as any) as Increment & string;
    const a: string = INCREMENT; // Ok
    // const b: typeof INCREMENT = 'INCREMENT'; // Error
    const increment = typesafeAction(INCREMENT, action => {
      return () => action();
    });
    const typeLiteral: typeof INCREMENT = getType(increment);
    expect(typeLiteral).toBe(INCREMENT);
    expect(typeLiteral).not.toBe('WITH_TYPE_ONLY');
  });

  it('with payload', () => {
    const add = typesafeAction('WITH_MAPPED_PAYLOAD', action => {
      return (amount: number) => action(amount);
    });

    const typeLiteral: 'WITH_MAPPED_PAYLOAD' = getType(add);
    expect(typeLiteral).toBe('WITH_MAPPED_PAYLOAD');
  });

  it('with payload and meta', () => {
    const showNotification = typesafeAction(
      'SHOW_NOTIFICATION',
      action => (message: string, scope: string) => action(message, scope)
    );
    const typeLiteral: 'SHOW_NOTIFICATION' = getType(showNotification);
    expect(typeLiteral).toBe('SHOW_NOTIFICATION');
  });
});

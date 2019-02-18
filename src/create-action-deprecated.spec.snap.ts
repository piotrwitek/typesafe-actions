import * as T from './type-helpers';
import { createActionDeprecated } from './create-action-deprecated';

it.skip('skip', () => undefined);

describe('with symbol', () => {
  const CREATE_ACTION_DEPRECATED = Symbol(1);
  const increment = createActionDeprecated(CREATE_ACTION_DEPRECATED as any);
  // @dts-jest:pass:snap -> { type: any; }
  increment(); // => { type: CREATE_ACTION_DEPRECATED }
});

describe('with type only', () => {
  const withTypeOnly = createActionDeprecated('CREATE_ACTION_DEPRECATED');
  // @dts-jest:pass:snap -> { type: "CREATE_ACTION_DEPRECATED"; }
  withTypeOnly(); // => { type: 'CREATE_ACTION_DEPRECATED' }
});

describe('with payload', () => {
  const withPayload = createActionDeprecated(
    'CREATE_ACTION_DEPRECATED',
    (amount: number) => ({
      type: 'CREATE_ACTION_DEPRECATED',
      payload: amount,
    })
  );
  // @dts-jest:pass:snap -> { type: "CREATE_ACTION_DEPRECATED"; payload: number; }
  withPayload(10); // => { type: 'CREATE_ACTION_DEPRECATED', payload: 10 }
});

describe('with meta', () => {
  const withMeta = createActionDeprecated(
    'CREATE_ACTION_DEPRECATED',
    (message: string) => ({
      type: 'CREATE_ACTION_DEPRECATED',
      meta: message,
    })
  );
  // @dts-jest:pass:snap -> { type: "CREATE_ACTION_DEPRECATED"; meta: string; }
  withMeta('Error message'); // => { type: 'CREATE_ACTION_DEPRECATED', meta: 'Error message' }
});

describe('with payload and meta', () => {
  const withPayloadAndMeta = createActionDeprecated(
    'CREATE_ACTION_DEPRECATED',
    (username: string, message: string) => ({
      type: 'CREATE_ACTION_DEPRECATED',
      payload: { message: `${username}: ${message}` },
      meta: { username, message },
    })
  );
  // @dts-jest:pass:snap -> { type: "CREATE_ACTION_DEPRECATED"; payload: { message: string; }; meta: { username: string; message: string; }; }
  withPayloadAndMeta('Piotr', 'Hello!'); // => { type: 'CREATE_ACTION_DEPRECATED', payload: { message: 'Piotr: Hello!' }, meta: { username: 'Piotr', message: 'Hello!' } }
});

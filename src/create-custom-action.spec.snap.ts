import * as T from './type-helpers';
import { createCustomAction } from './create-custom-action';

it.skip('skip', () => undefined);
describe('toString() method return a type', () => {
  const actionCreator = createCustomAction('CREATE_CUSTOM_ACTION');
  // @dts-jest:pass:snap -> string
  actionCreator.toString(); // => 'CREATE_CUSTOM_ACTION'
});

describe('with symbol', () => {
  const CREATE_CUSTOM_ACTION = Symbol(1);
  const withSymbol = createCustomAction(CREATE_CUSTOM_ACTION as any);
  // @dts-jest:pass:snap -> { type: any; }
  withSymbol(); // => { type: CREATE_CUSTOM_ACTION }
});

describe('with type only', () => {
  const withTypeOnly = createCustomAction('CREATE_CUSTOM_ACTION');
  // @dts-jest:pass:snap -> { type: "CREATE_CUSTOM_ACTION"; }
  withTypeOnly(); // => { type: 'CREATE_CUSTOM_ACTION' }
});

describe('with payload', () => {
  const withPayload = createCustomAction('CREATE_CUSTOM_ACTION', type => {
    return (amount: number) => ({ type, payload: amount });
  });
  // @dts-jest:pass:snap -> { type: "CREATE_CUSTOM_ACTION"; payload: number; }
  withPayload(1); // => { type: 'CREATE_CUSTOM_ACTION', payload: 1 }
});

describe('with optional payload', () => {
  const withOptionalPayload = createCustomAction(
    'CREATE_CUSTOM_ACTION',
    type => {
      return (id?: number) => ({ type, payload: id });
    }
  );
  // @dts-jest:pass:snap -> { type: "CREATE_CUSTOM_ACTION"; payload: number | undefined; }
  withOptionalPayload(); // => { type: 'CREATE_CUSTOM_ACTION' }
  // @dts-jest:pass:snap -> { type: "CREATE_CUSTOM_ACTION"; payload: number | undefined; }
  withOptionalPayload(1); // => { type: 'CREATE_CUSTOM_ACTION', payload: 1 }
});

describe('with meta', () => {
  const withMeta = createCustomAction('CREATE_CUSTOM_ACTION', type => {
    return (token: string) => ({ type, meta: token });
  });
  // @dts-jest:pass:snap -> { type: "CREATE_CUSTOM_ACTION"; meta: string; }
  withMeta('token'); // => { type: 'CREATE_CUSTOM_ACTION', meta: 'token' }
});

describe('with payload and meta', () => {
  const withPayloadAndMeta = createCustomAction(
    'CREATE_CUSTOM_ACTION',
    type => (message: string, scope: string) => ({
      type,
      payload: message,
      meta: scope,
    })
  );
  // @dts-jest:pass:snap -> { type: "CREATE_CUSTOM_ACTION"; payload: string; meta: string; }
  withPayloadAndMeta('Hello!', 'info'); // => { type: 'CREATE_CUSTOM_ACTION', payload: 'Hello!', meta: 'info' }
});

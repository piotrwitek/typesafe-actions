import * as TH from '../type-helpers';
import { createAction } from './create-action';

describe('toString() method return a type', () => {
  const actionCreator = createAction('CREATE_ACTION');
  // @dts-jest:pass:snap
  actionCreator.toString(); // => 'CREATE_ACTION'
});

describe('with symbol', () => {
  const CREATE_ACTION = Symbol(1);
  const withSymbol = createAction(CREATE_ACTION as any);
  // @dts-jest:pass:snap
  withSymbol(); // => { type: CREATE_ACTION }
});

describe('with type only', () => {
  const withTypeOnly = createAction('CREATE_ACTION');
  // @dts-jest:pass:snap
  withTypeOnly(); // => { "type": "CREATE_ACTION" }
});

describe('with payload', () => {
  const withPayload = createAction('CREATE_ACTION', resolve => {
    return (id: number) => resolve(id);
  });
  // @dts-jest:pass:snap
  withPayload(1); // => { type: 'CREATE_ACTION', payload: 1 }
});

// TODO: optionals could be solved with overloads
describe('with optional payload', () => {
  const withPayload = createAction('CREATE_ACTION', resolve => {
    return (id?: number) => resolve(id);
  });
  // @dts-jest:pass:snap
  withPayload(); // => { type: 'CREATE_ACTION' }
  // @dts-jest:pass:snap
  withPayload(1); // => { type: 'CREATE_ACTION', payload: 1 }
});

describe('with meta', () => {
  const withMeta = createAction('CREATE_ACTION', resolve => {
    return (token: string) => resolve(undefined, token);
  });
  // @dts-jest:pass:snap
  withMeta('token'); // => { type: 'CREATE_ACTION', meta: 'token' }
});

describe('with payload and meta', () => {
  const withPayloadAndMeta = createAction('CREATE_ACTION', resolve => {
    return (id: number, token: string) => resolve(id, token);
  });
  // @dts-jest:pass:snap
  withPayloadAndMeta(1, 'token'); // => { type: 'CREATE_ACTION', payload: 1, meta: 'token' }
});

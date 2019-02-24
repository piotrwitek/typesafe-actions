import * as T from './type-helpers';
import { createStandardAction } from './create-standard-action';

it.skip('skip', () => undefined);

describe('constructor', () => {
  describe('toString() method return a type', () => {
    const actionCreator = createStandardAction('CREATE_STANDARD_ACTION')();
    // @dts-jest:pass:snap -> string
    actionCreator.toString(); // => 'CREATE_STANDARD_ACTION'
  });

  describe('with symbol', () => {
    const CREATE_STANDARD_ACTION = Symbol(1);
    const withSymbol = createStandardAction(CREATE_STANDARD_ACTION as any)();
    // @dts-jest:pass:snap -> T.EmptyAction<any>
    withSymbol(); // => { type: CREATE_STANDARD_ACTION }
  });

  describe('with type only - undefined', () => {
    const withTypeOnly = createStandardAction('CREATE_STANDARD_ACTION')<
      undefined
    >();
    // @dts-jest:pass:snap -> T.EmptyAction<"CREATE_STANDARD_ACTION">
    withTypeOnly(); // => { type: 'CREATE_STANDARD_ACTION' }
  });

  describe('with payload - number', () => {
    const withPayload = createStandardAction('CREATE_STANDARD_ACTION')<
      number
    >();
    // @dts-jest:pass:snap -> T.PayloadAction<"CREATE_STANDARD_ACTION", number>
    withPayload(10); // => { type: 'CREATE_STANDARD_ACTION', payload: 10 }
  });

  describe('with payload - boolean', () => {
    const withPayload = createStandardAction('CREATE_STANDARD_ACTION')<
      boolean
    >();
    // @dts-jest:pass:snap -> T.PayloadAction<"CREATE_STANDARD_ACTION", boolean>
    withPayload(true); // => { type: 'CREATE_STANDARD_ACTION', payload: true }
  });

  describe('with payload - literal string union', () => {
    type NetStatus = 'up' | 'down' | 'unknown';
    const withPayload = createStandardAction('CREATE_STANDARD_ACTION')<
      NetStatus
    >();
    // @dts-jest:pass:snap -> T.PayloadAction<"CREATE_STANDARD_ACTION", "up" | "down" | "unknown">
    withPayload('up'); // => { type: 'CREATE_STANDARD_ACTION', payload: 'up' }
  });

  describe('with payload - primitives union', () => {
    const withPayload = createStandardAction('CREATE_STANDARD_ACTION')<
      string | null | number
    >();
    // @dts-jest:pass:snap -> T.PayloadAction<"CREATE_STANDARD_ACTION", string | number | null>
    withPayload('foo'); // => { type: 'CREATE_STANDARD_ACTION', payload: 'foo' }
    // @dts-jest:pass:snap -> T.PayloadAction<"CREATE_STANDARD_ACTION", string | number | null>
    withPayload(null); // => { type: 'CREATE_STANDARD_ACTION', payload: null }
    // @dts-jest:pass:snap -> T.PayloadAction<"CREATE_STANDARD_ACTION", string | number | null>
    withPayload(3); // => { type: 'CREATE_STANDARD_ACTION', payload: 3 }
  });

  describe('with payload - any', () => {
    const withPayload = createStandardAction('CREATE_STANDARD_ACTION')<any>();
    // @dts-jest:pass:snap -> T.PayloadAction<"CREATE_STANDARD_ACTION", any>
    withPayload(10); // => { type: 'CREATE_STANDARD_ACTION', payload: 10 }
  });

  describe('with meta', () => {
    const withMeta = createStandardAction('CREATE_STANDARD_ACTION')<
      undefined,
      string
    >();
    // @dts-jest:pass:snap -> T.PayloadMetaAction<"CREATE_STANDARD_ACTION", undefined, string>
    withMeta(undefined, 'token'); // => { type: 'CREATE_STANDARD_ACTION', meta: 'token' }
  });

  describe('with meta - any', () => {
    const withMeta = createStandardAction('CREATE_STANDARD_ACTION')<
      undefined,
      any
    >();
    // @dts-jest:pass:snap -> T.PayloadMetaAction<"CREATE_STANDARD_ACTION", undefined, any>
    withMeta(undefined, 'token'); // => { type: 'CREATE_STANDARD_ACTION', meta: 'token' }
  });

  describe('with payload and meta', () => {
    const withPayloadAndMeta = createStandardAction('CREATE_STANDARD_ACTION')<
      number,
      string
    >();
    // @dts-jest:pass:snap -> T.PayloadMetaAction<"CREATE_STANDARD_ACTION", number, string>
    withPayloadAndMeta(1, 'token'); // => { type: 'CREATE_STANDARD_ACTION', payload: 1, meta: 'token' }
  });
});

describe('map', () => {
  describe('with type only', () => {
    const withTypeOnly = createStandardAction('CREATE_STANDARD_ACTION').map(
      () => ({})
    );
    // @dts-jest:pass:snap -> { type: "CREATE_STANDARD_ACTION"; }
    withTypeOnly(); // => { type: 'CREATE_STANDARD_ACTION' }
  });

  describe('with payload - no param', () => {
    const withPayload = createStandardAction('CREATE_STANDARD_ACTION').map(
      () => ({
        payload: 'hardcoded message',
      })
    );
    // @dts-jest:pass:snap -> { type: "CREATE_STANDARD_ACTION"; } & { payload: string; }
    withPayload(); // => { type: 'CREATE_STANDARD_ACTION', payload: 'hardcoded message' }
  });

  describe('with payload - primitive param', () => {
    const withPayload = createStandardAction('CREATE_STANDARD_ACTION').map(
      (payload: string) => ({
        payload,
      })
    );
    // @dts-jest:pass:snap -> { type: "CREATE_STANDARD_ACTION"; } & { payload: string; }
    withPayload('info message'); // => { type: 'CREATE_STANDARD_ACTION', payload: 'info message' }
  });

  describe('with payload - union param', () => {
    const withPayload = createStandardAction('CREATE_STANDARD_ACTION').map(
      (payload: string | null | number) => ({
        payload,
      })
    );
    // @dts-jest:pass:snap -> { type: "CREATE_STANDARD_ACTION"; } & { payload: string | number | null; }
    withPayload('info message'); // => { type: 'CREATE_STANDARD_ACTION', payload: 'info message' }
    // @dts-jest:pass:snap -> { type: "CREATE_STANDARD_ACTION"; } & { payload: string | number | null; }
    withPayload(null); // => { type: 'CREATE_STANDARD_ACTION', payload: null }
    // @dts-jest:pass:snap -> { type: "CREATE_STANDARD_ACTION"; } & { payload: string | number | null; }
    withPayload(3); // => { type: 'CREATE_STANDARD_ACTION', payload: 3 }
  });

  describe('with meta - no param', () => {
    const withMeta = createStandardAction('CREATE_STANDARD_ACTION').map(() => ({
      meta: 'hardcoded message',
    }));
    // @dts-jest:pass:snap -> { type: "CREATE_STANDARD_ACTION"; } & { meta: string; }
    withMeta(); // => { type: 'CREATE_STANDARD_ACTION', meta: 'hardcoded message' }
  });

  describe('with meta - primitive param', () => {
    const withMeta = createStandardAction('CREATE_STANDARD_ACTION').map(
      (meta: string) => ({
        meta,
      })
    );
    // @dts-jest:pass:snap -> { type: "CREATE_STANDARD_ACTION"; } & { meta: string; }
    withMeta('info message'); // => { type: 'CREATE_STANDARD_ACTION', meta: 'info message' }
  });

  describe('with meta - union param', () => {
    const withMeta = createStandardAction('CREATE_STANDARD_ACTION').map(
      (meta: string | null | number) => ({
        meta,
      })
    );
    // @dts-jest:pass:snap -> { type: "CREATE_STANDARD_ACTION"; } & { meta: string | number | null; }
    withMeta('info message'); // => { type: 'CREATE_STANDARD_ACTION', meta: 'info message' }
    // @dts-jest:pass:snap -> { type: "CREATE_STANDARD_ACTION"; } & { meta: string | number | null; }
    withMeta(null); // => { type: 'CREATE_STANDARD_ACTION', meta: null }
    // @dts-jest:pass:snap -> { type: "CREATE_STANDARD_ACTION"; } & { meta: string | number | null; }
    withMeta(3); // => { type: 'CREATE_STANDARD_ACTION', meta: 3 }
  });

  describe('with payload and meta - no param', () => {
    const withPayloadAndMeta = createStandardAction(
      'CREATE_STANDARD_ACTION'
    ).map(() => ({
      payload: 'hardcoded error',
      meta: { severity: 'error' },
    }));
    // @dts-jest:pass:snap -> { type: "CREATE_STANDARD_ACTION"; } & { payload: string; meta: { severity: string; }; }
    withPayloadAndMeta(); // => { type: 'CREATE_STANDARD_ACTION', payload: 'hardcoded error', meta: { severity: 'error' } }
  });

  describe('with payload and meta - string param', () => {
    const withPayloadAndMeta = createStandardAction(
      'CREATE_STANDARD_ACTION'
    ).map((message: string) => ({
      payload: message,
      meta: { severity: 'error' },
    }));
    // @dts-jest:pass:snap -> { type: "CREATE_STANDARD_ACTION"; } & { payload: string; meta: { severity: string; }; }
    withPayloadAndMeta('error message'); // => { type: 'CREATE_STANDARD_ACTION', payload: 'error message', meta: { severity: 'error' } }
  });

  describe('with payload and meta - object param', () => {
    type Notification = { username: string; message?: string };
    const withPayloadAndMeta = createStandardAction(
      'CREATE_STANDARD_ACTION'
    ).map(({ username, message }: Notification) => ({
      payload: `${username}: ${message || ''}`,
      meta: { username, message },
    }));
    // tslint:disable:max-line-length
    // @dts-jest:pass:snap -> { type: "CREATE_STANDARD_ACTION"; } & { payload: string; meta: { username: string; message: string | undefined; }; }
    withPayloadAndMeta({ username: 'Piotr', message: 'Hello!' }); // => { type: 'CREATE_STANDARD_ACTION', payload: 'Piotr: Hello!', meta: { username: 'Piotr', message: 'Hello!' } }
  });
});

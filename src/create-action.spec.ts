import * as Types from './types';
import { createAction } from './create-action';
import { types } from './utils/type-fixtures';

it.skip('skip', () => undefined);

describe('toString() method return a type', () => {
  const actionCreator = createAction('TO_STRING');
  // @dts-jest:pass:snap
  actionCreator.toString(); // => 'TO_STRING'
});

describe('with symbol', () => {
  const WITH_SYMBOL = Symbol(1);
  const withSymbol = createAction(WITH_SYMBOL as any);
  // @dts-jest:pass:snap
  withSymbol(); // => { type: WITH_SYMBOL }
});

describe('with type only', () => {
  const withTypeOnly = createAction(types.WITH_TYPE_ONLY);
  // @dts-jest:pass:snap
  withTypeOnly(); // => { "type": "WITH_TYPE_ONLY" }
});

describe('with payload', () => {
  const withPayload = createAction(types.WITH_PAYLOAD, resolve => {
    return (id: number) => resolve(id);
  });
  // @dts-jest:pass:snap
  withPayload(1); // => { type: 'WITH_PAYLOAD', payload: 1 }
});

// TODO: optionals could be solved with overloads
describe('with optional payload', () => {
  const withPayload = createAction(types.WITH_PAYLOAD, resolve => {
    return (id?: number) => resolve(id);
  });
  // @dts-jest:pass:snap
  withPayload(); // => { type: 'WITH_PAYLOAD' }
  // @dts-jest:pass:snap
  withPayload(1); // => { type: 'WITH_PAYLOAD', payload: 1 }
});

describe('with meta', () => {
  const withMeta = createAction(types.WITH_META, resolve => {
    return (token: string) => resolve(undefined, token);
  });
  // @dts-jest:pass:snap
  withMeta('token'); // => { type: 'WITH_META', meta: 'token' }
});

describe('with payload and meta', () => {
  const withPayloadAndMeta = createAction(types.WITH_PAYLOAD_META, resolve => {
    return (id: number, token: string) => resolve(id, token);
  });
  // @dts-jest:pass:snap
  withPayloadAndMeta(1, 'token'); // => { type: 'WITH_PAYLOAD_META', payload: 1, meta: 'token' }
});

describe('with higher-order function', () => {
  interface UserSettingsState {
    settingA: string;
    settingB: number;
  }

  const setUserSetting = <K extends keyof UserSettingsState>(
    setting: K,
    newValue: UserSettingsState[K]
  ) =>
    createAction('SET_USER_SETTING', resolve => () =>
      resolve({ setting, newValue })
    )();

  // @dts-jest:pass:snap
  setUserSetting('settingA', 'foo');
  // @dts-jest:fail:snap
  setUserSetting('settingA', 0); // Error as expected

  // @dts-jest:pass:snap
  setUserSetting('settingB', 0);
  // @dts-jest:fail:snap
  setUserSetting('settingB', 'foo'); // Error as expected
});

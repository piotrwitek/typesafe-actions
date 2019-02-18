import * as T from './type-helpers';
import { createAction } from './create-action';

it.skip('skip', () => undefined);

describe('toString() method return a type', () => {
  const actionCreator = createAction('CREATE_ACTION');
  // @dts-jest:pass:snap -> string
  actionCreator.toString(); // => 'CREATE_ACTION'
});

describe('with symbol', () => {
  const CREATE_ACTION = Symbol(1);
  const withSymbol = createAction(CREATE_ACTION as any);
  // @dts-jest:pass:snap -> { type: any; }
  withSymbol(); // => { type: CREATE_ACTION }
});

describe('with type only', () => {
  const withTypeOnly = createAction('CREATE_ACTION');
  // @dts-jest:pass:snap -> { type: "CREATE_ACTION"; }
  withTypeOnly(); // => { "type": "CREATE_ACTION" }
});

describe('with payload', () => {
  const withPayload = createAction('CREATE_ACTION', resolve => {
    return (id: number) => resolve(id);
  });
  // @dts-jest:pass:snap -> { type: "CREATE_ACTION"; payload: number; }
  withPayload(1); // => { type: 'CREATE_ACTION', payload: 1 }
});

// TODO: optionals could be solved with overloads
describe('with optional payload', () => {
  const withPayload = createAction('CREATE_ACTION', resolve => {
    return (id?: number) => resolve(id);
  });
  // @dts-jest:pass:snap -> { type: "CREATE_ACTION"; payload: number; }
  withPayload(); // => { type: 'CREATE_ACTION' }
  // @dts-jest:pass:snap -> { type: "CREATE_ACTION"; payload: number; }
  withPayload(1); // => { type: 'CREATE_ACTION', payload: 1 }
});

describe('with meta', () => {
  const withMeta = createAction('CREATE_ACTION', resolve => {
    return (token: string) => resolve(undefined, token);
  });
  // @dts-jest:pass:snap -> { type: "CREATE_ACTION"; meta: string; }
  withMeta('token'); // => { type: 'CREATE_ACTION', meta: 'token' }
});

describe('with payload and meta', () => {
  const withPayloadAndMeta = createAction('CREATE_ACTION', resolve => {
    return (id: number, token: string) => resolve(id, token);
  });
  // @dts-jest:pass:snap -> { type: "CREATE_ACTION"; payload: number; meta: string; }
  withPayloadAndMeta(1, 'token'); // => { type: 'CREATE_ACTION', payload: 1, meta: 'token' }
});

describe('type-safe usage with higher-order function', () => {
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

  // @dts-jest:pass:snap -> { type: "SET_USER_SETTING"; payload: { setting: "settingA"; newValue: string; }; }
  setUserSetting('settingA', 'foo');
  // @dts-jest:fail:snap -> Argument of type '0' is not assignable to parameter of type 'string'.
  setUserSetting('settingA', 0); // Error as expected

  // @dts-jest:pass:snap -> { type: "SET_USER_SETTING"; payload: { setting: "settingB"; newValue: number; }; }
  setUserSetting('settingB', 0);
  // @dts-jest:fail:snap -> Argument of type '"foo"' is not assignable to parameter of type 'number'.
  setUserSetting('settingB', 'foo'); // Error as expected
});

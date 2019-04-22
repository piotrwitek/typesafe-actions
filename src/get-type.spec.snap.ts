import * as TH from './type-helpers';
import { createAction } from './create-action';
import { createCustomAction } from './create-custom-action';
import { getType } from './get-type';

describe('from createAction', () => {
  // @dts-jest:pass:snap -> "CREATE_ACTION"
  getType(createAction('CREATE_ACTION')()); // => 'CREATE_ACTION'
});

describe('from createCustomAction', () => {
  // @dts-jest:pass:snap -> "CREATE_CUSTOM_ACTION"
  getType(createCustomAction('CREATE_CUSTOM_ACTION')); // => 'CREATE_CUSTOM_ACTION'
});

import {
  checkIsEmpty,
  checkInvalidActionCreator,
  checkInvalidActionType,
} from './validation';

/** HELPERS */

/** TESTS */

describe('checkIsEmpty', () => {
  it('passes when input is empty', () => {
    expect(checkIsEmpty(null)).toBeTruthy();
    expect(checkIsEmpty(undefined)).toBeTruthy();
  });
});

describe('checkInvalidActionCreator', () => {
  it('fail when input is valid action-creator', () => {
    const ac = () => ({ type: 'type' });
    ac.getType = () => 'type';
    expect(checkInvalidActionCreator(ac)).toBeFalsy();
  });
});

describe('checkInvalidActionType', () => {
  it('fails when input is valid action-type', () => {
    expect(checkInvalidActionType('asdf')).toBeFalsy();
    expect(checkInvalidActionType(Symbol() as any)).toBeFalsy();
  });
});

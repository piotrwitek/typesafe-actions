import {
  checkIsEmpty,
  checkInvalidActionCreator,
  checkInvalidActionType,
} from './validation';

/** HELPERS */

/** TESTS */

describe('checkIsEmpty', () => {
  describe('should pass when input is empty', () => {
    // @dts-jest:pass:snap
    checkIsEmpty(null); // => true
    // @dts-jest:pass:snap
    checkIsEmpty(undefined); // => true
  });
});

describe('checkInvalidActionCreator', () => {
  describe('should fail when input is valid action-creator', () => {
    const ac = () => ({ type: 'type' });
    ac.getType = () => 'type';
    // @dts-jest:pass:snap
    checkInvalidActionCreator(ac); // => false
  });
});

describe('checkInvalidActionType', () => {
  describe('should fail when input is valid action-type', () => {
    // @dts-jest:pass:snap
    checkInvalidActionType('asdf'); // => false
    // @dts-jest:pass:snap
    checkInvalidActionType(Symbol() as any); // => false
  });
});

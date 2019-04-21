import { TypeConstant, ActionCreator, TypeMeta } from './type-helpers';
import {
  checkIsEmpty,
  throwIsEmpty,
  checkInvalidActionCreator,
  throwInvalidActionCreator,
} from './utils/validation';

/**
 * @description get the "type literal" of a given action-creator
 */
export function getType<T extends TypeConstant>(
  actionCreator: ActionCreator<T> & TypeMeta<T>
): T {
  if (checkIsEmpty(actionCreator)) {
    throwIsEmpty(1);
  }

  if (checkInvalidActionCreator(actionCreator)) {
    throwInvalidActionCreator(1);
  }

  return actionCreator.getType!();
}

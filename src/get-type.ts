import {
  TypeConstant,
  ActionCreator,
  ActionCreatorTypeMetadata,
} from './type-helpers';
import {
  checkIsEmpty,
  throwIsEmpty,
  checkInvalidActionCreator,
  throwInvalidActionCreator,
} from './utils/validation';

/**
 * @description get the "type literal" of a given action-creator
 */
export function getType<TType extends TypeConstant>(
  actionCreator: ActionCreator<TType> & ActionCreatorTypeMetadata<TType>
): TType {
  if (checkIsEmpty(actionCreator)) {
    throwIsEmpty(1);
  }

  if (checkInvalidActionCreator(actionCreator)) {
    throwInvalidActionCreator(1);
  }

  if (actionCreator.getType != null) {
    return actionCreator.getType();
  }

  return actionCreator.type as TType;
}

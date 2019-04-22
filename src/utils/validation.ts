import {
  ActionCreator,
  ActionCreatorTypeMetadata,
  TypeConstant,
} from '../type-helpers';

export function checkIsEmpty(arg: unknown, argPosition: number = 1) {
  return arg == null;
}

export function throwIsEmpty(argPosition: number = 1): never {
  throw new Error(`Argument ${argPosition} is empty.`);
}

export function checkValidActionCreator(
  arg: unknown
): arg is ActionCreator<TypeConstant> {
  return typeof arg === 'function' && 'getType' in arg;
}

export function checkInvalidActionCreator(arg: unknown) {
  return !checkValidActionCreator(arg);
}

export function throwInvalidActionCreator(argPosition: number = 1): never {
  throw new Error(
    `Argument ${argPosition} is invalid, it should be an action-creator instance from "typesafe-actions"`
  );
}

export function checkInvalidActionCreatorInArray(
  arg: ActionCreator<TypeConstant> & ActionCreatorTypeMetadata<TypeConstant>,
  idx: number
): void | never {
  if (arg == null) {
    throw new Error(
      `Argument contains array with empty element at index ${idx}`
    );
  } else if (arg.getType == null) {
    throw new Error(
      // tslint:disable-next-line:max-line-length
      `Argument contains array with invalid element at index ${idx}, it should be an action-creator instance from "typesafe-actions"`
    );
  }
}

export function checkValidActionType(arg: unknown): arg is string | symbol {
  return typeof arg === 'string' || typeof arg === 'symbol';
}

export function checkInvalidActionType(arg: unknown) {
  return !checkValidActionType(arg);
}

export function throwInvalidActionType(argPosition: number = 1): never {
  throw new Error(
    `Argument ${argPosition} is invalid, it should be an action type of type: string | symbol`
  );
}

export function checkInvalidActionTypeInArray(
  arg: TypeConstant,
  idx: number
): void | never {
  if (arg == null) {
    throw new Error(
      `Argument contains array with empty element at index ${idx}`
    );
  } else if (typeof arg !== 'string' && typeof arg !== 'symbol') {
    throw new Error(
      `Argument contains array with invalid element at index ${idx}, it should be of type: string | symbol`
    );
  }
}

export function throwInvalidActionTypeOrActionCreator(
  argPosition: number = 1
): never {
  throw new Error(
    `Argument ${argPosition} is invalid, it should be an action-creator instance from "typesafe-actions" or action type of type: string | symbol`
  );
}

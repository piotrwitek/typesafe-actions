import { StringType, SymbolType } from './';

export interface TypeMeta<T extends StringType | SymbolType> {
  getType?: () => T;
}

/**
 * @description get the "type literal" of a given action creator
 */
export function getType<T extends StringType | SymbolType>(
  actionCreator: ((...args: any[]) => { type: T }) & TypeMeta<T>
): T {
  if (actionCreator == null) {
    throw new Error('first argument is missing');
  }

  if (actionCreator.getType == null) {
    throw new Error('first argument is not an instance of "typesafe-actions"');
  }

  return actionCreator.getType();
}

export function withType<T extends StringType | SymbolType, AC>(
  actionType: T,
  ac: AC & TypeMeta<T>
): AC {
  ac.getType = () => actionType;
  return ac;
}

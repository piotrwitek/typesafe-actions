import {
  StringType,
  FluxStandardAction,
  TypeMeta,
  getType,
  ReturnType,
  EmptyAction,
  PayloadAction,
} from './';

export type ActionCreator<Type extends string, Payload, Else> =
  Payload extends void ? () => EmptyAction<Type> :
  Else;

export type PayloadCreator<Type extends string, Payload> =
  ActionCreator<Type, Payload, (payload: Payload) => PayloadAction<Type, Payload>>;

export type RequestPayloadCreator<Type extends string, Payload> =
  ActionCreator<Type, Payload, (requestPayload: Payload) => PayloadAction<Type, Payload>>;

export type SuccessPayloadCreator<Type extends string, Payload> =
  ActionCreator<Type, Payload, (successPayload: Payload) => PayloadAction<Type, Payload>>;

export type ErrorPayloadCreator<Type extends string, Payload> =
  ActionCreator<Type, Payload, (errorPayload: Payload) => PayloadAction<Type, Payload>>;

/**
 * @description create an action creator of a given function that contains hidden "type" metadata
 */
export interface BuildAction<Type extends string> {
  empty(): () => EmptyAction<Type>;
  withPayload<Payload>(): PayloadCreator<Type, Payload>;
  async<RequestPayload, SuccessPayload, ErrorPayload>(): {
    request: RequestPayloadCreator<Type & 'REQUEST', RequestPayload>,
    success: SuccessPayloadCreator<Type & 'SUCCESS', SuccessPayload>,
    error: ErrorPayloadCreator<Type & 'ERROR', ErrorPayload>,
  }
}

export declare function buildAction<T extends string>(
  actionType: T,
): BuildAction<T>;

/** implementation */
// export function buildAction<
// T extends StringType,
//   AC extends (...args: any[]) => FluxStandardAction<T>,
//   >(
//     actionType: T | symbol,
//     creatorFunction?: AC,
// ): AC & TypeMeta<T> {
//   let actionCreator: AC & TypeMeta<T>;

//   if (creatorFunction != null) {
//     if (typeof creatorFunction !== 'function') {
//       throw new Error('second argument is not a function');
//     }

//     actionCreator = creatorFunction as (AC & TypeMeta<T>);
//   } else {
//     actionCreator = (() => ({ type: actionType })) as (AC & TypeMeta<T>);
//   }

//   if (actionType != null) {
//     if (typeof actionType !== 'string'
//       && typeof actionType !== 'symbol') {
//       throw new Error('first argument should be type of: string | symbol');
//     }

//     actionCreator.getType = () => actionType as T;
//   } else {
//     throw new Error('first argument is missing');
//   }

//   return actionCreator;
// }

// SYNC
const increment = buildAction('INCREMENT')
  .empty();
const incrementType: { type: 'INCREMENT' } = increment();

const add = buildAction('ADD')
  .withPayload<number>();
const addType: { type: 'ADD', payload: number } = add(10);

// ASYNC
type User = {};
const fetchUsers = buildAction('LIST_USERS')
  .async<void, User[], string>();

const fetchUsersRequestType: { type: 'LIST_USERS' & 'REQUEST' } = fetchUsers.request();
const fetchUsersSuccessType: { type: 'LIST_USERS' & 'SUCCESS', payload: User[] } = fetchUsers.success([{}]);
const fetchUsersErrorType: { type: 'LIST_USERS' & 'ERROR', payload: string } = fetchUsers.error('Error');

let c: 'LIST_USERS' & 'ERROR' = getType(fetchUsers.error);
c = 'FETCH_ERROR' as any;

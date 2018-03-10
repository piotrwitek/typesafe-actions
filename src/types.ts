/**
 * @type StringType - Represent action-type of string
 */
export type StringType = string;

/**
 * @type StringType - Represent action-type of symbol
 */
export type SymbolType = symbol;

/**
 * @type EmptyAction - Empty Action
 * @template T - Action Type
 */
export interface EmptyAction<T extends StringType> {
  type: T;
}

/**
 * @type PayloadAction - Action with Payload
 * @template T - Action Type
 * @template P - Payload Type
 */
export interface PayloadAction<T extends StringType, P> {
  type: T;
  payload: P;
}

/**
 * @type PayloadAction - Action with Payload
 * @template T - Action Type
 * @template P - Payload Type
 */
export interface PayloadMetaAction<T extends StringType, P, M> {
  type: T;
  payload: P;
  meta: M;
}

/**
 * @type FluxStandardAction - Flux Standard Action
 * @template T - Action Type
 * @template P - Payload Type
 * @template M - Meta Type
 */
export interface FluxStandardAction<T extends StringType, P = any, M = any> {
  type: T;
  payload?: P;
  meta?: M,
  error?: boolean;
}

export type ReturnType<T> = T extends (...args: any[]) => infer R ? R : T;

export type ActionsUnion<Obj> = {
  [K in keyof Obj]: ReturnType<Obj[K]>
}[keyof Obj];

// tslint:disable:ban-types
type FunctionPropertyNames<T> = { [K in keyof T]: T[K] extends Function ? K : never }[keyof T];
type FunctionProperties<T> = Pick<T, FunctionPropertyNames<T>>;

type NonFunctionPropertyNames<T> = { [K in keyof T]: T[K] extends Function ? never : K }[keyof T];
type NonFunctionProperties<T> = Pick<T, NonFunctionPropertyNames<T>>;

type Diff<T, U> = T extends U ? never : T;  // Remove types from T that are assignable to U
type Filter<T, U> = T extends U ? T : never;  // Remove types from T that are not assignable to U

type T30 = Diff<'a' | 'b' | 'c' | 'd', 'a' | 'c' | 'f'>;  // "b" | "d"
type T31 = Filter<'a' | 'b' | 'c' | 'd', 'a' | 'c' | 'f'>;  // "a" | "c"
type T32 = Diff<string | number | (() => void), Function>;  // string | number
type T33 = Filter<string | number | (() => void), Function>;  // () => void

// Exclude<T, U> -- Exclude from T those types that are assignable to U.
// Extract<T, U> -- Extract from T those types that are assignable to U.
// NonNullable<T> -- Exclude null and undefined from T.
// ReturnType<T> -- Obtain the return type of a function type.
type PromiseType<T> = T extends Promise<infer U> ? U : T;
// InstanceType<T> -- Obtain the instance type of a constructor function type.

// type GetComponentProps<T> =
//   T extends new (props: infer P) => any ? P :
//   T extends (props: infer P & { children?: React.ReactNode }) => any ? P :
//   any;

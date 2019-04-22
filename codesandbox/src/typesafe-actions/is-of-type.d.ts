/**
 * @description (curried assert function) check if action type is equal given type-constant
 * @description it works with discriminated union types
 */
export declare function isOfType<T extends string, A extends {
    type: string;
}>(type: T | T[], action: A): action is A extends {
    type: T;
} ? A : never;
/**
 * @description (curried assert function) check if action type is equal given type-constant
 * @description it works with discriminated union types
 */
export declare function isOfType<T extends string>(type: T | T[]): <A extends {
    type: string;
}>(action: A) => action is A extends {
    type: T;
} ? A : never;

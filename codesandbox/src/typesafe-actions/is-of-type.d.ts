export declare function isOfType<T extends string, A extends {
    type: string;
}>(type: T | T[], action: A): action is A extends {
    type: T;
} ? A : never;
export declare function isOfType<T extends string>(type: T | T[]): <A extends {
    type: string;
}>(action: A) => action is A extends {
    type: T;
} ? A : never;

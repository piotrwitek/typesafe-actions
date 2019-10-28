type Test<T> = [T] extends [undefined] ? 'Fail' : 'Pass';

type WrappedTest<P extends any> = Test<
  P extends [infer A, infer B] ? B : undefined
>;
type res2 = WrappedTest<[undefined, number]>;

type res1 = Test<
  [undefined, number] extends [infer A, infer B] ? B : undefined
>;

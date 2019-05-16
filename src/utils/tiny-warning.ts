/**
 * @author https://github.com/alexreardon/tiny-warning
 */

const isProduction: boolean = process.env.NODE_ENV === 'production';

export default function warning(condition: unknown, message: string) {
  // don't do anything in production
  // wrapping in production check for better dead code elimination
  if (!isProduction) {
    // condition passed: do not log
    if (condition) {
      return;
    }

    // Condition not passed
    const text = `Warning: ${message}`;

    // check console for IE9 support which provides console
    // only with open devtools
    if (typeof console !== 'undefined') {
      // tslint:disable-next-line: no-console
      console.warn(text);
    }

    try {
      throw Error(text);
    } catch (x) {
      // Throwing an error and catching it immediately
      // to improve debugging
      // A consumer can use 'pause on caught exceptions'
      // https://github.com/facebook/react/issues/4216
    }
  }
}

/**
 * Checks if a value is considered empty.
 *
 * A value is considered empty if it is:
 * - `undefined`
 * - `null`
 * - An empty string `''`
 *
 * @param value - The value to check for emptiness
 * @returns `true` if the value is empty, `false` otherwise
 *
 * @example
 * ```typescript
 * isEmpty(undefined); // true
 * isEmpty(null); // true
 * isEmpty(''); // true
 * isEmpty('hello'); // false
 * isEmpty(0); // false
 * isEmpty(false); // false
 * isEmpty([]); // false
 * ```
 */
export function isEmpty<T>(value: T | null | undefined): value is Extract<T, ''> | null | undefined {
  return value === undefined || value === null || value === '';
}

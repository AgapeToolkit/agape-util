/**
 * Checks if a value is present (not empty).
 *
 * A value is considered present if it is NOT:
 * - `undefined`
 * - `null`
 * - An empty string `''`
 *
 * @param value - The value to check for presence
 * @returns `true` if the value is present, `false` otherwise
 *
 * @example
 * ```typescript
 * isPresent(undefined); // false
 * isPresent(null); // false
 * isPresent(''); // false
 * isPresent('hello'); // true
 * isPresent(0); // true
 * isPresent(false); // true
 * isPresent([]); // true
 * ```
 */
export function isPresent<T>(value: T | null | undefined): value is NonNullable<T> {
  return value !== undefined && value !== null && value !== '';
}

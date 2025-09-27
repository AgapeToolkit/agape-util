import { Properties } from '@agape/types';

/**
 * Creates a new object containing only the non-function properties from the original object.
 *
 * This function iterates through all enumerable properties of an object
 * and returns a new object containing only those that are not functions.
 *
 * @template T - The type of the input object
 * @param object - The object to extract properties from
 * @returns A new object containing only non-function properties
 *
 * @example
 * ```typescript
 * const employee = {
 *   id: 1,
 *   name: 'John',
 *   getFullName() { return this.name; },
 *   calculateSalary() { return 50000; }
 * };
 *
 * const dataProps = properties(employee);
 * // Result: { id: 1, name: 'John' }
 * ```
 */
export function properties<T extends object>(object: T): Properties<T> {
  const result: Record<string, unknown> = {};

  for (const key in object) {
    if (typeof object[key] !== 'function') {
      result[key] = object[key];
    }
  }

  return result as Properties<T>;
}

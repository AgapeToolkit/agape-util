/**
 * Returns an array of property names that are not functions or methods.
 *
 * This function iterates through all enumerable properties of an object
 * and returns only those that are not functions.
 *
 * @template T - The type of the input object
 * @param instance - The object to extract property names from
 * @returns An array of property names that are not functions
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
 * // Result: ['id', 'name']
 * ```
 */
export function properties<T extends object>(instance: T): (keyof T)[] {
  const result: (keyof T)[] = [];

  for (const key in instance) {
    if (typeof instance[key] !== 'function') {
      result.push(key);
    }
  }

  return result;
}

/**
 * Returns an array of property names that are functions or methods.
 *
 * This function iterates through all enumerable properties of an object
 * and returns only those that are functions.
 *
 * @template T - The type of the input object
 * @param instance - The object to extract method names from
 * @returns An array of property names that are functions
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
 * const methodProps = methods(employee);
 * // Result: ['getFullName', 'calculateSalary']
 * ```
 */
export function methods<T extends object>(instance: T): (keyof T)[] {
  const result: (keyof T)[] = [];

  for (const key in instance) {
    if (typeof instance[key] === 'function') {
      result.push(key);
    }
  }

  return result;
}

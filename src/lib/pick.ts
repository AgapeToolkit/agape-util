/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Creates a new object by picking only the specified properties from the original object.
 *
 * This function returns a new object that contains only the properties specified
 * in the `<parameter>keys` parameter from the original object.
 *
 * @template T - The type of the input object
 * @template K - The keys to pick from the object
 * @param instance - The source object to pick properties from
 * @param keys - Array of property names to include in the result
 * @returns A new object containing only the specified properties
 *
 * @example
 * ### Pick a single property
 * ```typescript
 * const user = { id: 1, name: 'John', email: 'john@example.com', password: 'secret' };
 *
 * // Pick single property
 * const nameOnly = pick(user, ['name']);
 * ```
 *
 * @example
 * ### Pick multiple properties
 * ```ts
 * const user = { id: 1, name: 'John', email: 'john@example.com', password: 'secret' };
 *
 * const publicInfo = pick(user, ['id', 'name', 'email']);
 * // Result: { id: 1, name: 'John', email: 'john@example.com' }
 * ```
 *
 * @example
 * ### Pick all properties
 * ```ts
 * const employee = {
 *   id: 1,
 *   name: 'John',
 *   getFullName() { return this.name; },
 *   calculateSalary() { return 50000; }
 * };
 *
 * const dataOnly = pick(employee, properties(employee)]);
 * // Result: { id: 1, name: 'John' }
 * ```
 */
export function pick<T extends object, K extends keyof T>(instance: T, keys: K[]): Pick<T, K> {
  const output: any = {};

  // For pick, iterate through keys directly (more efficient for small pick lists)
  for (let i = 0; i < keys.length; i++) {
    const property = keys[i];
    if (property in instance) {
      output[property] = instance[property];
    }
  }
  return output;
}

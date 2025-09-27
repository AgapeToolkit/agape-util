/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Creates a new object by omitting specified properties from the original object.
 *
 * This function returns a new object that contains all properties from the original
 * object except for the ones specified in the `<parameter>keys` parameter.
 *
 * @template T - The type of the input object
 * @template K - The keys to omit from the object
 * @param instance - The source object to omit properties from
 * @param keys - Array of property names to omit from the result
 * @returns A new object with the specified properties omitted
 *
 * @example
 * ### Omit a single property
 *
 * ```typescript
 * const user = { id: 1, name: 'John', email: 'john@example.com', password: 'secret' };
 *
 * const publicUser = omit(user, ['password']);
 * // Result: { id: 1, name: 'John', email: 'john@example.com' }
 * ```
 * @example
 * ### Omit multiple properties
 * ```ts
 * const user = { id: 1, name: 'John', email: 'john@example.com', password: 'secret' };
 *
 * const basicUser = omit(user, ['password', 'email']);
 * // Result: { id: 1, name: 'John' }
 * ```
 */
export function omit<T extends object, K extends keyof T>(instance: T, keys: K[]): Omit<T, K> {
  // Create Set for O(1) lookups when checking against all object properties
  const keysSet = new Set(keys as string[]);
  const output: any = {};

  for (const property in instance) {
    if (!keysSet.has(property)) {
      output[property] = instance[property];
    }
  }
  return output;
}

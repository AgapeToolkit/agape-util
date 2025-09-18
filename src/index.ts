/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Creates a new object by omitting specified properties from the original object.
 *
 * This function returns a new object that contains all properties from the original
 * object except for the ones specified in the `keys` parameter.
 *
 * @template T - The type of the input object
 * @template K - The keys to omit from the object
 * @param instance - The source object to omit properties from
 * @param keys - Array of property names to omit from the result
 * @returns A new object with the specified properties omitted
 *
 * @example
 *
 * ### Omit a single property
 *
 * ```typescript
 * const user = { id: 1, name: 'John', email: 'john@example.com', password: 'secret' };
 *
 * const publicUser = omit(user, ['password']);
 * // Result: { id: 1, name: 'John', email: 'john@example.com' }
 * ```
 *
 * ### Omit multiple properties
 * ```ts
 * const user = { id: 1, name: 'John', email: 'john@example.com', password: 'secret' };
 *
 * const basicUser = omit(user, ['password', 'email']);
 * // Result: { id: 1, name: 'John' }
 * ```
 *
 * ### Omit all methods from an object
 * ```ts
 * const employee = {
 *   id: 1,
 *   name: 'John',
 *   getFullName() { return this.name; },
 *   calculateSalary() { return 50000; }
 * };
 *
 * const dataOnly = omit(employee, methods(employee));
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

/**
 * Creates a new object by picking only the specified properties from the original object.
 *
 * This function returns a new object that contains only the properties specified
 * in the `keys` parameter from the original object.
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
export function isEmpty(value: any) {
  return value === undefined || value === null || value === '';
}

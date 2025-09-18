/* eslint-disable @typescript-eslint/no-explicit-any */
import { isEmpty, omit, pick, properties, methods } from './index';

describe('isEmpty', () => {
  it('should return true for undefined', () => {
    expect(isEmpty(undefined)).toBe(true);
  });

  it('should return true for null', () => {
    expect(isEmpty(null)).toBe(true);
  });

  it('should return true for empty string', () => {
    expect(isEmpty('')).toBe(true);
  });

  it('should return false for non-empty string', () => {
    expect(isEmpty('hello')).toBe(false);
  });

  it('should return false for zero', () => {
    expect(isEmpty(0)).toBe(false);
  });

  it('should return false for false boolean', () => {
    expect(isEmpty(false)).toBe(false);
  });

  it('should return false for empty array', () => {
    expect(isEmpty([])).toBe(false);
  });

  it('should return false for empty object', () => {
    expect(isEmpty({})).toBe(false);
  });

  it('should return false for whitespace string', () => {
    expect(isEmpty('   ')).toBe(false);
  });
});

describe('omit', () => {
  const testObject = {
    id: 1,
    name: 'John',
    email: 'john@example.com',
    password: 'secret',
    age: 30,
    city: 'New York'
  };

  it('should omit single property', () => {
    const result = omit(testObject, ['password']);
    expect(result).toEqual({
      id: 1,
      name: 'John',
      email: 'john@example.com',
      age: 30,
      city: 'New York'
    });
    expect(result).not.toHaveProperty('password');
  });

  it('should omit multiple properties', () => {
    const result = omit(testObject, ['password', 'email', 'age']);
    expect(result).toEqual({
      id: 1,
      name: 'John',
      city: 'New York'
    });
    expect(result).not.toHaveProperty('password');
    expect(result).not.toHaveProperty('email');
    expect(result).not.toHaveProperty('age');
  });

  it('should return same object when no properties to omit', () => {
    const result = omit(testObject, []);
    expect(result).toEqual(testObject);
  });

  it('should handle non-existent properties gracefully', () => {
    const result = omit(testObject, ['nonExistent' as keyof typeof testObject]);
    expect(result).toEqual(testObject);
  });

  it('should handle dynamic array', () => {
    const keysToOmit: (keyof typeof testObject)[] = ['password', 'email'];
    const result = omit(testObject, keysToOmit);
    expect(result).toEqual({
      id: 1,
      name: 'John',
      age: 30,
      city: 'New York'
    });
  });

  it('should handle empty object', () => {
    const result = omit({} as any, ['anyKey']);
    expect(result).toEqual({});
  });

  it('should handle object with undefined values', () => {
    const obj = { a: 1, b: undefined, c: 3 };
    const result = omit(obj, ['b']);
    expect(result).toEqual({ a: 1, c: 3 });
  });

  it('should handle object with null values', () => {
    const obj = { a: 1, b: null, c: 3 };
    const result = omit(obj, ['b']);
    expect(result).toEqual({ a: 1, c: 3 });
  });

  it('should preserve original object', () => {
    const original = { ...testObject };
    omit(testObject, ['password']);
    expect(testObject).toEqual(original);
  });
});

describe('pick', () => {
  const testObject = {
    id: 1,
    name: 'John',
    email: 'john@example.com',
    password: 'secret',
    age: 30,
    city: 'New York'
  };

  it('should pick single property', () => {
    const result = pick(testObject, ['name']);
    expect(result).toEqual({ name: 'John' });
  });

  it('should pick multiple properties', () => {
    const result = pick(testObject, ['id', 'name', 'email']);
    expect(result).toEqual({
      id: 1,
      name: 'John',
      email: 'john@example.com'
    });
  });

  it('should return empty object when no properties specified', () => {
    const result = pick(testObject, []);
    expect(result).toEqual({});
  });

  it('should handle non-existent properties gracefully', () => {
    const result = pick(testObject, ['nonExistent' as keyof typeof testObject]);
    expect(result).toEqual({});
  });

  it('should handle duplicate properties (last wins)', () => {
    const result = pick(testObject, ['name', 'name', 'name']);
    expect(result).toEqual({ name: 'John' });
  });

  it('should handle dynamic array', () => {
    const keysToPick: (keyof typeof testObject)[] = ['id', 'name'];
    const result = pick(testObject, keysToPick);
    expect(result).toEqual({
      id: 1,
      name: 'John'
    });
  });

  it('should handle empty object', () => {
    const result = pick({} as any, ['anyKey']);
    expect(result).toEqual({});
  });

  it('should handle object with undefined values', () => {
    const obj = { a: 1, b: undefined, c: 3 };
    const result = pick(obj, ['b']);
    expect(result).toEqual({ b: undefined });
  });

  it('should handle object with null values', () => {
    const obj = { a: 1, b: null, c: 3 };
    const result = pick(obj, ['b']);
    expect(result).toEqual({ b: null });
  });

  it('should preserve original object', () => {
    const original = { ...testObject };
    pick(testObject, ['name']);
    expect(testObject).toEqual(original);
  });

  it('should handle all properties', () => {
    const result = pick(testObject, ['id', 'name', 'email', 'password', 'age', 'city']);
    expect(result).toEqual(testObject);
  });
});

describe('TypeScript type safety', () => {
  interface User {
    id: number;
    name: string;
    email: string;
    password: string;
  }

  const user: User = {
    id: 1,
    name: 'John',
    email: 'john@example.com',
    password: 'secret'
  };

  it('should maintain type safety for omit', () => {
    const result = omit(user, ['password']);
    // TypeScript should infer that result is Omit<User, 'password'>
    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('name');
    expect(result).toHaveProperty('email');
    expect(result).not.toHaveProperty('password');
  });

  it('should maintain type safety for pick', () => {
    const result = pick(user, ['id', 'name']);
    // TypeScript should infer that result is Pick<User, 'id' | 'name'>
    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('name');
    expect(result).not.toHaveProperty('email');
    expect(result).not.toHaveProperty('password');
  });

  it('should work with array parameters', () => {
    const keysToOmit: (keyof User)[] = ['password'];
    const keysToPick: (keyof User)[] = ['id', 'name'];
    
    const omitted = omit(user, keysToOmit);
    const picked = pick(user, keysToPick);
    
    expect(omitted).not.toHaveProperty('password');
    expect(picked).toHaveProperty('id');
    expect(picked).toHaveProperty('name');
  });
});

describe('properties', () => {
  it('should return only non-function properties', () => {
    const obj = {
      id: 1,
      name: 'John',
      getFullName() { return this.name; },
      calculateSalary() { return 50000; },
      age: 30
    };
    
    const result = properties(obj);
    expect(result).toEqual(['id', 'name', 'age']);
  });

  it('should return empty array for object with only methods', () => {
    const obj = {
      method1() { return 'test'; },
      method2() { return 42; }
    };
    
    const result = properties(obj);
    expect(result).toEqual([]);
  });

  it('should return all properties for object with no methods', () => {
    const obj = {
      id: 1,
      name: 'John',
      age: 30
    };
    
    const result = properties(obj);
    expect(result).toEqual(['id', 'name', 'age']);
  });

  it('should handle empty object', () => {
    const result = properties({});
    expect(result).toEqual([]);
  });

  it('should handle object with mixed property types', () => {
    const obj = {
      string: 'hello',
      number: 42,
      boolean: true,
      array: [1, 2, 3],
      object: { nested: true },
      null: null,
      undefined: undefined,
      method() { return 'test'; },
      arrow: () => 'arrow'
    };
    
    const result = properties(obj);
    expect(result).toEqual(['string', 'number', 'boolean', 'array', 'object', 'null', 'undefined']);
  });
});

describe('methods', () => {
  it('should return only function properties', () => {
    const obj = {
      id: 1,
      name: 'John',
      getFullName() { return this.name; },
      calculateSalary() { return 50000; },
      age: 30
    };
    
    const result = methods(obj);
    expect(result).toEqual(['getFullName', 'calculateSalary']);
  });

  it('should return empty array for object with no methods', () => {
    const obj = {
      id: 1,
      name: 'John',
      age: 30
    };
    
    const result = methods(obj);
    expect(result).toEqual([]);
  });

  it('should return all methods for object with only methods', () => {
    const obj = {
      method1() { return 'test'; },
      method2() { return 42; }
    };
    
    const result = methods(obj);
    expect(result).toEqual(['method1', 'method2']);
  });

  it('should handle empty object', () => {
    const result = methods({});
    expect(result).toEqual([]);
  });

  it('should handle arrow functions', () => {
    const obj = {
      id: 1,
      regularMethod() { return 'regular'; },
      arrowMethod: () => 'arrow',
      notAFunction: 'string'
    };
    
    const result = methods(obj);
    expect(result).toEqual(['regularMethod', 'arrowMethod']);
  });
});

describe('Integration with omit and pick', () => {
  const employee = {
    id: 1,
    name: 'John',
    department: 'Engineering',
    getFullName() { return this.name; },
    calculateSalary() { return 50000; },
    getDepartment() { return this.department; }
  };

  it('should omit all methods using methods() function', () => {
    const dataOnly = omit(employee, methods(employee));
    expect(dataOnly).toEqual({
      id: 1,
      name: 'John',
      department: 'Engineering'
    });
  });

  it('should pick only data properties using properties() function', () => {
    const dataOnly = pick(employee, properties(employee));
    expect(dataOnly).toEqual({
      id: 1,
      name: 'John',
      department: 'Engineering'
    });
  });

  it('should combine specific keys with methods()', () => {
    const result = omit(employee, ['id', ...methods(employee)]);
    expect(result).toEqual({
      name: 'John',
      department: 'Engineering'
    });
  });

  it('should combine specific keys with properties()', () => {
    const result = pick(employee, ['name', ...properties(employee)]);
    expect(result).toEqual({
      id: 1,
      name: 'John',
      department: 'Engineering'
    });
  });
});
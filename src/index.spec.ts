import { isEmpty, omit, pick } from './index';

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
/* eslint-disable @typescript-eslint/no-explicit-any */
import { pick } from './pick';

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

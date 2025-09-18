/* eslint-disable @typescript-eslint/no-explicit-any */
import { omit } from './omit';

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

import { properties } from './properties';

describe('properties', () => {
  it('should return only non-function properties as an object', () => {
    const obj = {
      id: 1,
      name: 'John',
      getFullName() { return this.name; },
      calculateSalary() { return 50000; },
      age: 30
    };
    
    const result = properties(obj);
    expect(result).toEqual({ id: 1, name: 'John', age: 30 });
  });

  it('should return empty object for object with only methods', () => {
    const obj = {
      method1() { return 'test'; },
      method2() { return 42; }
    };
    
    const result = properties(obj);
    expect(result).toEqual({});
  });

  it('should return all properties for object with no methods', () => {
    const obj = {
      id: 1,
      name: 'John',
      age: 30
    };
    
    const result = properties(obj);
    expect(result).toEqual({ id: 1, name: 'John', age: 30 });
  });

  it('should handle empty object', () => {
    const result = properties({});
    expect(result).toEqual({});
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
    expect(result).toEqual({
      string: 'hello',
      number: 42,
      boolean: true,
      array: [1, 2, 3],
      object: { nested: true },
      null: null,
      undefined: undefined
    });
  });

  it('should preserve original object values', () => {
    const obj = {
      id: 1,
      name: 'John',
      data: { nested: 'value' },
      method() { return 'test'; }
    };
    
    const result = properties(obj);
    expect(result).toEqual({
      id: 1,
      name: 'John',
      data: { nested: 'value' }
    });
    // Ensure it's a new object, not a reference
    expect(result).not.toBe(obj);
  });

  it('should handle arrow functions as non-properties', () => {
    const obj = {
      id: 1,
      regularMethod() { return 'regular'; },
      arrowMethod: () => 'arrow',
      notAFunction: 'string'
    };
    
    const result = properties(obj);
    expect(result).toEqual({
      id: 1,
      notAFunction: 'string'
    });
  });
});

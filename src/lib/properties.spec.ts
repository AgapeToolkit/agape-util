import { properties } from './properties';

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

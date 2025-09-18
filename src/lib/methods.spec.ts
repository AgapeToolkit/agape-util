import { methods } from './methods';

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

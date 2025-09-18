/* eslint-disable @typescript-eslint/no-explicit-any */
import { omit, pick, properties, methods } from './index';

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
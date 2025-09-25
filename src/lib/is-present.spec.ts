import { isPresent } from './is-present';

describe('isPresent', () => {
  it('should return false for undefined', () => {
    expect(isPresent(undefined)).toBe(false);
  });

  it('should return false for null', () => {
    expect(isPresent(null)).toBe(false);
  });

  it('should return false for empty string', () => {
    expect(isPresent('')).toBe(false);
  });

  it('should return true for non-empty string', () => {
    expect(isPresent('hello')).toBe(true);
  });

  it('should return true for zero', () => {
    expect(isPresent(0)).toBe(true);
  });

  it('should return true for false boolean', () => {
    expect(isPresent(false)).toBe(true);
  });

  it('should return true for empty array', () => {
    expect(isPresent([])).toBe(true);
  });

  it('should return true for empty object', () => {
    expect(isPresent({})).toBe(true);
  });

  it('should return true for whitespace string', () => {
    expect(isPresent('   ')).toBe(true);
  });

  describe('TypeScript type narrowing', () => {
    it('should narrow types correctly in conditional statements', () => {
      function testTypeNarrowing(value: number | undefined): string {
        if (isPresent(value)) {
          // TypeScript should know value is definitely a number here
          return `The number is: ${value}`;
        }
        // TypeScript should know value is undefined here
        return 'Value is not present';
      }

      expect(testTypeNarrowing(42)).toBe('The number is: 42');
      expect(testTypeNarrowing(undefined)).toBe('Value is not present');
    });

    it('should work with union types', () => {
      function processValue(value: string | null | undefined): string {
        if (isPresent(value)) {
          // TypeScript should know value is definitely a string here
          return value.toUpperCase();
        }
        return 'No value provided';
      }

      expect(processValue('hello')).toBe('HELLO');
      expect(processValue(null)).toBe('No value provided');
      expect(processValue(undefined)).toBe('No value provided');
      expect(processValue('')).toBe('No value provided');
    });

    it('should work with object properties', () => {
      interface User {
        name?: string;
        age?: number;
      }

      function getUserDisplayName(user: User): string {
        if (isPresent(user.name)) {
          // TypeScript should know user.name is definitely a string here
          return user.name.toUpperCase();
        }
        return 'Anonymous';
      }

      expect(getUserDisplayName({ name: 'John' })).toBe('JOHN');
      expect(getUserDisplayName({ name: '' })).toBe('Anonymous');
      expect(getUserDisplayName({})).toBe('Anonymous');
    });
  });
});

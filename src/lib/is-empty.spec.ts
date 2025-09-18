import { isEmpty } from './is-empty';

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

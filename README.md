# @agape/util

Essential utility functions for object manipulation and data validation.

## ✨ Functions

### `pick(instance, keys)`
Creates a new object by picking only the specified properties from the original object.

### `omit(instance, keys)`
Creates a new object by omitting specified properties from the original object.

### `properties(instance)`
Returns an array of property names that are not functions or methods.

### `methods(instance)`
Returns an array of property names that are functions or methods.

### `isPresent(value)`
Checks if a value is present (not empty) and provides TypeScript type narrowing.

A value is considered present if it is NOT:
- `undefined`
- `null` 
- An empty string `''`

**TypeScript Benefits:** This function acts as a type guard, allowing TypeScript to narrow types in conditional statements.

```ts
function processValue(value: number | undefined) {
  if (isPresent(value)) {
    // TypeScript knows value is definitely a number here
    return value + 1; // ✅ No type errors
  }
  // TypeScript knows value is undefined here
}
```

---

## 🚀 Examples

### Basic Object Manipulation

```ts
import { isPresent, omit, pick } from '@agape/util';

const user = { 
  id: 1, 
  name: 'John', 
  email: 'john@example.com', 
  password: 'secret' 
};

// Check if value is present
isPresent(undefined); // false
isPresent(null); // false
isPresent(''); // false
isPresent('hello'); // true
isPresent(0); // true
isPresent(false); // true

// TypeScript type narrowing example
function getEra(year: number | undefined): number | undefined {
  if (isPresent(year)) {
    // TypeScript knows year is definitely a number here
    return year > 0 ? 1 : 0;
  }
  return year; // TypeScript knows year is undefined here
}

// Omit properties
const publicUser = omit(user, ['password']);
// Result: { id: 1, name: 'John', email: 'john@example.com' }

// Pick specific properties
const basicInfo = pick(user, ['id', 'name']);
// Result: { id: 1, name: 'John' }
```

### Working with Methods and Data

```ts
import { omit, pick, properties, methods } from '@agape/util';

const employee = {
  id: 1,
  name: 'John',
  department: 'Engineering',
  getFullName() { return this.name; },
  calculateSalary() { return 50000; },
  getDepartment() { return this.department; }
};

// Get only data properties
const dataProps = properties(employee);
// Result: ['id', 'name', 'department']

// Get only methods
const methodProps = methods(employee);
// Result: ['getFullName', 'calculateSalary', 'getDepartment']

// Omit all methods and ids to get data-only object
const dataOnly = omit(employee, ['id', ...methods(employee)]);
// Result: { id: 1, name: 'John', department: 'Engineering' }

// Pick only data properties
const cleanData = pick(employee, properties(employee));
// Result: { id: 1, name: 'John', department: 'Engineering' }
```
---

## 📚 Documentation

See the full API documentation at [agape.dev/api](https://agape.dev/api).

## 📦 Agape Toolkit

This package is part of the [Agape Toolkit](https://github.com/AgapeToolkit/AgapeToolkit) - a comprehensive collection of TypeScript utilities and libraries for modern web development.

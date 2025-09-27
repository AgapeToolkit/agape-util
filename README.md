# @agape/util

Essential utility functions for object manipulation and data validation.

## ✨ Functions

### `pick(instance, keys)`
Creates a new object by picking only the specified properties from the original object.

### `omit(instance, keys)`
Creates a new object by omitting specified properties from the original object.

### `properties(instance)`
Creates a new object containing only the non-function properties from the original object.

### `isPresent(value)`
Checks if a value is present (not empty) and provides TypeScript type narrowing.

A value is considered present if it is NOT:
- `undefined`
- `null` 
- An empty string `''`

---

## 🚀 Examples

### `pick(instance, keys)`

```ts
import { pick } from '@agape/util';

const user = { id: 1, name: 'John', email: 'john@example.com' };

pick(user, ['id', 'name']);
// Result: { id: 1, name: 'John' }
```

### `omit(instance, keys)`

```ts
import { omit } from '@agape/util';

const user = { id: 1, name: 'John', email: 'john@example.com', password: 'secret' };

omit(user, ['password']);
// Result: { id: 1, name: 'John', email: 'john@example.com' }
```

### `properties(instance)`

```ts
import { properties } from '@agape/util';

const employee = {
  id: 1,
  name: 'John',
  getFullName() { return this.name; }
};

properties(employee);
// Result: { id: 1, name: 'John' }
```

### `isPresent(value)`

```ts
import { isPresent } from '@agape/util';

isPresent('hello'); // true
isPresent(''); // false
isPresent(null); // false
isPresent(undefined); // false
```

This function acts as a type guard, allowing TypeScript to narrow types in conditional statements.

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

## 📚 Documentation

See the full API documentation at [agape.dev/api](https://agape.dev/api).

## 📦 Agape Toolkit

This package is part of the [Agape Toolkit](https://github.com/AgapeToolkit/AgapeToolkit) - a comprehensive collection of TypeScript utilities and libraries for modern web development.

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

### `isEmpty(value)`
Checks if a value is considered empty (undefined, null, or empty string).

### `isClassOrSubclassOf(childClass, parentClass)`
Checks if one class is the same as or a subclass of another class.

---

## 🚀 Examples

### Basic Object Manipulation

```ts
import { isEmpty, omit, pick } from '@agape/util';

const user = { 
  id: 1, 
  name: 'John', 
  email: 'john@example.com', 
  password: 'secret' 
};

// Check if value is empty
isEmpty(undefined); // true
isEmpty(''); // true
isEmpty('hello'); // false

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

### Class Inheritance Checking

```ts
import { isClassOrSubclassOf } from '@agape/util';

class Animal {}
class Dog extends Animal {}
class Cat extends Animal {}
class Vehicle {}
class Car extends Vehicle {}
class SportsCar extends Car {}

// Check class relationships
isClassOrSubclassOf(Dog, Animal); // true
isClassOrSubclassOf(Cat, Animal); // true
isClassOrSubclassOf(Animal, Animal); // true (same class)
isClassOrSubclassOf(Animal, Dog); // false
isClassOrSubclassOf(SportsCar, Vehicle); // true (indirect inheritance)
```
---

## 📚 Documentation

See the full API documentation at [agape.dev/api](https://agape.dev/api).

## 📦 Agape Toolkit

This package is part of the [Agape Toolkit](https://github.com/AgapeToolkit/AgapeToolkit) - a comprehensive collection of TypeScript utilities and libraries for modern web development.

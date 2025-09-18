import { Class } from '@agape/types';

/**
 * Checks if one class is the same as or a subclass of another class.
 *
 * This function determines if the `<parameter>childClass` is the same as or extends from the `<parameter>parentClass`
 * by checking the prototype chain. It returns `<intrinsic>true` if `<parameter>childClass` is the same class as `<parameter>parentClass`
 * or is a subclass of `<parameter>parentClass`, `<intrinsic>false` otherwise.
 *
 * @param childClass - The class to check if it's the same as or extends the parent
 * @param parentClass - The class to check if it's the same or parent
 * @returns `true` if `childClass` is the same as or extends `parentClass`, `false` otherwise
 *
 * @example
 * ```typescript
 * class Animal {}
 * class Dog extends Animal {}
 * class Cat extends Animal {}
 * class Bird extends Animal {}
 * 
 * isClassOrSubclassOf(Dog, Animal); // true
 * isClassOrSubclassOf(Cat, Animal); // true
 * isClassOrSubclassOf(Bird, Animal); // true
 * isClassOrSubclassOf(Animal, Animal); // true (same class)
 * isClassOrSubclassOf(Animal, Dog); // false
 * ```
 */
export function isClassOrSubclassOf(childClass: Class, parentClass: Class): boolean {
  // Same class is considered the same as or subclass of itself
  if (childClass === parentClass) {
    return true;
  }

  // Check if childClass extends parentClass by walking up the prototype chain
  let current = childClass;
  while (current) {
    // Get the prototype of the current constructor
    const prototype = Object.getPrototypeOf(current);
    
    // If we reach null, we've reached the end of the prototype chain
    if (prototype === null) {
      break;
    }
    
    // If we find the parent class in the prototype chain, it's a subclass
    if (prototype === parentClass) {
      return true;
    }
    
    // Move up the prototype chain
    current = prototype;
  }

  return false;
}

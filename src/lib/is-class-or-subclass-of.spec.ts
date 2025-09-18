import { isClassOrSubclassOf } from './is-class-or-subclass-of';

describe('isClassOrSubclassOf', () => {
  // Test classes
  class Animal {}
  class Dog extends Animal {}
  class Cat extends Animal {}
  class Bird extends Animal {}
  
  class Vehicle {}
  class Car extends Vehicle {}
  class SportsCar extends Car {}
  class Truck extends Vehicle {}
  
  class BaseClass {}
  class MiddleClass extends BaseClass {}
  class DerivedClass extends MiddleClass {}

  it('should return true for direct subclass relationship', () => {
    expect(isClassOrSubclassOf(Dog, Animal)).toBe(true);
    expect(isClassOrSubclassOf(Cat, Animal)).toBe(true);
    expect(isClassOrSubclassOf(Bird, Animal)).toBe(true);
    expect(isClassOrSubclassOf(Car, Vehicle)).toBe(true);
    expect(isClassOrSubclassOf(Truck, Vehicle)).toBe(true);
  });

  it('should return true for indirect subclass relationship', () => {
    expect(isClassOrSubclassOf(SportsCar, Car)).toBe(true);
    expect(isClassOrSubclassOf(SportsCar, Vehicle)).toBe(true);
    expect(isClassOrSubclassOf(DerivedClass, MiddleClass)).toBe(true);
    expect(isClassOrSubclassOf(DerivedClass, BaseClass)).toBe(true);
  });

  it('should return true for same class', () => {
    expect(isClassOrSubclassOf(Animal, Animal)).toBe(true);
    expect(isClassOrSubclassOf(Dog, Dog)).toBe(true);
    expect(isClassOrSubclassOf(Car, Car)).toBe(true);
  });

  it('should return false for parent-child relationship (reverse)', () => {
    expect(isClassOrSubclassOf(Animal, Dog)).toBe(false);
    expect(isClassOrSubclassOf(Vehicle, Car)).toBe(false);
    expect(isClassOrSubclassOf(Car, SportsCar)).toBe(false);
  });

  it('should return false for unrelated classes', () => {
    expect(isClassOrSubclassOf(Dog, Vehicle)).toBe(false);
    expect(isClassOrSubclassOf(Cat, Car)).toBe(false);
    expect(isClassOrSubclassOf(Bird, SportsCar)).toBe(false);
  });

  it('should handle built-in classes', () => {
    class CustomError extends Error {}
    class CustomArray extends Array {}
    
    expect(isClassOrSubclassOf(CustomError, Error)).toBe(true);
    expect(isClassOrSubclassOf(CustomArray, Array)).toBe(true);
    expect(isClassOrSubclassOf(Error, CustomError)).toBe(false);
    expect(isClassOrSubclassOf(Array, CustomArray)).toBe(false);
  });

  it('should handle classes with no inheritance', () => {
    class StandaloneClass {}
    
    expect(isClassOrSubclassOf(StandaloneClass, Animal)).toBe(false);
    expect(isClassOrSubclassOf(Animal, StandaloneClass)).toBe(false);
  });

  it('should handle complex inheritance chains', () => {
    class Level1 {}
    class Level2 extends Level1 {}
    class Level3 extends Level2 {}
    class Level4 extends Level3 {}
    
    expect(isClassOrSubclassOf(Level4, Level1)).toBe(true);
    expect(isClassOrSubclassOf(Level4, Level2)).toBe(true);
    expect(isClassOrSubclassOf(Level4, Level3)).toBe(true);
    expect(isClassOrSubclassOf(Level3, Level1)).toBe(true);
    expect(isClassOrSubclassOf(Level2, Level1)).toBe(true);
    
    expect(isClassOrSubclassOf(Level1, Level4)).toBe(false);
    expect(isClassOrSubclassOf(Level2, Level4)).toBe(false);
    expect(isClassOrSubclassOf(Level3, Level4)).toBe(false);
  });
});

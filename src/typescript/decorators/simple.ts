import "reflect-metadata";
import { Class } from "../utils";

export type Constructor<C = any> = {
  new(...args: any[]): C
};

export type PropertyDecorator<T = Function, P extends T | Function | Constructor<T> = any> = { (prototype: P, key: PropertyKey, ...args: any[]): void };

// Simple Typescript Property Decorator, 
// NOT classified as a Property Decorator factory as it doesn't return a function
const Logger: PropertyDecorator<unknown, any> = (prototype, key) => {
  //@ts-ignore Symbol as Index Ignore
  let { [key]: current } = prototype;
  // Because we are not returning a function here - all we can really do is apply properties straight to the prototype
  Object.defineProperty(prototype, key, {
    get: () => (console.log(`Getting Decorator Property: ${String(key)} - [ ${current} ]`), current),
    set: next => (console.log(`Updating Decorator Property: [ ${current} ] => [ ${next} ]...`), current = next),
    enumerable: true,
    configurable: true,
  });
}


export type ClassDecorator<T = unknown> = { (definition: Class<T>, ...args: any[]): void };

// This is a baseline Typescript Class Decorator, NOT Classified as a Class Decorator Factory
const Demo: ClassDecorator<any> = (definition) => {
  // !! Nice to take a quick look at its own prototype console.log(Object.getPrototypeOf(definition));
  // !! Also nice to look at the definition.constructor console.log(definition.constructor);
  // ** You Could imaging what you might do here on this definition prototype
  // ** Lets call the DemoClass from this class 
  //@ts-ignore
  definition.DemoClass();
}

export default {
  Property: {
    Logger
  },
  Class: {
    Prototype: {
      Demo
    }
  },
};


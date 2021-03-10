import type { Constructor, PropertyDecorator } from "./simple";

// If we want to customize how a decorator is applied to a declaration, we can write a decorator factory. A Decorator Factory is simply a function that returns the expression that will be called by the decorator at runtime.
// We can write a decorator factory in the following fashion
// A factory will actually return a PropertyDecorator

/** 
 * 
 * 
 * @type {T} Is the the Type that is potentially Constructable (i.e. a Class) or it is potentially a Function 
 * If it is not a class then it is a Function
 * @type {P} Is the the Prototype anticipated to be of type T
 * @type {O} Are the additional options to be passed into this Decorator Factory which are then available in the function scope returned, to be executed at runtime
 * 
 * */
export type PropertyDecoratorFactory<O = any, T = Function, P extends T | Function | Constructor<T> = any> = { (options?: O): PropertyDecorator<T, P> };

const Logger: PropertyDecoratorFactory<{ writeable: boolean }, unknown, any> = (options) => {
  return function (prototype, key, descriptor: PropertyDescriptor) {
    let { [key]: current } = prototype;
    // !! Note the following log 
    // console.log(prototype);
    const { writeable } = options || {};
    descriptor = {
      writable: writeable,
      get: () => (console.log(`Getting DecoratorFactory Property: ${String(key)}`), current),
      set: next => (console.log(`Updating DecoratorFactory Property: ${current} => ${next}...`), current = next),
    }
  };
}





















export default {
  Property: {
    Logger
  },
  Class: {

  },
};


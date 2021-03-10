import type { Constructor, PropertyDecorator, ClassDecorator } from "./simple";

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
    const { writeable } = options || {};
    descriptor = {
      writable: writeable,
      get: () => (console.log(`Getting DecoratorFactory Property: ${String(key)}`), current),
      set: next => (console.log(`Updating DecoratorFactory Property: ${current} => ${next}...`), current = next),
    }
  };
}


export type ClassDecoratorFactory<O = any, T = unknown> = { (options?: O): ClassDecorator<T> };

const Demo: ClassDecoratorFactory<{ property?: string }, unknown> = (options) => {
  return function (definition) {
    //@ts-ignore
    definition.DemoClass();

    // Return an anon class 
    // const clazz = class extends (definition as Constructor<typeof definition>) {
    //   extended = "Extended";
    // };
    // // Attempt to bridge => Not what you want
    // // Object.setPrototypeOf(clazz.prototype, (definition as Constructor<typeof definition>).prototype);
    // return clazz;

    // OR - Personal Preference for Keeping things in tact.
    // Similar to setting static properties on the definition directly
    Object.defineProperty((definition as Constructor<typeof definition>), 'extended', { value: "Extended" });
  };
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


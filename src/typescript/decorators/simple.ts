import "reflect-metadata";

export type Constructor<C = any> = {
  new(...args: any[]): C
};

export type PropertyDecorator<T = Function, P extends T | Function | Constructor<T> = any> = { (prototype: P, key: PropertyKey, ...args: any[]): void };

// This is a baseline typescript decorator, NOT classified as a Decorator Factory
const logger: PropertyDecorator<unknown, any> = (prototype, key) => {
  //@ts-ignore Symbol as Index Ignore
  let { [key]: current } = prototype;
  // Because we are not returning a function here - all we can really do is apply properties straight to the prototype
  Object.defineProperty(prototype.constructor, key, {
    get: () => (console.log(`Getting Decorator Property: ${String(key)}`), current),
    set: next => (console.log(`Updating Decorator Property: ${current} => ${next}...`), current = next),
    enumerable: true,
    configurable: true,
  });
}

export default {
  Property: {
    logger
  },
  Method: {

  },
};


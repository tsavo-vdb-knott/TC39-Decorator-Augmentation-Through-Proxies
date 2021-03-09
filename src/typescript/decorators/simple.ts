import "reflect-metadata";

//In typescript you only really get these two parameters on property decorators.
// Them Prototype and Property Key. The legacy babel implementation aims to do more for you in terms of property decoration parameters.
const logger =  (prototype, key) =>  {
  let type = Reflect.getMetadata("design:type", prototype, key);
  // return (prototype, key, descriptor) => {
    let { [key]: current } = prototype;
    console.log(prototype, key)
    Object.defineProperty(prototype, key, {
      get: () => (console.log(`Getting Property: ${key}`), current),
      set: next => (console.log(`Updating Property: ${current} => ${next}...`), current = next),
      enumerable: true,
      configurable: true,
    });
    // return descriptor;
  // };
}

export const Property = {
  logger
};


export const Method = {
};

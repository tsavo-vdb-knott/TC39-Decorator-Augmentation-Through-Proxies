import * as Patch from '../patch/index'

/**
 * 
 * LEGACY PROPERTY DECORATOR 
 * 
 * A simple Legacy Logger Decorator, fundamentally can be a function exported as a const,
 * an anonymous arrow function also exported as a const, or an named exported function.
 * 
 * For say a property decorator the legacy spec defines the an object configuration 
 * with Object.defineProperty(proto, name, descriptor); 
 * 
 * @param {Object} prototype - In Loose Mode - Used with Babel Legacy Decorators, this is effectively Object prototype with a Constructor.
 * This type can be used to determine if the consumer of this decorator is using a legacy API or the TC39 API
 * @param {string | Symbol} key - The string representation of the key - sometimes this is helpful to have as a Symbol 
 * this can prevent descendant classes with the same property key from accessing/overriding superclass metadata
 * Also observed as being useful for key based caching purposes at runtime
 * @param { PropertyDescriptor & ThisType<any> | { get() { }; set(value) { }; enumerable: boolean; configurable: boolean; writable: boolean; value: number | object | function | any; } } descriptor - Effectively defines the configuration of the property that you are about to assign to the incoming prototype 
 * @returns {void} The EXTRA Legacy Decorator Doesn't Return, it simply assigns in place through with Object.defineProperty(...) however, I believe that the @babel/plugin-proposal-decorators, with legacy: true is actually broken and does not work on properties without the middleman PathPropertyDecorator which returns a PropertyDescriptor Object 
 * 
 * Legacy implements a  _initializerDefineProperty(this, "hello", _descriptor, this);
 * 
 * !! Noted: Object.defineProperty(...) does not have an initializer 
 * 
 */
const Logger = Patch.Property((prototype, key) => {
  let { [key]: current } = prototype;
  // When extended, prototype is now actually Base and the target is the extending class Base2
  // Babel provides an initializer with the legacy spec which also lets us target the Instance of the prototype at initialization aka when new Base2 is called, it requires a scope bound function for this to be accurate.
  Object.defineProperty(prototype, key, {
    get: _ => (console.log(`Getting Property: ${key}`), current),
    set: next => (console.log(`Updating Property: ${current} => ${next}...`), current = next),
    enumerable: true,
    configurable: true,
  });
})

export const Property = {
  Logger
}


export const Method = {
}


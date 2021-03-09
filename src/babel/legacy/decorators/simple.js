// const initializer = function (init) { console.log("INIT", this, init) }

/**
 * A simple Legacy Logger Decorator, fundamentally can be a function exported as a const,
 * an anonymous arrow function also exported as a const, or an named exported function.
 * @param {number} a - this is a 1st number value.
 * @param {number} b - this is a 2nd number value.
 * @returns {void} Legacy Decorator Doesn't Return 
 * For say a property decorator the legacy spec defines the an object configuration 
 * with Object.defineProperty(proto, name, descriptor); 
 */
export const logger = function () {
  console.log(arguments);
  // return { ...target };
}



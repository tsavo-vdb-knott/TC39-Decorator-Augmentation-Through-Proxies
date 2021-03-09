

// const initializer = function (init) { console.log("INIT", this, init) }

/**
 * 
 * TC39 PROPERTY DECORATOR 
 * 
 * A simple Legacy Logger Decorator, fundamentally can be a function exported as a const,
 * an anonymous arrow function also exported as a const, or an named exported function.
 * 
 * For say a property decorator the legacy spec defines the an object configuration 
 * with Object.defineProperty(proto, name, descriptor); 
 * 
 * @param {Descriptor} descriptor - In Loose Mode - Used with Babel Legacy Decorators, this is effectively an object with a Constructor function returning a Class
 * @returns {void} Legacy Decorator Doesn't Return, it simply assigns in place through with Object.defineProperty(...)
 * 
 */
 const logger = function (descriptor) {
  console.log(descriptor);
	return descriptor;
}

export const Property = {
  logger
};


export const Method = {
};


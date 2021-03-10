import * as Simple from './decorators/simple';
const Decorators = {
	TC39: {
		Simple,
	}
};

// Base Class Declaration 
class Base {

	// Simple TC39 Decorator without parameters
	@Decorators.TC39.Simple.Property.Logger
	hello;

};

const base = new Base();
console.log(base);


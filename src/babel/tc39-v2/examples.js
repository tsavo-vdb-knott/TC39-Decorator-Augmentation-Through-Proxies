import * as Simple from './decorators/simple';
import * as Parameters from './decorators/parameters';

const Decorators = {
	TC39: {
		Simple,
		Parameters
	}
};

// Base Class Declaration 
class Base {

	// Simple TC39 Decorator without parameters
	@Decorators.TC39.Simple.Property.logger
	hello;

};

const base = new Base();

console.log(base, Object.getOwnPropertyDescriptor(base, 'hello'), "anything")


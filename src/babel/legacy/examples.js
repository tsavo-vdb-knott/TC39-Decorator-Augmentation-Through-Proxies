
import * as Simple from './decorators/simple';
import * as Parameters from './decorators/parameters';

const Decorators = {
	Legacy: {
		Simple,
		Parameters
	}
};

// Base Class Declaration 
class Base {

	// Simple Legacy Decorator without parameters
	@Decorators.Legacy.Simple.logger
	hello = "world";

	constructor() {
		console.log(this.hello)
	}

};

const base = new Base();
console.log(base)


import * as Simple from './decorators/simple';
import * as Parameters from './decorators/parameters';

const Decorators = {
	Legacy: {
		Simple,
		Parameters
	}
};


// Base Class Declaration 
class LegacyPropertyExample {

	// Simple Legacy Decorator without parameters
	@Decorators.Legacy.Simple.Property.logger
	hello = "world";

};

class DescendantLegacyPropertyExample extends LegacyPropertyExample {
	/** 
	 * 
	 * Noted: 
	 * 1. If we don't declare hello - Object.getOwnPropertyDescriptor(base, 'hello') will return undefined, thus we must use Object.getOwnPropertyDescriptor(base.__proto__, 'hello')
	 * 2. If we declare hello - it will not inherit the default value from the Base Class (Often times in typescript we want to override a property to update strong type but still ensure it's default value from base)
	 * 3. If we declare it with a Decorator and a Property, it will execute the decorator twice, including the initializer from babel, this is perhaps not what we want at scale
	 * 
	 */
	 @Decorators.Legacy.Simple.Property.logger
	hello;

};

const legacy = new DescendantLegacyPropertyExample();

console.log(legacy);
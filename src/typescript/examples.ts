import * as Simple from './decorators/simple';

const Decorators = {
	Typescript: {
		Simple,
	}
};

// Base Class Declaration 
class Base {

	// Simple TC39 Decorator without parameters
  //@ts-ignore
	@Decorators.Typescript.Simple.Property.logger
	hello = 'hello';

};

class DescendantLegacyPropertyExample extends Base {
	/** 
	 * 
	 * Noted: 
	 * 1. If we don't declare hello - Object.getOwnPropertyDescriptor(base, 'hello') will return undefined, thus we must use Object.getOwnPropertyDescriptor(base.__proto__, 'hello')
	 * 2. If we declare hello - it will not inherit the default value from the Base Class (Often times in typescript we want to override a property to update strong type but still ensure it's default value from base)
	 * 3. If we declare it with a Decorator and a Property, it will execute the decorator twice, including the initializer from babel, this is perhaps not what we want at scale
	 * 
	 */
    //@ts-ignore
	 @Decorators.Typescript.Simple.Property.logger
	hello;

};

const base = new DescendantLegacyPropertyExample();

console.log(base, Object.getOwnPropertyDescriptor(base, 'hello'), "anything")


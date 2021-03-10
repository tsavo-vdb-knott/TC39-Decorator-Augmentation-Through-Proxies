import type { PropertyDecorator } from './decorators/simple';
import type { PropertyDecoratorFactory } from './decorators/factory';

import Simple from './decorators/simple';
import Factory from './decorators/factory';
import { Demo } from './utils';

const Decorators = {
	Typescript: {
		Simple,
		Factory
	}
};

// Base Class Definition 
class TypescriptPropertyExample {

	static Demo = (key: PropertyKey) => Demo<TypescriptPropertyExample>(TypescriptPropertyExample, key);

	/**
	 * 
	 * 
	 * @description A logger property Decorator (No Parameters)
	 * @property {string} hello
	 * @type {string}
	 * @default "hello"
	 * @memberof TypescriptPropertyExample
	 * 
	 * 
	 * Loosely Typed Version: @Decorators.Typescript.Factory.Property.logger
	 */
	@(Decorators.Typescript.Simple.Property.logger as PropertyDecorator<TypescriptPropertyExample>)
	public hello: string = 'hello';


	/**
	 * 
	 * @description A logger property Decorator Factory that accepts options
	 * @property {string} world
	 * @type {string}
	 * @default "world"
	 * @memberof TypescriptPropertyExample
	 * 
	 * Loosely Typed Version: @Decorators.Typescript.Factory.Property.logger()
	 */
	@(Decorators.Typescript.Factory.Property.logger as PropertyDecoratorFactory<{ writeable: boolean }, TypescriptPropertyExample>)()
	public world: string = 'world';

};

class DescendantTypescriptPropertyExample extends TypescriptPropertyExample {
	static Demo = (key: PropertyKey) => Demo<DescendantTypescriptPropertyExample>(DescendantTypescriptPropertyExample, key);

	/** 
	 * 
	 * Noted: 
	 * 1. If we don't declare hello - Object.getOwnPropertyDescriptor(base, 'hello') will return undefined, thus we must use Object.getOwnPropertyDescriptor(base.__proto__, 'hello')
	 * 2. If we declare hello - it will not inherit the default value from the Base Class (Often times in typescript we want to override a property to update strong type but still ensure it's default value from base)
	 * 3. If we declare it with a Decorator and a Property, it will execute the decorator twice, including the initializer from babel, this is perhaps not what we want at scale
	 * 
	 */
	//  @Decorators.Typescript.Simple.Property.logger
	// public hello!: string ="world";
};


TypescriptPropertyExample.Demo('hello');
DescendantTypescriptPropertyExample.Demo('world');


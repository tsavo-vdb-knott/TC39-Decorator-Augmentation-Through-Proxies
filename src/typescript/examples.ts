import type { ClassDecorator, PropertyDecorator } from './decorators/simple';
import type { PropertyDecoratorFactory } from './decorators/factory';

import Simple from './decorators/simple';
import Factory from './decorators/factory';
import { DemoClass, DemoProperty } from './utils';

const Decorators = {
	Typescript: {
		Simple,
		Factory
	}
};

// Base Class Definition 
// @(Decorators.Typescript.Simple.Class.Prototype.Demo as ClassDecorator<TypescriptPropertyExample>)
class TypescriptPropertyExample {

	static DemoClass = () => DemoClass<TypescriptPropertyExample>(TypescriptPropertyExample);

	static DemoProperty = (key: PropertyKey) => DemoProperty<TypescriptPropertyExample>(TypescriptPropertyExample, key);

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
	@(Decorators.Typescript.Simple.Property.Logger as PropertyDecorator<TypescriptPropertyExample>)
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
	@(Decorators.Typescript.Factory.Property.Logger as PropertyDecoratorFactory<{ writeable: boolean }, TypescriptPropertyExample>)()
	public world: string = 'world';

};

// @(Decorators.Typescript.Simple.Class.Prototype.Demo as ClassDecorator<DescendantTypescriptPropertyExample>)
class DescendantTypescriptPropertyExample extends TypescriptPropertyExample {

	static DemoClass = () => DemoClass<DescendantTypescriptPropertyExample>(DescendantTypescriptPropertyExample);

	static DemoProperty = (key: PropertyKey) => DemoProperty<DescendantTypescriptPropertyExample>(DescendantTypescriptPropertyExample, key);

	/** 
	 * 
	 * Noted: 
	 * 1. If we don't declare hello - Object.getOwnPropertyDescriptor(base, 'hello') will return undefined, thus we must use Object.getOwnPropertyDescriptor(base.__proto__, 'hello')
	 * 2. If we declare hello - it will not inherit the default value from the Base Class (Often times in typescript we want to override a property to update strong type but still ensure it's default value from base)
	 * !! 3. If we declare it with a Decorator and a Property, it will execute the decorator TWICE, this is perhaps not what we want at runtime
	 * 
	 */
	@(Decorators.Typescript.Simple.Property.Logger as PropertyDecorator<TypescriptPropertyExample>)
	public hello: string = "hello 2";

	@(Decorators.Typescript.Factory.Property.Logger as PropertyDecoratorFactory<{ writeable: boolean }, TypescriptPropertyExample>)()
	public world: string = 'world 2';
};

// 1. Call Demo w/o Class Decorator
TypescriptPropertyExample.DemoProperty('world');
DescendantTypescriptPropertyExample.DemoProperty('world');

// 2. Add the Decorators to the classes and see the static property access, internally calling DemoClass


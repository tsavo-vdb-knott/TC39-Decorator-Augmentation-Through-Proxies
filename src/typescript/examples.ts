import { DemoClass, DemoProperty } from './utils';

import type { ClassDecorator, PropertyDecorator } from './decorators/simple';
import type { ClassDecoratorFactory, PropertyDecoratorFactory } from './decorators/factory';

import Simple from './decorators/simple';
import Factory from './decorators/factory';

const Decorators = {
	Typescript: {
		Simple,
		Factory
	}
};

// Base Class Definition 
@(Decorators.Typescript.Simple.Class.Prototype.Demo as ClassDecorator<Example>)
// @(Decorators.Typescript.Factory.Class.Prototype.Demo as ClassDecoratorFactory<{ property: string }, Example>)({ property: 'world' })
class Example {

	static DemoClass = () => DemoClass<Example>(Example);

	static DemoProperty = (key: PropertyKey) => DemoProperty<Example>(Example, key);

	/**
	 * 
	 * 
	 * @description A logger property Decorator (No Parameters)
	 * @property {string} hello
	 * @type {string}
	 * @default "hello"
	 * @memberof Example
	 * 
	 * 
	 * Loosely Typed Version: @Decorators.Typescript.Factory.Property.logger
	 */
	@(Decorators.Typescript.Simple.Property.Logger as PropertyDecorator<Example>)
	public hello: string = 'hello';

	/**
	 * 
	 * @description A logger property Decorator Factory that accepts options
	 * @property {string} world
	 * @type {string}
	 * @default "world"
	 * @memberof Example
	 * 
	 * Loosely Typed Version: @Decorators.Typescript.Factory.Property.logger()
	 */
	@(Decorators.Typescript.Factory.Property.Logger as PropertyDecoratorFactory<{ writeable: boolean }, Example>)()
	public world: string = 'world';

};

// @(Decorators.Typescript.Simple.Class.Prototype.Demo as ClassDecorator<DescendantExample>)
@(Decorators.Typescript.Factory.Class.Prototype.Demo as ClassDecoratorFactory<{ property: string }, DescendantExample>)({ property: 'world' })
class DescendantExample extends Example {

	static DemoClass = () => DemoClass<DescendantExample>(DescendantExample);

	static DemoProperty = (key: PropertyKey) => DemoProperty<DescendantExample>(DescendantExample, key);

	/** 
	 * 
	 * Noted: 
	 * 1. If we don't declare hello - Object.getOwnPropertyDescriptor(base, 'hello') will return undefined, thus we must use Object.getOwnPropertyDescriptor(base.__proto__, 'hello')
	 * 2. If we declare hello - it will not inherit the default value from the Base Class (Often times in typescript we want to override a property to update strong type but still ensure it's default value from base)
	 * !! 3. If we declare it with a Decorator and a Property, it will execute the decorator TWICE, this is perhaps not what we want at runtime
	 * 
	 */
	@(Decorators.Typescript.Simple.Property.Logger as PropertyDecorator<Example>)
	public hello: string = "hello 2";

	@(Decorators.Typescript.Factory.Property.Logger as PropertyDecoratorFactory<{ writeable: boolean }, Example>)()
	public world: string = 'world 2';
};

Example.DemoProperty('world');
DescendantExample.DemoProperty('world');


import { Constructor } from "../decorators/simple";
import echo from '../../output/echo';
import '../../output/custom-echo-styles';
const { log, bold, italic, spaced } = echo;

export type Class<T = any> = { constructor: Constructor<T> | Function, name?: string; };

// Very difficult to type this
export const DemoProperty = <T = unknown>(definition: Class<T>, key: PropertyKey) => {
  const instance: Class<T> = new (definition as Constructor<T>)();
  log("=========================== [ PROPERTY DECORATOR DEMO ] =======================================", spaced(" "), spaced(" "))
  log(italic("Constructor Name: "), bold(`${instance.constructor.name}`), spaced(" "));
  log(italic("OwnPropertyDescriptor: InstanceType<"), bold(`${instance.constructor.name}`), ">", bold(`['${String(key)}']`), ": ", spaced(" "), Object.getOwnPropertyDescriptor(instance, key), spaced(" "));
  log(italic("Class: InstanceType<"), bold(`${instance.constructor.name}`), ">: ", /*Force Line Wrap*/ spaced("                "), instance, spaced(" "),);
}

// Very difficult to type this
export const DemoClass = <T = unknown>(definition: Class<T>) => {
  log("=========================== [ CLASS DECORATOR DEMO ] ===========================================", spaced(" "), spaced(" "))
  log(italic("Class Name: "), bold(`${definition.name}`), spaced(" "));
  log(italic("Class: ConstructorType<"), bold(`${definition.constructor.name}`), ">: ", /*Force Line Wrap*/ spaced("                "), definition.constructor, spaced(" "),);
}
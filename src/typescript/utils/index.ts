import { Constructor } from "../decorators/simple";
import echo from '../../output/echo';
import '../../output/custom-echo-styles';
const { log, bold, italic, spaced } = echo;

export type Class<T = any> = { constructor: Constructor<T> | Function };

// Very difficult to type this
export const Demo = <T = unknown>(definition: Class<T>, key: PropertyKey): Class<T> => {
  const instance: Class<T> = new (definition as Constructor<T>)();
  log("============================================================================", spaced(" "), spaced(" "))
  log(italic("Constructor Name: "), bold(`${instance.constructor.name}`), spaced(" "));
  log(italic("OwnPropertyDescriptor: InstanceType<"), bold(`${instance.constructor.name}`), ">", bold(`['${String(key)}']`), ": ", spaced(" "), Object.getOwnPropertyDescriptor(instance, key), spaced(" "));
  log(italic("Class: InstanceType<"), bold(`${instance.constructor.name}`), ">: ", /*Force Line Wrap*/ spaced("                "), instance, spaced(" "),);
  return instance;
}
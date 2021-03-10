// https://github.com/elderapo/babel-7-property-decorator-issue/blob/fixPropertyDecorator-fix/src/index.ts
import echo from '../../../output/echo';
import '../../../output/custom-echo-styles';
const { log, bold, italic, spaced } = echo;


export function Property(decorator) {
  return (
    prototype,
    key,
    descriptor
  ) => {
    const { initializer } = descriptor;
    decorator(prototype, key, descriptor);

    const initialization = () => {
      log("============================================================================", spaced(" "), spaced(" "))
      log(italic("Initializing property from:"), bold(`${prototype.constructor.name}`), spaced(" "));
      return initializer.apply(arguments)
    }

    prototype[key] = initializer ? initialization() : undefined;
    return Object.getOwnPropertyDescriptor(prototype, key);
  };
}


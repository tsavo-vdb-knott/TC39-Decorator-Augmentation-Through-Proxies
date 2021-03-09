// https://github.com/elderapo/babel-7-property-decorator-issue/blob/fixPropertyDecorator-fix/src/index.ts

export function Property(decorator) {
  return (
    prototype,
    key,
    descriptor
  ) => {
    const { initializer } = descriptor;
    decorator(prototype, key, descriptor);

    const initialization = () => {
      console.log("Initializing property from: ", prototype.constructor.name);
      return initializer.apply(arguments)
    }

    prototype[key] = initializer ? initialization() : undefined;
    return Object.getOwnPropertyDescriptor(prototype, key);
  };
}


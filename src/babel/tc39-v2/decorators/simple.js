

// const initializer = function (init) { console.log("INIT", this, init) }

/**
 * 
 * TC39 PROPERTY DECORATOR 
 * https://github.com/tc39/proposal-decorators
 *  
 * 
 */
 export function Logger (prototype, { kind, name }) {
  if (kind === "prop") {
    let { get, set } = prototype;

    return {
      get() {
        // Middleware
        return get.call(this);
      },

      set(val) {
        return set.call(this, val);
      },

      initialize(initial) {
        console.log(`initializing ${name} with value ${initial}`);
        return initial;
      }
    };
  }
}

export const Property = {
  Logger
};


export const Method = {
};


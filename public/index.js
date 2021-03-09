function _initializerDefineProperty(target, property, descriptor, context) {
  if (!descriptor) return;
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object.keys(descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object.defineProperty(target, property, desc);
    desc = null;
  }

  return desc;
}

// https://github.com/elderapo/babel-7-property-decorator-issue/blob/fixPropertyDecorator-fix/src/index.ts
function Property$1(decorator) {
  return (prototype, key, descriptor) => {
    const {
      initializer
    } = descriptor;
    decorator(prototype, key, descriptor);

    const initialization = () => {
      console.log("Initializing property from: ", prototype.constructor.name);
      return initializer.apply(arguments);
    };

    prototype[key] = initializer ? initialization() : undefined;
    return Object.getOwnPropertyDescriptor(prototype, key);
  };
}

/**
 * 
 * LEGACY PROPERTY DECORATOR 
 * 
 * A simple Legacy Logger Decorator, fundamentally can be a function exported as a const,
 * an anonymous arrow function also exported as a const, or an named exported function.
 * 
 * For say a property decorator the legacy spec defines the an object configuration 
 * with Object.defineProperty(proto, name, descriptor); 
 * 
 * @param {Object} prototype - In Loose Mode - Used with Babel Legacy Decorators, this is effectively Object prototype with a Constructor.
 * This type can be used to determine if the consumer of this decorator is using a legacy API or the TC39 API
 * @param {string | Symbol} key - The string representation of the key - sometimes this is helpful to have as a Symbol 
 * this can prevent descendant classes with the same property key from accessing/overriding superclass metadata
 * Also observed as being useful for key based caching purposes at runtime
 * @param { PropertyDescriptor & ThisType<any> | { get() { }; set(value) { }; enumerable: boolean; configurable: boolean; writable: boolean; value: number | object | function | any; } } descriptor - Effectively defines the configuration of the property that you are about to assign to the incoming prototype 
 * @returns {void} The EXTRA Legacy Decorator Doesn't Return, it simply assigns in place through with Object.defineProperty(...) however, I believe that the @babel/plugin-proposal-decorators, with legacy: true is actually broken and does not work on properties without the middleman PathPropertyDecorator which returns a PropertyDescriptor Object 
 * 
 * Legacy implements a  _initializerDefineProperty(this, "hello", _descriptor, this);
 * 
 * !! Noted: Object.defineProperty(...) does not have an initializer 
 * 
 */

const logger = (prototype, key, descriptor) => {
  let {
    [key]: current
  } = prototype; // When extended, prototype is now actually Base and the target is the extending class Base2
  // Babel provides an initializer with the legacy spec which also lets us target the Instance of the prototype at initialization aka when new Base2 is called, it requires a scope bound function for this to be accurate.

  Object.defineProperty(prototype, key, {
    get: _ => (console.log(`Getting Property: ${key}`), current),
    set: next => (console.log(`Updating Property: ${current} => ${next}...`), current = next),
    enumerable: true,
    configurable: true
  });
};

const Property = {
  logger: Property$1(logger)
};
const Method = {};

var Simple = /*#__PURE__*/Object.freeze({
  __proto__: null,
  Property: Property,
  Method: Method
});

var Parameters = /*#__PURE__*/Object.freeze({
  __proto__: null
});

var _dec, _class, _descriptor, _temp, _dec2, _class3, _descriptor2, _temp2;
const Decorators = {
  Legacy: {
    Simple,
    Parameters
  }
}; // Base Class Declaration 

let LegacyPropertyExample = (_dec = Decorators.Legacy.Simple.Property.logger, (_class = (_temp = class LegacyPropertyExample {
  constructor() {
    _initializerDefineProperty(this, "hello", _descriptor, this);
  }

}, _temp), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "hello", [_dec], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return "world";
  }
})), _class));
let DescendantLegacyPropertyExample = (_dec2 = Decorators.Legacy.Simple.Property.logger, (_class3 = (_temp2 = class DescendantLegacyPropertyExample extends LegacyPropertyExample {
  constructor(...args) {
    super(...args);

    _initializerDefineProperty(this, "hello", _descriptor2, this);
  }

}, _temp2), (_descriptor2 = _applyDecoratedDescriptor(_class3.prototype, "hello", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class3));
const legacy = new DescendantLegacyPropertyExample();
console.log(legacy);
//# sourceMappingURL=index.js.map

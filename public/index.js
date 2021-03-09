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

// const initializer = function (init) { console.log("INIT", this, init) }

/**
 * A simple Legacy Logger Decorator, fundamentally can be a function exported as a const,
 * an anonymous arrow function also exported as a const, or an named exported function.
 * @param {number} a - this is a 1st number value.
 * @param {number} b - this is a 2nd number value.
 * @returns {void} Legacy Decorator Doesn't Return 
 * For say a property decorator the legacy spec defines the an object configuration 
 * with Object.defineProperty(proto, name, descriptor); 
 */
const logger = function () {
  console.log(arguments); // return { ...target };
};

var Simple = /*#__PURE__*/Object.freeze({
  __proto__: null,
  logger: logger
});

var Parameters = /*#__PURE__*/Object.freeze({
  __proto__: null
});

var _dec, _class, _descriptor, _temp;
const Decorators = {
  Legacy: {
    Simple,
    Parameters
  }
}; // Base Class Declaration 

let Base = (_dec = Decorators.Legacy.Simple.logger, (_class = (_temp = class Base {
  // Simple Legacy Decorator without parameters
  constructor() {
    _initializerDefineProperty(this, "hello", _descriptor, this);

    console.log(this.hello);
  }

}, _temp), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "hello", [_dec], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return "world";
  }
})), _class));
const base = new Base();
console.log(base);
//# sourceMappingURL=index.js.map

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.define = define;
function define(name, ctor) {
  var ins = new ctor();
  var config = {
    properties: {},
    methods: {}
  };
  Object.keys(ins).forEach(function (key) {
    if (typeof ins[key] === 'function') {
      config.methods[key] = ins[key];
    } else {
      config[key] = ins[key];
    }
  });

  config.created = function () {
    var _this = this;

    ins.$scope = this;
    config.$$refs.forEach(function (ref) {
      if (ref.type === 'component') {
        if (ref.fn) {
          ref.fn(_this.selectComponent('#' + ref.id));
        } else {
          ins[ref.refName] = _this.selectComponent('#' + ref.id);
        }
      }
    });
    ins.props = this.properties;
  };

  config.properties = ctor.properties;

  Object.keys(ctor.properties).forEach(function (key) {
    ctor.properties[key].observer = function (newVal, oldVal, changedPath) {
      ins.props[key] = newVal;
      ins.update();
    };
  });

  config.attached = function () {
    ins.props = this.properties;
    ins.install.call(ins);
    ins.update();
  };

  config.moved = function () {};

  config.ready = function () {
    ins.installed();
  };

  config.detached = function () {
    ins.uninstall();
  };

  Component(config);
}
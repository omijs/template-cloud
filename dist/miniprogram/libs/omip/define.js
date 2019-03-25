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

    ins._weappRef = this;
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
      ins.beforeRender && ins.beforeRender.call(ins);
      ins._createData();
      //自定过滤 undefined
      this.setData(JSON.parse(JSON.stringify(ins.data)));
    };
  });

  config.attached = function () {
    ins.props = this.properties;
    ins.install.call(ins);
    ins.beforeRender && ins.beforeRender.call(ins);
    ins._createData();
    this.setData(ins.data);
  };

  config.moved = function () {};

  config.ready = function () {
    ins.installed();
  };

  config.detached = function () {
    ins.uninstall();
  };

  config.data = ins._createData();

  Component(config);
}
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defineApp = exports.definePage = exports.h = exports.render = exports.WeElement = exports.Component = exports.define = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _h = require("./h.js");

var _define = require("./define.js");

var _updateData = require("./update-data.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Component = function () {
  function Component() {
    _classCallCheck(this, Component);

    this.data = {};
  }

  _createClass(Component, [{
    key: "update",
    value: function update(patch, callback) {
      var _this = this;

      try {
        this._createData();
      } catch (e) {
        console.log(e);
      }

      this.beforeUpdate && this.beforeUpdate();
      this.beforeRender && this.beforeRender();

      if (arguments.length === 0) {
        this._weappRef.setData(this.data);
      } else if (arguments.length === 1) {
        if (typeof patch === 'function') {
          this._weappRef.setData(this.data, patch);
        } else {
          this.data = this.data || {};
          Object.keys(patch).forEach(function (path) {
            (0, _updateData.updateData)(_this.data, path, patch[path]);
          });
          this._weappRef.setData(this.data);
        }
      } else {
        this.data = this.data || {};
        Object.keys(patch).forEach(function (path) {
          (0, _updateData.updateData)(_this.data, path, patch[path]);
        });
        this._weappRef.setData(this.data, callback);
      }
      this.updated && this.updated();
    }
  }, {
    key: "install",
    value: function install() {}
  }, {
    key: "installed",
    value: function installed() {}
  }, {
    key: "uninstall",
    value: function uninstall() {}
  }, {
    key: "fire",
    value: function fire(type, data) {
      this._weappRef.triggerEvent(type, data);
    }
  }]);

  return Component;
}();

var WeElement = Component;

function getGlobal() {
  if ((typeof global === "undefined" ? "undefined" : _typeof(global)) !== 'object' || !global || global.Math !== Math || global.Array !== Array) {
    return self || window || global || function () {
      return this;
    }();
  }
  return global;
}

var root = getGlobal();
var mapping = {};

var definePage = function definePage(name, ctor, path) {
  mapping[path] = {
    name: name,
    ctor: ctor
  };
};
var defineApp = function defineApp(name, ctor) {
  var ins = new ctor();
  var config = {};
  config.globalData = ins.globalData;
  config.onLaunch = function () {
    ins.install && ins.install.call(this);
  };

  config.onShow = function () {
    ins.onShow && ins.onShow();
  };

  config.onHide = function () {
    ins.onHide && ins.onHide();
  };

  App(config);
};

function render() {}

root.Omi = {
  define: _define.define,
  Component: Component,
  WeElement: WeElement,
  render: render,
  h: _h.h,
  definePage: definePage,
  defineApp: defineApp

};
root.omi = root.Omi;
root.omix = root.Omi;
root.Omix = root.Omi;
root.create = {
  Page: function (_Page) {
    function Page(_x) {
      return _Page.apply(this, arguments);
    }

    Page.toString = function () {
      return _Page.toString();
    };

    return Page;
  }(function (options) {
    var ins = new options.ctor();
    var config = {};
    Object.keys(ins).forEach(function (key) {
      config[key] = ins[key];
    });

    config.onLoad = function (options) {
      var _this2 = this;

      ins._weappRef = this;
      config.$$refs.forEach(function (ref) {
        if (ref.type === 'component') {
          if (ref.fn) {
            ref.fn(_this2.selectComponent('#' + ref.id));
          } else {
            ins[ref.refName] = _this2.selectComponent('#' + ref.id);
          }
        }
      });
      ins.install(options);
      ins.beforeRender && ins.beforeRender();
    };

    config.onReady = function () {
      ins.installed();
    };

    config.onUnload = function () {
      ins.uninstall();
    };

    config.onShow = function () {
      ins.onShow && ins.onShow();
    };

    config.onHide = function () {
      ins.onHide && ins.onHide();
    };

    if (ins.onReachBottom) {
      config.onReachBottom = ins.onReachBottom.bind(ins);
    }

    if (ins.onPullDownRefresh) {
      config.onPullDownRefresh = ins.onPullDownRefresh.bind(ins);
    }

    if (ins.onPageScroll) {
      config.onPageScroll = ins.onPageScroll.bind(ins);
    }

    if (ins.onShareAppMessage) {
      config.onShareAppMessage = ins.onShareAppMessage.bind(ins);
    }

    if (ins.onResize) {
      config.onResize = ins.onResize.bind(ins);
    }

    if (ins.onTabItemTap) {
      config.onTabItemTap = ins.onTabItemTap.bind(ins);
    }

    ins._createData();

    Page(config);
  })
};

root.getOptions = function (path) {
  return mapping[path];
};

exports.define = _define.define;
exports.Component = Component;
exports.WeElement = WeElement;
exports.render = render;
exports.h = _h.h;
exports.definePage = definePage;
exports.defineApp = defineApp;
exports.default = {
  define: _define.define,
  Component: Component,
  WeElement: WeElement,
  render: render,
  h: _h.h,
  definePage: definePage,
  defineApp: defineApp
};
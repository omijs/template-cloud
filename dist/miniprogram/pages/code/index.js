"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _class, _temp2;

var _index = require("../../libs/taro/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../../libs/omip/index.js");

var _prism = require("../../libs/prism.js");

var _prism2 = _interopRequireDefault(_prism);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

global.Omi.definePage('page-about', (_temp2 = _class = function (_WeElement) {
  _inherits(_TaroComponentClass, _WeElement);

  function _TaroComponentClass() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, _TaroComponentClass);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = _TaroComponentClass.__proto__ || Object.getPrototypeOf(_TaroComponentClass)).call.apply(_ref, [this].concat(args))), _this), _this.$usedState = ["tks"], _this.config = {
      navigationBarBackgroundColor: '#24292e',
      navigationBarTextStyle: 'white',
      navigationBarTitleText: ' ',
      backgroundColor: '#eeeeee',
      backgroundTextStyle: 'light'
    }, _this.$$refs = [], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(_TaroComponentClass, [{
    key: "_constructor",
    value: function _constructor(props) {
      _get(_TaroComponentClass.prototype.__proto__ || Object.getPrototypeOf(_TaroComponentClass.prototype), "_constructor", this).call(this, props);
    }
  }, {
    key: "install",
    value: function install(options) {
      var tks = _prism2.default.tokens("import { render, WeElement, define } from 'omi'\n\ndefine('my-counter', class extends WeElement {\n  data = {\n    count: 1\n  }\n\n  static css = `\n    span{\n        color: red;\n    }`\n\n  sub = () => {\n    this.data.count--\n    this.update()\n  }\n\n  add = () => {\n    this.data.count++\n    this.update()\n  }\n\n  render() {\n    return (\n      <div>\n        <button onClick={this.sub}>-</button>\n        <span>{this.data.count}</span>\n        <button onClick={this.add}>+</button>\n      </div>\n    )\n  }\n})\n\nrender(<my-counter />, 'body')\n", _prism2.default.languages.jsx, 'jsx');
      console.log(tks);

      this.data.tks = tks;

      console.log(this.data.tks);
      this.data.tks.forEach(function (item) {
        console.log(item);
        //item.content = strcharacterDiscode(item.content)
      });
    }
  }, {
    key: "_createData",
    value: function _createData() {
      this.__state = arguments[0] || this.data || {};
      this.__props = arguments[1] || this.props || {};
      var __runloopRef = arguments[2];
      ;

      var tks = this.__state.tks;

      Object.assign(this.__state, {
        tks: tks
      });
      return this.__state;
    }
  }]);

  return _TaroComponentClass;
}(_index3.WeElement), _class.properties = {}, _class.$$events = [], _temp2), "pages/code/index");
global.create.Page(global.getOptions('pages/code/index'));
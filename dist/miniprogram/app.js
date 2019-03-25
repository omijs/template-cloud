"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _index = require("./libs/taro/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("./libs/omip/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

global.Omi.defineApp('my-app', function (_WeElement) {
  _inherits(_TaroComponentClass, _WeElement);

  function _TaroComponentClass() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, _TaroComponentClass);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = _TaroComponentClass.__proto__ || Object.getPrototypeOf(_TaroComponentClass)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      pages: ['pages/list/index', 'pages/detail/index', 'pages/import/index', 'pages/index/index', 'pages/about/index'],
      window: {
        backgroundTextStyle: 'light',
        navigationBarBackgroundColor: '#fff',
        navigationBarTitleText: 'Omi Cloud',
        navigationBarTextStyle: 'black'
      }
    }, _this.globalData = {
      userInfo: null
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(_TaroComponentClass, [{
    key: "install",
    value: function install() {
      var _this2 = this;

      // 展示本地存储能力
      var logs = wx.getStorageSync('logs') || [];
      logs.unshift(Date.now());
      wx.setStorageSync('logs', logs);

      // 登录
      wx.login({
        success: function success(res) {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
        }
      });
      // 获取用户信息
      wx.getSetting({
        success: function success(res) {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
            wx.getUserInfo({
              success: function success(res) {
                // 可以将 res 发送给后台解码出 unionId
                _this2.globalData.userInfo = res.userInfo;

                // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                // 所以此处加入 callback 以防止这种情况
                if (_this2.userInfoReadyCallback) {
                  _this2.userInfoReadyCallback(res);
                }
              }
            });
          }
        }
      });

      if (!wx.cloud) {
        console.error('请使用 2.2.3 或以上的基础库以使用云能力');
      } else {
        wx.cloud.init({
          traceUser: true
        });
        this.globalData.db = wx.cloud.database({
          env: 'test-06eb2e'
        });
      }
    }
  }, {
    key: "onShow",
    value: function onShow() {}
  }, {
    key: "onHide",
    value: function onHide() {}
  }, {
    key: "_createData",
    value: function _createData() {}
  }]);

  return _TaroComponentClass;
}(_index3.WeElement));

(0, _index3.render)(global.Omi.h("my-app", null), '#app');
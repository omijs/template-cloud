"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _class, _temp2;

var _index = require("../../libs/taro/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../../libs/omip/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//获取应用实例
var app = getApp();

global.Omi.definePage('page-index', (_temp2 = _class = function (_WeElement) {
  _inherits(_TaroComponentClass, _WeElement);

  function _TaroComponentClass() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, _TaroComponentClass);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = _TaroComponentClass.__proto__ || Object.getPrototypeOf(_TaroComponentClass)).call.apply(_ref, [this].concat(args))), _this), _this.$usedState = ["anonymousState__temp", "inputText", "type", "todo", "left", "done"], _this.config = {
      navigationBarBackgroundColor: '#24292e',
      navigationBarTextStyle: 'white',
      navigationBarTitleText: ' ',
      backgroundColor: '#eeeeee',
      backgroundTextStyle: 'light'
    }, _this.data = {
      todo: [],
      inputText: '',
      left: 0,
      type: 'all',
      done: 0
    }, _this.textInput = function (evt) {
      _this.data.inputText = evt.detail.value;
    }, _this.toggle = function (evt) {
      for (var i = 0, len = _this.data.todo.length; i < len; i++) {
        var item = _this.data.todo[i];
        if (item._id === evt.target.dataset.id) {
          item.done = !item.done;
          _this.computeCount();
          _this.update();
          _this.updateDb(item._id, { done: item.done });
          break;
        }
      }
    }, _this.delete = function (evt) {
      for (var i = 0, len = _this.data.todo.length; i < len; i++) {
        var item = _this.data.todo[i];
        if (item._id === evt.target.dataset.id) {
          _this.data.todo.splice(i, 1);
          _this.computeCount();
          _this.update();
          _this.removeDb(item._id);
          break;
        }
      }
    }, _this.newTodo = function () {

      if (_this.data.inputText.trim() === '') {
        wx.showToast({
          title: '内容不能为空',
          icon: 'none',
          duration: 2000
        });

        return;
      }

      wx.showLoading({
        title: '添加中'
      });
      app.globalData.db.collection('todo').add({
        // data 字段表示需新增的 JSON 数据
        data: {
          // _id: 'todo-identifiant-aleatoire', // 可选自定义 _id，在此处场景下用数据库自动分配的就可以了
          text: _this.data.inputText,
          done: false,
          createTime: app.globalData.db.serverDate()
        },
        success: function success(res) {
          // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
          console.log(res);
          _this.data.inputText = '';
          _this.query();
        },
        fail: function fail(err) {
          wx.hideLoading();
        }
      });
    }, _this.installed = function () {
      wx.showLoading({
        title: '加载中'
      });
      _this.query();
    }, _this.filter = function (evt) {
      _this.data.type = evt.detail;
      _this.update();
    }, _this.clear = function (evt) {
      wx.showModal({
        title: '提示',
        content: '确定清空已完成任务？',
        success: function success(res) {
          if (res.confirm) {
            for (var i = 0, len = _this.data.todo.length; i < len; i++) {
              var item = _this.data.todo[i];
              if (item.done) {
                _this.data.todo.splice(i, 1);
                len--;
                i--;
                _this.removeDb(item._id);
              }
            }
            _this.data.done = 0;
            _this.update();

            wx.cloud.callFunction({
              // 云函数名称
              name: 'remove',
              success: function success(res) {
                console.log(res.result.sum); // 3
              },

              fail: console.error
            });
          } else if (res.cancel) {
            console.log('用户点击取消');
          }
        }
      });
    }, _this.gotoAbout = function () {
      wx.navigateTo({
        url: '../about/index'
      });
    }, _this.$$refs = [], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(_TaroComponentClass, [{
    key: "_constructor",
    value: function _constructor(props) {
      _get(_TaroComponentClass.prototype.__proto__ || Object.getPrototypeOf(_TaroComponentClass.prototype), "_constructor", this).call(this, props);
    }
  }, {
    key: "computeCount",
    value: function computeCount() {
      this.data.left = 0;
      this.data.done = 0;
      for (var i = 0, len = this.data.todo.length; i < len; i++) {
        this.data.todo[i].done ? this.data.done++ : this.data.left++;
      }
    }
  }, {
    key: "updateDb",
    value: function updateDb(id, json) {
      app.globalData.db.collection('todo').doc(id).update({
        // data 传入需要局部更新的数据
        data: json,
        success: function success(res) {
          console.log(res);
        }
      });
    }
  }, {
    key: "removeDb",
    value: function removeDb(id) {
      app.globalData.db.collection('todo').doc(id).remove({
        success: function success(res) {
          console.log(res);
        }
      });
    }
  }, {
    key: "query",
    value: function query() {
      var _this2 = this;

      // 调用云函数
      wx.cloud.callFunction({
        name: 'login',
        data: {},
        success: function success(res) {
          console.log('[云函数] [login] user openid: ', res.result.openid);
          app.globalData.openid = res.result.openid;
          app.globalData.db.collection('todo').where({
            _openid: app.globalData.openid
            //done: false
          }).get({
            success: function success(res) {
              // res.data 是包含以上定义的两条记录的数组
              res.data.sort(function (a, b) {
                return b.createTime - a.createTime;
              });
              _this2.data.todo = res.data;
              _this2.computeCount();
              _this2.update();
              wx.hideLoading();
            }
          });
        },
        fail: function fail(err) {
          console.error('[云函数] [login] 调用失败', err);
          wx.hideLoading();
        }
      });
    }
  }, {
    key: "_createData",
    value: function _createData() {
      this.__state = arguments[0] || this.data || {};
      this.__props = arguments[1] || this.props || {};
      var __runloopRef = arguments[2];
      ;

      var _state = this.__state,
          inputText = _state.inputText,
          todo = _state.todo,
          left = _state.left,
          type = _state.type,
          done = _state.done;

      var anonymousState__temp = "/pages/index/github-logo.png";
      Object.assign(this.__state, {
        anonymousState__temp: anonymousState__temp
      });
      return this.__state;
    }
  }]);

  return _TaroComponentClass;
}(_index3.WeElement), _class.properties = {}, _class.$$events = ["filter", "clear"], _temp2), "pages/index/index");
global.create.Page(global.getOptions('pages/index/index'));
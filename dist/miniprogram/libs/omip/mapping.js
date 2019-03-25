'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapping = mapping;
var map = {
  'view': 'div',
  'text': 'span'
};

function mapping(name) {

  return map[name] || name;
}
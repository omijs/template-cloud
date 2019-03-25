'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateData = updateData;
function updateData(origin, path, value) {
  var arr = path.replace(/]/g, '').replace(/\[/g, '.').split('.');
  var current = origin;
  for (var i = 0, len = arr.length; i < len; i++) {
    if (i === len - 1) {
      current[arr[i]] = value;
    } else {
      current = current[arr[i]];
    }
  }
}
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var host = 'http://120.76.247.5:2001';

var instance = _axios["default"].create({
  // baseURL: 基础路径
  baseURL: host + '/api'
}); //判断host的具体类型


instance.host = host; //interceptors拦截器进行数据类型校验或者条件添加

instance.interceptors.request.use(function (config) {
  // Do something before request is sent
  var userInfo = localStorage.getItem('userInfo');

  try {
    userInfo = JSON.parse(userInfo) || {};
  } catch (err) {
    userInfo = {};
  }

  if (userInfo.Authorization) {
    config.headers.Authorization = userInfo.Authorization;
  }

  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});
var _default = instance;
exports["default"] = _default;
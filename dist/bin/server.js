'use strict';

var _index = require('../config/index');

var _index2 = _interopRequireDefault(_index);

var _index3 = require('../routes/index');

var _index4 = _interopRequireDefault(_index3);

var _test = require('../routes/test');

var _test2 = _interopRequireDefault(_test);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var koa = require('koa');
var app = new koa();
var logger = require('koa-logger');
var favicon = require('koa-favicon');
var serve = require('koa-static');
var path = require('path');

// router

app.use(_index4.default.router.routes()).use(_index4.default.router.allowedMethods()).use(_test2.default.router.routes()).use(_test2.default.router.allowedMethods());

// static

app.use(serve(path.join(__dirname, '../assets')));

// logger

app.use(logger());

// favicon

app.use(favicon(path.join(__dirname, '../assets/favicon.ico')));

// listen

app.listen(process.env.PORT || _index2.default.port);
//# sourceMappingURL=server.js.map

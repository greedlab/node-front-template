'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _test = require('../controllers/test');

var controller = _interopRequireWildcard(_test);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by Bell on 16/6/16.
 */

var base_url = '/test';
var router = new _koaRouter2.default({ prefix: base_url });

router.get('/', function (ctx, next) {
    controller.index(ctx, next);
    return next();
}).post('/', function (ctx, next) {
    controller.index();
    return next();
});

exports.default = {
    baseUrl: base_url,
    router: router
};
//# sourceMappingURL=test.js.map

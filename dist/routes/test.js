'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _bluebird = require('bluebird');

var _test = require('../controllers/test');

var controller = _interopRequireWildcard(_test);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/**
 * Created by Bell on 16/6/16.
 */

var Router = require('koa-router');

var base_url = '/test';
var router = new Router({ prefix: base_url });

router.get('/', function () {
    var ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee(ctx, next) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return controller.index(ctx);

                    case 2:
                        return _context.abrupt('return', next());

                    case 3:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));
    return function (_x, _x2) {
        return ref.apply(this, arguments);
    };
}()).post('/', function () {
    var ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee2(ctx, next) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.next = 2;
                        return controller.index(ctx);

                    case 2:
                        return _context2.abrupt('return', next());

                    case 3:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined);
    }));
    return function (_x3, _x4) {
        return ref.apply(this, arguments);
    };
}());

exports.default = {
    baseUrl: base_url,
    router: router
};
//# sourceMappingURL=test.js.map

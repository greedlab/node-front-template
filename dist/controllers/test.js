'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.test = exports.index = undefined;

var _bluebird = require('bluebird');

var index = exports.index = function () {
    var ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee(ctx, next) {
        var url, option, response;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.prev = 0;
                        url = _github2.default.domain + '/repos/greedlab/node-front-template';
                        option = {
                            headers: {
                                'User-Agent': _github2.default.useragent,
                                'Accept': _github2.default.accept
                            }
                        };
                        _context.next = 5;
                        return request_method(url, option, ctx);

                    case 5:
                        response = _context.sent;

                        ctx.body = template(path.join(__dirname, '../views/test'), response);
                        return _context.abrupt('return', next());

                    case 10:
                        _context.prev = 10;
                        _context.t0 = _context['catch'](0);

                        console.log(_context.t0);

                    case 13:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this, [[0, 10]]);
    }));
    return function index(_x, _x2) {
        return ref.apply(this, arguments);
    };
}();

var test = exports.test = function () {
    var ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee2(ctx, next) {
        var url, option, response;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        url = _github2.default.domain + '/repos/greedlab/node-front-template';
                        option = {
                            headers: {
                                'User-Agent': _github2.default.useragent,
                                'Accept': _github2.default.accept
                            }
                        };
                        _context2.next = 4;
                        return request_method(url, option, ctx);

                    case 4:
                        response = _context2.sent;

                        ctx.body = response;

                    case 6:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, this);
    }));
    return function test(_x3, _x4) {
        return ref.apply(this, arguments);
    };
}();

var _github = require('../config/github');

var _github2 = _interopRequireDefault(_github);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by Bell on 16/6/16.
 */

var template = require('art-template');
var path = require('path');
var request = require('request');
var debug = require('debug')('node-front-template:controllers:test');

function request_method(uri, options) {
    var promise = new Promise(function (resolve, reject) {
        request(uri, options, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                resolve(body);
            } else {
                reject(error);
            }
        });
    });
    return promise;
}
//# sourceMappingURL=test.js.map

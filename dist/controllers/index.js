'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.index = undefined;

var _bluebird = require('bluebird');

var index = exports.index = function () {
    var ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee(ctx) {
        var data, html;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        data = {
                            title: 'Index',
                            content: 'Test',
                            url: 'test'
                        };
                        html = template(path.join(__dirname, '../views/index'), data);

                        ctx.body = html;

                    case 3:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));
    return function index(_x) {
        return ref.apply(this, arguments);
    };
}();

var template = require('art-template');
var path = require('path');
//# sourceMappingURL=index.js.map

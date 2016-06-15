'use strict';

/**
 * 主入口
 */

var koa = require('koa');
var app = new koa();
var koa_router = require('koa-router');
var router = new koa_router();
var logger = require('koa-logger');
var favicon = require('koa-favicon');
var serve = require('koa-static');

// router

router.get('/', function (ctx, next) {
    ctx.body = 'Hello World!';
    return next();
}).post('/', function (ctx, next) {
    ctx.body = 'Hello World!';
    return next();
}).get('/test', function (ctx, next) {
    ctx.body = 'Hello World!';
    return next();
});
app.use(router.routes()).use(router.allowedMethods());

// static

app.use(serve(__dirname + '/public'));

// logger

app.use(logger());

// favicon

app.use(favicon(__dirname + '/public/favicon.ico'));

// listen

app.listen(4000);
//# sourceMappingURL=app.js.map

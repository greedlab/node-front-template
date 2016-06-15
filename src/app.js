/**
 * 主入口
 */

const koa = require('koa');
const app = new koa();
const koa_router = require('koa-router');
const router = new koa_router();
const logger = require('koa-logger');
const favicon = require('koa-favicon');
const serve = require('koa-static');

// router

router
    .get('/', function (ctx, next) {
        ctx.body = 'Hello World!';
        return next();
    })
    .post('/', function (ctx, next) {
        ctx.body = 'Hello World!';
        return next();
    })
    .get('/test', function (ctx, next) {
        ctx.body = 'Hello World!';
        return next();
    });
app
    .use(router.routes())
    .use(router.allowedMethods());

// static

app.use(serve(__dirname + '/public'));

// logger

app.use(logger());

// favicon

app.use(favicon(__dirname + '/public/favicon.ico'));

// listen

app.listen(4000);

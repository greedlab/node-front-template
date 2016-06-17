/**
 * Created by Bell on 16/6/16.
 */

import Router from 'koa-router';
import * as controller from '../controllers/test';

let base_url = '/test';
let router = new Router({ prefix: base_url });

router
    .get('/', function (ctx, next) {
        controller.index(ctx, next);
        return next();
    })
    .post('/', function (ctx, next) {
        controller.index();
        return next();
    });

export default {
    baseUrl: base_url,
    router: router
};

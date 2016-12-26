/**
 * Created by Bell on 16/8/16.
 */

import Router from 'koa-router';

import * as book from '../controllers/book';
import * as user from '../controllers/user';

const base_url = '/';
const router = new Router();

router
    .get('/', book.list)
    .get('/login', user.login)
    .post('/login', user.loginRequest)
    .post('/logout', user.logout)
    .get('/register', user.register)
    .post('/register', user.registerRequest);

export default {
    baseUrl: base_url,
    router: router
};

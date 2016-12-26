/**
 * Created by Bell on 16/8/16.
 */

import template from 'art-template';
import path from 'path';
import url from 'url';
import Request from 'request';
import bluebird from 'bluebird';

import * as token from '../utils/token';
import * as string from '../utils/string';
import config from '../config';

import Debug from 'debug';
import pkg from '../../package.json';
const debug = new Debug(pkg.name);

const request = bluebird.promisifyAll(Request);

export async function login(ctx, next) {
    loginWithMessage(ctx,next,null);
}

export async function loginRequest(ctx, next) {
    debug(ctx.request.body);
    const username = ctx.request.body.username;
    if (!username || username.length == 0) {
        loginWithMessage(ctx,next,'username is empty');
        return;
    }
    const password = ctx.request.body.password;
    if (!password || password.length == 0) {
        loginWithMessage(ctx,next,'password is empty');
        return;
    }

    const options = {
        url: url.resolve(config.apiDomain, '/user/login'),
        json: true,
        body: {
            username: username,
            password: password
        }
    };
    const response = await request.postAsync(options);
    debug(response.statusCode);
    debug(response.body);
    if (response.statusCode == 200) {
        token.saveToken(ctx,response.body.token);
        ctx.redirect('/');
    } else {
        loginWithMessage(ctx,next,response.body || 'unvalid username or password');
    }
}

function loginWithMessage(ctx, next, message) {
    let data = {
        title: 'Login',
        error: message
    };
    var html = template(path.join(__dirname,'../views/user/login'), data);
    ctx.body = html;
}

export async function logout(ctx, next) {
    const theToken = token.getToken(ctx);
    if (theToken && theToken.length > 0) {
        const bearerToken = token.bearerToken(theToken);
        const options = {
            url: url.resolve(config.apiDomain, '/user/logout'),
            headers: {
                Authorization: bearerToken
            }
        };
        const response = await request.postAsync(options);
        debug(response.statusCode);
        debug(response.body);
    }
    ctx.redirect('/');
    token.clearToken(ctx);
}

export async function register(ctx, next) {
    registerWithMessage(ctx,next,null);
}

export async function registerRequest(ctx, next) {
    debug(ctx.request.body);
    const username = ctx.request.body.username;
    if (!string.validUsername(username)) {
        registerWithMessage(ctx,next,'unvalid username');
        return;
    }
    const password = ctx.request.body.password;
    if (!string.validPassword(password)) {
        registerWithMessage(ctx,next,'unvalid password');
        return;
    }
    const confirmPassword = ctx.request.body.confirmPassword;
    if (password != confirmPassword) {
        registerWithMessage(ctx,next,'unvalid password');
        return;
    }
    const options = {
        url: url.resolve(config.apiDomain, '/user/register'),
        json: true,
        body: {
            username: username,
            password: password
        }
    };
    const response = await request.postAsync(options);
    debug(response.statusCode);
    debug(response.body);
    if (response.statusCode == 200) {
        token.saveToken(ctx,response.body.token);
        ctx.redirect('/');
    } else {
        registerWithMessage(ctx,next,response.body || 'register failed');
    }
}

function registerWithMessage(ctx, next, message) {
    let data = {
        title: 'Register',
        error: message
    };
    var html = template(path.join(__dirname,'../views/user/register'), data);
    ctx.body = html;
}

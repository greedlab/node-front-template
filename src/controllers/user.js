/**
 * Created by Bell on 16/8/16.
 */

import template from 'art-template';
import path from 'path';
import url from 'url';
import Request from 'request';
import bluebird from 'bluebird';
import asyncBusboy from 'async-busboy';

import config from '../config';

import Debug from 'debug';
import pkg from '../../package.json';
const debug = new Debug(pkg.name);

const request = bluebird.promisifyAll(Request);

export async function login(ctx, next) {
    let data = {
        title: 'Login'
    };
    var html = template(path.join(__dirname,'../views/user/login'), data);
    ctx.body = html;
}

export async function loginRequest(ctx, next) {
    const {files, fields} = await asyncBusboy(ctx.req);
    debug(fields);
    // const {files1, fields1} = await asyncBusboy(ctx.request);
    // debug(fields1);
    const options = {
        url: url.resolve(config.apiDomain, '/user/login'),
        username: fields.username,
        password: fields.password
    };
    const response = await request.postAsync(options);
    if (response.statusCode == 200) {
        ctx.redirect('/');
    } else {
        let data = {
            title: 'Login',
            error: response.message || 'unvalid username or password'
        };
        var html = template(path.join(__dirname,'../views/user/login'), data);
        ctx.body = html;
    }
}

export async function register(ctx, next) {
    let data = {
        title: 'Index',
        content: 'Test',
        url: 'test'
    };
    var html = template(path.join(__dirname,'../views/user/register'), data);
    ctx.body = html;
}

export async function registerRequest(ctx, next) {
    const options = {
        url: url.resolve(config.apiDomain, '/user/register'),
        username: '',
        password: ''
    };
    const response = await request.postAsync(options);
    if (response.statusCode == 200) {
        ctx.redirect('/');
    } else {
        let data = {
            title: 'Register',
            error: response.message
        };
        var html = template(path.join(__dirname,'../views/user/register'), data);
        ctx.body = html;
    }
}

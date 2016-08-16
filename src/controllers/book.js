/**
 * Created by Bell on 16/8/16.
 */

import template from 'art-template';
import path from 'path';
import url from 'url';
import Request from 'request';
import bluebird from 'bluebird';
import config from '../config';
import Debug from 'debug';
import pkg from '../../package.json';
const debug = new Debug(pkg.name);
const request = bluebird.promisifyAll(Request);

export async function list(ctx, next) {
    const requestUrl = url.resolve(config.apiDomain, '/book/list');
    debug(requestUrl);
    const response = await request.getAsync(requestUrl);
    debug(response.body);

    let data = JSON.parse(response.body);
    data.title = 'Books';
    var html = template(path.join(__dirname, '../views/book/list'), data);
    ctx.body = html;
}

export async function detail(ctx, next) {
    const options = {
        url: url.resolve(config.apiDomain, '/book/detail/' + ctx.querystring)
    };
    const response = await request.gettAsync(options);

    let data = {
        title: 'Book Detail',
        book: response
    };
    var html = template(path.join(__dirname, '../views/book/detail'), data);
    ctx.body = html;
}

export async function add(ctx, next) {
    let data = {
        title: 'Add Book'
    };
    var html = template(path.join(__dirname, '../views/book/add'), data);
    ctx.body = html;
}

export async function addRequest(ctx, next) {
    const options = {
        url: url.resolve(config.apiDomain, '/book/add/'),
        name: '',
        price: ''
    };
    const response = await request.posttAsync(options);
    if (response.statusCode == 200) {
        ctx.redirect('/book/list');
    } else {
        let data = {
            title: 'Add Book',
            error: response.message || 'Error'
        };
        var html = template(path.join(__dirname, '../views/book/add'), data);
        ctx.body = html;
    }

}

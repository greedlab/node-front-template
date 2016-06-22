/**
 * Created by Bell on 16/6/16.
 */

const template = require('art-template');
const path = require('path');
const request = require('request');
const debug = require('debug')('node-front-template:controllers:test');

import config from '../config/github';

export async function index(ctx, next) {
    try {
        let url = config.domain + '/repos/greedlab/node-front-template';
        let option = {
            headers: {
                'User-Agent': config.useragent,
                'Accept': config.accept
            }
        };
        let response = await request_method(url, option, ctx);
        ctx.body = template(path.join(__dirname, '../views/test'), response);
        return next();
    } catch (err) {
        console.log(err);
    }
}

export async function test(ctx, next) {
    let url = config.domain + '/repos/greedlab/node-front-template';
    let option = {
        headers: {
            'User-Agent': config.useragent,
            'Accept': config.accept
        }
    };
    let response = await request_method(url, option, ctx);
    ctx.body = response;
}

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

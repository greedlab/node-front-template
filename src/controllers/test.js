/**
 * Created by Bell on 16/6/16.
 */

import template from 'art-template';
import path from 'path';

export async function index(ctx, next) {
    let data = {
        title: 'Test Title',
        content: 'test content'
    };
    let html = template(path.join(__dirname,'../views/test'), data);
    ctx.body= html;
}


import template from 'art-template';
import path from 'path';

export async function index(ctx, next) {
    let data = {
        title: 'Index',
        content: 'Test',
        url: 'test'
    };
    var html = template(path.join(__dirname,'../views/index'), data);
    ctx.body = html;
}

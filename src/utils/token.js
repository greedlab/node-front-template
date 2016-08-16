/**
 * Created by Bell on 16/8/16.
 */

export async function saveToken(ctx, token) {
    ctx.cookies.set('token',token, {
        signed: true,
        httpOnly: true,
        maxAge: 600
    });
}

export async function getToken(ctx) {
    ctx.cookies.get('token', {
        signed: true
    });
}

export async function ensureToken(ctx, next) {
    const token = getToken(ctx);
    if (!token) {
        ctx.redirect('/login');
        return;
    }
    return next();
}

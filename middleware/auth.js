const auth = async (ctx, next) => {
    const user = ctx.session;
    if (user.username === 'admin') {
        await next();
    } else {
        ctx.redirect('/login');
    }
};
module.exports = auth;

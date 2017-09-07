const Router = require('koa-router');

const apiRouter = new Router({
    prefix: '/api',
});
apiRouter.get('/', async (ctx) => {
    ctx.body = {
        success: true,
    };
});
apiRouter.post('/login', async (ctx) => {
    const username = ctx.request.body.username;
    const password = ctx.request.body.password;

    if (username === 'admin' && password === '123456') {
        // 保存登录状态
        ctx.session.username = username;
        ctx.redirect('/');
    } else {
        ctx.body = { success: false, msg: '账号或密码错误！' };
    }
});

apiRouter.allowedMethods();
module.exports = apiRouter;

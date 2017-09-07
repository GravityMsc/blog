const Router = require('koa-router');
const auth = require('../middleware/auth');

const webRouter = new Router();

webRouter.get('/', auth, async (ctx) => {
    const title = 'koa template by pug';
    await ctx.render('index', {
        title,
    });
});
webRouter.get('/login', async (ctx) => {
    const title = '未登录';
    await ctx.render('login', {
        title,
    });
});

webRouter.allowedMethods();
module.exports = webRouter;

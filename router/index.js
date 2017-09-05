const Router = require('koa-router');

const webRouter = new Router();

webRouter.get('/', async ctx => {
    const title = 'koa template by pug';
    await ctx.render('index', {
        title
    });
});

webRouter.allowedMethods();
module.exports = webRouter;
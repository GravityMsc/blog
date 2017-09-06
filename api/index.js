const Router = require('koa-router');

const apiRouter = new Router({
    prefix: '/api',
});
apiRouter.get('/', async (ctx) => {
    ctx.body = {
        success: true,
    };
});

apiRouter.allowedMethods();
module.exports = apiRouter;

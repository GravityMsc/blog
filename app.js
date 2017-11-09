const Koa = require('koa');
const path = require('path');
const convert = require('koa-convert');
const session = require('koa-session');
const bodyParser = require('koa-bodyparser');
const views = require('koa-views');
const serve = require('koa-static');
const markdown = require('koa-markdown');
const webRouter = require('./router/index');
const apiRouter = require('./api/index');

const app = new Koa();
app.keys = ['GraivtyMsc'];

const CONFIG = {
    key: 'SESSIONID',
    maxAge: 1000 * 60,
};
app.use(session(CONFIG, app));
/**
 * 记录返回时间
 */
app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.set('X-Response-Time', `${ms}ms`);
});
/**
 * 错误处理
 */
app.use(async (ctx, next) => {
    try {
        await next();
        ctx.status = ctx.status || 404;
        if (ctx.status === 404) {
            await ctx.render('404', {
                errMsg: '找不到页面',
            });
        }
    } catch (err) {
        ctx.status = err.status || 500;
        await ctx.render('500', {
            errMsg: '服务器故障',
        });
    }
});

app.use(bodyParser());
app.use(serve(__dirname));
app.use(views(path.join(__dirname, '/views'), { extension: 'pug' }));
app.use(convert(markdown({
    root: path.join(__dirname, '/public/markdown'),
    baseUrl: '/docs', // 服务器路径
    layout: path.join(__dirname, '/public/markdown/layout.html'),
})));

app.use(apiRouter.routes());
app.use(webRouter.routes());

app.listen(3000);
console.log('nodeblog is starting at port 3000');

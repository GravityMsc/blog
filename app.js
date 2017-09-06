const Koa = require('koa');
const convert = require('koa-convert');
const bodyParser = require('koa-bodyparser');
const views = require('koa-views');
const serve = require('koa-static');
const markdown = require('koa-markdown');
const webRouter = require('./router/index');
const apiRouter = require('./api/index');

const app = new Koa();
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
    } catch (err) {
        ctx.status = err.status || 500;
        await ctx.render('500', {
            errMsg: '服务器故障',
        });
    }
});

app.use(bodyParser());
app.use(serve(__dirname));
app.use(views(__dirname + '/views', { extension: 'pug' }));
app.use(convert(markdown({
    root: __dirname + '/public/markdown',
    baseUrl: '/docs',
    layout: __dirname + '/public/markdown/layout.html',
})));

app.use(apiRouter.routes());
app.use(webRouter.routes());
/**
 * 404
 */
app.use(async (ctx) => {
    ctx.status = ctx.status || 404;
    await ctx.render('404', {
        errMsg: '找不到页面',
    });
});

app.listen(3000);
console.log('nodeblog is starting at port 3000');

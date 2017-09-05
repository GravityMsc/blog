const Koa = require('koa');
const convert = require('koa-convert');
const bodyParser = require('koa-bodyparser');
const views = require('koa-views');
const serve = require('koa-static');
const markdown = require('koa-markdown');
const webRouter = require('./router/index');
const apiRouter = require('./api/index');

const app = new Koa();

app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.set('X-Response-Time', `${ms}ms`); // ctx.response.set简写
});
app.use(bodyParser());
app.use(serve(__dirname));
app.use(views(__dirname + '/views', { extension: 'pug' }));
app.use(convert(markdown({
    root: __dirname + '/public/markdown',
    baseUrl: '/docs',
    layout: __dirname + '/public/markdown/layout.html',
})));

app.use(webRouter.routes());
app.use(apiRouter.routes());

app.listen(3000)
console.log('nodeblog is starting at port 3000')
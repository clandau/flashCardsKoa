'use strict'

const Koa = require('koa');
const Pug = require('koa-pug');
const routes = require('./routes');
const serve = require('koa-static');

const app = new Koa();

const pug = new Pug({
    viewPath: './views',
    basedir: './views',
    app: app
});

app.use(async (ctx, next) => {
    try {
        await next();
    }
    catch(err) {
        ctx.status = 400;
        ctx.body = `oh noes! ${err.message}`;
        console.log(`error handler: ${err.message}`);
    }
});

app.use(serve('.'));
app.use(routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});
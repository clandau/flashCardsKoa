const Router = require('koa-router');
const router = new Router();


router.get('/', async (ctx) => {
    ctx.status = 200;
    ctx.render('index');
});

router.get('/test', async (ctx) => {
    ctx.status = 201;
    ctx.body = 'test';
});

module.exports = router.routes();
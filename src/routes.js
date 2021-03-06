const Router = require('koa-router');
const router = new Router();
const pool = require('./db')
const koaBody = require('koa-body');

router.get('/', async (ctx) => {
    ctx.status = 200;
    await ctx.render('index');
});

router.get('/all', async (ctx) => {
    const sql = 'SELECT * FROM card ORDER BY category';
    try {
        const data = await pool.query(sql);
        ctx.status = 200;
        ctx.body = data;
    }
    catch(err) {
        console.log(err);
        ctx.throw(400, `${err}`);
    }
})

router.get('/random', async (ctx) => {
    let category = ctx.request.query.category;
    let sql;
    if(!category) {
        sql = 'SELECT category, sideA, sideB FROM card ORDER BY RAND() LIMIT 1';
    }
    else {
        sql = 'SELECT category, sideA, sideB FROM card WHERE category=? ORDER BY RAND() LIMIT 1';
    }
    try {
        let data = await pool.query(sql, [category]);
        category = data[0].category;
        await ctx.render('card', { 'cardData' : data, 'category' : category });
    }
    catch(err) {
        console.log(err);
        ctx.throw(400, `${err}`);
    }
});

router.post('/new', koaBody(), async (ctx) => {
    let data = ctx.request.body;
    if(data.sideA === '' || data.sideB == '') {
        console.error('empty data');
        return await ctx.render('index');
    }
    try {
        let sql = `INSERT INTO card set ?`;
        await pool.query(sql, [data]);
        await ctx.render('index', {'message' : 'Sucessfully added new card to database.'});
    }
    catch(err) {
        ctx.throw(400, `post error: ${err}`);
    }
});

module.exports = router.routes();
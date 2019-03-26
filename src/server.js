'use strict'

const Koa = require('koa')

const app = new Koa();

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});
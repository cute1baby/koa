// const Koa = require('koa')  这种是commonjs的用法，现在要用es6的写法

import * as Koa from 'koa'

let app = new Koa()

app.use(async ctx => {
    ctx.body = 'hello，我是小李'
})

app.listen(8080)
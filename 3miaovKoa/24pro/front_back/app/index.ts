// const Koa = require('koa')  这种是commonjs的用法，现在要用es6的写法

import * as Koa from 'koa'
import { useControllers } from 'koa-controllers'
import { db } from './models'

console.log(db)

let app = new Koa()

app.use(async (ctx: Koa.Context, next) => {
    // 把db对象等其他一些数据挂载到当前的state下面
    ctx.state.db = db

    await next()
})
// 引入控制器文件
useControllers(app, __dirname + '/controllers/**/*.js', {
    multipart: {
        dest: './uploads'
    }
})

app.listen(8080)
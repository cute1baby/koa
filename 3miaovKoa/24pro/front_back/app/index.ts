// const Koa = require('koa')  这种是commonjs的用法，现在要用es6的写法

import * as Koa from 'koa'
import { useControllers } from 'koa-controllers'
let app = new Koa()
// 引入控制器文件
useControllers(app, __dirname + '/controllers/*.js', {
    multipart: {
        dest: './uploads'
    }
})

app.listen(8080)
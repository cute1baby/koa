// 引入express模块
const express = require('express')
// 创建app应用对象
const app = express()
// 验证服务器的有效性
const auth = require('./wechat/auth')

app.use(auth())

app.listen(3000, () => {
    console.log('服务器启动成功了111')
})
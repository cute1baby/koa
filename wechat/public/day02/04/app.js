// 引入express模块
const express = require('express')
// 引入路由器模块
const router = require('./router')
// 消息回复模块
const reply = require('./reply')
// 创建app应用对象
const app = express()
// 代理豆瓣的接口
const douban = require('./wechat/douban')

// 设置模板引擎
app.set('view engine', 'ejs')
// 豆瓣的接口转发
app.use('/moviesSearch', async(req,res,next) => {
    console.log('请求的数据===', req.query.q)
    const data = await douban.moviesSearch(req.query.q)
    res.send(data)
    next()
})

app.use(router)
app.use(reply())

app.listen(3000, () => {
    console.log('服务器启动成功了0444')
})
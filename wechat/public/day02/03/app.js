// 引入express模块
const express = require('express')
const sha1 = require('sha1')
// 创建app应用对象
const app = express()
const {url} = require('./config/index')
// 验证服务器的有效性
const auth = require('./wechat/auth')
const Wechat = require('./wechat/wechat')

// 代理豆瓣的接口
const douban = require('./wechat/douban')
const wechatApi = new Wechat()
// 设置模板引擎
app.set('view engine', 'ejs')
app.use('/search', async(req,res, next) => {
    /**
     * 生成js-sdk使用签名
     * 1、组合参与签名的四个参数：jsapi_ticket(临时票据),noncestr(随机字符串),timestamp(时间戳),url(当前服务器地址)
     * 2、将其进行字典序排序，且用&拼接在一起
     * 3、进行sha1加密，最终生成signature
     */
    // 获取随机数
    const noncestr = String(Math.random()).split('.')[1]
    const timestamp = Date.now()
    // 获取票据
    const {ticket} = await wechatApi.fetchTicket()
    console.log(ticket, noncestr, timestamp, url)

    // 生成js-sdk签名
    const signature = sha1([
        `jsapi_ticket=${ticket}`,
        `noncestr=${noncestr}`,
        `timestamp=${timestamp}`,
        `url=${url}/search`
    ].sort().join('&'))
    console.log('signature===', signature)
    res.render('search.ejs', {
        signature,
        noncestr,
        timestamp
    })
    next()
})

// 豆瓣的接口转发
app.use('/moviesSearch', async(req,res,next) => {
    console.log('请求的数据===', req.query.q)
    const data = await douban.moviesSearch(req.query.q)
    res.send(data)
    next()
})
app.use(auth())

app.listen(3000, () => {
    console.log('服务器启动成功了333')
})
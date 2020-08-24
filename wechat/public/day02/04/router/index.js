const express = require('express')
const sha1 = require('sha1')
const {url} = require('../config/index')
const Wechat = require('../wechat/wechat')
const wechatApi = new Wechat()

const router = express.Router()

router.use('/search', async(req,res, next) => {
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

module.exports = router
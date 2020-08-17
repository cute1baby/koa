// 引入express模块
const express = require('express')
// 引入sha1模块
const sha1 = require('sha1')
// 创建app应用对象
const app = express()

/**
 * 验证服务器的有效性
 * 1、微信服务器要知道开发者服务器是哪个
 *      - 测试号管理页面上填写url开发者服务器地址
 *          - 使用ngrok内网穿透 将本地端口号开启的服务映射外网跨域访问一个网址
 *          - ngrok http 3000
 *      - 填写token
 *          - 参与微信签名加密的一个参数
 * 2、开发者服务器：验证消息是否来自微信服务器
 *  目的：
 *      - 计算得出signature微信加密签名，和微信传递过来的signature进行对比。
 *        如果一样，说明消息来自于微信服务器；如果不一样，说明不是微信服务器发送的消息。
 *      1、将参与微信加密签名的3个参数（timestamp、nonce、token），组合在一起，按照字典序排序并组合在一起形成一个数组
 *      2、将数组里所有参数拼接成一个字符串，进行sha1加密
 *      3、加密完成就生成了一个signature，和微信发送过来的进行对比。
 *          如果一样，说明消息来自于微信服务器，返回echostr给微信服务器
 *          如果不一样，说明不是微信服务器发送的消息，返回error.
 * 
 * 
 */

 // 定义配置对象
const config = {
    token: 'laoli0629shezhimogen10011',
    appID: 'wxd9f5805ea8e18784',
    appsecret: '39501d5d4b78eca0c1f1593481c76165'
}

// 接收处理所有消息
app.use((req, res, next) => {
    // 微信服务器提交的参数
    console.log(req.query);
    /**
     * signature: 'reg76frr7g67rgg'  //微信的加密签名
     * echostr: '364732483473'  //微信的随机字符串
     * timestamp: '325465654'   //微信的发送请求时间戳
     * nonce: '467346545'  //微信的随机数字
     */
    console.log('req.query===', req.query)
    const {
        signature,
        echostr,
        timestamp,
        nonce
    } = req.query
    const {token} = config
    // 1、将参与微信加密签名的3个参数（timestamp、nonce、token），组合在一起，按照字典序排序并组合在一起形成一个数组
    const arr = [timestamp, nonce, token]
    const arrSort = arr.sort()
    // console.log(arrSort)
    // 2、将数组里所有参数拼接成一个字符串，进行sha1加密
    const str = arr.join('')
    const sha1Str = sha1(str)
    console.log('sha1Str====', sha1Str)
    console.log('signature====', signature)
    // 3、加密完成就生成了一个signature，和微信发送过来的进行对比。
    if(sha1Str === signature){
        // 如果判断和服务器上的signature相同，则返回echostr给前端
        res.send(echostr)
    } else {
        // 如果验证不一样，则返回error给前端
        res.end('error')
    }
})

app.listen(3000, () => {
    console.log('服务器启动成功了')
})
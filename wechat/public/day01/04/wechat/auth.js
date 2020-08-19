// 引入配置文件
const config = require('../config')
// 引入sha1模块
const sha1 = require('sha1')

// 验证服务器有效性中间件
module.exports = () => {
    // 返回一个中间件函数
    return (req, res, next) => {
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
    }
}
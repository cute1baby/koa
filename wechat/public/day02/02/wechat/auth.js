/**
 * 微信服务器会发送两种类型的消息给开发者服务器
 * 1、get请求
 *  - 验证服务器的有效性 
 * 2、post请求
 *  - 微信服务器会将用户发送的数据以post请求转发到开发者服务器上
 */

// 引入配置文件
const config = require('../config')
// 引入工具文件
const { getUserDataAsync, parseXMLAsync, formatMessage} = require('../utils/tool')
// 引入sha1模块
const sha1 = require('sha1')
// 引入模板文件
const template = require('./template.js')
// 引入用户回复模块
const reply = require('./reply.js')

// 验证服务器有效性中间件
module.exports = () => {
    return async (req, res, next) => {
        const {
            signature,
            echostr,
            timestamp,
            nonce
        } = req.query
        const {token} = config
        const sha1Str = sha1([timestamp, nonce, token].sort().join(''))
        if(req.method === 'GET'){
            if(sha1Str === signature){
                res.send(echostr)
            } else {
                res.end('error')
            }
        }else if(req.method === 'POST'){
            if(sha1Str !== signature){
                res.end('error')
            }
            // 接收请求体中的数据,流式数据
            const xmlData = await getUserDataAsync(req)
            // 将xml数据转化成json数据
            const jsData = await parseXMLAsync(xmlData)
            // 格式化js对象
            const message = formatMessage(jsData)

            const options = reply(message)
            /**
             * 前面失败的原因是选错了返回的模板接口，正确的方式路径是：
             * 【消息管理】> 【被动回复用户消息】
             */
            let replyMessage = template(options)
            console.log(replyMessage)
            res.send(replyMessage)
        }else{
            res.end('error')
        }
        
    }
}
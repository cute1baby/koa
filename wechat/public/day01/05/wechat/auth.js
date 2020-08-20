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
        console.log('sha1Str====', sha1Str)
        console.log('signature====', signature)
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
            /**
             * 如果开发者服务器没有返回值给微信服务器，微信服务器会发送三次请求过来。使用res.end('')可解决
             * 返回的req.query值为：
             * { signature: '875cf8088b8818a5987d74a95440a2831453e88c',
                timestamp: '1597850996',
                nonce: '2131662441',
                openid: 'objZYs-mQreuGyJGft9tAkEcLi6Q'   用户的openId
                }
             */

            // 接收请求体中的数据,流式数据
            const xmlData = await getUserDataAsync(req)
            // console.log('xmlData====>>>>', xmlData)
            /**
             * xmlData====>>>> <xml><ToUserName><![CDATA[gh_6f70e07497e5]]></ToUserName> //开发者的id
                <FromUserName><![CDATA[objZYs-mQreuGyJGft9tAkEcLi6Q]]></FromUserName>  //用户的id
                <CreateTime>1597852221</CreateTime>  //时间戳
                <MsgType><![CDATA[text]]></MsgType>  //发送的消息类型
                <Content><![CDATA[哺]]></Content>   //发送的内容
                <MsgId>22875744719564700</MsgId>   //消息Id(微信服务器会默认保存3天用户发送的数据)
                </xml>
             */
            // 将xml数据转化成json数据
            const jsData = await parseXMLAsync(xmlData)
            // console.log('jsData====>>>>', jsData)
            
            // 格式化js对象
            const message = formatMessage(jsData)
            /**
             * { ToUserName: 'gh_6f70e07497e5',
                FromUserName: 'objZYs-mQreuGyJGft9tAkEcLi6Q',
                CreateTime: '1597853788',
                MsgType: 'text',
                Content: '/::~',
                MsgId: '22875768774087569' }
             */
            // console.log('message====>>>>', message)


            /**
             * 简单地自动回复
             * 一旦遇到以下情况，微信都会在公众号会话中，向用户下发系统提示‘该公众号暂时无法提供服务，清稍后再试’
             *  1、开发者在5秒内未回复任何内容
             *  2、开发者回复了异常数据，比如JSON数据、字符串、xml数据中多余的空格等等。
             */
            // 判断用户发送的内容是否为文本内容
            let content = '您在说什么，我听不懂'
            if(message.MsgType === 'text'){
                // 判断用户发送的内容具体是什么
                if(message.Content === '1'){ //全局匹配
                    content = '翻拍翻到我了吗，好的哟'
                }else if(message.Content === '2'){
                    content = '傻人有傻福'
                }else if(message.Content.match('爱')){
                    content = '因为爱情，我们还是年轻的模样'
                }
            }
            let replyMessage = `<xml>
                <ToUserName><![CDATA[${message.FromUserName}]]></ToUserName>
                <FromUserName><![CDATA[[${message.ToUserName}]]></FromUserName>
                <CreateTime>${Date.now()}</CreateTime>
                <MsgType><![CDATA[text]]></MsgType>
                <Content><![CDATA[${content}]]></Content>
                <MsgId>22875768774087569</MsgId>
            </xml>`
            console.log(replyMessage)
            res.send(replyMessage)
            // res.end('')
        }else{
            res.end('error')
        }
        
    }
}
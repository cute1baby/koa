'use strict';
// 引入配置文件
var request = require('request');
const config = require('../config')
const {Wechat} = require('../tool/accessToken')
const {Ticket} = require('../tool/ticket')
const {getDataAsync, toJson, toXml} = require('../tool/xmlTool')
// 引入sha1模块
const sha1 = require('sha1')
const nanoid = require('nanoid')
const uploadToken = require('../tool/upload')
const rp = require('request-promise-native')
const axios = require('axios')
const { successRes, failRes } = require("../utils/response");
const Controller = require('egg').Controller;
const w = new Wechat()
const ticketInstance = new Ticket()

// 自定义菜单目录
const menuList = {
    "button":[
        {	
            "type":"view",
            "name":"免费送书",
            "url":"http://wechat.familyli.cn/activity.html"
        },
        {	
            "name":"授权",
            "sub_button": [
                {	
                    "type":"view",
                    "name":"静默授权",
                    "url":"http://wechat.familyli.cn/authBySilent.html"
                },
                {	
                    "type":"view",
                    "name":"用户主动授权",
                    "url":"http://wechat.familyli.cn/authByUser.html"
                },
            ]
        },
    ]
}
class HomeController extends Controller {
  // 校验服务器配置的有效性
  async index() {
    const { ctx } = this;
    console.log('query====', ctx.query)
    const {
        signature,
        echostr,
        timestamp,
        nonce
    } = ctx.query
    const {token} = config
    // 1、将参与微信加密签名的3个参数（timestamp、nonce、token），组合在一起，按照字典序排序并组合在一起形成一个数组
    const arr = [timestamp, nonce, token]
    const arrSort = arr.sort()
    console.log(arrSort)
    // 2、将数组里所有参数拼接成一个字符串，进行sha1加密
    const str = arr.join('')
    const sha1Str = sha1(str)
    console.log('sha1Str====', sha1Str)
    console.log('signature====', signature)
    // 3、加密完成就生成了一个signature，和微信发送过来的进行对比。
    if(sha1Str === signature){
        // 如果判断和服务器上的signature相同，则输出echostr；并且进行下一步
        console.log('echostr=====', echostr)
        ctx.body = echostr
    } else {
        // 如果验证不一样，则返回error给前端
        ctx.body = ''
    }

  }
  // 获取accessToken
  async getAccessToken(){
      console.log(111222)
    const { ctx } = this;
    const res = await w.fetchAccessToken()
    ctx.body = successRes(res, '获取accessToken')
  }
  // 获取用户列表
  async getUserList(){
    const { ctx } = this;
    const tokenRes = await w.fetchAccessToken()
    const {access_token} = tokenRes
    const url = `https://api.weixin.qq.com/cgi-bin/user/get?access_token=${access_token}`
    const userList = await rp({
        method: 'GET',
        url,
        json: true
    })
    if(userList){
        ctx.body = successRes(userList, '获取用户列表成功')
    }else{
        ctx.body = failRes('获取用户列表失败')
    }
  }

  // 设置自定义菜单列表
  async setMenuList(){
    const { ctx } = this;
    const tokenRes = await w.fetchAccessToken()
    const {access_token} = tokenRes
    const url = ` https://api.weixin.qq.com/cgi-bin/menu/create?access_token=${access_token}`
    const menuListRes = await axios({
        method: 'POST',
        url,
        data: menuList
    })
    if(menuListRes){
        ctx.body = successRes('自定义菜单创建成功')
    }else{
        ctx.body = failRes('自定义菜单创建失败')
    }
  }
   // 获取自定义菜单列表
   async getMenuList(){
    const { ctx } = this;
    const tokenRes = await w.fetchAccessToken()
    const {access_token} = tokenRes
    console.log('access_token===', access_token)
    const url = `https://api.weixin.qq.com/cgi-bin/get_current_selfmenu_info?access_token=${access_token}`
    const menuListRes = await rp({
        method: 'GET',
        url,
        json: true
    })
    if(menuListRes){
        ctx.body = successRes(menuListRes)
    }else{
        ctx.body = failRes('自定义菜单获取失败')
    }
  } 

  // 自动回复
  async getReplyContent(){
    const { ctx } = this;
    console.log(11111)
    // 接收请求体中的数据,流式数据
    const xmlData = await getUserDataAsync(ctx)
    console.log(xmlData)
  }


  // 用户主动授权，获取用户信息
  async getAuthorization(){
    const { ctx } = this;
    const {appID, appsecret} = config
    const {code} = ctx.query
    // 授权第二步,获取网页授权access_token
    const url = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${appID}&secret=${appsecret}&code=${code}&grant_type=authorization_code`
    const authRes = await rp({
        method: 'GET',
        url,
        json: true
    })
    if(authRes){
        const {
            access_token,
            openid
        } = authRes;
        // 授权第四步，获取用户信息
        const authUrl = `https://api.weixin.qq.com/sns/userinfo?access_token=${access_token}&openid=${openid}&lang=zh_CN`
        const userRes = await rp({
            method: 'GET',
            url: authUrl,
            json: true
        })
        if(userRes){
            ctx.body = successRes(userRes)
        }else{
            ctx.body = failRes('网页授权获取用户信息失败')
        }
    }else{
        ctx.body = failRes('获取网页授权access_token失败')
    }
  }
  // 静默授权，获取openId
  async getOpenId(){
    const { ctx } = this;
    const {appID, appsecret} = config
    const {code} = ctx.query
    // 授权第二步,获取网页授权access_token
    const url = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${appID}&secret=${appsecret}&code=${code}&grant_type=authorization_code`
    const authRes = await rp({
        method: 'GET',
        url,
        json: true
    })
    if(authRes){
        ctx.body = successRes(authRes)
    }else{
        ctx.body = failRes('获取网页授权access_token失败')
    }
  }

  // 获取模板信息并发送
  async getTemplateInfo(){
    const { ctx } = this;
    const {
        openid,
        user,
        tel,
        address
    } = ctx.query
    const tokenRes = await w.fetchAccessToken()
    const {access_token} = tokenRes
    const url = `https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=${access_token}`
    const dataObj = {
        'touser': openid,
        'template_id': 'L47xpv5RWcz9lV1pg6mCD2e2rdNBe1_f3WE6tXXgsrs',
        'data': {
            'user': {
                'value': user
            },
            'tel': {
                'value': tel
            },
            'address': {
                'value': address
            },
            'remark': {
                'value': '若有问题请联系客服咨询，谢谢！'
            }
        }
    }
    console.log(JSON.stringify(dataObj))
    const {data} = await axios({
        method: 'POST',
        url,
        data: JSON.stringify(dataObj)
    })
    console.log('authRes>>>>>>', data)
    if(data){
        ctx.body = successRes(data)
    }else{
        ctx.body = failRes('获取模板信息失败')
    }
  }

  // 上传图片到七牛云
  async uploadImg(){
    const { ctx } = this;
    const fileName = ctx.request.body
    console.log('bodyVal===', fileName)
    console.log('uploadToken>>>>>>', uploadToken)
    ctx.body = successRes(uploadToken)
  }

  async getBasicTicket(){
    /**
     * 生成js-sdk使用签名
     * 1、组合参与签名的四个参数：jsapi_ticket(临时票据),noncestr(随机字符串),timestamp(时间戳),url(当前网页的URL，不包含#及其后面部分)
     * 2、将其进行字典序排序，且用&拼接在一起
     * 3、进行sha1加密，最终生成signature
     */
    const { ctx } = this;
    const {url} = ctx.query
    console.log('url>>>>', url)
    // 获取随机数和时间戳
    const noncestr = String(Math.random()).split('.')[1]
    const timestamp = Date.now()
    const {url} = ctx.query
    const {ticket} = await ticketInstance.fetchTicket()
    // 拼接并进行sha1加密
    // 这里的url是当前页面的url，前端作为参数传过来
    const signature = sha1([
        `jsapi_ticket=${ticket}`,
        `noncestr=${noncestr}`,
        `timestamp=${timestamp}`,
        `url=${url}`
    ].sort().join('&'))
    console.log('ticket的value===', signature)
    ctx.body = successRes({
        signature,
        noncestr,
        timestamp
    })
  }

  // 检测url是否被微信封了
  async long2ShortUrl(){
    const { ctx } = this;
    const {domain} = ctx.request.body
    console.log('domain>>>>>>', domain)
    const tokenRes = await w.fetchAccessToken()
    const {access_token} = tokenRes
    const to_short_params = {
        "access_token": access_token,
        "action": "long2short",
        "long_url": domain
    }
    const url = `https://api.weixin.qq.com/cgi-bin/shorturl?access_token=${access_token}`
    const {data} = await axios({
        method: 'POST',
        url,
        data: JSON.stringify(to_short_params)
    })
    if(!data.errcode){
        const { short_url } = data
        ctx.body = successRes(short_url)
    }else{
        ctx.body = failRes(data.errcode)
    }
  }

  // 测试短链接是否有效
  async testUrlIsValid(){
    const { ctx } = this;
    const {url} = ctx.request.body
    try {
        const res = await checkDomainBanned(url)
        ctx.body = successRes(res)
    } catch (error) {
        ctx.body = failRes(error)
    }

    function checkDomainBanned(url) {
        return new Promise(function (resolve, reject) {
            return request(url, function(err, res, body) {
                if (!err) {
                    console.log('res.request.uri>>>>>>', res.request.uri)
                    if (res && res.request && res.request.uri && res.request.uri.host.includes('weixin110.qq.com')) {
                        resolve({ state: 1, msg: '封号了' });
                    }else{
                        resolve({ state: 0, msg: '一切正常' });
                    }
                }else{
                    reject(err);
                }
            })
        })
    }
  }
}

module.exports = HomeController;

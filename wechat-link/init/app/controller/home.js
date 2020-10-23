'use strict';
// 引入配置文件
const config = require('../config')
// 引入sha1模块
const sha1 = require('sha1')
const { successRes, failRes } = require("../utils/response");
const Controller = require('egg').Controller;

class HomeController extends Controller {
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
  async hello(){
    const { ctx } = this;
    ctx.body = successRes('hello world', '测试接口调试')
    // ctx.body = 'hello world'
  }
}

module.exports = HomeController;

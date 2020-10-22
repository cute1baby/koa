/**
 * 请求地址配置
 * 商户在调用授权页前需要先获取一个7200s过期的授权页ticket，
 * 在获取授权页接口中，该ticket作为参数传入，加强安全性。
 */

 const prefix = 'https://api.weixin.qq.com/cgi-bin/'

 module.exports = {
    accessToken: `${prefix}token?grant_type=client_credential`,
    ticket: `${prefix}ticket/getticket?type=jsapi`,
    menu: {
        create: `${prefix}menu/create?`,
        delete: `${prefix}menu/delete?`
    }
 }
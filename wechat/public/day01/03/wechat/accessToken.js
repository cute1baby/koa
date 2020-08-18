/**
 * 获取access_token
 * 是什么？微信调用接口全局唯一凭据
 * 
 * 特点：
 * 1、唯一的
 * 2、有效期为2小时，提前5分钟请求
 * 3、接口权限 每天2000次
 * 
 * 请求地址：https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET
 * 请求方式：get
 * 
 * 设计思路
 * 1、首次本地没有改值，发送请求获取access_token，保存下来（保存成本地文件）
 * 2、第二次及之后：
 *  本地读取文件，判断是否过期。
 *      - 没有过期，直接使用
 *      - 过期了，重新获取access_token，保存下来覆盖之前的文件（保证文件是唯一的）  
 * 
 *  整理思路：
 *    读取本地文件(readAccessToken)
 *      - 本地有文件，判断是否过期(isValidAccessToken)
 *          - 过期了，重新获取access_token(getAccessToken)，保存下来覆盖之前的文件（保证文件是唯一的）saveAccessToken
 *          - 没有过期，直接使用
 *      - 本地没有文件
 *          - 发送请求获取access_token(getAccessToken)，保存下来（保存成本地文件）saveAccessToken
 */
const {writeFile, readFile} = require('fs')
const rp = require('request-promise-native')
const {appID, appsecret} = require('../config')

class Wechat {
    constructor(){

    }
    /**
     * 获取access_token
     */
    getAccessToken(){
        const url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appID}&secret=${appsecret}`
        return new Promise((resolve,reject) => {
            rp({
                method: 'GET',
                url,
                json: true
            })
            .then(res => {
                console.log(res)
                // 设置过期时间戳
                res.expires_in = Date.now + (res.expires_in - 300) * 1000
                resolve(res)
            })
            .catch(err => {
                console.log(err)
                reject('getAccessToken方法出现错误:' + err)
            })
        })
    }

    /**
     * 保存access_token
     */
    saveAccessToken(accessToken){
        accessToken = JSON.stringify(accessToken)
        return new Promise((resolve, reject) => {
            writeFile('./accessToken.txt', accessToken, err => {
                if(!err){
                    console.log('数据保存成功')
                    resolve()
                }else{
                    reject('saveAccessToken方法出现错误:' + err)
                }
            })
        })
    }

    /**
     * 读取access_token
     */
    readAccessToken(){
        return new Promise((resolve, reject) => {
            readFile('./accessToken.txt', (err,data) => {
                if(!err){
                    data = JSON.parse(data)
                    console.log('数据读取成功')
                    resolve(data)
                }else{
                    reject('readAccessToken方法出现错误:' + err)
                }
            })
        })
    }

    /**
     * 用来检查access_token是否有效
     */
    isValidAccessToken(data){
        // 检测是否过期
        if(!data && !data.access_token && !data.expires_in){
            return false
        }
        // 检测是否在有效期内
        return data.expires_in > Date.now
    }

}

// 测试数据
const w = new Wechat()
new Promise((resolve, reject) => {
    w.readAccessToken()
    .then(res=> {
        // 判断是否过期
        if(w.isValidAccessToken(res)){
            resolve(res)
        }else{
            // 获取数据并且保存数据
            w.getAccessToken()
            .then(res => {
                console.log(res)
                w.saveAccessToken(res)
                .then(() => {
                    resolve(res)
                })
            })

        }
    })
    .catch(err => {
        // 获取数据并且保存数据
        w.getAccessToken()
        .then(res => {
            console.log(res)
            w.saveAccessToken(res)
            .then(() => {
                resolve(res)
            })
        })
    })
}).then(r => {
    console.log('获取到最新的access_token====>>>>>>>', r)
})


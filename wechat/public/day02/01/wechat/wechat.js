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
const menu = require('./menu')

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
                res.expires_in = Date.now() + (res.expires_in - 300) * 1000
                console.log('res.expires_in===', res.expires_in)
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
                    console.log('readAccessToken方法出现错误')
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
        return data.expires_in > Date.now()
    }

    /**
     * 用来获取没有过期的access_token，返回一个promise对象
     */
    fetchAccessToken () {
        if(this.access_token && this.expires_in && this.isValidAccessToken(this)){
            console.log('====>>>有效的数据')
            // 说明之前保存过access_token，并且它是有效的，可以直接使用
            return Promise.resolve({
                access_token: this.access_token,
                expires_in: this.expires_in
            })
        }

        // 是fetchAccessToken函数的返回值
        // return new Promise((resolve, reject) => {

        
        return this.readAccessToken()
        .then(async res=> {
            // 判断是否过期
            if(this.isValidAccessToken(res)){
                return Promise.resolve(res)
            }else{
                // 获取数据并且保存数据
                const res = await this.getAccessToken()
                await this.saveAccessToken(res)
                return Promise.resolve(res)
            }
        })
        .catch(async err => {
            // 获取数据并且保存数据
            const res = await this.getAccessToken()
            await this.saveAccessToken(res)
            return Promise.resolve(res)
        })
        .then(res => {
            console.log('>>>>>11111', res)
            // 将获取到的数据挂载到this上
            this.access_token = res.access_token
            this.expires_in = res.expires_in
            // 这是readAccessToken函数的最终返回值
            return Promise.resolve(res)
        })
    // })
    }

    /**
     * 创建自定义菜单
     */
    createMenu(menu){
        return new Promise(async (resolve, reject) => {
            try {
                // 获取access_token
                const data = await this.fetchAccessToken()
                console.log('=========data==createMenu==', data)
                // 来自文档创建菜单
                const url = `https://api.weixin.qq.com/cgi-bin/menu/create?access_token=${data.access_token}`
                // 发送请求
                const result = await rp({
                    method: 'POST',
                    url,
                    json: true,
                    body: menu
                })
                console.log('result====createMenu', createMenu)
                resolve(result)
            } catch (error) {
                reject(error)
            }
        })
    }
    /**
     * 删除自定义菜单
     */
    deleteMenu(){
        return new Promise(async (resolve, reject) => {
            try {
                // 获取access_token
                const data = await this.fetchAccessToken()
                console.log('=========data==deleteMenu==', data)
                // 来自文档创建菜单
                const url = `https://api.weixin.qq.com/cgi-bin/menu/delete?access_token=${data.access_token}`
                // 发送请求
                const result = await rp({
                    method: 'GET',
                    url,
                    json: true
                })
                resolve(result)
            } catch (error) {
                reject(error)
            }
        })
    }
}

// 测试数据
(async () => {
    try {
        const w = new Wechat()
        // 先删除自定义接口，再创建自定义接口
        const deleteResult = await w.deleteMenu()
        console.log('deleteResult=====>>>>', deleteResult)
        // const createResult = await w.createMenu(menu)
        // console.log('createResult=====>>>>', createResult)
    } catch (error) {
        console.log(error)
    }
})()


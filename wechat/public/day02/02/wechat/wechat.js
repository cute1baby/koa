/**
 * 获取access_token
 * 是什么？微信调用接口全局唯一凭据，调用各接口时都需使用access_token。
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
 * 
 * 
 * 获取ticket（暂时从个人角度来看用的比较少）
 * 是什么？商户在调用授权页前需要先获取一个7200s过期的授权页ticket，
 * 在获取授权页接口中，该ticket作为参数传入，加强安全性。
 */

const rp = require('request-promise-native')
const {appID, appsecret} = require('../config')
const api = require('../utils/api')
const {writeFileAsync, readFileAsync} = require('../utils/tool')
const menu = require('./menu')


class Wechat {
    constructor(){

    }
    /**
     * 获取access_token
     */
    getAccessToken(){
        const url = `${api.accessToken}&appid=${appID}&secret=${appsecret}`
        return new Promise((resolve,reject) => {
            rp({
                method: 'GET',
                url,
                json: true
            })
            .then(res => {
                // 设置过期时间戳
                res.expires_in = Date.now() + (res.expires_in - 300) * 1000
                resolve(res)
            })
            .catch(err => {
                console.log('getAccessToken方法出现错误:' + err)
                reject('getAccessToken方法出现错误:' + err)
            })
        })
    }

    /**
     * 保存access_token
     */
    saveAccessToken(accessToken){
        return writeFileAsync(accessToken, 'accessToken.txt')
    }

    /**
     * 读取access_token
     */
    readAccessToken(){
        return readFileAsync('accessToken.txt')
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
     * 用来获取jsapi_ticket
     */
    getTicket(){
        return new Promise(async (resolve,reject) => {
            // 获取access_token
            const data = await this.fetchAccessToken()
            const url = `${api.ticket}&access_token=${data.access_token}`
            rp({
                method: 'GET',
                url,
                json: true
            })
            .then(res => {
                // 设置过期时间戳
                resolve({
                    ticket: res.ticket,
                    expires_in: Date.now() + (res.expires_in - 300) * 1000
                })
            })
            .catch(err => {
                console.log('getTicket方法出现错误:' + err)
                reject('getTicket方法出现错误:' + err)
            })
        })
    }

    /**
     * 保存jsapi_ticket
     */
    saveTicket(ticket){
        return writeFileAsync(ticket, 'ticket.txt')
    }

    /**
     * 读取jsapi_ticket
     */
    readTicket(){
        return readFileAsync('ticket.txt')
    }

    /**
     * 用来检查jsapi_ticket是否有效
     */
    isValidTicket(data){
        // 检测是否过期
        if(!data && !data.ticket && !data.expires_in){
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
         
            // 说明之前保存过access_token，并且它是有效的，可以直接使用
            return Promise.resolve({
                access_token: this.access_token,
                expires_in: this.expires_in
            })
        }

        // 是fetchAccessToken函数的返回值
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
            // 将获取到的数据挂载到this上
            this.access_token = res.access_token
            this.expires_in = res.expires_in
            // 这是readAccessToken函数的最终返回值
            return Promise.resolve(res)
        })
    }
    /**
     * 获取jsapi_ticket
     */
    fetchTicket () {
        if(this.ticket && this.ticket_expires_in && this.isValidTicket(this)){
            // 说明之前保存过access_token，并且它是有效的，可以直接使用
            return Promise.resolve({
                ticket: this.ticket,
                expires_in: this.expires_in
            })
        }

        // 是fetchAccessToken函数的返回值
        return this.readTicket()
        .then(async res=> {
            // 判断是否过期
            if(this.isValidTicket(res)){
                return Promise.resolve(res)
            }else{
                // 获取数据并且保存数据
                const res = await this.getTicket()
                await this.saveTicket(res)
                return Promise.resolve(res)
            }
        })
        .catch(async err => {
            // 获取数据并且保存数据
            const res = await this.getTicket()
            await this.saveTicket(res)
            return Promise.resolve(res)
        })
        .then(res => {
            // 将获取到的数据挂载到this上
            this.ticket = res.ticket
            this.ticket_expires_in = res.expires_in
            // 这是readAccessToken函数的最终返回值
            return Promise.resolve(res)
        })
    }
    /**
     * 创建自定义菜单
     */
    createMenu(menu){
        return new Promise(async (resolve, reject) => {
            try {
                // 获取access_token
                const data = await this.fetchAccessToken()
                // 来自文档创建菜单
                const url = `${api.menu.create}access_token=${data.access_token}`
                // 发送请求
                const result = await rp({
                    method: 'POST',
                    url,
                    json: true,
                    body: menu
                })
                resolve(result)
            } catch (error) {
                console.log('createMenu方法出现错误：'+ error)
                reject('createMenu方法出现错误：'+ error)
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
                // 来自文档创建菜单
                const url = `${api.menu.delete}access_token=${data.access_token}`
                // 发送请求
                const result = await rp({
                    method: 'GET',
                    url,
                    json: true
                })
                resolve(result)
            } catch (error) {
                console.log('deleteMenu方法出现错误：'+ error)
                reject('deleteMenu方法出现错误：'+ error)
            }
        })
    }
}

// 测试数据
(async () => {
    try {
        const w = new Wechat()
        const data = await w.fetchTicket()
        console.log('ticket最终数据====', data)
    } catch (error) {
        console.log(error)
    }
})()


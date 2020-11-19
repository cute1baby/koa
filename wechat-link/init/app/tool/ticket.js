const {writeFile, readFile} = require('fs')
const rp = require('request-promise-native')
const axios = require('axios')
const api = require('./api')
const {Wechat} = require('../tool/accessToken')
const {appID, appsecret} = require('../config')
const w = new Wechat()

class Ticket {
    /**
     * 用来获取jsapi_ticket
     */
    constructor(){

    }

    /**
     * 用来获取jsapi_ticket
     */
    getTicket(){
        return new Promise(async (resolve,reject) => {
            // 获取access_token
            const data = await w.fetchAccessToken()
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
        ticket = JSON.stringify(ticket)
        return new Promise((resolve, reject) => {
            writeFile(__dirname + '/ticket.txt', ticket, err => {
                if(!err){
                    console.log('数据保存成功')
                    resolve()
                }else{
                    reject('saveTicket方法出现错误:' + err)
                }
            })
        })
    }

    /**
     * 读取jsapi_ticket
     */
    readTicket(){
        return new Promise((resolve, reject) => {
            readFile(__dirname + '/ticket.txt', (err,data) => {
                if(!err){
                    data = JSON.parse(data)
                    console.log('数据读取成功')
                    resolve(data)
                }else{
                    reject('readTicket方法出现错误:' + err)
                }
            })
        })
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
}

module.exports = {
    Ticket
}
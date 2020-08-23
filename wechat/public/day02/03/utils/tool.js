/**
 * 工具包函数
 */
const {resolve} = require('path')
// 将xml转化成js的一个包文件
const {parseString} = require('xml2js')
const {writeFile, readFile} = require('fs')

module.exports = {
    getUserDataAsync(req){
        return new Promise((resolve,reject) => {
            let xmlData = ''
            req.on('data', data => {
                xmlData += data.toString()
            })
            req.on('end', () => {
                resolve(xmlData)
            })
        })
    },
    parseXMLAsync(xmlData){
        return new Promise((resolve, reject) => {
            parseString(xmlData, {trim:true}, (err, data) => {
                if(!err){
                    resolve(data)
                }else{
                    reject('parseXMLAsync方法出了问题', err)
                }
            })
        })
    },
    formatMessage(jsData){
        let message = {}
        // 获取xml对象
        jsData = jsData.xml
        // 判断是否为对象
        if(typeof jsData === 'object'){
            for(let key in jsData){
                const value = jsData[key]
                if(Array.isArray(value) && value.length){
                    message[key] = value[0]
                }
            }
        }
        return message
    },
    writeFileAsync(data, fpath){
        data = JSON.stringify(data)
        const filePath = resolve(__dirname, fpath)
        return new Promise((resolve, reject) => {
            writeFile(filePath, data, err => {
                if(!err){
                    console.log('writeFileAsync数据保存成功')
                    resolve()
                }else{
                    console.log('writeFileAsync方法出现错误:' + err)
                    reject('writeFileAsync方法出现错误:' + err)
                }
            })
        })
    },
    readFileAsync(fpath){
        const filePath = resolve(__dirname, fpath)
        return new Promise((resolve, reject) => {
            readFile(filePath, (err,data) => {
                if(!err){
                    data = JSON.parse(data)
                    console.log('readFileAsync数据读取成功')
                    resolve(data)
                }else{
                    console.log('readFileAsync方法出现错误:' + err)
                    reject('readFileAsync方法出现错误:' + err)
                }
            })
        })
    }
}
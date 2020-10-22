/**
 * 工具包函数
 */
// 将xml转化成json的一个包文件
const {parseString} = require('xml2js')
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
    }
}
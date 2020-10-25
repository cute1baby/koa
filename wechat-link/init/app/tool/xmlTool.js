// 将xml转化成js的一个包文件
const xml2js = require('xml2js')

module.exports = {
    // 获取流数据
    getDataAsync(req){
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

    // xml转化成json
    toJson(xml){
        return new Promise((resolve, reject) => {
            const xmlParser = new xml2js.Parser({
                expliciArray: false, //xml2js默认会把子节点的值转成数组，这样设置之后就不会转换了
                ignoreAttrs: true // 忽略xml属性，仅创建文本
            })

            xmlParser.parseString(xmlData, {trim:true}, (err, data) => {
                if(!err){
                    resolve(data)
                }else{
                    reject('toJson', err)
                }
            })
        })
    },
    // json转成xml数据
    toXml(strObj){
        const builder = new xml2js.Builder();
        return builder.buildObject(strObj)
    }

}
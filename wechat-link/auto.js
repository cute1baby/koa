// 自动执行复制脚本
const {writeFile, readFile} = require('fs')

// 复制lq-1-lq文件
readFile(__dirname + '/views/lq-1-lq/index.vue', (err,data) => {
    if(!err){
        data = data.toString()

        for (let i = 2; i <= 20; i++) {
            const ele = `lq-${i}-lq`
            writeFile(__dirname + `/views/${ele}/index.vue`, data, err => {
                if(!err){
                    console.log(`${ele}数据写入成功`)
                }else{
                    console.log('数据写入失败')
                }
            })
        }
    }else{
        console.log('数据读取失败')
    }
})


// 复制lq-gr-1-lq-gr文件
readFile(__dirname + '/views/lq-gr-1-lq-gr/index.vue', (err,data) => {
    if(!err){
        data = data.toString()

        for (let i = 2; i <= 20; i++) {
            const ele = `lq-gr-${i}-lq-gr`
            writeFile(__dirname + `/views/${ele}/index.vue`, data, err => {
                if(!err){
                    console.log(`${ele}数据写入成功`)
                }else{
                    console.log('数据写入失败')
                }
            })
        }
    }else{
        console.log('数据读取失败')
    }
})
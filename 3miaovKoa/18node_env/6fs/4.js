const fs = require('fs')

/**
 * 监听文件数据变化触发（异步）
 * fs.watchFile(filename[, options], listener)
 */
fs.watchFile('./1.txt', (curr, prev) => {
    console.log(`prev value:${JSON.stringify(prev)}`)
    console.log(`current value:${JSON.stringify(curr)}`)
})



/**
 * 监听文件或者目录的变化(由3.js创建的文件夹和文件)
 * fs.watch(filename[, options][, listener])
 * 回调函数接收两个参数：eventType, filename，分别是：修改方式，文件名称
 * eventType有两个值：change(修改文件内容), rename（新增文件，删除文件，修改文件名称）
 */
fs.watch('./images', (eventType, filename) => {
    console.log(eventType, filename);
})



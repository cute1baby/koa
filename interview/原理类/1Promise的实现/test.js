const Promise = require('./promise')

new Promise((resolve, reject) => {
    console.log('开始了')
    resolve(1)
    // reject(2)
})
.then(res => {
    console.log('成功了：', res)
}, reason => {
    console.log('失败了：', reason)
})

new Promise((resolve, reject) => {
    console.log('开始了')
    resolve(1)
})
.then(res => {
    console.log('成功了：', res)
})
.catch(err => {
    console.log('出错了：', err)
})

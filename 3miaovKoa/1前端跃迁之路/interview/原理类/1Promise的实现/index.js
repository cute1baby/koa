new Promise((resolve, reject) => {
    resolve(1)
})
.then(res => {
    return new Promise((resolve, reject) => {
        resolve(100)
    })
}, reason => {
    console.log('失败了：', reason)
})
.then(res => {
    console.log('value', res)
}, reason => {
    console.log('reason', reason)
})
console.log('3')



new Promise((resolve, reject) => {
    resolve(1)
})
// 值穿透的问题
.then(10)
.then(res => {
    console.log(res)
})
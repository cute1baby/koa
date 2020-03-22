const fsPromises = require('fs').promises

// 创建文件夹（nodev10.0版本以上才能使用）
fsPromises.mkdir('./b').then(() => {
    console.log('创建成功')
}).catch(err => {
    console.log(err)
})
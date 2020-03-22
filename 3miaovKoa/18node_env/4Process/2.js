// 效果相当于console.log
// process.stdout.write('hello world')

// 执行后会出现输入面板
// process.stdin.on('data', e => {
//     // 用户输入回车的时候就会触发这里的回调函数，参数为输入的内容
//     console.log('用户输入内容>>>>', e.toString())
// })


const fs = require('fs')
// 默认情况下，输入流是关闭的，要监听处理输入流数据，首先要开启输入流
process.stdin.resume();  //开启输入流的方法

// 利用上面的知识做一个功能。例如输入demo，则在同级下面创建一个demo的文件夹。\r\n是去除换行符
process.stdout.write('create a project:')

process.stdin.on('data', e => {
    fs.mkdirSync(e.toString().replace('\r\n', ''));
    console.log("project is finished")
})



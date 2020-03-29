/**
 * 异步方式
 * fs.open(path[, flags[, mode]], callback)
 * 打开文件
 */
const fs = require('fs');
fs.open('../1.txt', 'r', function(err, fd){
    if(err){
        console.log('文件打开失败', err)
    }else{
        console.log('文件打开成功', fd)
    }
})


/**
 * 同步方式，返回的fd是打开的文件下标
*/
try{
    const fd = fs.openSync('../1.txt', 'r');
    console.log('这是同步的', fd)
}catch(err){
    console.log(err);
}


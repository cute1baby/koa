let fs = require('fs')

/**
 * 读取文件内容（同步）
 * fs.readFileSync(path[, options])
 */
try{
    // 获取的数据是buffer类型
    const content = fs.readFileSync('./1.txt');
    console.log(content);
}catch(err){
    console.log(err)
}


/**
 * 读取文件的附加信息（同步）
 * fs.statSync(path[, options])
 */
try {
    const fsInfo = fs.statSync('./1.txt')
    console.log(fsInfo, fsInfo.isFile()) //判断该txt是否为文件
}catch(err){
    console.log(err)
}


/**
 * rename: 给文件重命名
 *
 */
fs.rename('./1.txt', '1n.txt', function(err){
    if(!err){
        console.log('文件重命名成功')
    }
});

/**
 * 删除文件
 */
// try {
//     fs.unlinkSync('./1.txt')
// } catch (err) {
//     console.log(err)
// }
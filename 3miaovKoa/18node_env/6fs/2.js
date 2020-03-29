let fs = require('fs')

/**
 * 读取文件内容（同步）
 * fs.readFileSync(path[, options])
 */
try{
    // 获取的数据是buffer类型
    const content = fs.readFileSync('./1.json');
    console.log(content);
}catch(err){
    console.log(err)
}


/**
 * 读取文件的附加信息（同步）
 * const stat = fs.statSync(path[, options])
 * stat的方法可在fs.Stats 类中进行查找
 */
try {
    const fsInfo = fs.statSync('./1.json')
    fs.writeFileSync('./1.json', JSON.stringify(fsInfo))   // JSON.stringify()
    console.log(fsInfo, fsInfo.isFile()) //判断该txt是否为文件
}catch(err){
    console.log(err)
}


/**
 * rename: 给文件重命名
 *
 */
// fs.rename('./1.json', '1.json', function(err){
//     if(!err){
//         console.log('文件重命名成功')
//     }
// });

/**
 * 删除文件
 */
// try {
//     fs.unlinkSync('./1.json')
// } catch (err) {
//     console.log(err)
// }

/**【个人感觉这个方法很鸡肋】
 * fs.read(fd, buffer, offset, length, position, callback)
 * fd: 通过open方法成功打开一个问加你返回的编号
 * buffer：buffer对象
 * offset： 偏移量，新的内容添加到buffer中的起始位置
 * length：长度，添加到buffer内容中的长度
 * position：读取的文件中的起始位置
 * callback：回调
 *      err:错误信息
 *      bytesRead: 新buffer的长度
 *      buffer:新的buffer对象
 */
const fs = require('fs');
try {
    const bf1 = new Buffer(10);
    const fd = fs.openSync('../1.txt', 'r');
    fs.read(fd, bf1, 0, 10, null, function (err, bytesRead, buffer){
        if(!err){
            console.log("读取文件的值", bytesRead, buffer.toString())
        }

    })
    console.log('这是同步的', fd)
} catch (err) {
    console.log(err);
}


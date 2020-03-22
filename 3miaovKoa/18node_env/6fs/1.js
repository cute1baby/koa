let fs = require('fs')
/**
 * 写入数据到文件中(异步方法)
 * fs.writeFile(file, data[, options], callback)
 */

// input/output => i/o操作 => 流和二进制 => Buffer
// 数据（字符串，音频，视频，二进制）=> buffer => stream
// 如果文件不存在，则创建文件并写入；如果文件已存在，则覆盖原文件内容
// First Error：这是node中的一种约定，如果一个回调可能有错误发生，那么约定回调函数的第一个参数专门就是错误对象。
// fs.writeFile('./1.txt', 'hello world', err =>{
//     if (err){
//         console.log(err);
//         return;
//     }
//     console.log("file is success");
// })


/**
 * 写入数据到文件中(同步方法)
 * fs.writeFileSync(file, data[, options])
 */
// try{
//     fs.writeFileSync('./1.txt', 'hello world11')
// }catch(err){
//     console.log(err);
// }


/**
 * 写入追加文件内容
 * fs.appendFile(path, data[, options], callback)
 * 同步的：fs.appendFileSync
 */
fs.appendFile('./1.txt', '，我是后面增加的内容', (err) => {
    if(err){
        console.log(err);
        return
    }
    console.log('add content success!');
})

/**
 * 检测文件是否存在的方法
 * fs.exists(filename, cb)
*/
fs.exists('./1.txt', function(bool){
    console.log('判断书籍是否存在：' + bool);
    /**
     * 如果不存在就使用writeFile创建新文件，
     * 如果存在就使用appendFile往文件里面追加内容
     */
})
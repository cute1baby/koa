// process.stdout.write('create a project:')

// 当输入的内容用字符串拼接时，自动会调用toString方法
// process.stdin.on('data', data => {
//     // 返回BUffer值
//     console.log(data)
//      console.log('输入的内容是： ' + data)
// })

let bf1 = Buffer.from('buffer');
//6个字母，占用了6个字节
console.log(Buffer.byteLength(bf1));

// 判断两个Buffer是否相等
let bf2 = Buffer.from('新建值');
let bf3 = Buffer.from('新建值');
console.log(">>>判断bf2和bf3是否相等",bf2.equals(bf3));

// 比较字符和Buffer之间的长度关系，得出一个2中文字符占6个字节
console.log("笑话".length, Buffer.byteLength("笑话"));



/**
 * 类方法，静态方法
 */

// 判断是否支持某种编码
// console.log(Buffer.isEncoding('utf-8'));
// console.log(Buffer.isEncoding('hex'));
// console.log(Buffer.isEncoding('gbk'));

// // 判断是否为Buffer对象
// var arr = [1,23,4]
// var bf = new Buffer(10)
// console.log(Buffer.isBuffer(arr))
// console.log(Buffer.isBuffer(bf))

// // 打印字符的长度和字节的长度
// var str1 = 'miaov'
// console.log(str1.length)
// console.log(Buffer.byteLength(str1))

// var str2 = '妙味'
// console.log(str2.length)
// console.log(Buffer.byteLength(str2))


// Buffer的合并
var str = 'miaov'
var str1 = '妙味'
var list = [new Buffer(str), new Buffer(str1)]
console.log(list) // 数组
var bf = Buffer.concat(list)
console.log(bf)


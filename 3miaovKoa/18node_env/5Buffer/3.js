/**
 * buf.write(要写入的字符串， 从Buffer对象中的几位开始写入， 写入的字符串的长度， 写入字符串的编码)
*/

var str = 'miaov';
var bf1 = new Buffer(str)
console.log(bf1)

var bf2 = new Buffer(5)
bf2.write(str, 1, 3, 'utf-8')
console.log(bf2)



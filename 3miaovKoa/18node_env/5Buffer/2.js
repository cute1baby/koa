/**
 * Buffer类
 *  用于操作二进制数据流
 */

 // new Buffer(size); 创建一个BUffer对象，并且为这个对象分配一个大小
 // 当我们为一个Buffer对象分配空间大小之后，其长度是固定的，不能更改

// 两种创建Buffer对象的方法，对象一旦创建成功，长度不可更改
 var bf = new Buffer(5);
var bf1 = new Buffer([1,2,3])
console.log(bf);
console.log(bf1);

var b = new Buffer('miaov', 'utf-8');
var b1 = Buffer.from('miaov');
console.log("对两者进行比较>>>>>", b.equals(b1))

for(var i=0;i<b.length;i++){
    // 将Buffer对象转换成字符串
    console.log(String.fromCharCode(b[i]))
}


var bf = new Buffer('miaov')
console.log(bf.toString());
console.log(bf.toString('utf-8', 1, 3));

// 转成中文会乱码
// var bf2 = new Buffer('妙味');
// console.log(bf2);
// console.log(bf2.toString('utf-8', 1));


// console.log(bf.toJSON())

// // Buffer的数据截取
// console.log('数据截取', bf.slice(1, 3))

// 将bf中的数据拷贝到bf4中
var bf4 = new Buffer(10)
console.log(bf.copy(bf4))
// 拷贝源数据的第二位到第四位数据到目标对象中从第一位开始插入
console.log(bf.copy(bf4, 1, 2, 4))



// exports 是 module.exports 的一个引用
// 要么用module.exports，要么用exports，不可混合起来使用
// 用require方法引入
var age = 20
var name = '李钟'
module.exports = {
	age,
	name
}

// exports.hobby = '篮球'

// console.log(module)
// console.log(exports)
// console.log(module.exports === exports)
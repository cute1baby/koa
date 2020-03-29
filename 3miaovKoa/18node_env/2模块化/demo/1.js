/*
* 当我们导入的模块是一个文件夹的时候
* 1、读取该文件夹下面的package.json文件
* 2、导入package.json文件中main选项指定的文件
* 3、如果不存在package.json或者main指定的文件，会默认指向该文件夹下的index.js
*
*/
let m = require('./module')

console.log(m);
// m.module.handleCul(1 + 4);
m.val.module.handleCul(1, 4)

/**
 * 如果我们导入的模块是在node_modules目录下，会有另外一种规则
 * 1、如果模块的加载是以./ ../ /开始的，那么就是路径模块加载模式
 * 2、如果模块的加载不是以./ ../ /开始的，那么按照另外一种加载机制进行加载
 *      require方法其实是module.require()
 *      当非路径加载模式的时候，会按照如下规则进行模块的查找
 *          在module对象有一个属性（paths），是一个数组，保存的就是这种非路径加载模式需要查找的路径列表
 *
 */
// let m2 = require('./node_modules/m2')
let m2 = require("m2");  //可以直接引入
console.log(m2)
// console.log("module======>>>>", module)

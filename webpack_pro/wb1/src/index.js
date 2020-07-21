

const util = require('./util');
require('./css/index.css')  //引入css
require('./css/index.less')  //引入css
var str1 = 'hello,欢迎来到webpack的世界!'
document.write(str1 + '我是主文件');


// es6语法的函数
const fn = () => {
    console.log(11111)
}

class Man {
    constructor(name){
        this.name = name
    }
    getName(){
        console.log('我的名字是：' + this.name)
    }
}
const myMan = new Man('老李')
myMan.getName()

// 执行箭头函数
fn();
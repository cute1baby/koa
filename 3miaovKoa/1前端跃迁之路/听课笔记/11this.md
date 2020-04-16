### 为什么这种情况下this指向的是window
```
var name = 'lee'
var obj = {
    name: 'lizhong',
    getName:function(){
        console.log(this.name)  // this指向window
    }
}
function run(){
    return obj.getName
}
var r = run()
r()
```
回答：因为obj.getName赋值给另一个变量r，r()在全局执行的。而this的指向在于看它在哪儿执行，明显它是在全局环境中执行，那么肯定指向window了，与它之前的赋值无关。



- 普通函数中的 this 默认指向全局对象 window


- 执行上下文包括
    - 变量环境
    - 词法环境
    - outer(指向外部上下文执行环境的引用)
    - this





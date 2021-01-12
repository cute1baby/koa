## 第一题
（1）输出：培训。
因为属性名不能重复，数字属性名 == 字符串属性名。

可能的拓展问题 => 对象和数组的区别？
数组是用数字作为索引，而对象一般是字符串作为属性名。


（2）输出：珠峰。
因为symbol属性名是不同的。

可能的拓展问题 => 自己实现一个Symbol

（3）输出：培训。
因为引用类型都会转成字符串，属性名是相同的，都是[object object]

可能的拓展问题 => Object.prototype.toString / valueOf在项目中的使用


## 第二题
输出："4"。因为alert都要执行toString()。
这里涉及到了闭包的知识点。
`var test = function(){alert(i=i*2)}`


## 第三题
```
var a = 0, b = 0;
function A(a){
    A = function(b){
        alert(a+b++)
    }
    alert(a++)
}
A(1)
A(2)
alert(a)
```
输出：“1”， "4"  “0”


举个例子：
```
var i = 10
console.log(5 + i++)
=> 5+i  15
=> i++  i即是11

var i = 10
console.log(5 + (++i))
=> ++i  11
=> 10+i  i即是16
```



## 第四题：深拷贝
JSON.stringify({})会有问题，会对函数、正则、日期的拷贝有问题，返回空对象。
```
JSON.stringify({a: new Date()})
JSON.stringify({a: function(){}})
JSON.stringify({a: /\d/g})
```



## 第五题：执行顺序综合



## 第六题：事件循环
浏览器是多线程的
js是单线程的。因为浏览器只给了其中一个线程来渲染。

```
输出结果:
script start
async start
async2 =>>  这个直接执行，等待返回的结果
promise1
script end
async end
promise2
setTimeout
```

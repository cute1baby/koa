
# 函数柯里化
参考资料：
- [函数时编程](https://llh911001.gitbooks.io/mostly-adequate-guide-chinese/content/)
- [维基百科](https://zh.wikipedia.org/wiki/柯里化)

概念：

1、柯里化：一个函数原本有多个参数，只传入**一个**参数，生成一个新函数，由新函数接收剩余的参数，来运行得到结果。

2、偏函数：一个函数原本有多个参数，只传入**一部分**参数，生成一个新函数，由新函数接收剩余的参数，来运行得到结果。

3、高阶函数：一个函数**参数是一个函数**，该函数对参数函数进行加工，得到一个函数，这个加工用的函数就是高阶函数。



## 为什么要使用柯里化？
为了提升性能。使用柯里化可以缓存一部分能力。

## 使用两个例子来说明：
1、判断元素
2、虚拟DOM和render方法

1、判断元素
Vue本质上是使用HTML的字符串作为末班的，将字符串的模板转换为AST，再转换为VNode
- 模板 => AST
- AST => VNode
- VNode => DOM
上面的哪一个阶段最消耗性能？
应该是将模板转换成AST的这个过程最消耗。

1、例子：let s = '1 + 2 * (3 + 4 * (5 + 6))'
写一个程序，解析这个表达式，得到结果（一般化）。解决方法是：我们将这个表达式转换为”波兰式“表达式，然后使用栈结构来运算。

2、思考：
在Vue中哪一个标签是真正的HTML标签，哪一个是自定义组件，怎么区分？
解决方法：在Vue源码中其实将所有可用的HTML标签已经存起来了。假设只考虑下面几个标签：
```js
let tag = 'div,p,a,img,ul,li'.split(',');
```
需要一个函数，判断一个标签名是否为内置的标签
```js
function isHTMLTag(tagName){
    tagName = tagName.toLowerCase()
    if(tag.indexOf(tagName)){return true}
    return false
}
```
模板是任意编写的，可以写的很简单，也可以写的很复杂。indexOf内部也是要循环的

如果有6个内置标签，而模板中有10个标签需要判断，那么需要执行60次循环（为什么是60次）



2、虚拟DOM和render方法
思考：vue项目 模板 转换为 抽象语法树 需要执行几次？？
1）页面一开始加载需要渲染
2）每一个属性（响应式）数据发生变化的时候要渲染
3）watch, computed等

我们day01写的代码，每次渲染的时候，模板就会被解析一次（注意：这里我们简化了解析方法）

render的作用是将 虚拟dom转换为 真正的DOM 加到页面中。
- 虚拟DOM可以降级理解为AST
- 一个项目运行的时候 模板是不会变的，就表示AST是不会变的。

我们可以对代码进行优化，将虚拟DOM缓存起来，生成一个函数，函数只需要传入数据，就可以得到真正的DOM




# 响应式原理


# 讨论
- 这样的闭包会内存泄漏吗？
- 原生的好多东西都忘记了，不知道从哪学起？

## 这样的闭包会内存泄漏吗？
性能一定是会有问题，尽可能的提高性能。

## 原生的好多东西都忘记了，不知道从哪学起？

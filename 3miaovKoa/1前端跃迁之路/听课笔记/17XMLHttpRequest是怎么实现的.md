XMLHttpRequest是一个非常典型的 WebAPI，他可以实现局部刷新而不是全局刷新，极大的方便了用户的体验。在理解XMLHttpRequest 之前，我们得先介绍下同步回调和异步回调这两个概念

### 回调函数 VS 系统调用栈
- 回调函数：将一个函数作为参数传递给另外一个函数，那作为参数的这个函数就是回调函数。

- 同步回调: callback是在主函数doWork返回之前执行的，这个回调过程称为同步回调。举个例子：
```
let callback = function(){ 
    console.log('i am do homework')
}
function doWork(cb){
    cb()
    console.log(1)
}
```

- 同步回调: callback 并没有在主函数 doWork 内部被调用，这个回调过程称为同步回调。举个例子：
```
let callback = function(){ 
    console.log('i am do homework')
}
function doWork(cb){
    setTimeout(cb, 1000)
    console.log(1)
}
```

消息队列和主线程循环机制保证了页面有条不紊地运行。
- 系统调用栈: 当循环系统在执行一个任务的时候，都要为这个任务维护一个系统调用栈。这个系统调用栈类似于 JavaScript 的调用栈.


### XMLHttpRequest 使用过程中的“坑”
- 跨域问题：这是浏览器的一种安全机制。不同域进行数据请求的时候会被阻止。

- HTTPS混合内容的问题：HTTPS 混合内容是 HTTPS 页面中包含了不符合 HTTPS 安全要求的内容，比如包含了 HTTP 资源，通过 HTTP 加载的图像、视频、样式表、脚本等，都属于混合内容。
所以在https协议下的页面，发现存在XMLHttpRequest请求，浏览器认为这种请求可能是攻击者发起的，会阻止此类危险的请求。


# 思考：如何高效学习安全理论：

### 回复1
```
1. why， 知道为什么有这个安全机制， 历史是什么样的
2. how，知道why之后自己先想想怎么解决这个问题， 再去看看别人是怎么解决的， 分析利弊
3. 学完之后自己上手试试
4. 拉个你身边最蠢的小伙伴把这件事给他说明白
```

### 建立tcp连接是在xhr open还是send?
```
作者回复: open方法仅仅是配置数据，没有任何真实的连接产生，所有连接阶段都是在send之后
```

### 请教老师，我看到 es6中可以通过一个 fetch api来请求，它的实现是用了 xmlHttpRequest么？如果不是，原理上有什么不同？
```
作者回复: fetch采用了promise来封装，在使用方式上更强现代化，同时还原生支持async/await。在chromium中，fetch是完全重新实现的，和xmlhttprequest没有什么关系！

在项目中推荐使用fetch
```


### 异步回调的第二种方式 把异步函数添加到微任务队列中 具体是哪些WebAPI呢? Promise.then?
```
作者回复: Promise的resolve和reject会创建微任务。

还有MutationObserver，如果监听了某个节点，那么通过DOMAPI修改这些被监听的节点也会产生微任务。
```


### IPC是什么
```
作者回复: 进程间通信，比如浏览器进程需要网络进程下载数据，浏览器进程就是通过IPC告诉网络进程需要下载哪些数据，网络进程接收到之后才会开启下载流程
```



上一篇文章讲到Promise的一些功能。从promise代码可以看出来，使用 promise.then 也是相当复杂，虽然整个请求流程已经线性化了，但是代码里面包含了大量的 then 函数，使得代码依然不是太容易阅读。所以es7就引入了async/await语法糖

接下来通过 Generator 和 Promise 来分析 async/await 到底是如何以同步的方式来编写异步代码的。

### 生成器 VS 协程
看下面这段代码
```
function* genDemo() {
    console.log("开始执行第一段")
    yield 'generator 2'

    console.log("开始执行第二段")
    yield 'generator 2'

    console.log("开始执行第三段")
    yield 'generator 2'

    console.log("执行结束")
    return 'generator 2'
}

let gen = genDemo()
console.log(gen.next().value)
console.log(111)
console.log(gen.next().value)
console.log(222)
console.log(gen.next().value)
console.log(333)
console.log(gen.next().value)
console.log(444)
```
我们发现genDemo 并不是一次执行完的，全局代码和 genDemo 函数交替执行。其实这就是生成器函数的特性，可以暂停执行，也可以恢复执行。下面是生成器函数的具体使用方式：
1、在生成器函数内部执行一段代码，如果遇到 yield 关键字，那么 JavaScript 引擎将返回关键字后面的内容给外部，并暂停该函数的执行。
2、外部函数可以通过 next 方法恢复函数的执行。


那浏览器如何实现函数的暂停和恢复?
要搞懂函数为何能暂停和恢复，那你首先要了解协程的概念。协程是一种比线程更加轻量级的存在。你可以把协程看成是跑在线程上的任务，一个线程上可以存在多个协程，但是在线程上同时只能执行一个协程，比如当前执行的是 A 协程，要启动 B 协程，那么 A 协程就需要将主线程的控制权交给 B 协程，这就体现在 A 协程暂停执行，B 协程恢复执行；同样，也可以从 B 协程中启动 A 协程。通常，如果从 A 协程启动 B 协程，我们就把 A 协程称为 B 协程的父协程。

而且，协程不是被操作系统内核所管理，而完全是由程序所控制。这样带来的好处就是性能得到了很大的提升，不会像线程切换那样消耗资源。上面代码执行顺序如下图：
![](https://static001.geekbang.org/resource/image/5e/37/5ef98bd693bcd5645e83418b0856e437.png)

从图中可以看出来协程的四点规则：
1、通过调用生成器函数 genDemo 来创建一个协程 gen，创建之后，gen 协程并没有立即执行。
2、要让 gen 协程执行，需要通过调用 gen.next。
3、当协程正在执行的时候，可以通过 yield 关键字来暂停 gen 协程的执行，并返回主要信息给父协程。
4、如果协程在执行期间，遇到了 return 关键字，那么JavaScript 引擎会结束当前协程，并将 return 后面的内容返回给父协程。

疑问1：这里的父协程指的是哪个函数？
个人认为应该是全局作用域下面的同步任务的这些代码，如这里的`console.log(111)`。那构造器作为gen协程，有自己单独的调用栈，即命名为gen协程调用栈；而父协程的调用栈即全局上下文中的那个调用栈。

疑问2：父协程有自己的调用栈，gen 协程时也有自己的调用栈，当 gen 协程通过 yield 把控制权交给父协程时，V8 是如何切换到父协程的调用栈？当父协程通过 gen.next 恢复 gen 协程时，又是如何切换 gen 协程的调用栈？
针对上面的问题，理解下面的两个点。（1）gen 协程和父协程是在主线程上交互执行的，并不是并发执行的，它们之前的切换是通过 yield 和 gen.next 来配合完成的。（2）当在 gen 协程中调用了 yield 方法时，JavaScript 引擎会保存 gen 协程当前的调用栈信息，并恢复父协程的调用栈信息。同样，当在父协程中执行 gen.next 时，JavaScript 引擎会保存父协程的调用栈信息，并恢复 gen 协程的调用栈信息。
![](https://static001.geekbang.org/resource/image/92/40/925f4a9a1c85374352ee93c5e3c41440.png)


### 将async/await代码改成生成器代码
```
async function foo(){
  try{
    let response1 = await fetch('https://www.geekbang.org')
    console.log('response1')
    console.log(response1)
    let response2 = await fetch('https://www.geekbang.org/test')
    console.log('response2')
    console.log(response2)
  }catch(err) {
       console.error(err)
  }
}
foo()
```
改成如下操作：
```
//foo函数
function* foo() {
    let response1 = yield fetch('https://www.geekbang.org')
    console.log(response1)
    let response2 = yield fetch('https://www.geekbang.org/test')
    console.log(response2)
}

//执行foo函数的代码
let gen = foo()
function getGenPromise(gen) {
    return gen.next().value
}
getGenPromise(gen).then((response) => {
    console.log(response)
    return getGenPromise(gen)
}).then((response) => {
    console.log(response)
})
```
分析一下上面这段代码是怎么执行的？
1、首先执行的是let gen = foo()，创建了 gen 协程。
2、然后在父协程中通过执行 gen.next 把主线程的控制权交给 gen 协程。
3、gen 协程获取到主线程的控制权后，就调用 fetch 函数创建了一个 Promise 对象 response1，然后通过 yield 暂停 gen 协程的执行，并将 response1 返回给父协程。
3、父协程恢复执行后，调用 response1.then 方法等待请求结果。
4、等通过 fetch 发起的请求完成之后，会调用 then 中的回调函数，then 中的回调函数拿到结果之后，通过调用 gen.next 放弃主线程的控制权，将控制权交 gen 协程继续执行下个请求。

以上就是协程和 Promise 相互配合执行的一个大致流程。不过通常，我们把执行生成器的代码封装成一个函数，并把这个执行生成器代码的函数称为`执行器`（可参考著名的 co 框架，这里的执行器是getGenPromise）。

### async/await
1、async 是一个通过异步执行并隐式返回 Promise 作为结果的函数。
关于隐式返回Promise例子如下：
```
async function foo() {
    return 2
}
console.log(foo())  // Promise {<resolved>: 2}
```

2、await
await后面的函数可以看做是一个带参数的Promise对象。
看一下这段代码：
```
async function foo() {
    console.log(1)
    let a = await 100
    console.log(a)
    console.log(2)
}
console.log(0)
foo()
console.log(3)
```
以上的执行结果是：0 1 3 100 2。执行过程如下图：
![](https://static001.geekbang.org/resource/image/8d/94/8dcd8cfa77d43d1fb928d8b001229b94.png)
我来分解一下上述执行顺序：
（1）执行foo的时候，由于 foo 函数是被 async 标记过的，所以会将代码的控制权交给协程（他会有单独的执行栈）
（2）协程的执行栈中打印1，然后执行await后面的函数，而这个函数相当于是一个Promise对象（`let a = new Promise((resolve, reject) => {resolve(100)}); a.then(console.log(a);console.log(2))`）
（3）上面的同步任务中没有可执行的，then后面的函数是微任务，保存到微任务队列中，然后离开foo函数，把代码的控制权交给主协程，代码继续往下执行。
（4）然后打印主线程上的值3
（5）主线程上代码执行结束后，会去看当前宏任务下面微任务队列中是否有微任务，然后按顺序打印a（值是100），2



# 思考题
思考下面程序打印的值
```
async function foo() {
    console.log('foo')
}
async function bar() {
    console.log('bar start')
    await foo()
    console.log('bar end')
}
console.log('script start')
setTimeout(function () {
    console.log('setTimeout')
}, 0)
bar();
new Promise(function (resolve) {
    console.log('promise executor')
    resolve();
}).then(function () {
    console.log('promise then')
})
console.log('script end')
```
执行结果是：
script start
bar start
foo
promise executor
script end
bar end
promise then
setTimeout


### 回复1
```
1. 首先在主协程中初始化异步函数foo和bar，碰到console.log打印script start；
2. 解析到setTimeout，初始化一个Timer，创建一个新的task（延迟队列）
3. 执行bar函数，将控制权交给协程，输出bar start，碰到await，执行foo，输出foo，创建一个 Promise返回给主协程
4. 将返回的promise添加到微任务队列，向下执行 new Promise，输出 promise executor，返回resolve 添加到微任务队列
5. 输出script end
6. 当前task结束之前检查微任务队列，执行第一个微任务，将控制器交给协程输出bar end
7. 执行第二个微任务 输出 promise then
8. 当前任务执行完毕进入下一个任务，输出setTimeout
```

### 生成器+Promise+自动迭代器=async/await。




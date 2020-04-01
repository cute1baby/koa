打算在今后的一段时间里更新前端相关的系列文章。目前计划更新周期为一周两篇。由浅入深地理解一些前端常见的问题。今天是系列第一篇，主要讲一下this的指向问题。

### this的定义

this又叫做上下文环境，与作用域不同的是，他是在函数调用的时候才产生的。首先我们理解一下什么是上下文环境？


### 什么是上下文环境？

举个生活中的例子：比如说你在厨房做菜，那厨房就是你的上下文环境，你要拿一点辣椒，顺手就拿到了；比如你在试衣间，那试衣间就是你的上下文环境，你想在试衣间拿一点辣椒，但是这次拿不到了。所以我们有了一个结论：上下文环境不一样，做同一件事（调用同一个方法），得到的结果就不一样。

来一段代码感受一下：
```
const name = 'Bob'
const obj = {
    name: 'Lucy',
    getName: function(){
        console.log(this.name);
    }
}

const getName = function(){
    console.log(this.name);
}
obj.getName();
getName();
```
我们看一下上面这一段代码。obj.getName()中getName这个方法的是被对象obj调用的，所以他的上下文环境就是obj，那this就是指向obj，它输出的值是Lucy；getName()其实相当于window.getName(),该方法被window调用，所以上下文环境是window,this指向window，输出的值是Bob。



好，上面知道了什么是上下文环境之后，那我们再从绑定规则来看this的指向问题，一共有下面几种绑定规则：
- 默认绑定
- 隐式绑定
- 显式绑定
- 特殊的this指向：箭头函数

### 默认绑定

#### 默认指向window
默认绑定其实就是我们经常见到的在全局环境中调用函数的情况，此时this默认指向window。一般这样调用都很好辨认，但是它还有下面这种变形：
```
var b = {
    name: "Lucy",
    getName: function(){
        console.log("此时this指向对象b", this.name);
        return function(){
            console.log("此时this指向window", this.name);
        }
    }
}
const setFunc = b.getName();
setFunc();
```
这是一种闭包的方式。执行b.getName()之后返回一个函数，并且赋值给变量setFunc，然后在全局环境中调用了setFunc()。所以最后这种情况下的this也是指向window的。


### 隐式绑定
#### this指向调用它的对象
这种书写方式也很常见，就是函数作为对象的方法，指向这个对象下的函数时，该环境下this隐式的指向调用它的对象（这个可以当成一个结论来记住），就是谁调用了这个函数this就指向谁。
```
const obj = {
    name: 'Lucy',
    getName: function(){
        console.log(this.name);
    }
}
obj.getName();
```


### 显式绑定
#### 通过bind,call,apply的方式动态的传入this指向的对象
call,apply是通过传入指定的对象，让执行方法的this指向传入的对象。
- call和apply的使用在于传参的不同，将对象指向了this后函数会立即执行。并且这两个方法绑定的对象可以是动态变化的。如果第一个参数为null，undefined或是不传，则指向全局变量。
    - call传参方式是参数逐个传过去的，
    - apply是将参数放到一个数组里面传过去的。
- bind方法在将对象指向this后并不会立即执行，而是会返回一个函数，但是这个函数绑定了该对象之后就不能再动态改变了。

看代码：
```
const name = 'myName';
const obj1 = {
    name: 'Lucy'
}
const obj2 = {
    name: 'Bob'
}
function getName(){
    console.log(this.name);
}
getName.call(obj1); // 动态的让this指向obj1，生效
getName.call(obj2); // 动态的让this指向obj2，生效

const bFunc = getName.bind(obj1);
bFunc();  // 动态的让this指向obj1，生效
bFunc.call(obj2);  // 动态的让this指向obj2，但是不生效，指向的还是obj1
```




#### new实例化中指向实例对象
要想弄明白为什么this为什么是指向构造函数的实例对象的，首先要先搞明白实例化new的时候做了什么？这是一个比较绕的问题，就先不抛出代码了。我们先来看一下，执行了new之后的实例对象有哪些特点？我总结了一下有以下几点：
- 实例化后的实例对象是一个对象。
- 实例对象可以调用构造函数的原型方法。
- 实例对象上有构造函数中this上的所有属性。

我们思考一下如何封装一个函数实现上面的要求，以下是分析过程：
- 创建一个函数，最后返回一个对象。
- 要让一个普通对象拥有某个构造函数的原型方法，那么需要对象的__proto__指向该构造函数的原型上。
- 执行构造函数，并且让函数的this指向这个返回的对象上。

所以代码可以是这样的：
```
function newFn(Fn, ...args){
    // 新建一个普通对象
    let obj = {};
    // 将构造函数的原型指向对象的__proto__
    obj.__proto__ = Fn.prototype;
    // 执行Fn函数，并且将this指向obj
    Fn.call(obj, ...args);
    // 返回有原型方法和this上属性值的对象
    return obj;
}
```

所以使用自定义的newFn方法实现new的操作是这样的：
```
function Person(name){
    this.name = name;
}
Person.prototype.getName = function(){
    console.log(this.name)
}

function newFn(Fn, ...args) {
    // 新建一个普通对象
    let obj = {}
    // 将构造函数的原型指向对象的__proto__
    obj.__proto__ = Fn.prototype;
    // 执行Fn函数，并且将this指向obj
    Fn.call(obj, ...args);
    // 返回有原型方法和this上属性值的对象
    return obj;
}

// 使用自定义的newFn实现实例化的过程
const p = newFn(Person, 'Lucy');
p.getName();
```



### 特殊的this指向：箭头函数

箭头函数相比较传统函数，有它的特殊性。首先上面说到传统的函数的this是在调用它的时候确定的，而箭头函数没有上下文环境的概念，它的this要去声明该箭头函数的上下文环境中找。所以，箭头函数的this是在函数声明的时候就确定的，而且无法更改。就连使用call和apply的方式也不能改变。
所以因为这个特点，箭头函数的使用有它的局限性。
- 箭头函数不能作为构造函数使用
- 箭头函数没有arguments
```
// say方法上层作用域中的this指向的是window，call也无法修改它的指向
let a = 10  
const obj = {
    a: 1,
    say: () => {
        console.log(this.a)
    }
}
obj.say()  // 10
obj.say.call({a: 5})  // 10


// say方法上层作用域中的this指向的是Factory实例，所以输出的是实例的属性b
var b = 10
function Factory(){
    this.a = '1'
    this.b = '2'
    this.getVal = {
        say: () => {
            console.log(this.b)
        }
    } 
}

new Factory().getVal.say()  //'2'
```

### 总结
this的指向问题（在es5语法中）根据指向的规则可以分成划分为：
- 默认绑定
    - 默认指向window
- 隐式绑定
    - 对象调用它的方法时，this指向调用它的对象
- 显式绑定
    - 通过call,apply等方法动态的将this指向到传入的对象。
    - 实例化的时this指向实例对象（new方法做了一件什么事这个也比较重要）。

- 箭头函数
它的this指向比较特殊，箭头函数本身没有上下文环境的说法，它是在函数定义的时候this指向当前定义函数的上下文环境。所以有些文章说他指向父级函数中this指向的对象这个说法也是正确的。


### 相关文章：
- https://www.bilibili.com/video/BV1w7411o7Hi
- https://segmentfault.com/a/1190000006731988
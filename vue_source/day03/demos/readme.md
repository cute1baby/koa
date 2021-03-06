# 响应式原理

- 我们在使用Vue的时候，赋值属性获得属性都是直接使用Vue实例。
- 我们在设计属性值的时候，页面的数据更新
```js
Object.defineProperty(对象, '设置什么属性名', {
    writable
    enumerable  // 可配置的
    configurable  // 控制属性是否可枚举，是不是可以被for..in..获取
    set  // 取值触发
    get  // 赋值触发
})

// 简化后版本
function defineReactive(targte, key, value, enumerable){
    Object.defineProperty(targte, key, {
        configurable: true,
        enumerable: enumerable,
        get(){
            console.log(`我来获取值为:${value}`)
            return value
        },
        set(newVal){
            console.log(`我来设置值新值为：${newVal}`)
            value = newVal
        }
    })
}
```

// 实际开发中一般是有多级，但是上面只考虑一层， 类似下面这种
```js
let o = {
    list: [
        {
            obj: {}
        }
    ]
}
```
那么如何处理这种问题呢？
递归 【05-对象响应式化.html】

对于对象可以使用递归来响应式化，但是数组也要进行处理。这个问题没有解决
```js
- push
- pop
- shift
- unshift
- reverse
- sort
- splice

data = {
    course: [
        {name: '语文'},
        {name: '数学'}
    ]
}
data.course.push({name: '化学'})  // 此时的化学就不是响应式的了
```
怎么解决这个问题呢？

1、在改变数组数据的时候，要发出通知
    - Vue2中的缺陷，数组发生变化，设置length没法通知（Vue3中使用Proxy语法解决了这个问题）
2、加入的元素应该变成响应式的

技巧：如果一个函数已经定义了，但是我们需要扩展其功能，我们一般的处理方法：

1、使用一个临时的函数名存储函数
2、重新定义原来的函数
3、定义扩展的功能
4、调用临时的那个函数
示例见【06-扩展函数功能.html】

扩展数组的方法: push和pop，应该怎么处理呢？
修改要进行响应式化的数组的__proto__
```js
// 原理
// 继承关系：arr => Array.prototype => Object.prototype ...
// 中间加一层：arr => 改写的方法 => Array.prototype => Object.prototype ...

// 基础修改
let array_methods = Object.create(Array.prototype)
ARRAY_METHOD.forEach(method => {
    // 2
    array_methods[method] = function(){
        // 3
        console.log(`调用了拦截的方法${method}`)
        // 将数据响应式化,使用遍历的方法
        for (let i = 0; i < arguments.length; i++) {
            const element = arguments[i];
            reactify(element);  //给数组方法的参数做响应式处理
        }
        // 4
        const res = Array.prototype[method].apply(this, arguments)
        return res
    }
})
```
已经将对象改成响应式得了，如果直接给对象赋值，赋值另一个对象，那就不是响应式的了，怎么办？（作业）

这里有一个bug，我认为老师的方法并没有解决掉这个问题。
```
set(newVal){
    console.log(`我来设置值新值为：${newVal}`)
    value = newVal
    reactify(newVal)  **********增加了一行这个代码，但是值为数组的时候，根本就不会走set这个方法。
    // 模板刷新（现在是假的，只是演示）
    that.mountComponent()
}
```

# 发布订阅模式

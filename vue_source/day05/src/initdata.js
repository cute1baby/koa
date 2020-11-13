
/****** 响应式化部分 *****/
let ARRAY_METHOD = [
    'push',
    'pop',
    'shift',
    'unshift',
    'reverse',
    'sort',
    'splice'
]

// 思路：原型链继承：修改原型链的结构
// 1 使用临时变量
let array_methods = Object.create(Array.prototype)
ARRAY_METHOD.forEach(method => {
    // 2
    array_methods[method] = function(){
        // 3
        console.log(`调用了拦截的方法${method}`)
        // 将数据响应式化,使用遍历的方法
        for (let i = 0; i < arguments.length; i++) {
            const element = arguments[i];
            observer(element);  //这里还是有一个问题，在引入watcher以后解决
        }
        // 4
        const res = Array.prototype[method].apply(this, arguments)
        return res
    }
})

// 简化的版本
function defineReactive(targte, key, value, enumerable){
    // 判断value是对象时
    const that = this
    // 折中处理后，this就是Vue的实例(值为数组和对象的情况都兼容)
    if(typeof value === 'object' && value !== null){
        observer(value)
    }

    Object.defineProperty(targte, key, {
        configurable: true,
        enumerable: enumerable,
        get(){
            console.log(`我来获取值为:${value}`)
            // 进行依赖收集
            dep.depend();
            return value
        },
        set(newVal){
            console.log(`我来设置值新值为：${newVal}`)
            // 目的
            // 将重新赋值的数据变成响应式的，因此如果传入的是对象类型，那么就需要使用observer，将其转换为响应式的
            if(typeof newVal === 'object' && newVal !== null){
                observer(newVal)
            }
            value = newVal
            
            // 派发更新，找到全局的watcher，调用update
            dep.notify();
        }
    })
}

/* 将对象obj变成响应式的，vm就是Vue的实例，为了在调用时处理上下文 */ 
function observer(obj, vm){
    // 之前没有对obj本身进行操作，这一次就直接对obj进行判断
    if(Array.isArray(obj)){
        // 对每一个元素处理
        obj.__proto__ = array_methods;
        for (let i = 0; i < obj.length; i++) {
            const element = obj[i];
            // 递归处理每一个数组元素
            observer(element, vm)
        }
    }else{
        // 对其成员进行处理
        let keys = Object.keys(obj)
        for (let i = 0; i < keys.length; i++) {
            const prop = keys[i];
            // 修改this的指向
            defineReactive.call(vm, obj, prop, obj[prop], true)

        }
    }
}


JGVue.prototype.initData = function(){
    // 遍历this._data的成员，将属性转化为响应式的，将直接属性，代理到实例上
    const keys = Object.keys(this._data)
    // 响应式化
    observer(this._data, this)

    // 代理
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        // 将this._data[key]映射到this[key]上
        // 就是要让this提供key这个属性；在访问这个属性的时候，相当于在访问this._data的这个属性
        proxy(this, '_data', key)
    }
}

// 将某一个对象的属性，访问映射到对象的某一个属性成员上
function proxy(target, prop, key){
    Object.defineProperty(target, key, {
            enumerable: true,
            configurable: true,
            get(){
                return target[prop][key]
            },
            set(newVal){
                target[prop][key] = newVal
            }
        })
}


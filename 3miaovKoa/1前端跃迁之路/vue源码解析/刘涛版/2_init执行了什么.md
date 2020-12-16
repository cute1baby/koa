
## 主要代码
```javascript
Vue.prototype._init = function (options?: Object) {
    if (options && options._isComponent) {
      initInternalComponent(vm, options)
    } else {
      // 合并Vue构造函数的属性，合并之后类似这样
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      )
    }

    vm._self = vm
    initLifecycle(vm)
    initEvents(vm)
    initRender(vm)
    callHook(vm, 'beforeCreate')
    initInjections(vm) // resolve injections before data/props
    initState(vm)
    initProvide(vm) // resolve provide after data/props
    callHook(vm, 'created')


    if (vm.$options.el) {
      vm.$mount(vm.$options.el)
    }
}


// $mount方法
const mount = Vue.prototype.$mount
Vue.prototype.$mount = function (){
    ...
}
```

### mergeOptions
将实例上的属性做一个汇总跟合并。

### initLifecycle
主要就是给vm对象添加了$parent、$root、$children属性，以及一些其它的生命周期相关的标识。

### initEvents
初始化事件相关的属性（没啥重要的）

### initRender
给vm添加了一些虚拟dom、slot等相关的属性和方法

*后面执行beforeCreate钩子函数*

### initInjections
### initProvide
这两个方法将父组件_provided中定义的值，通过inject注入到子组件，解决依赖注入的问题。

### initState
这部分比较复杂，主要就是操作数据。
props、methods、data、computed、watch | 也包括Observer、Dep和Watcher等方法。数据的监听、数据代理和双向数据绑定等功能都在这里。

这个时候已经把数据都挂载到vm上了，*接着会调用created钩子函数*，所以这时候可以拿到初始化数据。


### vm.$mount（对应3模板渲染.html）
1、先找到el绑定的id，找到对应的tag。
2、判断是否有render函数，如果没有，则看是否有template
3、判断是否有template，如果没有，则获取el以及其子内容作为模板。

4、调用compileToFunctions方法，compileToFunctions方法调用compile，compile方法调用baseCompile


#### baseCompile分成下面3步
1、`const ast = parse(template.trim(), options)`。这里是解析template，生成ast。

2、`optimize(ast, options)`主要是对ast进行优化，分析出静态不变的内容部分，增加了部分属性

3、`code = generate(ast, options)`，就是根据ast生成render函数和staticRenderFns数组。
这里的staticRenderFns目前是一个空数组，其实它是用来保存template中，静态内容的render
```javascript
<div id="app">
	<p>这是<span>静态内容</span></p>
	<p>{{message}}</p>
</div>
```
staticRenderFns就会变为：
```javascript
staticRenderFns = function () {
	with(this){return _c('p',[_v("这是"),_c('span',[_v("静态内容")])])}
}
```
从上面的内容，我们可以知道其实template最终还是转换为render函数，这也是官方文档中所说的render函数更加底层。


#### 定义的mount方法执行了什么？
返回mountComponent函数。

来看看mountComponent函数执行了什么
```javascript
let updateComponent = () => {
    vm._update(vm._render(), hydrating)
}

vm._watcher = new Watcher(vm, updateComponent, noop)
hydrating = false
```
这里实例化了Watcher（是一个渲染Watcher）,在Watcher中：我们会把expOrFn也就是updateComponent赋值给this.getter，并且在获取this.value的值时会调用this.get()，这里的this.lazy默认值是false，在computed属性中创建的Watcher会传入true。

在this.get()中，我们会调用this.getter，所以上面的例子中，updateComponent方法会被调用，所以接下来沿着updateComponent再一路找下去。


#### vm._render
updateComponent中调用了vm._render()函数，该方法在src/core/instance/render.js中。

他主要就是调用了vm.$options.render方法，下面是render方法
```javascript
render = function () {
	with(this){return _c('div',{attrs:{"id":"app"}},[_c('p',[_v(_s(message))])])}
}
```
_c是(a, b, c, d) => createElement(vm, a, b, c, d, false)。我们简单说一下createElement干了什么。a是要创建的标签名，这里是div。接着b是data，也就是模板解析时，添加到div上的属性等。c是子元素数组，所以这里又调用了_c来创建一个p标签。

_v是createTextVNode，也就是创建一个文本结点。_s是_toString，也就是把message转换为字符串，在这里，因为有with(this)，所以message传入的就是我们data中定义的第一个vue实例。

render函数返回的是一个VNode对象，也就是我们的虚拟dom对象。它的返回值，将作为vm._update的第一个参数。


#### vm._update
该方法在src/core/instance/lifecycle.js

从mountComponent中我们知道创建Watcher对象先于vm._isMounted = true。所以这里的vm._isMounted还是false，不会调用beforeUpdate钩子函数。

下面会调用vm.__patch__，在这一步之前，页面的dom还没有真正渲染。该方法包括真实dom的创建、虚拟dom的diff修改、dom的销毁等，具体细节且等之后慢慢分析。
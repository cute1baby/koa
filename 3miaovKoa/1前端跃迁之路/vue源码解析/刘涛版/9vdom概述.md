
传统的工作方式：当页面中dom数比较多的时候，频繁的修改、增加dom的数量，对性能会有极大的浪费。

而虚拟dom是为了解决这个问题。当数据驱动dom修改时，它会通过diff计算，尽量少的创建新元素和复用旧的dom，这样可以减少频繁创建新dom带来的消耗。

调用render函数，返回的是一个虚拟dom（即Vnode）。也就是保存了当前dom相关的数据，以及与其它vnode之间的父子关系等。


## 核心功能
```javascript
Vue.prototype._update = function (vnode: VNode, hydrating?: boolean) {
    ...
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(
        vm.$el, vnode, hydrating, false /* removeOnly */,
        vm.$options._parentElm,
        vm.$options._refElm
      )
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode)
    }
    ...
  }
```
_update函数的核心方法是__patch__方法，这就是元素渲染、vnode做diff并修改、元素销毁的地方。


### 销毁对象
```javascript
Vue.prototype.$destroy = function () {
    ...
    vm.__patch__(vm._vnode, null)
  }
```
通过给__patch__第二个参数传入null，来从页面中删除相应dom。




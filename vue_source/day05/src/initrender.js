
JGVue.prototype.mount = function(){
    // 需要提供一个render方法：生成虚拟dom
    this.render = this.createRenderFn()

    this.mountComponent()
}
JGVue.prototype.mountComponent = function(){
    // 执行mountComponent函数
    let mount = () => {
        // 将虚拟dom渲染到页面上
        this.update(this.render())
    }

    // 这个Watcher 就是全局的Watcher，在任何一个位置都可以访问他（简化的写法）
    Dep.target = new Watcher(this, mount) // 相当于这里调用了mount
}

/*
* 在真正的vue中使用了 二次提交的 设计结构
* 1、在页面中 的DOM和 虚拟DOM 是一一对应的关系
* 2、先由 AST 和 数据生成 VNode(新，render)
* 3、将 旧的VNode 和 新的 VNode比较（diff）,更新(update)
*/

// 这里是生成render函数，目的是缓存 抽象语法树（我们使用虚拟dom来模拟）
JGVue.prototype.createRenderFn = function(){
    let ast = getVNode(this._template)
    // Vue:将AST + data => VNode
    // 这个例子：带坑的VNode + data => 含有数据的VNode
    return function render(){
        // 将带坑的的Vnode和data结合，得到填充数据的VNode
        let _tmp =  combine(ast, this._data)
        console.log('_tmp====>>>>>', _tmp)
        return _tmp
    }
}
// 将虚拟dom渲染到页面中：diff算法就在这里
// diff算法的目的是为了减少递归的操作。
JGVue.prototype.update = function(vnode){
    // 简化，直接生成html DOM replaceChild到页面中
    const newDom = transToRealnode(vnode)
    console.log('realdom', newDom)
    this._parentNode.replaceChild(newDom, document.querySelector('#root'))
}

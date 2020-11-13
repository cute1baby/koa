class Watch {
    /**
     * 以该节点为例：<h1 v-html="msg"></h1>
     * @param {*} vm 实例，app对象
     * @param {*} key 数据属性名  >>> msg
     * @param {*} node 节点   >>> h1
     * @param {*} attr 节点属性   >>> 即v-html绑定的是innerHTML属性
     */
    constructor(vm, key, node, attr){
        this.vm = vm
        this.key = key
        this.node = node
        this.attr = attr
    }
    // 内容更新
    update(){
        const _vm = this.vm
        console.log(_vm)
        if(typeof _vm.$options.beforeUpdate === 'function'){
            _vm.$options.beforeUpdate.apply(this, arguments)
        }
        this.node[this.attr] = this.vm[this.key]

        if(typeof _vm.$options.updated === 'function'){
            _vm.$options.updated.apply(this, arguments)
        }
    }
}
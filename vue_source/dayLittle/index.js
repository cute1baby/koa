// 校验括号的正则
const rkuo = /\{\{(.+?)\}\}/g;
const regFn = /\((.+?)\)/g;

class Vue {
    constructor(options){
        // 通过选择获取根对象
        this.$el = document.querySelector(options.el)
        this.$options = options
        /**
         * 设置一个对象专门保存修改更新的事件
         * $watchEvent的数据类型如下
         * this.$watchEvent[key1] = [event1, event2, event3]
         */
        this.$watchEvent = {}

        /**
         * 生命周期函数
         * beforeCreate  初始化之前
         * created   完成初始化
         * beforeMount  挂载之前
         * mounted  挂载之后
         * beforeUpdate  更新前(在watch.js文件)
         * updated  更新后(在watch.js文件)
         */
        if(typeof options.beforeCreate === 'function'){
            options.beforeCreate.apply(this, arguments)
        }

        // 事件代理
        this.proxyData()
        // 数据劫持
        this.observe()
        if(typeof options.created === 'function'){
            options.created.apply(this, arguments)
        }
        if(typeof options.beforeMount === 'function'){
            options.beforeMount.apply(this, arguments)
        }
        // 模板编译：把视图和事件进行绑定
        this.compile(this.$el)
        if(typeof options.mounted === 'function'){
            options.mounted.apply(this, arguments)
        }
    }

    proxyData(){
        const keys = Object.keys(this.$options.data)
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            Object.defineProperty(this, key, {
                configurable: false,
                enumerable: true,
                get(){
                    return this.$options.data[key]
                },
                set(newVal){
                    this.$options.data[key] = newVal
                }
            })   
        }
    }
    observe(){
        const keys = Object.keys(this.$options.data)
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i]
            let value = this.$options.data[key]
            const that = this
            Object.defineProperty(this.$options.data, key, {
                configurable: false,
                enumerable: true,
                get(){
                    console.log('触发了get函数')
                    return value
                },
                set(newVal){
                    console.log('触发了set函数')
                    value = newVal
                    // 当数据改变了，就触发这个key值的更新事件
                    if(that.$watchEvent[key]){
                        for (let j = 0; j < that.$watchEvent[key].length; j++) {
                            const item = that.$watchEvent[key][j];
                            item.update()
                        }
                    }
                }
            })   
        }
    }
    compile(cnode){
        cnode.childNodes.forEach((node, index) => {
            // 元素类型
            if(node.nodeType === 1){
                // 判断是否有v-html
                if(node.hasAttribute('v-html')){
                    let vmKey = node.getAttribute('v-html').trim()
                    if(this.hasOwnProperty(vmKey)){
                        node.innerHTML = this[vmKey]
                        node.removeAttribute('v-html') 
                        // 将数据插入到$watchEvent
                        let watch = new Watch(this, vmKey, node, 'innerHTML')
                        if(this.$watchEvent[vmKey]){
                            this.$watchEvent[vmKey].push(watch)
                        }else{
                            this.$watchEvent[vmKey] = []
                            this.$watchEvent[vmKey].push(watch)
                        }
                    }
                    
                }
                
                // 判断是否有v-model
                if(node.hasAttribute('v-model')){
                    let vmKey = node.getAttribute('v-model').trim()
                    if(this.hasOwnProperty(vmKey)){
                        node.value = this[vmKey]
                        node.removeAttribute('v-model') 
                        // 将数据插入到$watchEvent
                        let watch = new Watch(this, vmKey, node, 'value')
                        if(this.$watchEvent[vmKey]){
                            this.$watchEvent[vmKey].push(watch)
                        }else{
                            this.$watchEvent[vmKey] = []
                            this.$watchEvent[vmKey].push(watch)
                        }
                    }
                    /**
                     * 这里 监听输入框的input事件(达到事件双向绑定)
                     * 什么是双向数据绑定？
                     * 数据变化，input的value会变化，与之绑定的节点的innerHTML也会变化
                     */
                    node.addEventListener('input', () => {
                        this[vmKey] = node.value
                    })
                }

                // 判断是否绑定click方法
                if(node.hasAttribute('@click')){
                    let fnKey = node.getAttribute('@click').trim()
                    let key, args = []
                    fnKey.replace(regFn, (m, _) => {
                        args = _.split(',')
                    })
                    key = fnKey.split('(')[0]
                    node.addEventListener('click', (e) => {
                        args = args.length ? args : [e]
                        this.$options.methods[key].apply(this, args)
                    })
                }

                // 兼容子节点的递归
                if(node.childNodes.length){
                    this.compile(node)
                }
            }
            // 文本类型
            if(node.nodeType === 3){
                const text = node.textContent
                node.textContent = text.replace(rkuo, (m, key) => {
                    const vmKey = key.trim()
                    if(this.hasOwnProperty(vmKey)){
                        let watch = new Watch(this, vmKey, node, 'textContent')
                        if(this.$watchEvent[vmKey]){
                            this.$watchEvent[vmKey].push(watch)
                        }else{
                            this.$watchEvent[vmKey] = []
                            this.$watchEvent[vmKey].push(watch)
                        }
                    }
                    return this[vmKey]
                })

                
            }
        })
    }
}
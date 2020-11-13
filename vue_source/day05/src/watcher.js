
class Watcher {
    /**
     * 
     * @param {*} vm JGVue实例
     * @param {*} expOrfn 如果是渲染watcher,那传入的是渲染函数；如果是计算watcher，那传入的是路径表达式。暂时只为函数的情况
     */
    constructor(vm, expOrfn){
        this.vm = vm
        // getter就是最终的渲染方法
        this.getter = expOrfn

        this.deps = [];  //依赖项
        // 是一个 Set 类型, 用于保证 依赖项的唯一性 ( 简化的代码暂时不实现这一块 )
        this.depIds = {};

        // 一开始需要渲染：真实vue中: this.lazy ? undefined : this.get()
        this.get()
    }

    // 计算和触发getter
    get(){
        pushTarget(this);
        this.getter.call( this.vm, this.vm ); // 上下文的问题就解决了
        popTarget();
    }
    /**
     * 执行, 并判断是懒加载, 还是同步执行, 还是异步执行: 
     * 我们现在只考虑 异步执行 ( 简化的是 同步执行 )
     */
    run() {
        this.get(); 
        // 在真正的 vue 中是调用 queueWatcher, 来触发 nextTick 进行异步的执行
    }

    /** 对外公开的函数, 用于在 属性发生变化时触发的接口 */
    update() {
        this.run(); 
    }

    /** 清空依赖队列 */
    cleanupDep() {

    }
}
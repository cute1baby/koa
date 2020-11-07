class Dep {
    constructor(){
        this.subs = [];  // 存储的是与当前Dep关联的watcher
    }

    /** 添加一个 watcher */
    addSub( sub ) {

    }
    /** 移除 */
    removeSub( sub ) {

    }

    /** 将当前 Dep 与当前的 watcher ( 暂时渲染 watcher ) 关联*/
    depend() {

    }
    /** 触发与之关联的 watcher 的 update 方法, 起到更新的作用 */
    notify() {
        // 在真实的 Vue 中是依次触发 this.subs 中的 watcher 的 update 方法
        if ( Dep.target ) {
            Dep.target.update(); 
        }
    }
}


// 【重要】全局的容器存储渲染 Watcher，只会有一个
// let globalWatcher
// 学 Vue 的实现
Dep.target = null; // 这就是全局的 Watcher
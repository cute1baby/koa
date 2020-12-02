class Promise {
    // 参数是一个回调函数
    constructor(executor){
        if(typeof executor !== 'function'){
            throw new TypeError(`Promise resolver ${executor} is not a function`)
        }
        // 初始化数据
        this.initValue()

        try {
            // 绑定this的指向
            executor(this.resolve.bind(this), this.reject.bind(this))            
        } catch (error) {
            this.reject.call(this, error)
        }
    }  
    initValue(){
        this.status = Promise.PENDING  // 状态
        this.value = null // 终止
        this.reason = null // 拒因
    }

    // 成功函数回调的执行
    resolve(value) {
        if(this.status ===Promise.PENDING){
            this.status = Promise.FULFILLED
            this.value = value
        }
    }
    // 拒绝函数回调的执行
    reject(reason) {
        if(this.status === Promise.PENDING){
            this.status = Promise.REJECTED
            this.reason = reason
        }
    }

    then(onFulfilled, onRejected){
        //参数校验，兼容值穿透的写法
        if(typeof onFulfilled !== 'function'){
            onFulfilled = value => value
        }

        if(typeof onRejected !== 'function'){
            onRejected = reason => {
                throw reason
            }
        }

        if(this.status === Promise.FULFILLED){
            // 延迟then的立即执行
            setTimeout(() => {
                onFulfilled(this.value)
            })
        }

        if(this.status === Promise.REJECTED){
            // 延迟then的立即执行
            setTimeout(() => {
                onRejected(this.reason)
            })
        }
    }
}

Promise.PENDING = 'pending'
Promise.FULFILLED = 'fulfilled'
Promise.REJECTED = 'rejected'

module.exports = Promise
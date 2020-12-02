class Promise {
    // 参数是一个回调函数
    constructor(executor) {
        if (typeof executor !== 'function') {
            throw new TypeError(`Promise resolver ${executor} is not a function`)
        }
        // 初始化数据
        this.initValue()
        this.initBind()

        try {
            // 绑定this的指向
            executor(this.resolve, this.reject)
        } catch (error) {
            this.reject(error)
        }
    }
    // 绑定 this
    initBind() {
        this.resolve = this.resolve.bind(this)
        this.reject = this.reject.bind(this)
    }

    // 初始化值
    initValue() {
        this.status = Promise.PENDING  // 状态
        this.value = null // 终止
        this.reason = null // 拒因
        this.onFulfilledCallbacks = []  //成功回调
        this.onRejectedCallbacks = []  //失败回调
    }

    // 成功函数回调的执行
    resolve(value) {
        if (this.status === Promise.PENDING) {
            this.status = Promise.FULFILLED
            this.value = value
            this.onFulfilledCallbacks.forEach(fn => fn(this.value))
        }
    }
    // 拒绝函数回调的执行
    reject(reason) {
        if (this.status === Promise.PENDING) {
            this.status = Promise.REJECTED
            this.reason = reason
            this.onRejectedCallbacks.forEach(fn => fn(this.reason))
        }
    }

    then(onFulfilled, onRejected) {
        //参数校验，兼容值穿透的写法
        if (typeof onFulfilled !== 'function') {
            onFulfilled = value => { return value }
        }

        if (typeof onRejected !== 'function') {
            onRejected = reason => {
                throw reason
            }
        }

        // 实现链式调用，且改变了后面then的值，必须通过新的实例
        let promise2 = new Promise((resolve, reject) => {
            if (this.status === Promise.FULFILLED) {
                // 延迟then的立即执行
                setTimeout(() => {
                    try {
                        const x = onFulfilled(this.value)
                        Promise.resolvePromise(promise2, x, resolve, reject)
                    } catch (error) {
                        reject(error)
                    }
                })
            }

            if (this.status === Promise.REJECTED) {
                // 延迟then的立即执行
                setTimeout(() => {
                    try {
                        const x = onRejected(this.reason)
                        Promise.resolvePromise(promise2, x, resolve, reject)
                    } catch (error) {
                        reject(error)
                    }

                })
            }

            // 处理PENDING状态的情况
            if (this.status === Promise.PENDING) {
                this.onFulfilledCallbacks.push(value => {
                    setTimeout(() => {
                        try {
                            const x = onFulfilled(value)
                            Promise.resolvePromise(promise2, x, resolve, reject)
                        } catch (error) {
                            reject(error)
                        }

                    })
                })
                this.onRejectedCallbacks.push(reason => {
                    setTimeout(() => {
                        try {
                            const x = onRejected(reason)
                            Promise.resolvePromise(promise2, x, resolve, reject)
                        } catch (error) {
                            reject(error)
                        }

                    })
                })
            }

        })
        return promise2


    }
}

Promise.PENDING = 'pending'
Promise.FULFILLED = 'fulfilled'
Promise.REJECTED = 'rejected'
// 解决then方法返回Promise对象的问题
/**
 * 
 * @param {*} promise2 外层的Promise
 * @param {*} x then里面的返回值
 * @param {*} resolve 执行成功的回调函数
 * @param {*} reject 执行失败的回调函数
 */
Promise.resolvePromise = function (promise2, x, resolve, reject) {
    // Promise和x相等的情况
    if (promise2 === x) {
        reject(new TypeError(`Chaining cycle detected for promise`))
    }
    // 设置一个标识表明是否被调用过
    let called = false
    if (x instanceof Promise) {
        // 判断x是否为Promise
        x.then(value => {
            // 解决then返回值也是Promise对象，且嵌套多层的问题
            Promise.resolvePromise(promise2, value, resolve, reject)
        }, reason => {
            reject(reason)
        })
    } else if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
        // 判断x为对象或者函数
        try {
            const then = x.then
            if (typeof then === 'function') {
                then.call(x, value => {
                    if (called) return
                    called = true
                    Promise.resolvePromise(promise2, value, resolve, reject)
                }, reason => {
                    if (called) return
                    called = true
                    reject(reason)
                })
            } else {
                if (called) return
                called = true
                resolve(x)
            }
        } catch (error) {
            if (called) return
            called = true
            reject(error)
        }

    } else {
        resolve(x)
    }
}

// 测试代码 
Promise.defer = Promise.deferred = function () {
    let dfd = {}
    dfd.promise = new Promise((resolve, reject) => {
        dfd.resolve = resolve
        dfd.reject = reject
    })
    return dfd
}

module.exports = Promise
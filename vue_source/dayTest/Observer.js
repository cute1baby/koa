class Watcher {
	constructor(vm, expr, cb) {
		this.vm = vm;
		this.expr = expr;
		this.cb = cb;

		//保存旧值
		this.oldVal = this.getOldVal();
	}
    // 获取老值的时候给Dep.target赋值
	getOldVal() {
        // debugger
		Dep.target = this;
		console.log("getOldVal before")
		const oldVal = compileUtils.getValue(this.expr, this.vm);
		console.log("getOldVal after")
		Dep.target = null;
		return oldVal;
	}

	notify() {
        // 这一步在执行setter之前会执行一遍getter
		const newVal = compileUtils.getValue(this.expr, this.vm);
		if (this.oldVal != newVal) {
			this.cb(newVal)
		}
	}
}

// 收集依赖的容器
class Dep {
	constructor() {
		this.subs = [];
	}

	addSub(watcher) {
		this.subs.push(watcher);
	}

	notify() {
		this.subs.forEach(w => w.notify())
	}
}
// 做的是数据劫持这件事
class Observer {
	constructor(data) {
		// this.dep = new Dep()
		this.observer(data)
	}

	observer(data) {
		if (data && typeof data === 'object') {
			Object.keys(data).forEach(key => {
				this.defineReactive(data, key, data[key])
			})
		}
	}

	defineReactive(obj, key, value) {
		//递归遍历
        this.observer(value);
        // 实例化dep
		let dep=new Dep()
		console.log("defineReactive"+key)
		Object.defineProperty(obj, key, {
			enumerable: true,
			configurable: false,
			set: (newVal) => {
				console.log("set"+newVal)
				//监听新的对象修改
				this.observer(newVal)
				//监听值的修改
				if (newVal != value) {
					value = newVal
				}
				dep.notify()
			},
			get() {
                // 这里的Dep.target就是Watcher的实例，相当于一个类似于window的变量
				// console.log("get"+key)
                console.log(Dep.target)
                // console.log('obj==>>>key', obj, key)
                Dep.target && dep.addSub(Dep.target)
                console.log(dep)
				//订阅数据变化，dep中添加观察者，dep是观察者集合
				return value;
			}
		})
    }
    
}

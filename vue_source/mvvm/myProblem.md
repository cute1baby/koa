
## 疑惑
1、在给option.data对象进行响应式的时候，如果下面有多层对象时，需要递归调用defineReactive，而每执行一次defineReactive都会执行一遍`const dep = new Dep()`，而我认为dep变量在离开函数之后就会销毁。

当修改data某个属性的时候，会触发对象的setter方法，这个时候会执行dep.notify()，为什么这个dep还保存在内存中，没有销毁呢？

那是不是说每次递归调用defineReactive产生的dep变量都保存在内存中了？


解答：dep在getter方法中的还继续用到，所以dep不会被销毁，仍然保存在内存中。所以每一次递归产生的dep都不会被销毁。

手写demo，位置在`test/1响应式思考.html`



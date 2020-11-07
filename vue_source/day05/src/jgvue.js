function JGVue(options){
    this._data = options.data
    const _root = document.querySelector(options.el)  //在vue中是字符串，这里是dom
    this._template = _root
    this._parentNode = _root.parentNode

    // 响应式化对象
    // reactify(this._data, this) // 将Vue实例传进去，一个折中方案
    this.initData();  //将data进行响应式转化，进行代理

    this.mount()  // 数据挂载
}
// 虚拟dom构造函数
class Vnode{
    /*
    * tag: 标签名
    * data: 属性数据
    * value: 文本节点的值
    * type: 节点类型
    */
    constructor(tag, data, value, type){
        this.tag = tag && tag.toLowerCase()
        this.data = data
        this.value = value
        this.type = type
        this.children = []
    }

    appendChild(vnode){
        this.children.push(vnode)
    }
}
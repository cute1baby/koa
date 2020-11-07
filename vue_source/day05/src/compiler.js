// 正则表达式
let rkuohao = /\{\{(.+?)\}\}/g;  //{{}}的匹配
/*
* 由html dom => 虚拟dom，将这个函数当成compiler函数（编译成抽象语法树的函数）
*/
function getVNode(node){
    let nodeType = node.nodeType
    let _vnode = null;
    if(nodeType === 1){
        // 元素节点
        let nodeName = node.nodeName
        let attrs = node.attributes // 类数组
        let _attobj = {}
        for (let i = 0; i < attrs.length; i++) {  // attrs[i]属性节点(nodeType==2)
            _attobj[attrs[i].nodeName] = attrs[i].nodeValue
        }
        _vnode = new Vnode(nodeName, _attobj, undefined, nodeType)

        // 考虑node的子元素
        let childNodes = node.childNodes
        for (let i = 0; i < childNodes.length; i++) {
            const element = childNodes[i];
            _vnode.appendChild(getVNode(element));  //递归插入
        }
    }else if(nodeType === 3){
        // 文本节点
        _vnode = new Vnode(undefined, undefined, node.nodeValue, nodeType)
    }
    return _vnode
}

/* 根据路径访问对象成员 */
function getValueByPath(obj, path){
    let paths = path.split('.') // [xx,yy,zz]
    let res = obj;
    let prop;
    while(prop = paths.shift()){
        res = res[prop]
    }
    return res
}
/** 将带有坑的VNode和数据data结合，得到填充数据的VNode:模拟AST => VNode */
function combine(vnode, data){
    let _tag = vnode.tag;
    let _data = vnode.data;
    let _value = vnode.value;
    let _type = vnode.type;
    let _children = vnode.children;

    // 这里其实就是换了一下_value
    let _vnode = null
    if(_type === 3){
        // 文本节点
        _value = _value.replace(rkuohao, function(_, g){
            return getValueByPath(data, g.trim())  //触发了get读取器
        })
        _vnode = new Vnode(_tag, _data, _value, _type)
    }else if(_type === 1){
        // 元素节点
        _vnode = new Vnode(_tag, _data, _value, _type)
        _children.forEach(_subvnode => {
            _vnode.appendChild(combine(_subvnode, data))
        });
    }
    return _vnode
}

// 虚拟dom转化为真实dom
function transToRealnode(vnode){
    const _type = vnode.type
    if(_type === 1){
        // 元素节点
        const _tag = document.createElement(vnode.tag)
        const _data = vnode.data
        for (const key in _data) {
            if (_data.hasOwnProperty(key)) {
                const value = _data[key];
                _tag.setAttribute(key, value)
            }
        }
        if(vnode.children.length){
            vnode.children.forEach(sub => {
                _tag.appendChild(transToRealnode(sub))
            })
        }
        return _tag
    }else if(_type === 3){
        // 创建文本节点
        return document.createTextNode(vnode.value)
    }
}


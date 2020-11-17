## 虚拟dom需牢记的几个方法
- rkuo 匹配`{{}}`集合的正则
- transToVnode  模板转化为带坑的虚拟dom
- importDataInfoTmp  将数据填充到带坑模板中
- transToRealnode  虚拟dom转化为真实dom

- getValueByPath  根据路径获取值


## 响应式需注意的几个方法
- reactify  响应式调用
- defineReactive  响应式核心函数


## 扩展函数的原理
- 4个步骤


## 几个版本存在的问题
- 1、虚拟dom初级版（数组的几种情况没有解决）
    - 数据更新，页面没有进行刷新（需要增加响应式）
    
- 2、响应式初级版
    - 是一个过渡版本
    - 解决数组响应式的一些问题
        - 数组每一项为基础类型的情况
        - 数组的赋值，push、pop等方法的兼容


## 核心
- 数据代理原理
访问app.name，相当于访问同一数据源下的app._data.name。

- 数据模型数据格式如下：
```js
eventObj: {
    'click': [fn1. fn2, fn3, fn4, fn5],
    'mouseover': [gn1, gn2, gn3]
}
 ```

## 实现目标

### 完成umi脚手架项目初始化，并在home页面引入一个table组件
第一步完成



## 笔记

- 1、怎么设置声明式路由 还是 约定式路由？
在`.umirc.js`做配置，将routes删除就是约定式路由，配置routes之后，就变成了声明式（我一般喜欢声明式）


### 遇到的第一个问题：
```
在users/index.js中引入下面的代码，报错：connect Object(...) is not a function
import { connect } from 'umi';

经过查找，发现原因是umi情况下connect是undefined,然后改成了下面dva，就能正常运行了。
import { connect } from 'dva';
```


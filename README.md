# koa
一些koa和es6的基础知识

做了一些修改，测试ssh连接的问题。测试连接成功

self_make这个项目处理页面首屏加载的情况中减少main.js对于包文件引入的依赖，做了如下操作：
注释掉这几行的引入，把它放到组件内部，这样能减少vendor包的大小。
```
// main.js
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
Vue.use(mavonEditor)

// WriteArticle.vue
import {mavonEditor} from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
components: {
    mavonEditor
}
```



### 近期需要学习的知识点
- 8月10日
  - cdn加速的操作方法和原理
  - 微信授权的整个闭环

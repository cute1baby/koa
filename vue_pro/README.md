# vue_pro

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

### 安装sass的步骤
- npm install sass-loader@7.3.1 --save-dev（注意：我安装sass-loader版本大于8.0后就报错，后面降成了7.3.1运行正常）
- npm install --save-dev node-sass
- 在build文件夹下的webpack.base.conf.js的rules里面添加配置
```
// 在main.js中引入import './assets/css/index.scss'时候报错，注释下面这段代码成功跑起来了。说是重复设置导致了错误
{
  test: /\.sass$/,
  loaders: ['style', 'css', 'sass']
}
```
- style标签中加上`style lang="scss" scoped`



### 使用InfiniteScroll出现问题
- 应该让ul外层的容器设置一个高度和overflow-y: auto，让整个ul滚动。
- infinite-scroll-disabled="isLoading"这里的isLoading状态应该一直设置为false,其状态的变化会导致v-infinite-scroll="getData"这里的getData方法持续触发。
-

### favicon的引入
```
<link rel="icon" href="./static/favicon.ico" type="image/x-icon" />
```


### externals踩下的坑
```
1、通过index.html复制出两个文件：index.dev.html、index.prod.html。

2、在index.prod.html的<body></body>内部引入cdn链接
<script src="https://unpkg.com/vue/dist/vue.js"></script>
<script src="https://cdn.bootcss.com/vuex/3.0.1/vuex.min.js"></script>
<!-- 引入vue-router组件库 -->
<script src="https://unpkg.com/vue-router/dist/vue-router.js"></script>
<!-- 引入mintui组件库 -->
<script src="https://unpkg.com/mint-ui/lib/index.js"></script>

3、在webpack.dev.conf.js中配置如下
new HtmlWebpackPlugin({
    filename: 'index.html',
    template: 'index.dev.html',
    inject: true
})

4、在webpack.prod.conf.js中配置如下
externals:{
    'vue': 'Vue',
    'vuex': 'Vuex',
    'vue-router': 'VueRouter',
    'mint-ui': 'MINT'
}
new HtmlWebpackPlugin({
    filename: config.build.index,
    template: 'index.prod.html',
    inject: true
}
注意：这里 element-ui 变量名要使用 ELEMENT，因为element-ui的 umd 模块名是 ELEMENT；mint-ui变量名要使用 MINT。这一步就能让bundle打包之后的vendor.js的包不加上cdn上的包，减少了包的大小。


5、在main.js中做如下修改
if (process.env.NODE_ENV === 'development') {
    require('mint-ui/lib/style.css')
}

6、在router/index.js中做如下修改: 异步引入
const TopicList = resolve => require(['@/components/TopicList'], resolve)
const TopicDetail = resolve => require(['@/components/TopicDetail'], resolve)
const TopicNew = resolve => require(['@/components/TopicNew'], resolve)
const Mine = resolve => require(['@/components/Mine'], resolve)
if (process.env.NODE_ENV === 'development') {
    Vue.use(VueRouter)
}

7、在store.js中做如下修改
if (process.env.NODE_ENV === 'development') {
    Vue.use(Vuex)
}

```


### 进一步优化，引入webpack DllPlugin，让第三方的js只打包一次
```
webpack提供了一个DllPlugin的插件。

1、在src目录下新建 vendor.js 来import 第三方的js
import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import axios from "axios"

import MINT from 'mint-ui' 

2、在build目录下新建 webpack.dll.conf.js 配置文件

3、在 package.json 里面加上 script ：build:dll

4、webpack提供了DllReferencePlugin。修改 build/webpack.base.conf.js

5、修改 build/webpack.prod.js。删除上一篇文章中配置的externals配置项和去掉CommonsChunkPlugin

6、将 index.dev.html 和 index.prod.html 合并成一个文件 index.html，去掉CDN资源，引入 vendor.dll.js

7、修改 webpack.dev.conf.js 和 webpack.prod.conf.js 里面的模板文件的配置

8、修改 src 里面 vuex、vue-router 的使用

9、接下来运行npm run dev，npm run build

详情参照链接：https://juejin.im/post/5a3251ee6fb9a0450f21f6ac
```
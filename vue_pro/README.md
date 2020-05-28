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
// 配置在output后面
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


这里需要注意的几个问题：
（1）比如这里涉及到了一些类似moment、lodash、echarts的插件都要从组件中去掉，这样在打包的时候才不会被加入到vendor.dll.js中。
（2）如果在文件.babelrc中有下面的数据，一定要将`"libraryName": "element-ui"`清除，否则element-ui也会被算进打包的文件里。
  "plugins": [
    "transform-vue-jsx",
    "transform-runtime"
    // [
    //   "component",
    //   {
    //     "libraryName": "element-ui",
    //     "styleLibraryName": "theme-chalk"
    //   }
    // ]
  ]

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



### 项目优化进阶
- 第一步：
参考链接：https://juejin.im/post/5b1e303b6fb9a01e605fd0b3#heading-0
（1）安装下面两个插件，可查看当前项目的打包后占的体积
```
npm install --save-dev webpack-bundle-analyzer
npm install cross-env –save -dev //解决 'NODE_ENV' 不是内部或外部命令，也不是可运行的程序或批处理文件 的报错
```
（2）在webpack.base.conf.js文件中进行如下配置：
```
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
module.exports = {
    plugins: [
        new BundleAnalyzerPlugin({
            analyzerMode: "server",
            analyzerHost: "127.0.0.1",
            analyzerPort: 8889, // 运行后的端口号
            reportFilename: "report.html",
            defaultSizes: "parsed",
            openAnalyzer: true,
            generateStatsFile: false,
            statsFilename: "stats.json",
            statsOptions: null,
            logLevel: "info"
        })
    ]
}
```
（3）在package.json中配置进入可视化页面的命令：
```
"scripts": {
    "analyz": "cross-env NODE_ENV=production npm_config_report=true npm run build"
  },
```
输入命令`npm run analyz`后，在浏览器中输入`localhost:8889`即可看到可视化页面



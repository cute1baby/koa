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


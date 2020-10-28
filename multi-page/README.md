# multi-page

> A Vue.js project

## 将vue-cli的单页修改成多页应用步骤
- 1、在开发路径src下增加modules和pages文件夹，分别存放模块和页面。
- 2、在pages新建一个index文件夹。
- 3、在index文件夹下存放 index.html(页面模板)、main.js(页面入口文件，并将其重命名为index.js)、App.vue(页面使用的组件，公用组件放到components文件夹下)、router(页面的路由配置)、assets(页面的静态资源)

- 4、webpack配置调整
（1）在build/utils.js中添加两个方法：webpack多入口文件和多页面输出
```
我先安装了几个插件
cnpm i glob html-webpack-plugin webpack-merge  -D


var path = require('path')
var glob = require('glob')
var HtmlWebpackPlugin = require('html-webpack-plugin')  //对每个页面单独打包生成一个新页面的插件
var PAGE_PATH = path.resolve(__dirname, '../src/pages')
var merge = require('webpack-merge')

//多入口配置
exports.entries = function() {
  var entryFiles = glob.sync(PAGE_PATH + '/*/*.js')
  var map = {}
  entryFiles.forEach((filePath) => {
    var filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'))
    map[filename] = filePath
  })
  return map
}

//多页面输出配置
exports.htmlPlugin = function() {
  let entryHtml = glob.sync(PAGE_PATH + '/*/*.html')
  let arr = []
  entryHtml.forEach((filePath) => {
    let filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'))
    let conf = {
      template: filePath,
      filename: filename + '.html',
      chunks: [filename],
      inject: true
    }
    if (process.env.NODE_ENV === 'production') {
      conf = merge(conf, {
        chunks: ['manifest', 'vendor', filename],
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true
        },
        chunksSortMode: 'dependency'
      })
    }
    arr.push(new HtmlWebpackPlugin(conf))
  })
  return arr
}
```

（2）修改build/webpack.base.conf.js的入口配置
```
将app: './src/main.js'修改如下：

module.exports = {
  entry: utils.entries(),
```

（3）修改build/webpack.dev.conf.js和build/webpack.prod.conf.js的多页面配置：把原有的页面模板配置注释或删除，并把多页面配置添加到plugins
```
// webpack.dev.conf.js：
plugins: [
    ......
    //  new HtmlWebpackPlugin({
    //    filename: 'index.html',
    //    template: 'index.html',
    //    inject: true
    //  }),
    ......
].concat(utils.htmlPlugin())

// webpack.prod.conf.js：
plugins: [
    ......
    // new HtmlWebpackPlugin({
    //   filename: config.build.index,
    //   template: 'index.html',
    //   inject: true,
    //   minify: {
    //     removeComments: true,
    //     collapseWhitespace: true,
    //     removeAttributeQuotes: true
    //   },
    //   chunksSortMode: 'dependency'
    // }),
    ......
].concat(utils.htmlPlugin())
```
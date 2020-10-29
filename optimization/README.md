# 项目优化

### UI组件按需加载
- 1、引入ELEMENTUI，使用类似`import {Button} from 'element-ui'`
- 2、安装插件：babel-plugin-component -D
- 3、在babelrc进行如下配置：
```
{
  "presets": [
    ["env", {
      "modules": false,
      "targets": {
        "browsers": ["> 1%", "last 2 versions", "not ie <= 8"]
      }
    }],
    "stage-2"
  ],
  "plugins": [
      "transform-vue-jsx", 
      "transform-runtime",
      [
        "component",
        {
            "libraryName": "element-ui",
            "styleLibraryName": "theme-chalk"
        }
      ]
    ]
}
```
### 路由懒加载
- 1、使用import的方式引入组件`const Home = () => import('@/pages/home')`
- 2、安装如下插件`npm install babel-plugin-syntax-dynamic-import -D`
- 3、在babelrc进行如下配置：
```
{
  "plugins": ["syntax-dynamic-import"]
}
```
- 4、在页面中也可以用import方式引入组件。
### 组件重复打包

- 4、打包不生成map文件，配置如下：
```
build: {
	productionSourceMap: false
}
```

### gzip
服务端的一些配置

---
lang: zh-CN
sidebar: auto
sidebarDepth: 5
editLink: false
meta:
  - name: description
    content: 记录生活的点点滴滴,记录自己的成长历程
  - name: keywords
    content: 个人成长,前端,技术博客
---
<vList />

# 生活记录
这是记录生活和技术的笔记

## 做测试


## 记录一些vuepress语法
### 头部插入语法记录
```
lang: zh-CN // 使用中文时间
editLink: false // 禁用指定页面的编辑链接
sidebar: auto // 自动生成侧栏
sidebar: false // 禁用侧边栏
sidebarDepth: 2 // 侧边栏展开深度
pageClass: custom-page-class // 自定义页面类
layout: SpecialLayout // 使用一个完全自定义的组件来代替当前的页面（而只保留导航栏）
home: true // 使用默认主题提供的首页布局
heroImage: /hero.png
actionText: 快速上手 →
actionLink: /zh/guide/
meta:
  - name: description
    content: hello
  - name: keywords
    content: super duper SEO
```

### 提示
```
::: tip 提示
这是一个提示
:::

::: warning 警告
这是一个警告
:::

::: danger 禁止
这是一个危险警告，禁止入内
:::
```
::: tip 提示
这是一个提示
:::

::: danger 禁止
这是一个危险警告，禁止入内
:::



### 代码块单行高亮
```javascript{2}
console.log(111)
console.log(222)
console.log(333)
```

### 组件的使用
所有在 .vuepress/components 中找到的 *.vue 文件将会自动地被注册为全局的异步组件。如下所示：
```
|- .vuepress
    |- components
        |- v-list.vue
        |- v-cart.vue
        |- v-term
            |- item.vue
```

你可以在README.md中直接这样使用
```
<v-list/>
<v-cart/>
<v-term-item/>
```

### 网站和页面的元数据如何使用
整个网站以及特定页面的元数据将分别暴露为 this.$site 和 this.$page 属性，它们将会被注入到每一个当前应用的组件中。 this.$route 和 this.$router 同样可以使用。
```
{{$site}}
{{$page}}
{{$route}}
{{$router}}
```


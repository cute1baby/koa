### 什么是WebComponent？

WebComponent:它也是一套技术的组合，能提供给开发者组件化开发的能力。


### 什么是组件化呢？
对内高内聚，对外低耦合。对内各个元素彼此紧密结合、相互依赖，对外和其他组件的联系最少且接口简单。


### 阻碍前端组件化的因素
css和dom都是全局的，当一个项目中的两个人都使用了同一个dom和css的样式后，合并代码的时候必然机会影响各自的功能。


### WebComponent 组件化开发
上面谈到了CSS 和 DOM 是阻碍组件化的两个因素。
WebComponent 给出了解决思路，它提供了对局部视图封装能力，可以让 DOM、CSSOM 和 JavaScript 运行在局部环境中，这样就使得局部的 CSS 和 DOM 不会影响到全局。

下面看下WebComponent是如何实现组件化的:
WebComponent 是一套技术的组合，具体涉及到了 Custom elements（自定义元素）、Shadow DOM（影子 DOM）和HTML templates（HTML 模板）。

下面演示一下这3个技术是如何实现数据封装的
```
<!DOCTYPE html>
<html>
<body>
    <!--
            一：定义模板
            二：定义内部CSS样式
            三：定义JavaScript行为
    -->
    <template id="geekbang-t">
        <style>
            p {
                background-color: brown;
                color: cornsilk
            }
            div {
                width: 200px;
                background-color: bisque;
                border: 3px solid chocolate;
                border-radius: 10px;
            }
        </style>
        <div>
            <p>time.geekbang.org</p>
            <p>time1.geekbang.org</p>
        </div>
        <script>
            function foo() {
                console.log('inner log')
            }
        </script>
    </template>
    <script>
        class GeekBang extends HTMLElement {
            constructor() {
                super()
                //获取组件模板
                const content = document.querySelector('#geekbang-t').content
                //创建影子DOM节点
                const shadowDOM = this.attachShadow({ mode: 'open' })
                //将模板添加到影子DOM上
                shadowDOM.appendChild(content.cloneNode(true))
            }
        }
        customElements.define('geek-bang', GeekBang)
    </script>
    <geek-bang></geek-bang>
    <div>
        <p>time.geekbang.org</p>
        <p>time1.geekbang.org</p>
    </div>
    <geek-bang></geek-bang>
</body>

</html>
```
通过上面的例子可以得出，使用WebComponent，通常要实现下面三个步骤：
（1）首先，使用 template 属性来创建模板。利用 DOM 可以查找到模板的内容，但是模板元素是不会被渲染到页面上的，也就是说 DOM 树中的 template 节点不会出现在布局树中，所以我们可以使用 template 来自定义一些基础的元素结构，这些基础的元素结构是可以被重复使用的。

（2）其次，我们需要创建一个 GeekBang 的类。
1）查找模板内容；
2）创建影子 DOM；
3）再将模板添加到影子 DOM 上。

上面的影子 DOM 的作用是将模板中的内容与全局 DOM 和 CSS 进行隔离，这样我们就可以实现元素和样式的私有化了。优点类似于作用域的功能，要访问影子 DOM 内部的样式或者元素也是需要通过约定好的接口的。

通过影子 DOM，我们就实现了 CSS 和元素的封装，在创建好封装影子 DOM 的类之后，我们就可以使用 customElements.define 来自定义元素了

完成了上面的操作，就可以跟使用html一样使用这个自定义元素`geek-bang`了。

另外在影子 DOM 定义的 JavaScript 函数依然可以被外部访问，这是因为 JavaScript 语言本身已经可以很好地实现组件化了。


### 浏览器如何实现影子 DOM
- 首先影子DOM的特点：
（1）影子 DOM 中的元素对于整个网页是不可见的；
（2）影子 DOM 的 CSS 不会影响到整个网页的 CSSOM，影子 DOM 内部的 CSS 只对内部的元素起作用。

那浏览器是如何实现影子 DOM 的呢？如下图：
![](https://static001.geekbang.org/resource/image/5b/22/5bce3d00c8139a7fde9cc90f9d803322.png)

由上图可以看到：每个影子 DOM 都有一个 shadow root 的根节点，我们可以将要展示的样式或者元素添加到影子 DOM 的根节点上。浏览器为了实现影子 DOM 的特性，在代码内部做了大量的条件判断，比如当通过 DOM 接口去查找元素时，如果是影子 DOM，那么就直接跳过 shadow-root 元素的查询操作。所以这样通过 DOM API 就无法直接查询到影子 DOM 的内部元素了。

当生成布局树的时候，渲染引擎也会判断 geek-bang 属性下面的 shadow-root 元素是否是影子 DOM，如果是，那么在影子 DOM 内部元素的节点选择 CSS 样式的时候，会直接使用影子 DOM 内部的 CSS 属性。所以这样最终渲染出来的效果就是影子 DOM 内部定义的样式。


参照小程序中：
小程序用的是webComponent，控制台满屏的“#shadow-root”



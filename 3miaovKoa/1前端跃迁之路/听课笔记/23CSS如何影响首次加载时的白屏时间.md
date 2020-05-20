本文介绍CSS 是如何工作的，然后通过 CSS 的工作流程来分析性能瓶颈，最后再来讨论如何减少首次加载时的白屏时间。

先看一段代码：
```
//theme.css
div{ 
    color : coral;
    background-color:black
}

<html>
<head>
    <link href="theme.css" rel="stylesheet">
</head>
<body>
    <div>geekbang com</div>
</body>
</html>
```
我们来分析下打开这段 HTML 文件时的渲染流水线，你可以先参考下面这张渲染流水线示意图：
![](https://static001.geekbang.org/resource/image/70/18/70a7ea0212ff35fc2be79f1d574ed518.png)

整个解析顺序：
（1）发起主页面的请求，这个发起请求方可能是渲染进程，也有可能是浏览器进程，发起的请求被送到网络进程中去执行。
（2）网络进程接收到返回的 HTML 数据之后，将其发送给渲染进程，渲染进程会解析 HTML 数据并构建 DOM.
请求 HTML 数据和构建 DOM 中间有一段空闲时间，这个空闲时间有可能成为页面渲染的瓶颈。

另外：当渲染进程接收 HTML 文件字节流时，会先开启一个预解析线程，如果遇到 JavaScript 文件或者 CSS 文件，那么预解析线程会提前下载这些数据。

对于上面的代码，预解析线程会解析出来一个外部的 theme.css 文件，并发起 theme.css 的下载。这里也有一个空闲时间需要你注意一下，就是在 DOM 构建结束之后、theme.css 文件还未下载完成的这段时间内，渲染流水线无事可做，因为下一步是合成布局树，而合成布局树需要 CSSOM 和 DOM，所以这里需要等待 CSS 加载结束并解析成 CSSOM。

### 那渲染流水线为什么需要 CSSOM 呢？
和 HTML 一样，渲染引擎也是无法直接理解 CSS 文件内容的，所以需要将其解析成渲染引擎能够理解的结构，这个结构就是 CSSOM。和 DOM 一样，CSSOM 也具有两个作用，第一个是提供给 JavaScript 操作样式表的能力，第二个是为布局树的合成提供基础的样式信息。

- 有了 DOM 和 CSSOM，接下来就可以合成布局树了，合成布局树的流程是：
等 DOM 和 CSSOM 都构建好之后，渲染引擎就会构造布局树。布局树的结构基本上就是复制 DOM 树的结构，不同之处在于 DOM 树中那些不需要显示的元素会被过滤掉，如 display:none 属性的元素、head 标签、script 标签等。
复制好基本的布局树结构之后，渲染引擎会为对应的 DOM 元素选择对应的样式信息，这个过程就是`样式计算`。样式计算完成之后，渲染引擎还需要计算布局树中每个元素对应的几何位置，这个过程就是`计算布局`。通过样式计算和计算布局就完成了最终布局树的构建。

接下来就是绘制阶段了。

再修改一下上面的那个例子：
```

//theme.css
div{ 
    color : coral;
    background-color:black
}

<html>
<head>
    <link href="theme.css" rel="stylesheet">
</head>
<body>
    <div>geekbang com</div>
    <script>
        console.log('time.geekbang.org')
    </script>
    <div>geekbang com</div>
</body>
</html>
```
这段代码在中间加了js代码之后，渲染流水就有变化了：
![](https://static001.geekbang.org/resource/image/f8/1c/f85f8778f273710ca559a52027ed731c.png)

我们知道：在解析 DOM 的过程中，如果遇到了 JavaScript 脚本，那么需要先暂停 DOM 解析去执行 JavaScript，因为 JavaScript 有可能会修改当前状态下的 DOM。

不过在执行 JavaScript 脚本之前，如果页面中包含了外部 CSS 文件的引用，或者通过 style 标签内置了 CSS 内容，那么渲染引擎还需要将这些内容转换为 CSSOM，因为 JavaScript 有修改 CSSOM 的能力，所以在执行 JavaScript 之前，还需要依赖 CSSOM。也就是说 CSS 在部分情况下也会阻塞 DOM 的生成。


如果再修改一下前面的那个demo，那渲染流水会怎么样呢？
```
// theme.css
div{ 
    color : coral;
    background-color:black
}

// foo.js
console.log('time.geekbang.org')

// html
<html>
<head>
    <link href="theme.css" rel="stylesheet">
</head>
<body>
    <div>geekbang com</div>
    <script src='foo.js'></script>
    <div>geekbang com</div>
</body>
</html>
```
我们可以看到：HTML 文件中包含了 CSS 的外部引用和 JavaScript 外部文件。那么渲染流水是这样的
![](https://static001.geekbang.org/resource/image/76/1f/7641c75a80133e747aa2faae8f4c8d1f.png)

在接收到 HTML 数据之后的预解析过程中，HTML 预解析器识别出来了有 CSS 文件和 JavaScript 文件需要下载，然后就同时发起这两个文件的下载请求，需要注意的是，这两个文件的下载过程是重叠的，所以下载时间按照最久的那个文件来算。后面的流水线就和前面是一样的了，不管 CSS 文件和 JavaScript 文件谁先到达，都要先等到 CSS 文件下载完成并生成 CSSOM，然后再执行 JavaScript 脚本，最后再继续构建 DOM，构建布局树，绘制页面。


### 影响页面展示的因素以及优化策略
通过前面的分析我们知道：渲染流水线影响到了首次页面展示的速度，而首次页面展示的速度又直接影响到了用户体验。分析渲染流水线的目的就是为了找出一些影响到首屏展示的因素，然后再基于这些因素做一些针对性的调整。

接下来我们就来看看从发起 URL 请求开始，到首次显示页面的内容，在视觉上经历的三个阶段。
- 第一个阶段，等请求发出去之后，到提交数据阶段，这时页面展示出来的还是之前页面的内容。
- 第二个阶段，提交数据之后渲染进程会创建一个空白页面，我们通常把这段时间称为解析白屏，并等待 CSS 文件和 JavaScript 文件的加载完成，生成 CSSOM 和 DOM，然后合成布局树，最后还要经过一系列的步骤准备首次渲染。
- 第三个阶段，等首次渲染完成之后，就开始进入完整页面的生成阶段了，然后页面会一点点被绘制出来。

影响第一个阶段的因素主要是网络或者是服务器处理这块儿，我们重点关注第二个阶段，这个阶段的主要问题是白屏时间。为了缩短白屏时间，我们来挨个分析这个阶段的主要任务，包括了解析 HTML、下载 CSS、下载 JavaScript、生成 CSSOM、执行 JavaScript、生成布局树、绘制页面一系列操作。

通常情况下的瓶颈主要体现在下载 CSS 文件、下载 JavaScript 文件和执行 JavaScript。

### 那么缩短白屏时长，可以有以下策略
- 通过内联 JavaScript、内联 CSS 来移除这两种类型的文件下载，这样获取到 HTML 文件之后就可以直接开始渲染流程了。

- 但并不是所有的场合都适合内联，那么还可以尽量减少文件大小，比如通过 webpack 等工具移除一些不必要的注释，并压缩 JavaScript 文件。

- 还可以将一些不需要在解析 HTML 阶段使用的 JavaScript 标记上 sync 或者 defer。
    - 解释一下defer的作用。遇到有defer属性的script标签，浏览器继续往下面解析页面，且会并行下载script标签的外部js文件；解析完HTML页面，再执行刚下载的js脚本（所以一般这类js是不操作dom的js）。
    注意两点内容：（1）内置js代码的script标签，以及动态生成的script标签，defer属性不生效；（2）有defer属性的script标签脚本文件里不能使用document.write方法。
    - 解释一下sync的作用。遇到有sync属性的script标签，会继续往下解析，并且同时另开进程下载脚本；脚本下载完毕，浏览器停止解析，开始执行脚本，执行完毕后继续往下解析。
    注意两点内容：（1）无法保证脚本的执行顺序，哪个脚本先下载完毕，就先执行哪个；（2）不能使用document.write方法。

所以：脚本之间没有依赖关系的，使用sync；脚本之间有依赖关系的，使用defer；两个属性同时设置则sync生效。

- 对于大的 CSS 文件，可以通过媒体查询属性，将其拆分为多个不同用途的 CSS 文件，这样只有在特定的场景下才会加载特定的 CSS 文件。



# 思考
当你横屏方向拿着一个手机时，打开一个页面，观察下面几种资源的加载方式，你认为哪几种会阻塞页面渲染？为什么？
```
<script src="foo.js" type="text/javascript"></script>
<script defer src="foo.js" type="text/javascript"></script>
<script sync src="foo.js" type="text/javascript"></script>
<link rel="stylesheet" type="text/css" href="foo.css" />
<link rel="stylesheet" type="text/css" href="foo.css" media="screen"/>
<link rel="stylesheet" type="text/css" href="foo.css" media="print" />
<link rel="stylesheet" type="text/css" href="foo.css" media="orientation:landscape" />
<link rel="stylesheet" type="text/css" href="foo.css" media="orientation:portrait" />
```

个人理解：下面4个阻塞了和1个可能阻塞
```
<script src="foo.js" type="text/javascript"></script>
<script sync src="foo.js" type="text/javascript"></script>  //sync没有该属性，应该是async
<link rel="stylesheet" type="text/css" href="foo.css" media="screen"/>
<link rel="stylesheet" type="text/css" href="foo.css" media="orientation:landscape" />

// 有可能阻塞
<link rel="stylesheet" type="text/css" href="foo.css" />
```

### 疑问1
如果script放在</body> 还有优化的意义么 这样就不会阻塞渲染了么
```
作者回复: 依然会阻塞啊，只不过DOM会提前生成，但是渲染之前还需要等待该JS的执行完成！
```


### 疑问2
```
<html>
<head>
    <link href="theme.css" rel="stylesheet">
</head>
<body>
    <div>geekbang com</div>
    <script>
        while (1) {}
    </script>
    <div>geekbang com</div>
</body>
</html>
```
dom解析应该一直被while循环阻塞，更生成不了布局树和绘制位图。所以上述代码显示白屏






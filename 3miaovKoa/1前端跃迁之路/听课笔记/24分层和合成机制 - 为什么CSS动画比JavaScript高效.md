在前面`《05 | 渲染流程（上）：HTML、CSS 和 JavaScript 文件，是如何变成页面的？》`文章中，我们介绍过 DOM 树生成之后，还要经历布局、分层、绘制、合成、显示等阶段后才能显示出漂亮的页面。

主要是渲染引擎的分层和合成机制。有助于理解CSS 动画和 JavaScript 底层工作机制。


# 显示器是怎么显示图像的
每个显示器都有固定的刷新频率，通常是 60HZ，也就是每秒更新 60 张图片，更新的图片都来自于显卡中一个叫前缓冲区的地方，显示器所做的任务很简单，就是每秒固定读取 60 次前缓冲区中的图像，并将读取的图像显示到显示器上。


### 显卡是做什么的呢？
显卡的职责就是合成新的图像，并将图像保存到后缓冲区中，一旦显卡把合成的图像写到后缓冲区，系统就会让后缓冲区和前缓冲区互换，这样就能保证显示器能读取到最新显卡合成的图像。通常情况下，显卡的更新频率和显示器的刷新频率是一致的。但有时候，在一些复杂的场景中，显卡处理一张图片的速度会变慢，这样就会造成视觉上的卡顿。

### 帧 VS 帧率
大多数设备屏幕的更新频率是 60 次 / 秒，这也就意味着正常情况下要实现流畅的动画效果，渲染引擎需要每秒更新 60 张图片到显卡的后缓冲区。

我们把渲染流水线生成的每一副图片称为一帧，把渲染流水线每秒更新了多少帧称为帧率，比如滚动过程中 1 秒更新了 60 帧，那么帧率就是 60Hz

如果在一次动画过程中，渲染引擎生成某些帧的时间过久，那么用户就会感受到卡顿，这会给用户造成非常不好的印象。要解决卡顿问题，就要解决每帧生成时间过久的问题，为此 Chrome 对浏览器渲染方式做了大量的工作，其中最卓有成效的策略就是引入了分层和合成机制。分层和合成机制代表了当今最先进的渲染技术，所以接下来我们就来分析下什么是合成和渲染技术。


# 如何生成一帧图像
关于其中任意一帧的生成方式，有重排、重绘和合成三种方式。
通常情况下：渲染路径越长，生成图像花费的时间就越多。
（1）比如重排，它需要重新根据 CSSOM 和 DOM 来计算布局树，这样生成一幅图片时，会让整个渲染流水线的每个阶段都执行一遍，如果布局复杂的话，就很难保证渲染的效率了。
（2）重绘因为没有了重新布局的阶段，操作效率稍微高点，但是依然需要重新计算绘制信息，并触发绘制操作之后的一系列操作。
（3）而合成操作的路径就显得非常短了，并不需要触发布局和绘制两个阶段，如果采用了 GPU，那么合成的效率会非常高。

关于渲染引擎生成一帧图像的几种方式，按照效率我们推荐合成方式优先，若实在不能满足需求，那么就再退后一步使用重绘或者重排的方式。

Chrome 中的合成技术，可以用三个词来概括总结：分层、分块和合成。

# 分层和合成
为了提升每帧的渲染效率，Chrome 引入了分层和合成的机制。那该怎么来理解分层和合成机制呢？

可以想象成一张网页是由很多个图片叠加在一起的，每个图片就对应一个图层，这个图层的概念跟photoshop是类似的。最后将这些图层叠加在一起后，就能呈现出我们看到的网页了。

在这个过程中，将素材分解为多个图层的操作就称为分层，最后将这些图层合并到一起的操作就称为合成。所以，分层和合成通常是一起使用的。



理解了为什么要引入合成和分层机制，下面我们再来看看 Chrome 是怎么实现分层和合成机制的。

在 Chrome 的渲染流水线中，分层体现在生成布局树之后，渲染引擎会根据布局树的特点将其转换为层树（Layer Tree），层树是渲染流水线后续流程的基础结构。

层树中的每个节点都对应着一个图层，下一步的绘制阶段就依赖于层树中的节点。

在《06 | 渲染流程（下）：HTML、CSS 和 JavaScript 文件，是如何变成页面的？》中我们介绍过，绘制阶段其实并不是真正地绘出图片，而是将绘制指令组合成一个列表，比如一个图层要设置的背景为黑色，并且还要在中间画一个圆形，那么绘制过程会生成|Paint BackGroundColor:Black | Paint Circle|这样的绘制指令列表，绘制过程就完成了。

有了绘制列表之后，就需要进入光栅化阶段了，光栅化就是按照绘制列表中的指令生成图片。每一个图层都对应一张图片，合成线程有了这些图片之后，会将这些图片合成为“一张”图片，并最终将生成的图片发送到后缓冲区。这就是一个大致的分层、合成流程。

需要重点关注的是，合成操作是在合成线程上完成的，这也就意味着在执行合成操作时，是不会影响到主线程执行的。这就是为什么经常主线程卡住了，但是 CSS 动画依然能执行的原因。

### 分块
如果说分层是从宏观上提升了渲染效率，那么分块则是从微观层面提升了渲染效率。

通常情况下，页面的内容都要比屏幕大得多，显示一个页面时，如果等待所有的图层都生成完毕，再进行合成的话，会产生一些不必要的开销，也会让合成图片的时间变得更久。

因此，合成线程会将每个图层分割为大小固定的图块，然后优先绘制靠近视口的图块，这样就可以大大加速页面的显示速度。不过有时候， 即使只绘制那些优先级最高的图块，也要耗费不少的时间，因为涉及到一个很关键的因素——纹理上传，这是因为从计算机内存上传到 GPU 内存的操作会比较慢。

在首次合成图块的时候使用一个低分辨率的图片。比如可以是正常分辨率的一半，分辨率减少一半，纹理就减少了四分之三。在首次显示页面内容的时候，将这个低分辨率的图片显示出来，然后合成器继续绘制正常比例的网页内容，当正常比例的网页内容绘制完成后，再替换掉当前显示的低分辨率内容。这种方式尽管会让用户在开始时看到的是低分辨率的内容，但是也比用户在开始时什么都看不到要好。



### 如何利用分层技术优化代码
在写 Web 应用的时候，你可能经常需要对某个元素做几何形状变换、透明度变换或者一些缩放操作，如果使用 JavaScript 来写这些效果，会牵涉到整个渲染流水线，所以 JavaScript 的绘制效率会非常低下。

这时你可以使用 will-change 来告诉渲染引擎你会对该元素做一些特效变换，CSS 代码如下：
```
.box {
    will-change: transform, opacity;
}
```
这段代码就是提前告诉渲染引擎 box 元素将要做几何变换和透明度变换操作，这时候渲染引擎会将该元素单独实现一帧，等这些变换发生时，渲染引擎会通过合成线程直接去处理变换，这些变换并没有涉及到主线程，这样就大大提升了渲染的效率。这也是 CSS 动画比 JavaScript 动画高效的原因。

如果涉及到使用合成线程来处理 CSS 特效或者动画的情况，就尽量使用 will-change 来提前告诉渲染引擎，让它为该元素准备独立的层。

# 思考
下面代码中，结合 Performance 面板、内存面板和分层面板，全面比较在 box 中使用 will-change 和不使用 will-change 的效率、性能和内存占用等情况。
```
<html>
<head>
    <title>观察will-change</title>
    <style>
        .box {
            will-change: transform, opacity;
            display: block;
            float: left;
            width: 40px;
            height: 40px;
            margin: 15px;
            padding: 10px;
            border: 1px solid rgb(136, 136, 136);
            background: rgb(187, 177, 37);
            border-radius: 30px;
            transition: border-radius 1s ease-out;
        }
        body {
            font-family: Arial;
        }
    </style>
</head>
<body>
    <div id="controls">
        <button id="start">start</button>
        <button id="stop">stop</button>
    </div>
    <div>
        <div class="box">旋转盒子</div>
        <div class="box">旋转盒子</div>
        <div class="box">旋转盒子</div>
        <div class="box">旋转盒子</div>
        <div class="box">旋转盒子</div>
        <div class="box">旋转盒子</div>
        <div class="box">旋转盒子</div>
    </div>
    <script>
        let boxes = document.querySelectorAll('.box');
        let start = document.getElementById('start');
        let stop = document.getElementById('stop');
        let stop_flag = false
        start.addEventListener('click', function () {
            stop_flag = false
            requestAnimationFrame(render);
        })


        stop.addEventListener('click', function () {
            stop_flag = true
        })

        let rotate_ = 0
        let opacity_ = 0

        function render() {
            if (stop_flag)
                return 0
            rotate_ = rotate_ + 6
            if (opacity_ > 1)
                opacity_ = 0
            opacity_ = opacity_ + 0.01
            let command = 'rotate(' + rotate_ + 'deg)';
            for (let index = 0; index < boxes.length; index++) {
                boxes[index].style.transform = command
                boxes[index].style.opacity = opacity_
            }
            requestAnimationFrame(render);
        }
    </script>
</body>
</html>
```
自己突发奇想，用requestAnimationFrame写了一个例子：
```
<html>
<head>
    <title>观察will-change</title>
    <style>
        .bb{
            margin-top: 100px;
            width: 100px;
            height: 100px;
            border-radius: 50%;
            background: orange;
        }
    </style>
</head>
<body>
<p class="bb"></p>
<button class="start_btn">触发小圆</button>
<button class="end_btn">停止小圆</button>
<script>
    var bDom = document.querySelector('.bb')
    var start_btn = document.querySelector('.start_btn')
    var end_btn = document.querySelector('.end_btn')
    var id = null
    var crl_status = false
    start_btn.onclick = function(){
        if(crl_status){
            return;
        }
        crl_status = true
        id = requestAnimationFrame(animateFun)
    }
    end_btn.onclick = function(){
        cancelAnimationFrame(id);
        crl_status = false
    }

var transX = 0;
var direction = 'right'
function animateFun(){
    if(transX < 0){
        direction = 'right'
    }
    if(transX > 700){
        direction = 'left'
    }
    if(direction === 'left'){
        transX = transX - 10
    }else{
       transX = transX + 10 
    }
    
    var X = 'translateX(' + transX + 'px)';
    bDom.style.transform = X
    id = requestAnimationFrame(animateFun)
}
</script>
</body>
</html>
```


### 疑问1
既然css动画会跳过重绘阶段，则意味着合成阶段的绘制列表不会变化。但是最终得到的相邻两帧的位图是不一样的。那么在合成阶段，相同的绘制列表是如何绘制出不同的位图的？难道绘制列表是有状态的？还是绘制列表一次能绘制出多张位图？
```
记住一点，能直接在合成线程中完成的任务都不会改变图层的内容，如文字信息的改变，布局的改变，颜色的改变，统统不会涉及，涉及到这些内容的变化就要牵涉到重排或者重绘了。

能直接在合成线程中实现的是整个图层的几何变换，透明度变换，阴影等，这些变换都不会影响到图层的内容。

比如滚动页面的时候，整个页面内容没有变化，这时候做的其实是对图层做上下移动，这种操作直接在合成线程里面就可以完成了。

再比如文章题目列子中的旋转操作，如果样式里面使用了will-change ，那么这些box元素都会生成单独的一层，那么在旋转操作时，只要在合成线程将这些box图层整体旋转到设置的角度，再拿旋转后的box图层和背景图层合成一张新图片，这个图片就是最终输出的一帧，整个过程都是在合成线程中实现的。
```

### 理解1
```
文中这段话中的“帧”应该改为“层”：
这段代码就是提前告诉渲染引擎 box 元素将要做几何变换和透明度变换操作，这时候渲染引擎会将该元素单独实现一帧，等这些变换发生时，渲染引擎会通过合成线程直接去处理变换，这些变换并没有涉及到主线程，这样就大大提升了渲染的效率。
```

### 理解2
关于css动画和js动画效率的问题应该有点武断了，will-change只是优化手段，使用js改变transform也能享受这个属性带来的优化。既然css动画和js动画都能享受这个优化，那就不能说明css动画比js动画效率高


### 理解3
Performance：使用‘ will-change: transform, opacity;‘后，主线程均匀分布，密集棱状性；GPU均匀稀疏，平均500ms一条棱;rasterizer thread1 持续paint;Summery中GPU占用一小点其它98%以上都是idle;FPS,CPU都很稳定。去掉‘ will-change: transform, opacity;‘后，主线程均匀分布，密集棱状性；GPU密集棱状形；rasterizer thread1 和 thread2 持续paint；Summery中rendering和paint占用约20%时间；FPS，CPU略微不稳定。结论：will-change可以减轻GPU负担（为什么？合成线程不用GPU？），可以减轻rasterizer 线程负担（是因为减少重绘和重排吗），减少重绘和重排，动画的针率更稳定，cpu计算更少（为什么？计算分配给别的核了？）。。。。Layers: ：使用‘ will-change: transform, opacity;‘后，会合成新的层，不使用‘ will-change: transform, opacity;‘后，没有新的层。结论：不使用‘ will-change: transform, opacity;‘由于没有新的层生成，更改都会在一个层改变，所以会涉及到更多重绘和重排。Memory： 使用‘ will-change: transform, opacity;‘这个后System会更少，应该是占有系统内存会更少吧。那就尴尬了，will-change会有新图层，应该内存会增加。


### 理解4
加will-change：开启动画后整个过程帧率在59.9。图层由60个排列的变为1个重叠的60层。load时间在80ms左右，fp时间在200ms左右。内存方面为2m左右。
不加will-change：透明度变为0的时候帧率会变成40左右，随后增加到60。图层由60个排列。load时间在80ms左右，fp时间在100ms左右。内存方面为2m左右。


### 理解5
chrome 无痕模式 开启more-tools -> Rendering -> FPS meter no-will-changes(fps:12, gpu-memory：15MB) set-will-change(fps:53， gpu-memory:4.5MB)
// 引入koa，有点类似http模块
const Koa = require('koa')

// 创建一个http服务器，类似于createServer函数
const app = new Koa()

// 注册中间件（中间件函数的回调参数是一个迭代器，好处是通过next控制中间件函数执行的流程）
// app.use(async (ctx, next) => {
//     console.log(111)
//     // 此时如果发现外层包裹着标签，koa会默认把它解析成html
//     ctx.body = '<strong>hello ';
//     next();
// })

// app.use(async (ctx, next) => {
//     console.log(222)
//     ctx.body += 'koa</strong>';
// })


// 模拟错误信息的方法
// app.use((ctx, next) => {
//     throw new Error('错误')
// })

// // 处理错误信息
// app.on('error', err => {
//     console.log('获取了错误信息');
// })


// 现在注册了两个中间件，希望在当前的ctx中传入数据再下一个中间件中使用
// app.use((ctx, next) => {
//     ctx.state.user = {name: "李钟", age: 10}
//     ctx.body ="<em>李钟</em>"
//     next();
// })

app.use((ctx, next) => {
    // 获取上一个中间件传过来的值
    // console.log(ctx.state.user)
    ctx.throw(404, '抛出错误到下面的error方法回调中')
})

app.on('error', err => {
    console.log(err);
})

// 监听地址和端口
app.listen(8080)



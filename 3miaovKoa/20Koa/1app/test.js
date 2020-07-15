const Koa = require('koa')
const app = new Koa()

// 中间过程处理数据，输出结果
app.use((ctx, next) => {
    const str = 'hello world'
    ctx.body = str
})
// 绑定端口3000
app.listen(3000)
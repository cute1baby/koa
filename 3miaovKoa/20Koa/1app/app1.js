const Koa = require('koa');

const app = new Koa();

app.use((ctx, next) => {
    // 来打印一下request的一些值
    console.log(ctx.request.header)

    // 设置响应内容，然后自动会设置content-type格式
    ctx.response.body = {a: 10, b: 20}  // 设置成对象，content-type就是application/json了

    // ctx.redirect('/abc');
    // 设置下载文件头(直接下载了一个a.txt文件)
    // ctx.attachment('a.txt');

    ctx.body = '返回信息'


})

app.use((ctx, next) => {
    ctx.body = 'hello'
})

app.listen(8080)
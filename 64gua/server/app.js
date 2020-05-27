const Koa = require('koa')
const KoaStaticCache = require('koa-static-cache')
const bodyParser = require('koa-body-parser')
const router = require('./routes/main')

const app = new Koa()


// 静态文件的请求(一般针对服务端渲染用的多)
app.use(KoaStaticCache(__dirname + '/static', {
    prefix: '/static',
    maxAge: false,
    gzip: true
})
)
// 对post请求的解析
app.use(bodyParser({}))

// 将路由挂载到app上
app.use(router.routes())

app.listen(3000)
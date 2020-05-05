const Koa = require('koa')

const KoaStaticCache = require('koa-static-cache')
const bodyParser = require('koa-body-parser')
const router = require('./routes/main')
const Session = require('koa-session');
const app = new Koa()

// 设置登录返回cookies的加密方式
// app.keys = new KeyGrip(['im a newer secret', 'i like turtle'], 'sha256');

// 设置session的加密方式
app.keys = ['miaov'];
app.use(Session({
    key: 'koa:sess',
    maxAge: 86400000,
    autoCommit: true,
    overwrite: true,
    httpOnly: true,
    signed: true,
    rolling: false,
    renew: false
}, app));

// 设置响应头跨域【现在前端配置了，后端就不配置】
// app.use(async (ctx,next) => {
//     ctx.set('Access-Control-Allow-Origin', '*')
//     await next()
// })

// 静态文件的请求
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

app.listen(80)
const Koa = require('koa')
const KoaStaticCache = require('koa-static-cache')
const KoaRouter = require('koa-router')
const Swig = require('koa-swig')
const co = require('co')

const app = new Koa()
const router = new KoaRouter();

const render = Swig({
    root: __dirname + '/views',   // 模板存放的目录
    autoescape: true,  //是否自动 escape 编码
    cache: false,  //是否启用缓存
    ext: 'html'  //模板后缀
})

// 将模板渲染方法render挂载到ctx的render中
app.context.render = co.wrap(render)


// 只要有请求，则通过KoaStaticCache进行处理【处理静态资源】
app.use(KoaStaticCache(__dirname+'/static',{
    prefix: '/public',   //如果当前请求url是以public开始，则作为静态文件访问，用于做区分。如：http://localhost:8080/public/index.html
    maxAge: 0, // 设置缓存时间，默认是0，单位毫秒
    gzip: true // 开启gzip压缩传输，默认开启
}))

router.get('/user', (ctx, next) => {
    ctx.body = '这是用户接口'
})

// 使用模板引擎
router.get('/book', async (ctx, next) => {
    ctx.body = await ctx.render('book.html', {
        userList: [
            { name: '李钟', age: 10 },
            {name: '万鹏', age: 40},
            {name: '黄飘', age: 14},
            { name: '建明', age: 13 }
        ]
    })
})


// 将router中所有的接口都挂载到app对象中
app.use(router.routes());
app.listen(8080)
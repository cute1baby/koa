const Koa = require('koa')
const KoaStaticCache = require('koa-static-cache')

const KoaRouter = require('koa-router')
const app = new Koa()
const router = new KoaRouter();


// 只要有请求，则通过KoaStaticCache进行处理【处理静态资源】
app.use(KoaStaticCache(__dirname+'/static',{
    prefix: '/public',   //如果当前请求url是以public开始，则作为静态文件访问，用于做区分。如：http://localhost:8080/public/index.html
    maxAge: 0, // 设置缓存时间，默认是0，单位毫秒
    gzip: true // 开启gzip压缩传输，默认开启
}))

/**
 * 之前使用node方式写的switch.. case.. default方式写的路由特别简单，而且还需要处理很多其他的一些问题
 * 所以推荐使用koa-router的方式简化这些操作
*/
router.get('/user', (ctx, next) => {
    ctx.body = '这是用户接口'
})
router.get('/list', (ctx, next) => {
    ctx.body = '这是列表接口'
})


const pRouter = new KoaRouter();
pRouter.get('/', (ctx, next) => {
    ctx.body = '这是产品首页接口'
})
pRouter.get('/sub', (ctx, next) => {
    ctx.body = '这是产品二级分类接口'
})
// 嵌套路由（显示产品下面的分类）
router.use('/product', pRouter.routes())



// 前缀路由
const routerItem = new KoaRouter({
    prefix: '/item'
})
routerItem.get('/', (ctx, next) => {
    ctx.body = '我是前缀路由item中的首页，这种书写方式跟嵌套路由类似效果';
})
routerItem.get('/add', (ctx, next) => {
    ctx.body = '我是前缀路由item中的添加页面';
})
app.use(routerItem.routes());


// 动态路由
const musicItem = new KoaRouter()
musicItem.get('/music/:i', (ctx, next) => {
    ctx.body = '我是前缀路由item中的添加页面: ' + ctx.params.i;
})
app.use(musicItem.routes());


// 路由重定向
router.redirect('/wakaka', '/user', 301)


// url生成器, 下面地址类似于/list/1?order=desc
const beUrl = KoaRouter.url('/list', { page: 1 }, { query: { order: 'desc' }})
console.log('>>>>>beUrl', beUrl);

// 将router中所有的接口都挂载到app对象中
app.use(router.routes());



app.listen(8080)
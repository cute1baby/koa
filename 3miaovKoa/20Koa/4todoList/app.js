const Koa = require('koa')
const Router= require('koa-router')
const KoaStaticCache = require('koa-static-cache')
const Swig = require('koa-swig')
const co = require('co')
const bodyParser = require('koa-body-parser')
const app = new Koa()
const router = new Router()

const todoDatas = {
    baseId: 3,
    name: 'todoList',
    skin: 'index.css', //用于切换皮肤的设置，切换index.css和green.css
    todoList: [
        { id: 3, name: '测试3', isFinish: false },
        { id: 2, name: '测试2', isFinish: true },
        { id: 1, name: '测试1', isFinish: false }
    ]
}

// 静态文件的请求
app.use(KoaStaticCache(__dirname + '/static', {
        prefix: '/static',
        maxAge: false,
        gzip: true
    })
)

// 对post请求的解析
app.use(bodyParser({}))

app.context.render = co.wrap(Swig({
    root: __dirname + '/views',  //模板存放文件路径(记得加上__dirname)
    autoescape: false, //是否启用html编码，为了安全考虑一般设置为false,设置为true时类似于v-html一样会把标签进行编译
    cache: false, //是否启用缓存，开发环境一般不缓存，不设置缓存每次访问都会去解析储存于内存中的模板，
    // cache: 'memory', // 一般用于线上生成环境，设置缓存后模板会放置在硬盘中；如果模板修改，需要重启服务
    ext: 'html'  //模板的后缀
}))



// 首页展示
router.get('/', async (ctx,next) => {
    // 返回模板和模板数据
    ctx.body = await ctx.render('index.html', {
        data: todoDatas
    })
})

// 添加页展示（因为是展示页面，所以用get请求的方式）
router.get('/add', async (ctx, next) => {
    ctx.body = await ctx.render('add.html', {
        data: {
            name: todoDatas.name
        }
    })
})


// 添加页的数据保存
router.post('/add', async (ctx, next) => {
    const {title} = ctx.request.body;
    console.log('title>>>>', !title.trim())
    if (!title.trim()){
        ctx.body = await ctx.render('message.html', {
            data: {
                name: todoDatas.name,
                msg: '请添加名称!',
                path: '/add'
            }
        })
        return;
    }
    // 进行数据拼接
    todoDatas.todoList.unshift({
        id: ++todoDatas.baseId,
        name: title,
        isFinish: false
    })

    // 跳转到信息提示页面
    ctx.body = await ctx.render('message.html', {
        data:{
            name: todoDatas.name,
            msg: '恭喜你数据添加成功!',
            path: '/'
        }
    })

})



// 修改页展示
router.get('/change/:id', async (ctx, next) => {
    const id = ctx.params.id;
    todoDatas.todoList.forEach(todo => {
        if (String(todo.id) === id){
            todo.isFinish = !todo.isFinish
        }
    })
    ctx.redirect('/')
})

// 删除页展示
router.get('/remove/:id', async (ctx, next) => {
    const id = ctx.params.id;
    todoDatas.todoList = todoDatas.todoList.filter(todo => String(todo.id) !== id)
    ctx.body = await ctx.render('message.html', {
        data: {
            name: todoDatas.name,
            msg: '恭喜你数据删除成功!',
            path: '/'
        }
    })
})

// 将路由挂载到app上
app.use(router.routes())

app.listen(8080)
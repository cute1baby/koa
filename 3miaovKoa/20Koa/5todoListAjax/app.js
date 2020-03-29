const Koa = require('koa')
const Router = require('koa-router')
const BodyParser = require('koa-body-parser')
const KoaStaticCache = require('koa-static-cache')
const fs = require('fs');

const app = new Koa();
const router = new Router();

try{

const todoDatas = JSON.parse(fs.readFileSync('./data.json'))

// 处理post请求参数问题
app.use(BodyParser({}))
app.use(KoaStaticCache(__dirname + '/static', {
    prefix: '/static',
    gzip: true
}))

// 获取todoList数据，接口名称：/getList
router.get('/getList', async (ctx, next) => {
    // 定义后端返回的数据格式。code => 0数据返回正常，非0则是失败数据
    const resData = {
        code: 0,
        list: todoDatas.todoList || []
    }
    ctx.body = resData
})


//修改todoList数据状态
router.get('/changeStatus', async (ctx, next) => {
    const id = ctx.query.id;
    if(!id){
        ctx.body = {
            code: 1,
            msg: '没有传入id，请确保操作正确'
        }
        return;
    }
    todoDatas.todoList.forEach(todo => {
        if (String(todo.id) === String(id)){
            todo.isFinish = !todo.isFinish
        }
    })
    ctx.body = {
        code: 0,
        list: todoDatas.todoList,
        msg: ''
    }
    fs.writeFileSync('./data.json', JSON.stringify(todoDatas))
})

// 添加数据到todolist
router.post('/addItem', async (ctx, next) => {
    const name = ctx.request.body.name;
    if(!name.trim()){
        ctx.body = {
            code: 1,
            msg: '没有传入名称，请确保操作正确'
        }
        return;
    }
    todoDatas.todoList.push({
        id: ++todoDatas.baseId,
        name,
        isFinish: false
    })
    ctx.body = {
        code: 0,
        list: todoDatas.todoList,
        msg: ''
    }
    fs.writeFileSync('./data.json', JSON.stringify(todoDatas))
})

// 删除todolist中的数据
router.get('/deleteItem', async (ctx, next) => {
    const id = ctx.query.id;
    if (!id) {
        ctx.body = {
            code: 1,
            msg: '没有传入id，请确保操作正确'
        }
        return;
    }
    console.log('>>>>todoDatas', todoDatas);
    todoDatas.todoList = todoDatas.todoList.filter(todo => String(todo.id) !== String(id))

    ctx.body = {
        code: 0,
        msg: '删除成功'
    }
    fs.writeFileSync('./data.json', JSON.stringify(todoDatas))
})

app.use(router.routes())

app.listen(8080)

} catch (err) {
    console.log(err)
}
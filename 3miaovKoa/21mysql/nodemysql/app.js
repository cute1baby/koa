(async function(){
    const Koa = require('koa')
    const Router = require('koa-router')
    const Static = require('koa-static-cache')
    const BodyParser = require('koa-body-parser')
    const mysql = require('mysql2/promise')
    const app = new Koa()
    const router = new Router()

    // 连接服务器和配置
    const connection = await mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: '1111',
        database: 'miaov'
    })

    app.use(Static(__dirname+'/static', {
        prefix: '/static',
        gzip: true
    }))
    //配置获取post请求参数
    app.use(BodyParser())

    // 获取todoList数据，接口名称：/getList
    router.get('/getList', async (ctx, next) => {
        const { page, limit, type} = ctx.query;
        const where = type ? `where isFinish=${type}` : ``;
        // 去数据库中查询数据

        // 使用降序的方式排列
        // const [list] = await connection.query('SELECT id,name,isFinish FROM todos ORDER BY isFinish DESC, id ASC')

        // 每次发送限制几条(TOP5)
        // const [list] = await connection.query('SELECT id,name,isFinish FROM todos ORDER BY id DESC LIMIT 5')

        /**
         * 做分页的功能
         * 这里的offset是指当前数据从第几条算起，下标从0开始
         * 以每页显示5条算的话，假设当前页码为page,则计算方式应该为：
         * LIMIT 5 OFFSET (page-1) *5
         */
        const [allTodos] = await connection.query(`SELECT id,name,isFinish FROM todos ${where}`)

        const pages = Math.ceil(allTodos.length / limit)// 一共有多少页
        const sql = `SELECT id,name,isFinish FROM todos ${where} ORDER BY id DESC LIMIT ${limit} OFFSET ${(page-1)*limit}`
        const [list] = await connection.query(sql)
        console.log(pages)

        // 定义后端返回的数据格式。code => 0数据返回正常，非0则是失败数据
        const resData = {
            code: 0,
            list: list || [],
            pages
        }
        ctx.body = resData
    })

    // 添加数据到todolist
    router.post('/addItem', async (ctx, next) => {
        const name = ctx.request.body.name;
        if (!name.trim()) {
            ctx.body = {
                code: 1,
                msg: '没有传入名称，请确保操作正确'
            }
            return;
        }
        const [res] = await connection.query(`INSERT INTO todos (name,isFinish) value ("${name}", 0)`)

        // res.affectedRows是成功添加的条数
        if (res.affectedRows > 0){
            ctx.body = {
                code: 0,
                msg: '数据添加成功'
            }
        }else{
            ctx.body = {
                code: 1,
                data: '数据添加失败'
            }
        }

    })

    app.use(router.routes())
    app.listen(8080)

})()
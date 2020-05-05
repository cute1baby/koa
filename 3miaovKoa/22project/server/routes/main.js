// const md5 = require('md5')   node.js中不能直接使用MD5模块
const Router = require('koa-router')
const Models = require('../models')
const md5 = require('../util/util')
const Sequelize = require('sequelize');
const router = new Router()



router.get('/', async ctx => {

    // 所有评论及评论对应的用户信息
    /**
     * 获取queryString传递过来的数据
    */
    let page = ctx.query.page || 1;
    let prepage = ctx.query.prepage || 2;  //下面使用的时候一定要转成数字类型，不然就会报错
    let offsetNum = prepage * (page - 1);
    console.log(page, prepage, offsetNum)

    let rs = await Models.Contents.findAndCountAll({
        limit: Number(prepage),
        offset: offsetNum,
        include: { model: Models.Users }
    })
    ctx.body = {
        code: 0,
        count: rs.count,
        data: rs.rows.map(d => {
            return {
                id: d.id,
                title: d.title,
                content: d.content,
                user_id: d.user_id,
                username: d.User.username,
                created_at: d.createdAt,
                like_count: d.like_count,
                comment_count: d.comment_count
            }
        })
    }
})

router.post('/register', async ctx => {
    let username = ctx.request.body.username.trim();
    let password = ctx.request.body.password.trim();
    let repassword = ctx.request.body.repassword.trim();

    if (!username || !password || !repassword){
        return ctx.body = {
            code: 1,
            msg: '请输入用户名和密码',
        }
    }
    if (password !== repassword){
        return ctx.body = {
            code: 2,
            msg: '两次输入的密码不一致',
        }
    }

    if (password !== repassword) {
        return ctx.body = {
            code: 2,
            msg: '两次输入的密码不一致',
        }
    }

    const user = await Models.Users.findOne({
        where: { username }
    })
    console.log('user=====', user)
    if (user) {
        return ctx.body = {
            code: 3,
            msg: '该用户已经注册',
        }
    }

    console.log(password)
    // 往数据库中插入用户
    let newUser = await Models.Users.build({
        username,
        password: md5(password)
    }).save();

    ctx.body = {
        code: 0,
        msg: '恭喜你注册成功',
        data: {
            id: newUser.get('id'),
            username: newUser.get('username')
        }
    }

})

router.post('/login', async ctx => {
    let username = ctx.request.body.username.trim();
    let password = ctx.request.body.password.trim();
    const user = await Models.Users.findOne({
        where: { username }
    })
    if (!user) {
        return ctx.body = {
            code: 1,
            msg: '不存在该用户'
        }
    }
    if (user.get('password') !== md5(password)){
        return ctx.body = {
            code: 2,
            msg: '账号或者密码错误'
        }
    }
    console.log('姓名=====', user.get('username'))
    // 设置uId为session加密形式(与前面的app.keys对应起来)，username可修改
    // ctx.session.uid = user.get('id');
    ctx.cookies.set('username', encodeURIComponent(user.get('username')), {
        httpOnly: false
    });
    ctx.session.uid = user.get('id');

    ctx.body = {
        code: 0,
        data: {
            id: user.get('id'),
            username: user.get('username')
        }
    }
})

router.post('/like', async ctx => {
    // 让客户端请求的时候带过来一个凭证
    let contentId = ctx.request.body.content_id;    //要点赞的内容id
    // let uid = ctx.request.body.uid; //当前点赞的用户

    // 根据上面的cookie确定，如果当前请求是一个登录的用户，那么头信息肯定会有当前这个登录用户id
    let uid = ctx.session.uid;

    // console.log(contentId, uid);

    if (!uid) {
        return ctx.body = {
            code: 1,
            data: '你还没有登录'
        }
    }

    // 获取当前被点赞的内容
    let content = await Models.Contents.findOne({
        where: {id: contentId}
    });
    console.log("content====", content, contentId);
    if (!content) {
        return ctx.body = {
            code: 2,
            data: '没有对应的内容'
        }
    }

    // 查询当前用户是否对该内容已经点过赞了
    // SELECT * FROM likes WHERE content_id=1 and user_id=1
    let like = await Models.Likes.findOne({
        where: {
            [Sequelize.Op.and]: [
                {'content_id': contentId},
                {'user_id': uid}
            ]
        }
    });

    if (like) {
        return ctx.body = {
            code: 3,
            data: '你已经点过赞了'
        }
    }

    // 对内容的like数据进行增加
    content.set( 'like_count', content.get('like_count') + 1 );
    await content.save();
    // console.log(content);

    await Models.Likes.build({
        content_id: contentId,
        user_id: uid
    }).save();

    ctx.body = {
        code: 0,
        data: content
    }
})

module.exports = router
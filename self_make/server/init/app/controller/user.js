'use strict';

const Controller = require('egg').Controller;
const jwt = require('jsonwebtoken')
// 生成唯一key方法
const nanoid = require('nanoid')
const {successRes, failRes} = require('../utils/response')

class UserController extends Controller {
    async login() {
        const { ctx, service } = this;
        const {
            username,
            password
        } = ctx.request.body
        if(!username || !password){
            ctx.body = failRes('用户名和密码不能为空', 1010)
        }else{
            const transPassword = jwt.sign(password, 'pwd')
            // 通过用户名去查用户
            const user = await service.user.getUserByUsername({username})
            // 如果没有，则注册并登录
            if(!user){
                // userId是一个16位的随机数
                const newUser = {
                    userId: nanoid(16),
                    username,
                    password: transPassword
                }
                // 没有查找到该用户，默认进行注册
                const res = service.user.createUser(newUser)
                // exp单位是秒，设置7天过期
                const token = jwt.sign({
                    token: res.userId,
                    exp: Math.floor(Date.now() / 1000) + (3600 * 24 * 7)
                    // 5分钟过期，测试
                    // exp: Math.floor(Date.now() / 1000) + (60 * 5)
                }, 'token')
                ctx.body = successRes({
                    token,
                    userId: res.userId,
                    username: res.username,
                    avatar: res.avatar,
                    position: res.position,
                    company: fuser.company,
                    selfIntroduction: res.selfIntroduction,
                    homepage: res.homepage
                }, '注册成功')
            }else{
                // 如果查到了该用户就登录
                const fuser = await service.user.getUserByUsername({
                    username,
                    password: transPassword
                })
                if(!fuser){
                    ctx.body = failRes('用户名或密码错误', 1011)
                }else{
                    // exp单位是秒，设置7天过期
                    const token = jwt.sign({
                        token: fuser.userId,
                        exp: Math.floor(Date.now() / 1000) + (3600 * 24 * 7)
                        // 5分钟过期，测试
                        // exp: Math.floor(Date.now() / 1000) + (60 * 5)
                    }, 'token')
                    ctx.body = successRes({
                        token,
                        userId: fuser.userId,
                        username: fuser.username,
                        avatar: fuser.avatar,
                        position: fuser.position,
                        company: fuser.company,
                        selfIntroduction: fuser.selfIntroduction,
                        homepage: fuser.homepage,
                    }, '登录成功')
                }
            }
        }
        
    }
    async findUser(){
        const { ctx, service } = this;
        const tokenStr = ctx.query.token
        let { token } = await jwt.verify(tokenStr, "token");
        // 通过用户Id去查用户
        const fuser = await service.user.getUserByUsername({userId: token})
        console.log('fuser====', fuser)
        if(fuser){
            ctx.body = successRes({
                userId: fuser.userId,
                username: fuser.username,
                avatar: fuser.avatar,
                position: fuser.position,
                company: fuser.company,
                selfIntroduction: fuser.selfIntroduction,
                homepage: fuser.homepage,
            }, '数据查询成功')
        }else{
            ctx.body = failRes('查不到对应的用户', 1012)
        }
        
    }
}

module.exports = UserController;

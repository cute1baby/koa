/**
 * 控制器是通过 class 来实现的
 * 但是并不是随便一个 class 就能成为控制器
 * 类似继承的概念，koa-controllers为我们提供了一个装饰器: Controller
 * 通过这个装饰器我们就可以把一个普通的类变成具有控制器特征的控制器类
 */
import { Controller, Get, Post, Ctx  } from 'koa-controllers'
import { Context } from 'koa'
import { Model } from "sequelize"

@Controller
export class MainController {

    @Get('/')
    // Context对ctx类型进行检测
    public async index(@Ctx ctx: Context ){
        // 我们希望用户在通过get方式访问 / 的时候执行该方法，我们就可以使用
        // Get,Post装饰器来装饰该方法
        console.log(ctx)
        // await ctx.body = 'hello'
        ctx.body = 'hello world'
    }



    @Post('/')
    public async indexPost(@Ctx ctx: Context) {
        ctx.body = 'hello post'
    }

    @Get('/user')
    public async user(@Ctx ctx: Context) {
        // 查询出来的数据不包含密码
        let userList = await (<Model<any, any>>ctx.state.db['user']).findAll({
            // attributes: {
            //     exclude: ['password']
            // }
            attributes: ['username']
        })

        // let userList = await (<Model<any, any>>ctx.state.db['user']).scope('zmouse').findAll();

        ctx.body = userList
    }
}


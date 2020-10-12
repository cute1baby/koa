const Service = require('egg').Service;

class UserService extends Service {
    /**
     * 通过用户名或密码查找用户
     * {username, password}
     * username
     * password
     */
    getUserByUsername(params){
        if(!params){
            return null
        }
        const u = this.ctx.model.User.findOne(params)
        return u
    }
    // 创建用户
    createUser(params){
        const p = {
            userId: '',
            username: '',
            password: '',
            avatar: 'http://img.familyli.cn/juejin_defdault.png',
            company: '',
            position: '',
            selfIntroduction: '',
            homepage: '',
            type: '1',
            ...params
        }
        const user = new this.ctx.model.User( p )
        user.save();
        return user
    }
    /**
     * 保存修改
     * userId, 
        label,
        value
     */
    async saveBaseUserInfo(obj){
        const updt = await this.ctx.model.User.update({
            userId: obj.userId
        }, {$set: {[obj.label]: obj.value}})
        return updt
    }
}

module.exports = UserService;
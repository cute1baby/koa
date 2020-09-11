const Service = require('egg').Service;

class MessageService extends Service {
    // 通过用户名或密码查找用户
    /**
     * {username, password}
     * username
     * password
     */
    getUserByUsername(params){
        console.log('----params---', params)
        if(!params){
            return null
        }
        const u = this.ctx.model.User.findOne(params)
        return u
    }
    // 
    // 创建用户
    createUser(params){
        const p = {
            userId: '',
            username: '',
            password: '',
            avatar: '',
            position: '',
            selfIntroduction: '',
            homepage: '',
            ...params
        }
        const user = new this.ctx.model.User( p )
        user.save();
        return user
    }

}

module.exports = MessageService;
const Service = require('egg').Service;

class UserTagRelateService extends Service {
    // 添加关注
    async addAttention(obj) {
        const tOne = await this.ctx.model.UserTagRelate.findOne({
            userId: obj.userId,
            tagId: obj.tagId
        })
        console.log('tOne====', tOne)
        if(tOne){
            if(tOne.isFocus){
                return null
            }
            // 已经在记录中将isFocus从false修改成true
            const updt = await this.ctx.model.UserTagRelate.update({
                userId: obj.userId,
                tagId: obj.tagId
            }, {$set: {isFocus: true}})
            return updt
        }
        const r = new this.ctx.model.UserTagRelate({...obj, isFocus: true})
        r.save();
        return r
    }
    // 取消关注
    async cancelAttention(obj) {
        const tOne = await this.ctx.model.UserTagRelate.findOne({
            userId: obj.userId,
            tagId: obj.tagId
        })
        console.log('tOne====', tOne)
        if(tOne){
            if(!tOne.isFocus){
                return null
            }
            // 已经在记录中将isFocus从false修改成true
            const updt = await this.ctx.model.UserTagRelate.update({
                userId: obj.userId,
                tagId: obj.tagId
            }, {$set: {isFocus: false}})
            return updt
        }
        return null
    }

    // 查询关联的标签
    async findTagValue(params){
        const tOne = await this.ctx.model.UserTagRelate.find(params)
        return tOne
    }
}

module.exports = UserTagRelateService;
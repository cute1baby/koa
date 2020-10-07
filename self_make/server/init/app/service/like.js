const Service = require('egg').Service;

class LikeService extends Service {
    // 添加点赞
    async addLike(obj) {
        const tOne = await this.ctx.model.Like.findOne({
            userId: obj.userId,
            articleId: obj.articleId
        })
        console.log('tOne====', tOne)
        if(tOne){
            if(tOne.isLike){
                return null
            }
            // 已经在记录中将isLike从false修改成true
            const updt = await this.ctx.model.Like.update({
                userId: obj.userId,
                articleId: obj.articleId
            }, {$set: {isLike: true}})
            return updt
        }
        const r = new this.ctx.model.Like({...obj, isLike: true})
        r.save();
        return r
    }
    // 取消点赞
    async cancelLike(obj) {
        const tOne = await this.ctx.model.Like.findOne({
            userId: obj.userId,
            articleId: obj.articleId
        })
        if(tOne){
            if(!tOne.isLike){
                return null
            }
            // 已经在记录中将isFocus从false修改成true
            const updt = await this.ctx.model.Like.update({
                userId: obj.userId,
                articleId: obj.articleId
            }, {$set: {isLike: false}})
            return updt
        }
        return null
    }
    findLikeByUser(params){
        const data = this.ctx.model.Like.findOne({
            userId: params.userId,
            articleId: params.articleId
        })
        return data
    }
    findLikeByArticle(params){
        const data = this.ctx.model.Like.find({
            articleId: params.articleId,
            isLike: true
        })
        return data
    }
}

module.exports = LikeService;
const Service = require('egg').Service;

class AtypesService extends Service {
    // 保存文章（视频）类型
    saveArticleData(params){
        // 没有配置plugin.js，导致this.ctx.model是undefined
        const article = new this.ctx.model.Article( params )
        article.save();
        return '文章保存成功'
    }
    // 编辑文章
    async editArticleData(params){
        const updt = await this.ctx.model.Article.update({
            articleId: params.articleId
        }, {$set: params})
        return updt.ok ? '修改成功' : '修改失败'
    }
    // 查询列表
    async getArticleList(params){
        const reg = new RegExp(params.articleName, 'i')
        const counts = await this.ctx.model.Article.find().count({
            title: {$regex : reg},
        })
        const data = await this.ctx.model.Article.find({
            title: {$regex : reg},
        },{
            _id: 0,
            __v: 0,
            updateTime: 0
        })
        .skip((params.pageNum - 1) * params.pageSize)
        .limit(params.pageSize || 20)

        return { counts, list: data }
    }
}

module.exports = AtypesService;
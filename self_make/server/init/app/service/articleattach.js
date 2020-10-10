const Service = require('egg').Service;

class ArticleAttachService extends Service {
    // 保存文章附加数据
    saveArticleAttachData(params){
        const base = {
            articleId: '',
            content: '',
            ...params
        }
        const articleAttach = new this.ctx.model.Articleattach( base )
        articleAttach.save();
        return '文章附加表保存成功'
    }
    // 通过条件查询文章附加表数据
    findDetailsById(params){
        const data = this.ctx.model.Articleattach.findOne(params, {
            _id: 0,
            __v: 0
        })
        return data
    }
}

module.exports = ArticleAttachService;
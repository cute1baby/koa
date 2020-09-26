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
}

module.exports = ArticleAttachService;
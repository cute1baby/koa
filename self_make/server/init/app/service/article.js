const Service = require('egg').Service;

class ArticleService extends Service {
    // 保存文章基础数据
    saveArticleData(params){
        console.log('>>>>>.>>>>>>>>>>>', this.ctx.model)
        const base = {
            title: '',
            articleId: '',
            tagId: '',
            userId: '',
            likeNums: 0,
            commentNums: 0,
            readNums: 0,
            ...params
        }
        const article = new this.ctx.model.Article( base )
        article.save();
        return '文章保存成功'
    }
    // 查询文章列表
    findArticleList(params){
        console.log('params====', params)
        const data = this.ctx.model.Article.find({},{
            _id: 0,
            __v: 0
        })
        .skip((params.pageNum - 1) * params.pageSize)
        .limit(params.pageSize || 20)

        return data
    }
}

module.exports = ArticleService;
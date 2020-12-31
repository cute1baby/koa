'use strict';

const Controller = require('egg').Controller;
const {successRes, failRes} = require('../utils/response')
// 生成唯一key方法
const nanoid = require('nanoid')

class ArticleController extends Controller {
  // 添加文章或视频的类型
  async addArticleData() {
    const { ctx, service } = this;
    const {articleId, title, desc, address, typeId, picLink} = ctx.request.body
    let resArticle = null
    // 编辑
    if(articleId){
        resArticle = await service.article.editArticleData({
            articleId,
            typeId,
            title,
            desc,
            address,
            typeId,
            picLink
        })
    }else{
        // 新增
        const articleId = nanoid(8)
        resArticle = await service.article.saveArticleData({
            articleId,
            typeId,
            title,
            desc,
            address,
            typeId,
            picLink
        })
    }
    
    if(resArticle){
        ctx.body = successRes(resArticle, '')
    }
  }
  // 获取文章或视频的全部类型（列表）
  async getArticleList() {
    const { ctx, service } = this;
    const {pageNum, pageSize, articleName} = ctx.query
    let resArtLists = await service.article.getArticleList({
        pageNum: Number(pageNum), 
        pageSize: Number(pageSize), 
        articleName
    })
    // 联表查询
    if(resArtLists){
        for (let i = 0; i < resArtLists.list.length; i++) {
            let element = resArtLists.list[i];
            const obj = await service.atypes.findTypeById({
                typeId: element.typeId
            })
            element._doc.typeIdName = obj.title
        }
        ctx.body = successRes(resArtLists, '查询类型列表')
    }
  }
  // 通过文章属性查找文章列表
  async findArticleByParams(){
    const { ctx, service } = this;
    const {...params} = ctx.query
    let artLists = await service.article.findArticleByParams(params)
    if(artLists){
        ctx.body = successRes(artLists, '根据属性查询文章成功')
    }
  }
}

module.exports = ArticleController;

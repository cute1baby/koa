'use strict';

const Controller = require('egg').Controller;
const {successRes, failRes} = require('../utils/response')
// 生成唯一key方法
const nanoid = require('nanoid')

class ArticleTypesController extends Controller {
  // 添加文章或视频的类型
  async addArticleTypes() {
    const { ctx, service } = this;
    const {title} = ctx.request.body
    // 文章Id
    const typeId = nanoid(4)
    const resArticle = await service.atypes.saveArticleTypes({
        typeId,
        title
    })
    if(resArticle){
        ctx.body = successRes(resArticle, '')
    }
  }
  // 获取文章或视频的全部类型（列表）
  async getArticleTypeList() {
    const { ctx, service } = this;
    const {pageNum, pageSize, typeName} = ctx.query
    const resArtLists = await service.atypes.getArticleTypeList({
        pageNum: Number(pageNum), 
        pageSize: Number(pageSize), 
        typeName
    })
    if(resArtLists){
        ctx.body = successRes(resArtLists, '查询类型列表')
    }
  }
}

module.exports = ArticleTypesController;

'use strict';

const Controller = require('egg').Controller;
const jwt = require('jsonwebtoken')
// 生成唯一key方法
const nanoid = require('nanoid')
const {successRes, failRes} = require('../utils/response')

class ArticleController extends Controller {
    // 保存文章
    async createAndSaveArticle(){
        const { ctx, service } = this;
        const {
            userId,
            tagId,
            title,
            content
        } = ctx.request.body
        // 文章Id
        const articleId = nanoid(12)
        const resArticle = await service.article.saveArticleData({
            articleId,
            userId, 
            tagId,
            title
        })
        const resAttach = await service.articleattach.saveArticleAttachData({
            articleId,
            content
        })
        console.log('完成==', resArticle, resAttach)
        if(resArticle && resAttach){
            ctx.body = successRes('', '文章保存成功')
        }
    }
    // 查找文章
    async findArticleList(){
        const { ctx, service } = this;
        const {
            pageNum,
            pageSize
        } = ctx.request.body
        const res = await service.article.findArticleList({
            pageNum: Number(pageNum),
            pageSize: Number(pageSize)
        })
        let list = [];
        for(let i=0; i<res.length;i++){
            const item = res[i];
            const tagInfo = await service.tag.searchTagById({
                tagId: item.tagId
            })
            const fuser = await service.user.getUserByUsername({
                userId: item.userId
            })
            const flike = await service.like.findLikeByUser({
                userId: item.userId,
                articleId: item.articleId
            })
            const fnum = await service.like.findLikeByArticle({
                articleId: item.articleId
            })
            const isLike = flike && flike.isLike ? true : false
            const nums = fnum && fnum.length ? fnum.length : 0
            list.push({...item._doc, tagTitle: tagInfo.title, username: fuser.username, isLike, likeNums: nums})
        }
        if(list){
            ctx.body = successRes(list, '文章查询成功')
        }
    }
}

module.exports = ArticleController;
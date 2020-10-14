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
    // 查找文章列表
    async findArticleList(){
        const { ctx, service } = this;
        const {
            pageNum,
            pageSize,
            userId
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
            // item.userId是兼容未登录情况下使用的
            const flike = await service.like.findLikeByUser({
                userId: userId || item.userId,
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

    // 查找文章详情
    async findArticleDetails(){
        const { ctx, service } = this;
        const {
            articleId
        } = ctx.request.body
        const articleData = await service.article.findArticleDetails({
            articleId
        })  
        const articleDetails = await service.articleattach.findDetailsById({
            articleId
        })
        const {userId, tagId} = articleData[0]._doc
        const {content} = articleDetails._doc
        const tagInfo = await service.tag.searchTagById({
            tagId
        })
        const fuser = await service.user.getUserByUsername({
            userId
        })
        const articleList = await service.article.findArticleDetails({
            userId
        })  
        const {username, avatar, company, position, selfIntroduction, homepage} = fuser._doc
        const {tagIcon, title} = tagInfo._doc
        const data = {
            ...articleData[0]._doc,
            content,
            user: { 
                username, 
                avatar, 
                company, 
                position, 
                selfIntroduction, 
                homepage
            },
            tagInfo: {
                tagIcon,
                title
            },
            articleList
        }
        ctx.body = successRes(data, '文章数据查询成功')
        console.log('=====>>>>>>>>>>>>>', articleDetails)
    }
}

module.exports = ArticleController;
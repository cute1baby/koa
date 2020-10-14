'use strict';

const Controller = require('egg').Controller;

const {successRes, failRes} = require('../utils/response')

class LikeController extends Controller {
    // 添加关注
    async addLike(){
        const { ctx, service } = this;
        const {
            userId,
            articleId
        } = ctx.request.body
        const res = await service.like.addLike({
            userId, 
            articleId
        })
        console.log('res=====', res)
        if(res){
            ctx.body = successRes('', '文章点赞成功')
        }else{
            ctx.body = failRes('文章已被关注，不能重复关注', 1013)
        }
    }

    // 取消关注
    async cancelLike(){
        const { ctx, service } = this;
        const {
            userId,
            articleId
        } = ctx.request.body
        const res = await service.like.cancelLike({
            userId, 
            articleId
        })
        console.log('res=====', res)
        if(res){
            ctx.body = successRes('', '取消点赞成功')
        }else{
            ctx.body = failRes('取消失败', 1013)
        }
    }

    // 查找个人关注的tag
    async findSelfAttention(){
        const { ctx, service } = this;
        const {
            userId
        } = ctx.request.body
        const res = await service.userTagRelate.findTagValue({
            userId, 
            isFocus: true
        })
        const list = res || []
        const tagList = list.map(item => item.tagId)
        let tagRes = await service.tag.findFilterData(tagList)
        tagRes = tagRes.map(item => {
            return {...item._doc, isFocus: true}
        })
        if(res){
            ctx.body = successRes(tagRes, '查找成功')
        }else{
            ctx.body = failRes('查找失败', 1013)
        }
    }
}

module.exports = LikeController;
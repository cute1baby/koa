'use strict';

const Controller = require('egg').Controller;
const jwt = require('jsonwebtoken')
// 生成唯一key方法
const nanoid = require('nanoid')
const {successRes, failRes} = require('../utils/response')

class UserTagRelateController extends Controller {
    // 添加关注
    async addAttention(){
        const { ctx, service } = this;
        const {
            userId,
            tagId
        } = ctx.request.body
        const res = await service.userTagRelate.addAttention({
            userId, 
            tagId
        })
        console.log('res=====', res)
        if(res){
            ctx.body = successRes('', '标签关注成功')
        }else{
            ctx.body = failRes('标签已被关注，不能重复关注', 1013)
        }
    }

    // 取消关注
    async cancelAttention(){
        const { ctx, service } = this;
        const {
            userId,
            tagId
        } = ctx.request.body
        const res = await service.userTagRelate.cancelAttention({
            userId, 
            tagId
        })
        console.log('res=====', res)
        if(res){
            ctx.body = successRes('', '取消关注成功')
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

module.exports = UserTagRelateController;
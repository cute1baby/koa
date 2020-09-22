'use strict';

const Controller = require('egg').Controller;
const jwt = require('jsonwebtoken')
// 生成唯一key方法
const nanoid = require('nanoid')
const {successRes, failRes} = require('../utils/response')

class TagController extends Controller {
    async getAllTags() {
        const { ctx, service } = this;
        const startVal = ctx.query.startVal
        const res = await service.tag.getAllTags(startVal)
        if(!res.data.err_no){
            ctx.body = successRes(res.data.data, '标签页查询成功')
        }
    }
    // 使用链接模拟生成tags数据的方法。http://localhost:7001/saveAllTags?startVal=0
    async saveAllTags() {
        const { ctx, service } = this;
        const startVal = ctx.query.startVal
        const res = await service.tag.getAllTags(startVal)
        const data = res.data.data
        const list = data.map(item => {
            return {
                tagId: item.tag_id,
                themeColor: item.tag.color,
                tagIcon: item.tag.icon,
                title: item.tag.tag_name,
                articleNums: item.tag.post_article_count,  // 文章数量
                articleList: [],  //文章列表
                attentionNums: item.tag.concern_user_count,  // 关注人数
                attentionList: [],  //关注人列表
            }
        })
        const resSave = await service.tag.saveAllTags(list)
        if(resSave){
            ctx.body = successRes(startVal, '数据保存成功')
        }
    }
    // 搜索标签
    async searchTags(){
        const { ctx, service } = this;
        const {userId, searchName, pageNum, pageSize} = ctx.request.body
        let list = []
        const res = await service.tag.searchTags({
            searchName,
            pageNum: Number(pageNum),
            pageSize: Number(pageSize)
        })
        for (let index = 0; index < res.length; index++) {
            const {
                tagId,
                themeColor,
                tagIcon,
                title,
                articleNums,
                attentionNums
            } = res[index];
            const tOne = await service.userTagRelate.findTagValue({
                userId,
                tagId,
                isFocus: true
            })
            console.log('tOne====', tOne)
            const p = {
                tagId,
                themeColor,
                tagIcon,
                title,
                articleNums,
                attentionNums
            }
            if(tOne.length){
                list.push({...p, isFocus: true})
            }else{
                list.push({...p, isFocus: false})
            }
        }
        
        ctx.body = successRes(list, '标签查询成功')
    }
}

module.exports = TagController;
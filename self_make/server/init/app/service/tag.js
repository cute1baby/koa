const Service = require('egg').Service;
const axios = require('axios')

class TagService extends Service {
    // 获取所有的标签
    getAllTags(start) {
        console.log('start===', start)
        return axios.post('https://apinew.juejin.im/tag_api/v1/query_tag_list', {
            sort_type: 1,
            cursor: start || '0',
            limit: 20
        })
    }
    saveAllTags(list=[]){
        list.forEach(item => {
            const tag = new this.ctx.model.Tag( item )
            tag.save();
        })
        return list
    }
    /**
     * 
     * @param {*} params 
     * searchName, pageNum, pageSize
     */
    searchTags(params){
        const reg = new RegExp(params.searchName, 'i')
        // const data = this.ctx.model.User.find({
        //     $or : [ //多条件，数组
        //         {title : {$regex : reg}},
        //         {email : {$regex : reg}}
        //     ]
        // })
        console.log('=====params', params)
        const data = this.ctx.model.Tag.find({
            title: {$regex : reg},
        },{
            _id: 0,
            articleList: 0,
            attentionList: 0
        })
        .skip((params.pageNum - 1) * params.pageSize)
        .limit(params.pageSize || 20)

        return data
    }
}

module.exports = TagService;
const Service = require('egg').Service;

class AtypesService extends Service {
    // 保存文章（视频）类型
    saveArticleTypes(params){
        // 没有配置plugin.js，导致this.ctx.model是undefined
        const aTypes = new this.ctx.model.Atypes( params )
        aTypes.save();
        return '类型保存成功'
    }
    // 查询列表
    async getArticleTypeList(params){
        const reg = new RegExp(params.typeName, 'i')
        const counts = await this.ctx.model.Atypes.count({
            title: {$regex : reg},
        })
        const data = await this.ctx.model.Atypes.find({
            title: {$regex : reg},
        },{
            _id: 0,
            __v: 0,
            updateTime: 0
        })
        .skip((params.pageNum - 1) * params.pageSize)
        .limit(params.pageSize || 20)

        return { counts, list: data }
    }
    async findTypeById(params){
        const data = await this.ctx.model.Atypes.findOne({
            typeId: params.typeId
        })
        return data
    }
}

module.exports = AtypesService;
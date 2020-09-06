// 保存热门电影数据
const Trailers = require('../../model/Trailers')
module.exports = async data => {
    for(let i=0;i<data.length;i++){
        let item = data[i]
        console.log('item===', item)
        const result = await Trailers.create({
            title: item.title,
            rating: item.rating,
            duration: item.duration,
            directors: item.directors,
            casts: item.casts,
            image: item.image,
            doubanId: item.doubanId,
            tags: item.tags,
            summary: item.summary,
            releaseDate: item.releaseDate,
            link: item.link
        })
        console.log('result==', result)
        console.log('数据保存成功')
    }
    
}
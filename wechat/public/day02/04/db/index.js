const mongoose = require('mongoose')
module.exports = new Promise((resolve, reject) => {

    mongoose.connect('mongodb://localhost:27017/mongoose_movies', {
        useNewUrlParser: true
    })

    mongoose.connection.once('open',(err)=>{
        if(!err){
            //成功连接
            console.log('数据库连接成功')
            resolve()
        }else{
            console.log('连接数据库失败:' + err)
            reject()
        }
    })
})


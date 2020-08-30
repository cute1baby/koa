注意：mongoose对node有一定的要求，mongoose@4.10.0版本对应的是node@8.16.0以上

- 1、引入包文件
const mongoose = require('mongoose');

- 2、与数据库建立连接
mongoose.connect('mongodb://localhost:27017/mongoose_movies', {
    useNewUrlParser: true
})

- 3、监听数据库的连接
mongoose.connection.once('open',(err)=>{
    if(!err){
        //成功连接
        console.log('数据库连接成功')
        // resolve()
    }else{
        console.log('连接数据库失败:' + err)
        // reject()
    }
})




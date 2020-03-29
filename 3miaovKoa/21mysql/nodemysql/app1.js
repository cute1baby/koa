(async function(){
    const mysql = require('mysql2/promise')
    // 连接服务器和配置
    const connection = await mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: '1111',
        database: 'miaov'
    })

    // list返回一个数组，第一个数组是记录的值，第二个是记录中包含的字段信息
    // const list = await connection.query('SELECT userName,age,gender FROM users')

    // 使用解构赋值的方式拿到第一个数组的内容
    const [users] = await connection.query('SELECT userName,age,gender FROM users')

})()
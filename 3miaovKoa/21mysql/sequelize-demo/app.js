(async function(){
    const { Sequelize } = require('sequelize')

    // 连接数据库
    const sequelize = new Sequelize('miaov', 'root', '1111', {
        // 其他数据库连接配置
        host: '127.0.0.1',
        port: '3306',
        dialect: 'mysql',
        timezone: '+08:00'  //时区设置：当我们向数据库中写入实践的时候，默认会根据系统当前所在时区设置
    })

    // 测试是否连接成功
    // sequelize.authenticate().then(() => {
    //     console.log('测试连接成功')
    // }).catch(() => {
    //     console.log('测试连接失败')
    // })
    try{
        await sequelize.authenticate()
        console.log('测试连接成功')
    }catch(err){
        console.log('测试连接失败')
    }

    /**
     * 数据库连接完成之后，需要给每一个要操作的表定义一个对象 - 模型 Model
     */
    const UserModel = sequelize.define('User', {
        id:{
            type: Sequelize.INTEGER(10),  // 数字类型
            allowNull: false,  // 允许为空
            primaryKey: true,  // 唯一key
            autoIncrement: true  // 自增
        },
        username: {
            type: Sequelize.STRING(255),
            allowNull: false,
            defaultValue: ''
        },
        age: {
            type: Sequelize.INTEGER(3),
            allowNull: false,
            defaultValue: 0
        },
        gender: {
            type: Sequelize.ENUM(['男', '女', '保密']),
            allowNull: false,
            defaultValue: '男'
        }
    }, {
        // 用来设置字段以外的其他信息
        timestamps: false,
        paranoid: false,  // 是否假删除
        freezeTableName: true, // 是否禁用修改表名，默认会给模型名称加复数
        tableName: 'user', // 手动设置表的实际名称，和freezeTableName目的是一样
        indexes: [  // 设置属性的索引
            {
                name: 'uname',
                fields: ['username']
            },
            {
                name: 'age',
                fields: ['age']
            }
        ]
    })


    /**
     * 模型类 -> 表
     * 模型创建出来的对象 -> 表中某条记录
     */
    // let Lee = UserModel.build({
    //     username: '李钟',
    //     age: 21,
    //     gender: '男'
    // })

    // 通过new或者build出来的对象不会立即同步到数据库中，需要使用后续的一些方法来同步,就是下面的Lee.save();
    // await Lee.save();

    // 查找id为1的记录，并将这条记录的age设置为32，不用调用save方法
    // let item = await UserModel.findById(1); // 这个方法不生效
    // let item = await UserModel.findOne({ where: { username: '李钟' } });

    // console.log(item)
    // await item.update({
    //     age: 32
    // });

    // findOrCreate  查找或者创建一个对象

    // findAll  查找所有的记录进行限制
    // const allItems = await UserModel.findAll({
    //     // where: {
    //     //     username: '李钟'
    //     // },
    //     limit: 10,
    //     offset: 0,
    //     order: [
    //         ['age', 'desc']   // 年龄从大到小
    //     ]
    // })

    // 筛选年龄小于25岁的
    // const allItems = await UserModel.findAll({
    //     where: {
    //         // age: {
    //         //     // [Sequelize.Op.eq]: 25  等于25岁
    //         //     [Sequelize.Op.lt]: 25  // 小于25岁
    //         // }

    //         // 多条件查询
    //         // [Sequelize.Op.or]: [    年龄小于25，或者性别为女
    //         [Sequelize.Op.and]: [   // 年龄小于25，并且性别为女
    //             {
    //                 age: {
    //                     [Sequelize.Op.lt]: 25
    //                 }
    //             },
    //             {
    //                 gender: '女'
    //             }
    //         ]
    //     }
    // })

    // console.log(allItems.map(item => item.username))



    // 计算筛选出来用户名是李钟的数据有5条
    // const rs = await UserModel.count({
    //     where: {
    //         username: '李钟'
    //     }
    // })

    // findAndCountAll： 返回查询的条数和数据，相当于findAll + count方法的集合
    // const rs = await UserModel.findAndCountAll({
    //     where: {
    //         username: '李钟'
    //     }
    // })

    // 统计所有姓名叫做李钟的年龄的总和
    const rs = await UserModel.sum('age', {
        where: {
            username: '李钟'
        }
    })
    console.log(rs)
})()

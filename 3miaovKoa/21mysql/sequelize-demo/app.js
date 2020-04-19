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
    // const rs = await UserModel.sum('age', {
    //     where: {
    //         username: '李钟'
    //     }
    // })
    // console.log(rs)


    // 关联查询
    const MessageModel = sequelize.define('message', {
        id: {
            type: Sequelize.INTEGER(10),  // 数字类型
            allowNull: false,  // 允许为空
            primaryKey: true,  // 唯一key
            autoIncrement: true  // 自增
        },
        uid: {  // 其他表的字段，把当前字段定义为外键
            type: Sequelize.INTEGER(10),
            defaultValue: 0,
            references:{  // 映射关系
                model: UserModel,  // 对应其他的哪个表
                key: 'id' // 对应哪个表中的哪个字段
            }
        },
        content: {
            type: Sequelize.STRING(255),
            allowNull: true,  //是否允许为空
            defaultValue: ''
        }
    }, {
        // 用来设置字段以外的其他信息
        timestamps: false,
        freezeTableName: true, // 是否禁用修改表名，默认会给模型名称加复数
        tableName: 'message' // 手动设置表的实际名称，和freezeTableName目的是一样
    })

    // 获取某条留言的所有数据：留言信息和用户信息
    // let data= {}
    // // 获取message中的信息
    // let message = await MessageModel.findOne({where: {id: 1}})

    // // 获取user中的信息（对应message表中的uid）
    // let user = await UserModel.findOne({ where: { id: message.get('uid')}})
    // // 获取到当前信息的数据和对应的用户数据
    // Object.assign(data, {
    //     uid: message.get('uid'),
    //     id: message.get('id'),
    //     content: message.get('content'),

    //     username: user.get('username'),
    //     age: user.get('age'),
    //     gender: user.get('gender')
    // })




    // 上面这段关联关系的表相当于

    // 查询一个用户对应多条信息
    UserModel.hasMany(MessageModel, {
        foreignKey: 'uid'
    })
    let data2 = await UserModel.findOne({ where: { id: 3 }, include: [MessageModel]})
    console.log('获取用户+消息数据：', data2.username, data2.messages.map(msg => msg.content))


    // 查询一条信息对应的用户
    MessageModel.belongsTo(UserModel, {
        foreignKey: 'uid'
    })
    // 使用findOne时，要把include和where在同一级
    let data3 = await MessageModel.findOne({ where: { id: 3 }, include: [UserModel] })
    console.log('获取信息+用户的数据：', data3.content, data3.User.username, data3.User.gender)
})()

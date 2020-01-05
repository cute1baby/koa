### 模块1：mongodb数据库的基本操作
```
db.users.find({})
// 切换到test数据库
use test
// 给users集合中增加一条数据
db.users.insert({name:"建明","age": 27,"sex": "男"})

db.users.insert({name:"李仁","age": 14,"sex": "男"})

// 查找所有数据,默认匹配多条
db.users.findOne({name: "李仁"})

db.users.insert({name:"张文广","age": 24,"sex": "男"})

// 修改name为lizhong的年龄为28岁
db.users.update({name:"李仁"}, {$set: {age: 15}}, false, true)

// 创建一个集合，并且在这个集合中插入1000条数据
var list = []
for(var i=1;i<= 1000;i++){
   list.push({num: i})
}
db.nums.insert(list)

db.users.find({}).count()
db.users.find({})

// 返回集合的大小
db.users.dataSize()

//返回各种方法的查询执行信息
db.users.explain()

// 查询单条数据
db.users.findOne({name: "李钟1"})

db.users.insert({name: "孙悟空", age: 300, sex: "男"})
db.users.insert({name: "猪八戒", age: 180, sex: "男"})

// 找到对应的数据，让其值自增3
db.users.update({name: "李仁"}, {$inc: {age: 3}}, true)

// 删除孙悟空的sec属性，并且增加sex属性
db.users.update({name: "猪八戒"}, {$unset: {sec: ""}, $set: {sex: "男"}})

// rename方法:修改匹配到的数据的属性值
db.users.update({userName: "猪八戒"}, {$rename: {userName: "nickName", nianling: "age"}})
db.users.update({name: "猪八戒"}, {$set: {"nickName": "小猪猪","address": "高老庄"}})




db.grades.insert({name:"王小二", age: 20, targetScore: 90, score: 68, lowScore: 60})


// 批量导入多个数据
var list = [
    {name:"王二麻子", age: 24, targetScore: 96, score: 70, lowScore: 62},
    {name:"李四", age: 25, targetScore: 90, score: 65, lowScore: 60},
    {name:"张亮", age: 23, targetScore: 88, score: 68, lowScore: 67},
]
db.grades.insert(list)

// $min的使用. 和原来的值相比，谁小就显示谁
db.grades.update({name: "李四"}, {$min:{lowScore: 62}})
// $max的使用， 和原来的值相比，谁大显示谁
db.grades.update({name: "张亮"}, {$max: {targetScore: 92}})

db.grades.find()

// 匹配到所有值，设置字段值为当前日期
db.grades.update({name: "王二麻子"},{$set: {birthday: 1222}}, false, true)
db.grades.update({name: "王二麻子"},{$currentDate: {birthday: {$type: 'date'}}}, false, true)


// 数组操作符添加一个值(操作的对象一定是数组)
db.grades.insert({name: "老李", scoreList: [80, 49, 68]})
db.grades.update({name: "老李"},{$push: {scoreList: 70}})

// $push + $each方法增加数组中的多个值
db.grades.update({name: "老李"},{$push: {scoreList: {$each: [60, 75, 95]} }})


db.grades.remove({})

// demo重新写

// 1、比较运算符
// targetScore分值等于90分
db.grades.find({targetScore: {$eq: 90}})
// targetScore分值小于90分
db.grades.find({targetScore: {$lt: 90}})
// targetScore分值大于90分
db.grades.find({targetScore: {$gt: 90}})
// targetScore分值大于等于90分
db.grades.find({targetScore: {$gte: 90}})

// 匹配数组中指定的任何值
db.grades.find({targetScore: {$in: [90, 96]}})
// 匹配数组中不等于指定的任何值
db.grades.find({targetScore: {$nin: [90, 96]}})


// 2、逻辑运算符
// $or 逻辑或语句
db.grades.find({$or: [{name: "张亮"}, {targetScore: 90}]})
// $and 逻辑与
db.grades.find({$and: [{age: {$lt: 25}}, {targetScore: {$gte: 90 }}]})
// $not 反转查询表达式
db.grades.find({age: {$not: {$lte: 23}}})
// $nor 即多个$not的集合
db.grades.find({$nor: [{age: {$gte: 25}},{lowScore: {$lt: 60}}] })

// 3、元素操作符
// 查询条件存在的记录$exists
db.grades.find({age: {$exists: true}})  //查询存在年龄属性的文档
// 基于类型的查询$type[数据类型的查询]
db.grades.find({age: {$type: 1}})

// 4、更新运算符
db.grades.insert({name: "小孩儿", age: 2, trageScore: 88, score: 70, lowScore: 58, address: ""})
db.grades.find()
// 重命名字段
db.grades.update({name: "小孩儿"}, {$rename:{address: "birthday"}})
// 设置属性值为时间戳
db.grades.update({name: "小孩儿"}, {$currentDate:{address: {$type: "date"}}})
// 设置数字为递增
db.grades.update({name: "小孩儿"}, {$inc:{age: 2}})
// 属性值乘以指定的值
db.grades.update({name: "小孩儿"}, {$mul:{age: 2}})
// 设置值和属性值比较选择一个更小的值进行设置
db.grades.update({name: "小孩儿"}, {$min:{age: 2}})
// 设置值和属性值比较选择一个更大的值进行设置
db.grades.update({name: "小孩儿"}, {$max:{score: 84}})
// 设置文档中字段的值
db.grades.update({name: "小孩儿"}, {$set:{age: 4}})
// unset删除指定的值
db.grades.update({name: "小孩儿"}, {$unset:{birthday: 4}})

// $setOnInsert自动更新【没看出什么其他变化】
db.grades.update(
  {name: "小孩儿"},
  {
     $set: { item: "apple" },
     $setOnInsert: { defaultQty: 100 }
  },
  true
)
```

### 文档之间的关系
1、一对一的关系
夫妻关系

2、一对多的关系
父母和孩子的关系
可以通过内嵌文档对应这种关系
```
db.users.insert([{name:"孙悟空"},{name:"猪八戒"}])
db.orders.insert([
    {
        user_id: "孙悟空的Id",
        shop_list: ["苹果", "梨", "香蕉"]
    }
])

const userId = db.users.findOne({name:"孙悟空"}).id;
const list = db.orders.find({user_id: userId})
```

3、多对多的关系
分类和商品的关系
一个分类下有多个商品，一个商品可以有多个分类
```
db.teacher.insert([{name:"孙悟空"},{name:"猪八戒"},{name:"如来"}])
db.students.insert([
    {
        student_name: "郭靖",
        teacher_list: ["孙悟空的Id", "猪八戒的Id"]
    },
    {
        student_name: "沉香",
        teacher_list: ["孙悟空的Id", "如来的Id"]
    }
])
那么上面的例子中：沉香对应多个老师，孙悟空也有多个徒弟
```

### 模块2：mongodb的复杂操作
```
// 查询文档时，默认情况是按照_id的值进行排列（升序[1],降序[-1]）
// sort()可以用来指定文档的排序规则，sort()需要传递一个对象值来设置排序规则

// limit skip sort书写的顺序可以任意，调用顺序依然是(1)sort (2)limit (3)skip
db.users.find({}).sort({age: 1, emId: -1}) //按照年龄进行升序排列,当年龄相同的时候按照emId降序排列

// 查询时只想显示姓名怎么操作(默认设置1显示，0隐藏)
db.users.find({}, {name: 1, id: 0})
```

### Mongoose简介
（1）前面编写都是通过shell来完成对数据库的各种操作的，在开发中大部分时候我们都需要通过程序来完成对数据库的操作。
（2）而Mongoose就是一个让我们可以通过Node来操作MongoDB的模块。
（3）Mongoose是一个对象文档模型（ODM）库，它对Node原生的MongoDB模块进行了进一步的优化封装，并提供了更多的功能。
（4）在大多数情况下，他被用来把结构化的模式应用到一个MongoDB集合，并提供了验证和类型转换等好处。


### Mongoose的好处(最主要的就是字段的约束功能)
（1）可以为文档创建一个模式结构（Schema）
（2）可以对模型中的对象/文档进行验证
（3）数据可以通过类型转换为对象模型
（4）可以使用中间件来应用业务逻辑挂钩
（5）比Node原生的MongoDB驱动更加容易

>* 产生几个新的对象
>  * Schema(模式对象)
>     * Schema对象定义约束了数据库中的文档结构
>  * Model
>     * Model对象作为集合中的所有文档的标识，相当于MongoDB数据库中的集合collection
>  * Document
>     * Document表示集合中的具体文档，相当于集合中的一个具体的文档。
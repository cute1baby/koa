```
笔记和配置文件可参考：【https://blog.csdn.net/ncepu_Chen/article/details/98725104】
```
# 基本知识

### 数据库
1、为什么要数据库？
我们的代码是在内存中运行的，一旦程序运行结束或者计算机断点，程序运行中的数据就会丢失。
如果我们将用户信息或者一些用户的操作数据存储在代码的一个数组或者json中，电脑断电之后就再也找不回来了，所以数据应该存储在硬盘中。当然我们学习过node.js使用fs将数据存储到文件中，但是这样操作和使用并不方便，所以需要用数据库来存储数据。
说白了：数据库就是存储数据的仓库。

### 数据库的分类
（1）关系型数据库(RDBMS)：如MySQL、Oracle、DB2、SQL server等，库里面都是表结构。
（2）非关系型数据库(No SQL)：MongoDB、Redis...,库里面有键值对、有文档型。而MongoDB属于文档型数据库。

### MongoDB简介
为了快速开发互联网web应用而设计的数据库系统。减去了关系型数据库前面大量的建表时间，提高了创建数据库的效率。

### MongoDB的使用步骤
```
|- 1、安装mongoDB:安装包在D:\sofeWareEnvironment\mongodb
|- 2、配置环境变量：将安装好的mongoDB启动文件目录配置到path中，如：D:\sofeWareEnvironment\mongodb\bin

|- 3、在C盘根目录下创建data文件夹，data文件夹下创建db文件夹，以后数据库的文件默认就会存储在这里

|- 4、在cmd中输入`mongod`，启动mongoDB。命令行中出现【`waiting for connections on port 27017`】时mongoDB启动成功。并且该窗口不能关闭。（我们可以重新定义数据存储地址和数据库端口号，比如想把数据放在D:\sofeWareEnvironment\data\db，此时可以输入mongod --dbpath D:\sofeWareEnvironment\data\db --port 23344），端口号不超过65535

|- 5、再打开一个cmd，输入mongo。出现【`>`】则mongoDB启连接成功

|- 6、（加分项）将MongoDB设置为系统服务，可以自动在后台启动，不需要手动输入启动。
    |- （1）在C盘的data下创建log文件夹（db文件夹同级）
    |- （2）创建配置文件：在D:\sofeWareEnvironment\mongodb文件夹下创建一个配置文件mongod.cfg
    |- （3）在mongoDB官网下找server/installation/install mongoDB Community Edition/Install on Windows找到配置，并写进mongod.cfg文件中：
    ```
systemLog:
  destination: file
    path: c:\data\log\mongod.log
storage:
  dbPath: c:\data\db
    ```

    |- （4）以管理员身份打开cmd(开始菜单中打开cmd，选中之后右键以管理员身份启动)
    |- （5）在以管理员身份启动的cmd中执行如下命令：
    ```
sc.exe create MongoDB binPath= "\"D:\sofeWareEnvironment\mongodb\bin\mongod.exe\" --service --config=\"D:\sofeWareEnvironment\mongodb\mongod.cfg\"" DisplayName= "MongoDB" start= "auto"
    ```
    |- （6）启动mongodb服务【打开任务管理器/ 找到服务并点开右下角服务/查找mongodb/ 选中右键启动，如果成功则成功】
    |- （7）如果启动成功，则上面的操作有效；如果失败，在控制台输入：`sc delete MongoDB`，则删除之前配置的服务；然后按照之前的步骤再来一次。

```
>* MongoDB数据库(database)
>   * 数据库服务器：服务器用来保存数据，通过mongod来启动服务
>   * 数据库客户端：客户端是用来操作数据库，对数据进行增删改查的操作。通过mongo来启动客户端


### 数据库客户端的一些操作指令
解释一些基本概念：
>* 数据库(database)
>   * 集合(collection)
>       * 文档(document)
>           * 在database中，数据库和集合是不需要手动创建的。当我们创建文档的时，如果所在文档的数据库和集合不存在会自动创建数据库和集合。

```
1、show dbs  展示所有的数据库
或者show collections  展示所有的集合
2、use [数据库名称] 进入指定的数据库
3、db  显示当前使用的数据库名称
4、show collections  显示数据库中的所有集合

```

>* 数据库的CRUD（增删改查）操作
>   * 向数据库插入文档
```
（1）向集合插入数据
【1】db.<collection>.insert
例如：给test数据库中的user集合中加入一条数据{name:"李钟",age: 20, sex: "男"}，即：
db.user.insert({name:"李钟",age: 20, sex: "男"})
【类似的方法还有】：
【2】db.<collection>.insertOne()  //添加一个文档数据
【3】db.<collection>.insertMany()  //添加多个文档数据


（2）查找集合的数据
【1】db.<collection>.find() // 查询集合中所有符合条件的文档，是一个数组。
例如：db.user.find({"name": "李钟"}) // 查询集合中符合名字叫做李钟的所有文档
【2】db.<collection>.findOne()  //查询集合中的第一个，是一个对象
【3】db.<collection>.find().count()  查询匹配的集合中一共有几条数据

（3）修改集合的数据
【1】db.<collection>.update(查询条件, 新对象, [配置]); //会用新对象替换掉之前查询的对象
例子：db.user.update({name: "李钟"},{age: 30}) //希望查找到姓名是李钟的文档，并且将该文档的年龄改成30岁。而事实上会把整个文档变成{age: 30}

建议使用下面这种修改方法。
用来修改指定的属性。但是有一个问题 —— 当前面匹配的文档有多个的时候，也只会修改第一个，所以建议下面这种方式：updateMany
db.user.update(
    {name: "李钟"},
    {
        $set: {age: 20}
    }
)

// 此时能够找到所有姓名是李钟的数据，然后将年龄都改成30岁
db.user.updateMany(
    {name: "李钟"},
    {
        $set: {age: 20}
    }
)

//  类似的方法，删除指定的属性$unset
db.user.update(
    {name: "李钟"},
    {
        $unset: { age: ""}
    }
)

（4）删除集合的数据（用法跟find相似）
【1】db.<collection>.remove()  //删除符合条件的所有集合。
默认情况删除多个，通过配置可以设置只删除一个；
必须要带参数，如果参数是{},则删除集合中的所有文档
【2】db.<collection>.deleteOne()  //删除一个
【3】db.<collection>.deleteMany() //删除多个
举个例子：
db.user.remove({}); //删除user集合中的所有文档
db.user.remove({name: "李钟"}, true);  //这样设置则只删除一个

一般公司数据库都不会删除，所以很少用这个方法

```

### mongodb的练习
```
mongoDB的属性值也可以是一个文档，我们把这种格式称为内嵌文档
内嵌文档的查询方式【内嵌属性key值一定要用引号】，举个例子：
{name: "lizhong", age: 20, hobby: {movies: ["大话西游","喜剧之王"]}};

// 查找用户爱好是电影，并且包含新大话西游的用户
db.users.find({"hobby.movies": "大话西游"});

update中的$push和$addToSet方法
（1）$push指的是向数组中添加新的元素，并且不会校验数组中的重复项
（2）$addToSet也是向数组中添加新的元素，当添加的内容与元素本身有重复时，则不会再加入。
```

下面是代码集合：
```
1、进入my_test的数据库
use my_test

2、向数据库users中插入一个集合
db.user.find({name:"付新芳"})

db.user.update({name:"李钟"},{$set:{age: 24}})
```

### mongodb的可视化工具（robot3T）
已安装，并且把之前的mongoVue删除了



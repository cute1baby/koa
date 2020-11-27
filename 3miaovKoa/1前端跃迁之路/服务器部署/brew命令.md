## mongodb常用操作命令
```
手动安装
1. 官网下载对应版本解压放到 /usr/local/mongodb 下
2. 变量配置
    `cp /usr/local/mongodb/bin/* /usr/local/bin/
    ln -s  /usr/local/mongodb/bin/* /usr/local/bin/
    或者
    open -e .bash_profile
    export PATH=/usr/local/mongodb/bin:$PATH
    source .bash_profile 使配置生效`
3. 创建目录
    mongod -version
    mkdir -p /usr/local/var/mongodb 数据存放路径
    mkdir -p /usr/local/var/log/mongodb 日志文件路径
4. 后台启动
    mongod --dbpath /usr/local/var/mongodb --logpath /usr/local/var/log/mongodb/mongo.log --fork
        --dbpath 设置数据存放目录
        --logpath 设置日志存放目录
        --fork 在后台运行
    后台启动-关闭
        mongo admin --eval "db.shutdownServer()"

5. 前台启动
        不想在后端运行，而是在控制台上查看运行过程可以直接设置配置文件启动
        mongod --config /usr/local/etc/mongod.conf
    前台启动-关闭
        kill 5110
6. 查看 mongod 服务是否启动：
    ps aux | grep -v grep | grep mongod
    mongo 打开终端运行命令
7. 文件目录
    日志目录路径：/usr/local/var/log/mongodb
    数据目录路径：/usr/local/var/mongodb
    配置文件：/usr/local/etc/mongod.conf
        systemLog:
            destination: file
            path: /usr/local/var/log/mongodb/mongo.log
            logAppend: true
        storage:
            dbPath: /usr/local/var/mongodb
        net:
            bindIp: 127.0.0.1

8、创建用户管理员
    use admin
    db.createUser({
        user:'root',
        pwd:'Mm_111111', 
        roles:[
            {role:'userAdminAnyDatabase', db:'admin'}
        ]
    })

9、使用账号密码登录
    mongo
    use admin
    db.auth('root', 'Mm_111111')  // 密码认证

10、常用操作：
    show dbs;  展示数据库
    use easy-mock  切换到easy-mock数据库

    show collections  展示集合
    db.users.stats()  查看集合数据，比如查看users集合的数据

    show tables  展示表--
    db.users.find()   查找users表中的数据
    
```


## brew使用命令
```
查看版本
    brew -v
安装
    brew install git wget  // 安装git wget
更新
    brew update         // 更新自己
    brew upgrade        // 更新所有包
    brew upgrade git    // 更新指定包
卸载
    brew uninstall      // 卸载git
    brew cleanup        // 清理所有包的旧版本
    brew cleanup git    // 清理指定包的旧版本
查找
    brew list           // 查看安装列表
    brew info git       // 查看包信息
    brew search git     // 查询可用包
    brew outdated       // 查询可更新的包
    brew cleanup -n     // 查看可清理的旧版本包，不执行实际操作

brew 安装的根目录 一般在：/usr/local/Cellar/ 下面
```


## 常用工具命令
```
创建一个文件
    touch a.html

创建一个文件夹
    mkdir a
```


# Ubuntu 安装mysql和简单操作

### 安装步骤
- 1.安装基础包
```
sudo apt-get install mysql-server          //服务端
sudo apt-get install mysql-client          //客户端
sudo apt-get install libmysqlclient-dev    //程序编译时链接的库
```

- 2.检查是否安装成功
```
sudo netstat -tap | grep mysql
```

- 3.登录mysql，输入密码
```
mysql -u root -p 
```

- 4.测试是否已经登录上
```
show databases;
```
说明：通过这种方式安装好之后开机自启动都已经配置好，和命令行上的环境变量，无需手动配置。

### 管理
上面安装好之后会创建如下目录：
- 数据库目录：
```
/var/lib/mysql/
```

- 配置文件：
```
/usr/share/mysql（命令及配置文件） ，/etc/mysql（如：my.cnf）
```

- 相关命令：
```
/usr/bin(mysqladmin mysqldump等命令) 和/usr/sbin
```

- 启动脚本：
```
/etc/init.d/mysql（启动脚本文件mysql的目录）
```


- 启动服务
```
#服务管理
#启动
sudo service mysql start
#停止
sudo service mysql stop
```
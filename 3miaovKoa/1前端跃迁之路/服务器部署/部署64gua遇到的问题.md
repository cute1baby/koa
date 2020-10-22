### 小白部署的过程：

今天是这个系列的最后一篇文章，主要讲一下整个项目的前端部分和后端部分如何进行部署。我将分成两部分来讲：
- 1、项目部署前的环境配置和插件安装
- 2、项目的部署上线
以下是详细信息。

# 安装软件环境：

### 安装nginx
```
sudo apt install nginx 安装nginx
sudo apt-get install nginx  检查是否安装成功
```

### 安装node.js
```
sudo apt install nodejs  // 安装nodejs
```

### 安装npm
```
sudo apt install npm  // 安装npm
```


### 安装mysql

##### 1.安装基础包
```
sudo apt-get install mysql-server          //服务端
sudo apt-get install mysql-client          //客户端
sudo apt-get install libmysqlclient-dev    //程序编译时链接的库
```

##### 2.检查是否安装成功
```
sudo netstat -tap | grep mysql
```

##### 3.登录mysql，输入密码
```
mysql -u root -p
```

##### 4.测试是否已经登录上
```
show databases;
```
##### 5.启动服务
```
sudo service mysql stop
```

我在安装mysql的时候还遇到了不知道初始密码，无法登录的情况。然后我通过百度资料使用这种方法完成了mysql初始密码的设置，详情请借鉴[这篇文章](https://blog.csdn.net/skh2015java/article/details/80156278)。需要注意的是：在输入命令的时候一定要带上分号，否则我们可能看到的效果跟这里的流程效果不一样。

将上面这些环境安装好之后基本已经满足我们项目在服务器上跑起来的前提条件了。我们打开xshell输入命令和服务器建立连接，但是一旦我们把xshell客户端关闭只有，连接就断了。那么有没有一种方法可以在关闭了xshell之后仍然跟服务器进行连接呢？

答案当然是有的，他就是pm2。PM2是JavaScript运行时Node.js的进程管理器，能够实现应用程序一直保持活跃的状态，无需停机即可重新加载它们。接下来就安装他吧。


### 安装pm2
```
npm install pm2 -g
```

好了，以上就把项目运行所需的环境配置好了。接下来是项目的部署部分



# 项目部署

下面我们分别对服务端部署和客户端部署进行介绍。

### 服务端部署

后端项目是通过node跑起来的项目，所以服务端要跑起来需要依赖于node,npm,pm2这几个插件才能跑起来。那你可按照下面的命令使其在服务端运行起来。
1、安装git
```
sudo apt-get install git
```

2、将我的64gua项目下载到服务器上，输入命令:
```
git clone https://github.com/cute1baby/64gua.git
```

3、安装依赖和运行项目
```
cd server
npm install
.\node_modules\.bin\sequelize seed:create
.\node_modules\.bin\sequelize db:migrate
.\node_modules\.bin\sequelize db:seed:all
node app.js
```

4、使用pm2让项目保持持续连接
```
pm2 start app.js
pm2 list  // 查看是否连接成功
exit  成功之后退出
```

备注：pm2如何执行npm run dev
```
pm2 start  npm -- run dev
```

### 客户端部署
将客户端项目在本地跑起来，执行命令`npm run build`，生成了打包文件，并且把它传到服务器上。我当前传到的目录是`/home/64gua/client`。所以我再在下面配置一下nginx配置就可以了。

进行nginx配置：
```
（1）进入路径`/etc/nginx/nginx.conf`进行配置
server {
    listen 80;  #默认端口是80，如果端口没被占用可以不用修改
    server_name  www.familyli.cn;

    #charset koi8-r;

    #access_log  logs/host.access.log  main;
    root  home/64gua/client;#vue项目的打包后的dist

    location / {
        try_files $uri $uri/ @router;
        index  index.html index.htm;
    }
    location @router {
        rewrite ^.*$ /index.html last;
    }
    location /v2/ {
        proxy_pass  设置代理的域名
    }
}

（2）在`/etc/nginx`下输入指令启动nginx
nginx -s reload
```

好了按照上面的配置基本就可以把项目跑起来了，对了好了按照上面的配置基本就可以把项目跑起来了，对了上面的代理域名需要你自己设置一下。如果按照我上面的步骤一点点操作，项目就能跑通了。


### 总结：
今天主要分成两部分来讲解这个部署的过程。第一部分是配置项目所需要的的环境，安装对应的插件。第二部分是分别对客户端和服务端进行部署的过程，以及部署过程中可能会遇到的问题。


另外我建了一个QQ群，群号码是：1103713567（全栈开发跳板群）。方便大家一起交流前端方面或者项目方面的问题。
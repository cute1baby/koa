### 小白部署的过程：

# 安装软件环境：

### 安装nginx
```
sudo apt install nginx 安装nginx
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

好了，以上就把项目运行所需的环境配置好了。


### 后端部署
后端项目是通过node跑起来的项目，所以服务端要跑起来需要依赖于node,npm,pm2这几个插件才能跑起来。那你可按照下面的命令使其在服务端运行起来。
1、先在github将我的64gua项目下载到服务器上，输入命令:
```
git clone https://github.com/cute1baby/64gua.git
```

2、将服务端的项目

### nginx配置：
```
（1）进入路径`/etc/nginx/nginx.conf`进行配置
server {
    listen 80;  #默认端口是80，如果端口没被占用可以不用修改
    server_name  www.familyli.cn;

    #charset koi8-r;

    #access_log  logs/host.access.log  main;
    root  /home/vue_pro;#vue项目的打包后的dist

    location / {
        try_files $uri $uri/ @router;#需要指向下面的@router否则会出现vue的路由在nginx中刷新出现404
        index  index.html index.htm;
    }
    #对应上面的@router，主要原因是路由的路径资源并不是一个真实的路径，所以无法找到具体的文件
    #因此需要rewrite到index.html中，然后交给路由在处理请求资源
    location @router {
        rewrite ^.*$ /index.html last;
    }
    # 设置反向代理，可设置多个。记住代理的网址后面一定要加上`/`
    location /v2/ {
        proxy_pass  https://www.vue-js.com/;
    }
}

（2）在`/etc/nginx`下输入指令启动nginx
nginx -s reload
```

- 项目部署上去
（1）服务器端
（2）客户端

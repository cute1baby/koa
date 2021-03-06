找到腾讯云，找到对应的服务器，找到安全组，然后安全组有入站和出站。点击修改规则。
- 入站：外部进行连接服务器的入口
- 出站：外部的人要访问服务器的入口


### nginx相关的知识
```
nginx的存放地址：/etc/nginx/nginx.conf
查找nginx地址的命令：nginx -t
```

### 给超级管理员设置ssh连接
借鉴文章：https://www.huing.cn/archives/auth_root.html
可能出现的问题是头部使用`$####$`括起来的需要删除掉，不然输入命令`service sshd restart`会报错


### 部署的整个过程演示
- 使用xshell6进行操作
```
sudo apt install nodejs  // 安装nodejs
sudo apt install npm  // 安装npm

sudo apt install nginx 安装nginx
```

- 进入路径`/etc/nginx/nginx.conf`进行配置
```
// 一个server就是一个站点（可以配置多个）,server放在http中
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
```

- 在`/etc/nginx`下输入指令启动nginx
```
nginx -s reload
```



### vue_pro文件转成mode: 'history'模式下
（1）修改config/index.js下build出来的文件assetsPublicPath链接是`/`根目录开始
（2）vue_pro文件index.html引入的verdor.all.js也要使用`/`根目录开始
（3）nginx配置root在`locaion / {}`内
（4）`locaion / {}`内配置`try_files $uri $uri/ /index.html;`


### 同一个域名二级目录多个项目的配置
另外vue项目的优化可参考项目vue_pro.
参考文章：https://www.jianshu.com/p/7169a2eb015b
```
# 一个域名下多个Vue.js项目的nginx配置
server {
    listen      8001;
    server_name  localhost;
    
    # 项目一
    location / {
        root C:/adanhuan/cy-project/cycxvux/cy;
        try_files $uri $uri/ @router;
        index  index.html  index.htm;
    }
    
    location @router {
        rewrite ^.*$  /index.html last;
    }
    
    # 项目二
    location /jx {
        alias C:/adanhuan/cy-project/cycxvux/jx; 
        try_files $uri $uri/ @router_jx;
        index  index.html  index.htm;   
    }
    
    location @router_jx {
        rewrite ^.*$  /jx/index.html last;
    }
    
    # 接口请求代理,解决跨域
    location /api { 
        proxy_pass http://h5cs.cycxvip.com;
    }
}
```

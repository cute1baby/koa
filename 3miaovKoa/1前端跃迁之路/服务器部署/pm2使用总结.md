关于pm2的使用，详情看这篇文章：https://www.jianshu.com/p/5f808762a71a

- 安装pm2
```
npm install pm2 -g
```


- 使用pm2让项目保持持续连接
```
pm2 start app.js
pm2 list  // 查看是否连接成功
exit  成功之后退出
```

备注：pm2如何执行npm run dev
```
pm2 start  npm -- run dev
```



- 杀死pm2进程（重点）
1、先查看pm2占用的端口，输入`pm2 list`，此时出现
name    namespace  ... pid   ..
app      default       30012
npm      default       12812

2、输入命令杀死进程。
```
pm2 delete app
pm2 delete npm
```
3、查看端口占用情况，输入`netstat -ntlp`
发现相关的node服务都被杀死了。


查看端口占用情况，并且杀死当前端口
```
netstat -ntlp   //查看当前服务器进程中占用的端口
sudo lsof -i:端口号   // 通过对应的端口查pid进程，也可以根据上面的方式查看
sudo kill -9 pid     // 杀死进程
```




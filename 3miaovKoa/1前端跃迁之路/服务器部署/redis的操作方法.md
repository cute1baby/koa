
## 如果是用apt-get或者yum install安装的redis，可以直接通过下面的命令停止/启动/重启redis
```
/etc/init.d/redis-server stop
/etc/init.d/redis-server start
/etc/init.d/redis-server restart
```
我发现easy-mock有数据丢失，就用的这种方式stop的。然后再用pm2启动了easy-mock


## 如果是通过源码安装的redis，则可以通过redis的客户端程序 redis-cli 的 shutdown 命令来重启redis
```
redis-cli -h 127.0.0.1 -p 6379 shutdown
```


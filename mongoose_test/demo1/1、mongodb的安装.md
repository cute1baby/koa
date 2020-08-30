### mongodb安装(mongod启动)
>* 备注：配置node的全局变量在文件`笔记本学习操作`中

- 1、下载mongoDB并安装。下载安装地址如下：https://www.mongodb.com/dr/fastdl.mongodb.org/osx/mongodb-macos-x86_64-4.4.0.tgz/download

- 2、将文件解压，放入 /usr/local,并且给文件夹取名为MongoDB。该文件夹在根目录下面（可以使用快捷键shift + command +G打开）

- 3、配置环境变量。打开终端，输入“open -e .bash_profile”，并在文件中加入以下代码：`export PATH=${PATH}:/usr/local/MongoDB/bin`,保存文件。

- 4、测试配置是否成功。接下来在该窗口输入`source .bash_profile`,然后输入`mongod -version`测试当前mongodb版本(关闭了终端窗口后又要重新这样输入一遍)。

- 5、创建数据文件夹。在根目录(就是跟系统、用户同级的那个目录)下创建data文件夹，并在data中创建db文件夹。
    - 发现无法在根目录下创建文件夹，需要修改当前文件的权限。修改文 件权限的方法参照如下文章：https://blog.csdn.net/ScholarTang/article/details/104783146/
    - 按照以上方式就可以创建data/db了。输入命令`sudo mkdir -p /data/db`创建文件夹。
        - 然后启动mongod -version，成功。
        - 执行mongod，失败。失败的报错是`create a lock file on a read-only directory: /data/db`，即创建了一个只读文件，解决方法是输入：`sudo chown -R lizhong /data`。再一次执行mongod，成功。再在浏览器上输入`localhost:27017`(注意该窗口不要关闭)



### mongodb启动
- 1、在终端输入`mongo`，启动mongodb。在shell中输入`1+1`，输出结果则启动成功（该窗口不要关闭）
- 2、此时安装mongoose包，引入就可以使用了


### 附赠知识点
- 设置软连接方式
```
sudo ln -s /Users/lizhong/data /data，这个就对根目录做了一个映射。
```
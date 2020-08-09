这是一个git练习的例子

下面是我的一些提交记录：

### 删除了readme.md文件并且把它挪到了demo1文件夹里面

1、刚开始的时候项目只有readme.md文件，所以我输入了以下命令：
```
git add readme.md
git status
git commit -m 'add readme.md'
git log
```

2、然后我想这只是一个很简单的例子，后面可能有更复杂的，于是我想把之前提交的例子全部放到文件夹demo1中，使它成为一个独立的小项目。但是这样处理一定会跟第一次提交readme.md的位置出现冲突。

我通过git提示，做了以下操作，完成了项目的第二次提交
```
git rm readme.md  // 先删除外部第一次提交的readme.md文件
git add demo1/  添加demo1文件到暂存区
git commit -m 'add demo1'
git status
git log  // 完成了第二次提交
```


### 重命名了demo1文件夹里面的index.js文件名

##### 这是步骤1
按照我以前的写法会这样操作：
- 1、先删除以前的index.js文件，即`git rm demo1/js/index.js`
- 2、将`index1.js`添加到demo1中，`git add demo1/js/index1.js`
以上步骤可以达到目的。

##### 这是步骤2(发现并不管用，报错如下)
```
// 这是报错
fatal: bad source, source=demo1/js/index.js, destination=demo1/js/index1.js
```

但是除此之外还有一个更简单的命令可以达到效果
```
git reset --hard  // 将刚刚上面提交到暂存区的步骤1还原(太强大了)
git mv demo1/js/index.js demo1/js/index1.js
```

### git log的一些使用
下面的这些命令参数可以组合起来使用。
```
git log --oneline   查看历史提交历史的表述
git log -n2  查看最近的2次提交记录（可以和oneline连接起来一起用）
git log --all 查看所有分支的提交记录
git log --graph  查看这些分支的演变历史
```

### 探索.git文件
- 一些会用到的命令
```
cat <文件名>     查看该文件下的内容
vim <文件名>     进入到该文件进行编辑
```

- 一些文件存储的信息
```
config(文件)  存放着一些用户的信息
head(文件)   指向的是当前分支的一个引用
refs(文件夹)  存放heads（分支）和tags（里程碑）
```

- 针对refs文件夹还有以下的一些操作：
```
1、查看heads中的值
cd heads 、    ls     // 发现里面是master文件 

2、进入master文件查看内容，发现是一个id
cat master 

3、查看该文件的id是一个什么类型
git cat-file -t a8a00649b8dcbe38   返回的是一个commit类型

4、查看该分支下的id值是什么
git branch -av

5、查看该文件id下的内容是什么
git cat-file -p a8a00649b8dcbe38   返回的是一个object 2365ffeb8dcbe38，这个object的内容跟文件夹object有关。

6、进入到objects内部查看所有内容(里面的内容是tree类型)
ls -al
```

### commit、tree和blob之间的关系
- 【见图片commit、tree和blob的关系.png】
```
一个commit只会对应一棵树
commit => tree => blob
```
- 具体关系如下：
    - commit是一次提交的记录，会有一个hash的id，里面包含很多文件。
    - 一个commit只会对应一棵树,tree指的是当前提交中所有文件的一次快照。
    - blob是对应这次提交中具体文件的。




command + k是清除终端的命令。

### 一、全局绑定仓库
```
git config --global user.name ‘cute1baby’
git config --global user.email ’1138724604@qq.com’

查看当前的配置
git config --global --list
或者输入： git config --global user.name  查看提交者的姓名
```

### 二、建git仓库

- 1、把已经有的项目代码纳入到项目管理
```
cd 项目所在文件夹
git init
```

- 2、新建的项目直接用git进行管理
```
cd 某个文件夹
git init 项目名称
cd  项目名称
```

添加readme.md文件，然后放入仓库中
```
git add readme.md  // 将readme文件加入到仓库
git status  // 查看是否加入到仓库中
git commit -m '注释' // 提交到本地仓库
git log  // 查看仓库版本提交的历史记录
```


### 通过commit来认识工作区和暂存区
- 【详情见demo1】
```
工作目录=> （git add file）暂存区 => (git commit)版本历史 

已经被git管理了的项目，可以通过以下命令提交到暂存区，而不需要`git add <文件名集合>`，文件名后面一个个列举出来。
git add -u
```

### 通过一次提交来搞清楚commit、tree和blob的关系
举例又下面这样一个文件夹，提交一次会产生什么情况呢？
```
|- doc
    |-readme.md(里面的内容是hello world)
```
提交到暂存区之后，objects文件夹中会出现4个id对象，类型分别是1个commit、2个tree、1个blob。
图片详情见：【2-1提交commit.png】

- 注意：在使用`git checkout 分支`的时候，这里的分支如果写成了某次commit的id，那么就会触发分离头指针。即：在此操作下不会跟任何一个分支挂钩，git会忽视这些操作，不会存放到记录中。


### 如何删除不需要的分支？
```
git branch test  创建test分支
git branch -av  查看一共有多少分支，包括线上的分支
git checkout 分支名   切换分支
git branch -d 分支名   删除分支

合并分支
比如我现在test分支上做了一些代码修改，想把这部分的代码修改迁移到master分支上，我可以做以下操作：
git checkout test  切换到test分支，在该分支上做一些操作
git add 文件名   将修改的文件提交到暂存区
git commmit -m '注释'  提交到版本记录中，并且附上注释
git checkout master  将分支切换回master
git merge test  将test分支修改的记录迁移到master分支上
git branch -d test  将test分支删除，只剩下master分支
```


### 修改最近的一个commit内容描述
git commit --amend
修改描述
wq  保存退出

### 修改最近三次commit描述的内容
git rebase -i [需要变更的commit的父级id]
选择reword，保存，退出
编辑需要修改的信息，保存，退出


### 将多个commit合并成一个
git rebase -i [需要变更的commit的父级id]
选择squer，保存，退出
添加合并后的信息需要修改的信息，保存，退出

### 比较暂存区和工作区的内容
```
git diff --cached
```
如果发现暂存区的代码不是我们想要的，我们可以修改工作区的内容，再一次提交覆盖之前的代码。
  
```
git diff -- 文件名   这个是git add之后，工作区的内容又有变化，两者可以进行对比的。
```


### 将暂存区（git add的数据）的数据恢复到跟head一样(即修改成跟最新commit的数据是一眼的)
```
git reset HEAD  
```
使用场景：
我使用了方案1开发，并且提交到了暂存区；但是我在工作区同时用了第二套方案，并且发现第二套方案比第一套更好。此时我想把暂存区的数据恢复到跟HEAD一样，然后再提交第二套方案的数据。

将部分文件恢复成和head相同
```
git reset HEAD -- 文件名
```

### 将工作区的数据恢复和暂存区一样
```
git checkout -- index.html
```
使用场景：
数据提交之后又在本地进行了修改，但是发现修改的内容不太适合，想要恢复和暂存区一样（有点类似小乌龟的还原），就可以使用这个命令。


### 将工作区内容回退到某一个提交的内容
```
git reset --hard 该次commit的id
```

### 比较两个分支之间最近两个文件的差异
下面是比较temp和master两个文件最近一次的差异。
```
git diff temp master -- index.html
```

或者把两个分支对应的两个id进行比对，效果是一样的。如下：
```
git diff 45rheur 3ererg -- index.html
```

### 删除工作区的文件
```
git rm 文件名
```


### 任务加塞得处理方式

场景：如现在在处理一项任务修改文件A，假设此时为状态a；但是此时又有一个任务过来，也需要修改到A，此时的状态为b。那么这种场景应该如何处理呢
```
git stash  输入该命令后会把状态a暂时存入到一个空间，并且不会影响到其他文件开发
git stash list  查看存入的文件内容状态
```
经过上面这部分的操作之后，工作区的内容就是干净的了，此时可以开始处理状态b的任务
```
git stash apply  将之前的数据推入，并且可以重复使用
git stash pop  将之前的数据推入，然后数据被删除
```


### gitignore文件的使用
比如现在要配置忽略的文件doc,那么对于gitignore可以这样配置
```
doc  忽略doc文件和文件夹
doc/  仅仅忽略doc文件夹
```
配置可以参照链接：https://github.com/github/gitignore/blob/master/ExtJs.gitignore


### git备份
其实就是如何操作remote和push的过程。
（课程看到了第29课，准备看第30课）






### github的使用

- 配置公私钥
进入github然后点击右上角的个人按钮`help`选项，或者再界面中输入ssh或者打开以下链接：
`https://docs.github.com/cn/github/authenticating-to-github/testing-your-ssh-connection?algolia-query=ssh`.

然后再在git项目的终端位置输入以下命令，判断该电脑是否存在公私钥：
`ls -al ~/.ssh`，返回的是在文件夹`/User/lizhong/.ssh`下没有配置

于是准备生成一对公私钥：
在终端输入下面的命令：
`ssh-keygen -t rsa -b 4096 -C "1138724604@qq.com"`
然后一路enter,完成之后输入`open ~/.ssh`，就可以看到公私钥存放的位置：id_rsa是私钥，id_rsa_pub是公钥。把公钥放到github上进行配置就好了。我看到公私钥存放在了`/Users/lizhong/.ssh`路径下。

然后用记事本打开，将公钥放到github的公钥配置中。


- 项目提交到github上
在提交之前，先看一下远端或者本地仓库的内容：`git remote -v`，这样就可以看到当前的本地或者远端的仓库了。
如果是新建的一个项目，而不是克隆过来的，需要跟远端的仓库关联一下
`git remote add github github地址`
`git push github --all`  这个是将所有的分支都推送到远端的命令



### 多人团队如何使用github（34课干货多一点）
- 克隆分支的情况
git clone 路径
git fetch  将远端的所有分支都拉取出来（避免后面新建的团队成员不知道）
git branch -av  看到所有的分支，包括远端的
git checkout -b dev origin/dev  根据远端的分支在本地拷贝一份同样的分支，并切换到该分支


- 两个人修改同一个文件的处理办法：
git fetch  先拉取一下线上的最新代码
git merge orgin/dev  将本地修改和线上分支代码做一个合并，然后解决冲突
git push


- 两个人修改同一文件发生冲突的处理办法
git pull  将远端的代码拉取下来。
然后发现有冲突的部分，并且把冲突部分的代码进行处理。然后照常提交以下命令：
git commit -m '注释'


- 文件名变更了，但是另一个人仍然往这个文件提交了内容，如何处理？
git能智能处理


- 两个人对同一个文件改成了不同的文件名，如何处理？
git会对这种情况报冲突，将两个文件都保留了下来，然后让两个人线下去协商如何处理这种情况。


### 危险的指令
git push -f  这个命令是指强制更新远端的文件代码。很可能让最新的提交记录消失





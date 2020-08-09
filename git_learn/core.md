### 一、全局绑定仓库
```
git config --global user.name ‘cute1baby’
git config --global user.email ’1138724604@qq.com’

查看当前的配置
git config --global --list
或者输入： git config --global user.name  查看提交者的姓名
```


### 提交到暂存区的常用命令
```
git add readme.md  // 将readme文件加入到仓库
git status  // 查看是否加入到仓库中
git commit -m '注释' // 提交到本地仓库
git log  // 查看仓库版本提交的历史记录
```


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


### 删除工作区的文件
```
git rm 文件名
```




### github和一些基础的使用

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

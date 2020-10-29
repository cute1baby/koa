### 分支的使用
- 创建并切换分支，-b参数表示创建并切换
```
git checkout -b dev

以上命令相当于
git branch dev
git checkout dev
```

- 查看当前处于哪个分支
```
git branch

结果显示当前处于dev分支
```

- 在dev分支上做修改
```
比如现在修改了readme.md

git add readme.md
git commit '修改数据'
```

- 切换回master分支，并且将修改内容合并到master分支上
```
git checkout master
git merge dev
```

- 合并完成，删除dev分支
```
git branch -d dev
```


- 命令总结：
```
查看分支：git branch
创建分支：git branch <name>
切换分支：git checkout <name>或者git switch <name>

创建+切换分支：git checkout -b <name>或者git switch -c <name>
合并某分支（这里的name）到当前分支：git merge <name>
删除分支：git branch -d <name>
```


### 解决冲突
以下命令可以看到分支合并图
```
git log --graph
```


### 分支管理策略
分支dev代码合并到master分支上，可加上--on-ff参数，表示禁用Fast forward。因为fast forward合并就看不出来曾经做过合并。
```
git merge --no-ff -m 'merge with no-ff' dev
```

多人团队开发的过程中通常用这样一种方式。每个人负责一条分支进行修改，最后发小版本的时候所有人都提交到dev分支上，master分支一般存放稳定着代码。
（疑问：这种方法跟多人都在dev分支上修改代码有什么区别呢？）
```
https://www.liaoxuefeng.com/wiki/896043488029600/900005860592480
```

### 
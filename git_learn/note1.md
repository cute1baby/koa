从第41集开始-49集（49集没看懂）

### 如何在github准确查找到需要的内容？
vue学习资料 in:readme stars:>1000  表示在readme文件，且stars数量大于1000的中匹配vue学习资料这些内容。


### 如何在github上简单的构建一个个人博客
- 首先在github上找到一个叫做`jekyll-now`项目，然后fork它。地址是：https://github.com/barryclark/jekyll-now/network/members

- fork之后，修改项目名称。我这里按照他的要求修改成了`cute1baby.github.io`。

- 修改配置文件`_config.yml`，这里我把用户名改成了摩根大通

- 在`_posts`文件夹中增加md文件，我这里增加的文件是：`2020-08-08-firstpage.md`

- 最后访问网站`https://cute1baby.github.io/`，可以得到预期的结果。


### orgnization的项目创建
在个人下面有orgnization，用于团队开发
- 通过右上角点击settings,进入到个人设置。选择Organizations，然后右上角新建一个Organization

- 创建好了之后，可以在这个Organization下创建多个项目，也可以邀请多个成员共同开发；也可以在这个下面创建多个团队进行细分；并给这些团队中的成员设置权限。团队对应的是项目



### 启用issue跟踪任务和需求
- 先进入setting,先找到`Branch`模块，然后找到`branch protection rules`的模块，添加规则(add rule)。比如我们需要对master分支做一些规则的设置，那么我们在Apply rule to的输入框中输入master。

- 然后对master分支代码提交设定一下规则：
    - require pull request reviews before merging 合并之前需要请求请求评论
    - Require status checks to pass before merging 合并之前要求状态检查通过
    - Require signed commits 需要签名提交
    - Require linear history  需要线性历史记录
    - Include administrators  包括管理员
    - Allow force pushes  允许暴力推送的方式（不推荐）
    - Allow deletions  允许删除
设置了规则之后，修改者要修改会给相应权限所有者通过收发邮件的方式进行交流。



### 怎么保证集成的质量
跟上面设置`启用issue跟踪任务和需求`的设置类似，这是一种`code review`的方法。


### 如何把产品包发布到github上
- releases   表示发布的版本(没看懂)



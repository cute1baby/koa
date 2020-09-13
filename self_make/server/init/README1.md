### 创建5个表
每个库增加创建时间，更新时间，删除时间。

文章内容单独用一个表拿出来。

- 文章表
    - 标题  title  ✔️
    - 文章Id  articleId  ✔️
    - 用户Id  userId  ✔️
    - 点赞数  likeNums  ✔️
    - 评论数  commentNums  ✔️
    - 阅读数  readNums  ✔️
    - 是否删除文章  isDelete  ✔️
    - 文章是否下架  isOnline  ✔️
    - 编辑时间  updateTime  ✔️
    - 创建时间  createTime  ✔️


- 文章附加表（一对一关系）
    - 文章Id  articleId  ✔️
    - 内容（专门存内容） content  ✔️
    - 创建时间  createTime  ✔️


- 评论表（备注：评论的点赞先不做）
    - 上一条评论Id  parentId  ✔️
    - 文章Id  articleId  ✔️
    - 用户Id  userId  ✔️
    - 评论Id  commentId  ✔️
    - 内容  content  ✔️
    - 是否删除评论  isDelete  ✔️
    - isOnline(评论是否下架)  isOnline  ✔️
    - 创建时间  createTime  ✔️
    - 编辑时间  updateTime  ✔️

增加parentId字段，记录上一次评论的id。      

- 点赞表（？）   
    - 点赞Id  likeId  ✔️
    - 文章Id  articleId  ✔️
    - 用户Id  userId  ✔️
    - 点赞状态（删除）
    - 创建时间  createTime  ✔️


- 用户表
    - 用户Id  userId  ✔️
    - 用户名  username  ✔️
    - 密码  password  ✔️
    - 头像  avatar  ✔️
    - 职位  position  ✔️
    - 公司   company  ✔️
    - 个人介绍  selfIntroduction  ✔️
    - 个人主页  homepage  ✔️
    - type（类型，哪种登录方式）  ✔️
        - 1 账号密码登录
    - 创建时间  createTime

- 用户附加表（存附加字段，一对一关系）
    - 用户Id  userId  ✔️
    - 点赞数  likeNums  ✔️
    - 文章总阅读数  articleReadNums  ✔️
    - 关注用户列表  attentionUsesList  ✔️
    - 被关注用户列表  followedUsesList  ✔️
    - 自己写的文章列表  selfArticleList  ✔️
    - 自定义收藏集列表  articleCollectClumpList  ✔️
    - 关注的标签列表
    attentionLabelList  ✔️
    - 创建时间  createTime  ✔️


最后这两个多对多关系的表可能有问题
- 自定义收藏集表
    - 自定义收藏集Id  collectclumpId  ✔️
    - 标题  title  ✔️
    - 文章数量  articleNums  ✔️
    - 文章列表  articleList  ✔️

    - 关注人数  attentionNums  ✔️
    - 关注人列表  attentionList  ✔️
    - 创建者  creator  ✔️
    - 是否删除  isDelete  ✔️
    - 创建时间  createTime  ✔️
如：前端面试汇总，正则基础...
（收藏表的Id跟tag表的多对多的关系。）

- 类目表（网站自有，扒拉掘金网接口）
    - 类目Id  tagId  ✔️
    - 类目名称  title  ✔️
    - 文章数  articleNums  ✔️
    - 文章列表  articleList  ✔️
    - 关注数  attentionNums  ✔️
    - 关注人列表  attentionList  ✔️
    - 是否删除  isDelete  ✔️
    - 创建时间  createTime  ✔️
如：前端，后端，面试。
增加二级分类


ssr(提高搜索引擎怕虫效果)

### 以下是对项目的介绍
- 01 自定义菜单
- 02 获取ticket(获取方式跟access_token类似，文件在wechat)
    - 规则参考：https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html#62
- 03 获取signature，做语音识别功能；调用豆瓣接口；分享功能
    - 规则参考：
        - (1)https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html#62
        - (2)https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html#2
- 04 文件整理和优化项目结构
    - 出现了一个问题是在返回图文信息的reply.js模块中，视频没有说到要引入db模块。但其实要执行`node app`，需要去数据库查询数据，就先要进行数据库的连接










